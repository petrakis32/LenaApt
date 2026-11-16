import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  body?: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "inverted";
  /** Heading level to render; visual size is the same. */
  as?: "h1" | "h2" | "h3";
}

/** eyebrow → title → lead, in one consistent stack. */
export function SectionHeading({
  title,
  body,
  eyebrow,
  align = "left",
  className,
  tone = "default",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const inverted = tone === "inverted";
  return (
    <div
      className={cn(
        "max-w-xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("t-eyebrow mb-4", inverted && "!text-gold")}>{eyebrow}</p>
      ) : null}
      <Tag className={cn("balance t-h2", inverted ? "text-white" : "text-ink")}>
        {title}
      </Tag>
      {body ? (
        <p className={cn("t-lead mt-5", inverted && "!text-cream/85")}>{body}</p>
      ) : null}
    </div>
  );
}
