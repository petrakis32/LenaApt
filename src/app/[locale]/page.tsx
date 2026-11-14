import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { ApartmentOverview } from "@/components/home/ApartmentOverview";
import { AmenitiesTeaser } from "@/components/home/AmenitiesTeaser";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { LocationTeaser } from "@/components/home/LocationTeaser";
import { FinalCta } from "@/components/home/FinalCta";
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
      <IntroSection />
      <ApartmentOverview />
      <AmenitiesTeaser />
      <GalleryTeaser />
      <LocationTeaser />
      <FinalCta />
    </>
  );
}
