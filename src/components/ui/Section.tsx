import { cn } from "@/lib/utils";

const backgrounds = {
  cream: "bg-cream",
  deep: "bg-cream-deep",
  white: "bg-white",
  ink: "bg-ink text-cream",
} as const;

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: keyof typeof backgrounds;
  as?: "section" | "div";
}

export function Section({
  className,
  background = "cream",
  as: Tag = "section",
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        backgrounds[background],
        className
      )}
      {...props}
    />
  );
}
