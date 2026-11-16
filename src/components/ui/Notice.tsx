import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  info: "border-aegean/25 bg-aegean-light text-aegean-dark",
  warning: "border-gold/40 bg-terracotta-light text-terracotta-dark",
} as const;

/** One component for every inline info / warning message. */
export function Notice({
  tone = "info",
  className,
  children,
  role,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
  role?: "note" | "alert";
}) {
  const Icon = tone === "info" ? Info : AlertTriangle;
  return (
    <div
      role={role ?? (tone === "info" ? "note" : "alert")}
      className={cn(
        "flex items-start gap-3 rounded-card border px-5 py-4 text-sm",
        tones[tone],
        className
      )}
    >
      <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
