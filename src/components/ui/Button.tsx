import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const variants = {
  primary:
    "bg-terracotta text-white shadow-soft hover:bg-terracotta-dark",
  secondary:
    "bg-white text-ink border border-cream-line hover:border-ink/30",
  /** For photos / dark backgrounds. */
  outline:
    "border border-white/60 text-white hover:bg-white/10 hover:border-white",
  ghost: "text-terracotta-dark hover:text-terracotta",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = "md" | "lg";

/**
 * The one source of truth for button styling. `Button` (a link) uses it,
 * and so does any real `<button>` (e.g. the booking form submit):
 *   <button className={buttonStyles({ variant: "primary", size: "lg" })} />
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)]",
    "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70",
    size === "lg" ? "min-h-12 px-8 py-3.5 text-base" : "px-6 py-3 text-sm",
    variants[variant],
    className
  );
}

interface ButtonProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
