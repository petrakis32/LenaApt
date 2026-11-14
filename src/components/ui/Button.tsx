import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const variants = {
  primary:
    "bg-terracotta text-white shadow-soft hover:bg-terracotta-dark hover:shadow-lifted",
  secondary:
    "bg-white text-ink border border-cream-line hover:border-ink/30",
  outline:
    "border border-white/50 text-white hover:bg-white/10 hover:border-white/80",
  ghost: "text-terracotta hover:text-terracotta-dark",
} as const;

interface ButtonProps extends ComponentProps<typeof Link> {
  variant?: keyof typeof variants;
  size?: "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-medium",
        "transition-[background-color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)]",
        "hover:-translate-y-px active:translate-y-0 active:scale-[0.97]",
        size === "lg" ? "px-7 py-3.5 text-base" : "px-6 py-3 text-[15px]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
