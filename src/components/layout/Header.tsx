"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, bookingHref } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-line/80 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav
          aria-label={t("menu")}
          className="hidden items-center gap-8 lg:flex"
        >
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
                  active
                    ? "text-terracotta"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {t(item.key)}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link
            href={bookingHref}
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-terracotta-dark"
          >
            {tCommon("requestBooking")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={t("openMenu")}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-cream-deep lg:hidden"
        >
          <Menu aria-hidden className="h-6 w-6" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
