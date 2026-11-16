import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Use a white mark on a dark/photographic background (e.g. the hero). */
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
      aria-label={siteConfig.name}
      className={cn(
        "inline-flex items-center gap-2 font-display text-2xl tracking-tight transition-colors",
        inverted ? "text-white" : "text-ink",
        className
      )}
    >
      {siteConfig.logoSrc ? (
        <Image
          src={siteConfig.logoSrc}
          alt={siteConfig.name}
          width={140}
          height={107}
          priority
          // The logo is dark blue + gold; on photos it is flattened to white.
          className={cn("h-11 w-auto transition-[filter]", inverted && "brightness-0 invert")}
        />
      ) : (
        <span className="leading-none">
          Lena <span className={inverted ? "text-white" : "text-terracotta-dark"}>Apt</span>
        </span>
      )}
    </Link>
  );
}
