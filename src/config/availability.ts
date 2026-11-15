/**
 * Availability data for the booking-page calendar.
 *
 * Two sources are merged:
 *
 *  1. `MANUAL_BOOKED_RANGES` below — the owner edits this list by hand.
 *     `start` is the first booked night (check-in day) and `end` is the
 *     check-out day, which stays free for a new arrival (iCal convention).
 *  2. Optional iCal feeds (Airbnb / Booking.com "export calendar" URLs),
 *     read from env vars so the private feed URLs never reach git:
 *       AIRBNB_ICAL_URL, BOOKINGCOM_ICAL_URL   (in .env.local)
 *
 * The calendar is informational — the booking page still sends a request
 * that the owners confirm personally.
 */

export interface DateRange {
  start: string; // ISO date, e.g. "2026-07-10" (first booked night)
  end: string; // ISO date (check-out day — not a booked night)
}

/** Edit me: dates the apartment is already taken. */
const MANUAL_BOOKED_RANGES: DateRange[] = [
  // { start: "2026-07-10", end: "2026-07-17" },
];

const ICAL_REVALIDATE_SECONDS = 60 * 60; // refresh feeds hourly

function parseIcalDate(value: string): string | null {
  const m = value.match(/(\d{4})(\d{2})(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function parseIcal(text: string): DateRange[] {
  // Unfold continuation lines, then walk VEVENT blocks.
  const lines = text.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
  const ranges: DateRange[] = [];
  let start: string | null = null;
  let end: string | null = null;
  let inEvent = false;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      start = end = null;
    } else if (line === "END:VEVENT") {
      if (inEvent && start && end && end > start) ranges.push({ start, end });
      inEvent = false;
    } else if (inEvent) {
      if (line.startsWith("DTSTART")) start = parseIcalDate(line.split(":")[1] ?? "");
      else if (line.startsWith("DTEND")) end = parseIcalDate(line.split(":")[1] ?? "");
    }
  }
  return ranges;
}

async function fetchIcal(url: string): Promise<DateRange[]> {
  try {
    const res = await fetch(url, { next: { revalidate: ICAL_REVALIDATE_SECONDS } });
    if (!res.ok) return [];
    return parseIcal(await res.text());
  } catch {
    return [];
  }
}

export async function getBookedDateRanges(): Promise<DateRange[]> {
  const feeds = [process.env.AIRBNB_ICAL_URL, process.env.BOOKINGCOM_ICAL_URL].filter(
    (u): u is string => Boolean(u)
  );
  const remote = await Promise.all(feeds.map(fetchIcal));
  return [...MANUAL_BOOKED_RANGES, ...remote.flat()];
}
