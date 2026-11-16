import { cn } from "@/lib/utils";

/** The single page-width wrapper (header, footer and every section use it). */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-8xl px-5 sm:px-8 lg:px-12", className)}
      {...props}
    />
  );
}
