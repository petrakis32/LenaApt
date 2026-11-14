"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<string, string> = {
  en: "EN",
  el: "EL",
};

interface LanguageSwitcherProps {
  inverted?: boolean;
}

export function LanguageSwitcher({ inverted }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5 text-sm",
        inverted
          ? "border-white/30 text-white"
          : "border-cream-line text-ink-soft"
      )}
      role="group"
      aria-label={t("languageSwitcher")}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 font-medium transition-colors",
              active
                ? inverted
                  ? "bg-white text-ink"
                  : "bg-terracotta text-white"
                : inverted
                  ? "text-white/80 hover:text-white"
                  : "text-ink-soft hover:text-ink"
            )}
          >
            {localeLabels[loc] ?? loc.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
