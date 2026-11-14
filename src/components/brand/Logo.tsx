import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Use a lighter mark on a dark/photographic background (e.g. the hero). */
  inverted?: boolean;
}

/**
 * Renders the real logo once `siteConfig.logoSrc` is set; until then,
 * a typographic wordmark keeps the header/footer finished-looking.
 */
export function Logo({ className, inverted }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 font-display text-xl tracking-tight",
        inverted ? "text-white" : "text-ink",
        className
      )}
    >
      {siteConfig.logoSrc ? (
        <Image
          src={siteConfig.logoSrc}
          alt={siteConfig.name}
          width={140}
          height={40}
          priority
          className="h-9 w-auto"
        />
      ) : (
        <>
          <span
            aria-hidden
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-base",
              inverted
                ? "bg-white/15 text-white ring-1 ring-white/40"
                : "bg-terracotta text-white"
            )}
          >
            L
          </span>
          <span className="leading-none">
            Lena <span className="text-terracotta">Apt</span>
          </span>
        </>
      )}
    </Link>
  );
}
