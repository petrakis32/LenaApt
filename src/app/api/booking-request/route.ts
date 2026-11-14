import { NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/validation/booking";
import { isEmailConfigured, sendBookingRequestEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

const MIN_FILL_TIME_MS = 1500;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "validation_error",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const { company, formLoadedAt, ...data } = parsed.data;

  // Honeypot filled, or submitted implausibly fast — treat as spam
  // and report success without sending anything, so bots don't learn.
  const submittedTooFast =
    typeof formLoadedAt === "number" &&
    Date.now() - formLoadedAt < MIN_FILL_TIME_MS;
  if (company || submittedTooFast) {
    return NextResponse.json({ ok: true });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    await sendBookingRequestEmail(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send booking request email", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
