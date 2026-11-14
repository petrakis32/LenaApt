import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";

/**
 * Catch-all for unmatched paths under a known locale. Without this,
 * Next.js's automatic 404 bubbles past `[locale]/layout.tsx` straight
 * to the root `not-found.tsx`, losing the header/footer and
 * translations. Explicitly calling `notFound()` here makes it use
 * `[locale]/not-found.tsx` instead, fully localized and branded.
 */
export default async function CatchAll({
  params,
}: PageProps<"/[locale]/[...rest]">) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  notFound();
}
