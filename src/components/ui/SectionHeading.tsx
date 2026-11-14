import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "inverted";
}

export function SectionHeading({
  title,
  body,
  align = "left",
  className,
  tone = "default",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2
        className={cn(
          "balance font-display text-[2.75rem] leading-[1.08] tracking-[-0.01em] sm:text-5xl",
          tone === "inverted" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "inverted" ? "text-cream/85" : "text-ink-soft"
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
