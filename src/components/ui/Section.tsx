import { cn } from "@/lib/utils";

const backgrounds = {
  cream: "bg-cream",
  deep: "bg-cream-deep", // "sand"
  white: "bg-white",
  ink: "bg-ink text-cream",
} as const;

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: keyof typeof backgrounds;
  as?: "section" | "div";
}

/**
 * Full-width page band. Vertical rhythm comes from the `py-section`
 * token (see globals.css) — override with `className` only when a
 * section genuinely needs to sit tight against the one above it.
 */
export function Section({
  className,
  background = "cream",
  as: Tag = "section",
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn("py-section", backgrounds[background], className)}
      {...props}
    />
  );
}
