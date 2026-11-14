import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LocationMap } from "@/components/location/LocationMap";
import { NearbyPlaces } from "@/components/location/NearbyPlaces";
import { FinalCta } from "@/components/home/FinalCta";
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

  return (
    <>
      <PageHero title={t("title")} body={t("intro")} />

      <Section background="cream" className="pt-10 sm:pt-12">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
          <LocationMap
            title={t("mapTitle")}
            className="h-[280px] sm:h-[340px] lg:aspect-auto lg:h-[380px]"
          />
          <div className="flex flex-col gap-4 rounded-2xl border border-cream-line bg-white p-6 shadow-soft">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-light text-terracotta">
                <MapPin aria-hidden className="h-5 w-5" />
              </span>
              <a
                href={getGoogleMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg text-ink underline decoration-cream-line decoration-2 underline-offset-4 transition-colors hover:text-terracotta hover:decoration-terracotta"
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
              className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-terracotta px-5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-terracotta-dark"
            >
              <Navigation aria-hidden className="h-4 w-4" />
              {t("getDirections")}
            </a>
          </div>
        </Container>
      </Section>

      <Section background="deep">
        <Container>
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            {t("nearbyTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">{t("nearbyIntro")}</p>
          <div className="mt-8">
            <NearbyPlaces />
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
