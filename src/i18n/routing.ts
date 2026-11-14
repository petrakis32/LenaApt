import { defineRouting } from "next-intl/routing";
import { hasLocale } from "next-intl";

/**
 * English is the default/primary locale (most Rethymno accommodation
 * searches happen in English), Greek is the secondary locale for local
 * guests. Default locale is served with no URL prefix, Greek is served
 * under /el.
 */
export const routing = defineRouting({
  locales: ["en", "el"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];

/**
 * Narrows a raw route param to `AppLocale`, falling back to the
 * default locale. Route params from Next's typegen are plain
 * `string`, but next-intl's translation APIs require the literal
 * locale union — use this instead of casting at every call site.
 */
export function resolveLocale(rawLocale: string): AppLocale {
  return hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
}
