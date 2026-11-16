import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { buttonStyles } from "@/components/ui/Button";
import { LocationMap } from "@/components/location/LocationMap";
import { NearbyPlaces } from "@/components/location/NearbyPlaces";
import { BookingCta } from "@/components/home/BookingCta";
import { siteConfig } from "@/config/site";
import { getGoogleMapsDirectionsUrl } from "@/lib/maps";
import { MapPin, Navigation } from "lucide-react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/location">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.location" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/location" },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function LocationPage({
  params,
}: PageProps<"/[locale]/location">) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("location");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={tNav("location")} title={t("title")} body={t("intro")} />

      <Section background="cream" className="!pb-0 !pt-12 sm:!pt-14 lg:!pt-16">
        <Container className="relative">
          <LocationMap
            title={t("mapTitle")}
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          />

          {/* Address card: overlaps the map's corner on desktop, sits below it on phones. */}
          <Card className="mt-4 flex flex-col gap-4 lg:absolute lg:bottom-8 lg:left-20 lg:mt-0 lg:max-w-sm">
            <div className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-terracotta-dark" />
              <a
                href={getGoogleMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl text-ink underline decoration-cream-line decoration-2 underline-offset-4 transition-colors hover:text-terracotta-dark hover:decoration-terracotta"
              >
                {siteConfig.location.streetAddress
                  ? `${siteConfig.location.streetAddress}, `
                  : ""}
                {siteConfig.location.postalCode
                  ? `${siteConfig.location.postalCode} `
                  : ""}
                {siteConfig.location.locality}, {siteConfig.location.region},{" "}
                {siteConfig.location.country}
              </a>
            </div>
            <a
              href={getGoogleMapsDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "primary", className: "self-start" })}
            >
              <Navigation aria-hidden className="h-4 w-4" />
              {t("getDirections")}
            </a>
          </Card>
        </Container>
      </Section>

      <Section background="cream">
        <Container>
          <SectionHeading title={t("nearbyTitle")} body={t("nearbyIntro")} />
          <div className="mt-12">
            <NearbyPlaces />
          </div>
        </Container>
      </Section>

      <BookingCta />
    </>
  );
}
