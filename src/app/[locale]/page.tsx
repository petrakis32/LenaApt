import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { FactsBar } from "@/components/home/FactsBar";
import { IntroSection } from "@/components/home/IntroSection";
import { ApartmentOverview } from "@/components/home/ApartmentOverview";
import { LocationTeaser } from "@/components/home/LocationTeaser";
import { BookingCta } from "@/components/home/BookingCta";
import { LodgingJsonLd } from "@/components/seo/LodgingJsonLd";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/" },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);

  return (
    <>
      <LodgingJsonLd />
      <Hero />
      <FactsBar />
      <IntroSection />
      <ApartmentOverview />
      <LocationTeaser />
      <BookingCta />
    </>
  );
}
