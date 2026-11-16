import { cn } from "@/lib/utils";

/** The one white bordered card used across the site. */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-cream-line bg-white p-6 shadow-soft",
        className
      )}
      {...props}
    />
  );
}
