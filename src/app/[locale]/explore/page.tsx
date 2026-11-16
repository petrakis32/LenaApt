import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { buttonStyles } from "@/components/ui/Button";
import { StickySubNav } from "@/components/apartment/StickySubNav";
import { LocationMap } from "@/components/location/LocationMap";
import { NearbyPlaces } from "@/components/location/NearbyPlaces";
import { PlatformTile } from "@/components/reviews/PlatformTile";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewsPlaceholder } from "@/components/reviews/ReviewsPlaceholder";
import { BookingCta } from "@/components/home/BookingCta";
import { siteConfig } from "@/config/site";
import { reviews, reviewPlatforms } from "@/config/reviews";
import { getGoogleMapsDirectionsUrl } from "@/lib/maps";
import { MapPin, Navigation } from "lucide-react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/explore">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.explore" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/explore" },
    openGraph: { title: t("title"), description: t("description") },
  };
}

/**
 * Explore = where the apartment is + what's around it + what guests say.
 * (Replaces the former separate Location page; /location redirects here.)
 */
export default async function ExplorePage({
  params,
}: PageProps<"/[locale]/explore">) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("explore");
  const tLocation = await getTranslations("location");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={tNav("explore")} title={t("title")} body={t("intro")} />

      <StickySubNav
        label={t("jumpLabel")}
        items={[
          { id: "location", label: t("jumpLocation") },
          { id: "nearby", label: t("jumpNearby") },
          { id: "reviews", label: t("jumpReviews") },
        ]}
      />

      <Section id="location" background="cream" className="scroll-mt-36">
        <Container className="relative">
          <LocationMap
            title={tLocation("mapTitle")}
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          />

          {/* Address card: overlaps the map's corner on desktop, sits below it on phones. */}
          <Card className="mt-4 flex flex-col gap-4 lg:absolute lg:bottom-16 lg:left-20 lg:mt-0 lg:max-w-sm">
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
              {tLocation("getDirections")}
            </a>
          </Card>
        </Container>
      </Section>

      <Section id="nearby" background="deep" className="scroll-mt-36">
        <Container>
          <SectionHeading title={tLocation("nearbyTitle")} body={tLocation("nearbyIntro")} />
          <div className="mt-12">
            <NearbyPlaces />
          </div>
        </Container>
      </Section>

      <Section id="reviews" background="cream" className="scroll-mt-36">
        <Container>
          <SectionHeading title={t("reviewsTitle")} body={t("reviewsIntro")} />

          <ul className="mt-10 grid gap-3 sm:grid-cols-3 lg:max-w-3xl">
            {reviewPlatforms.map((platform) => (
              <li key={platform.id}>
                <PlatformTile platform={platform} />
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {reviews.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <ReviewCard key={`${review.platform}-${review.author}`} review={review} />
                ))}
              </div>
            ) : (
              <div className="max-w-xl">
                <ReviewsPlaceholder />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <BookingCta />
    </>
  );
}
