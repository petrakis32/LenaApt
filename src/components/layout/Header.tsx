"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, bookingHref } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

/** Pages that open with a full-bleed photo: the header floats over it. */
const PHOTO_HERO_PATHS = ["/", "/apartment"];

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the photo until the visitor scrolls; solid everywhere else.
  const overPhoto = PHOTO_HERO_PATHS.includes(pathname) && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        overPhoto
          ? "border-b border-transparent bg-gradient-to-b from-ink/50 to-transparent"
          : "border-b border-cream-line/80 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85"
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Logo inverted={overPhoto} />

        <nav aria-label={t("menu")} className="hidden items-center gap-9 lg:flex">
          {primaryNav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative py-1 text-sm font-medium transition-colors",
                  overPhoto
                    ? "text-white/90 hover:text-white"
                    : active
                      ? "text-terracotta-dark"
                      : "text-ink-soft hover:text-ink"
                )}
              >
                {t(item.key)}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-x-100",
                    overPhoto ? "bg-white" : "bg-terracotta",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher inverted={overPhoto} />
          <Link href={bookingHref} className={buttonStyles({ variant: "primary" })}>
            {tCommon("requestBooking")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={t("openMenu")}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            overPhoto ? "text-white hover:bg-white/15" : "text-ink hover:bg-cream-deep"
          )}
        >
          <Menu aria-hidden className="h-6 w-6" />
        </button>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
