import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { LocationMap } from "@/components/location/LocationMap";
import { ReviewsPanel } from "./ReviewsPanel";

/**
 * One cream band split in two: guest reviews/ratings on the left
 * (`ReviewsPanel`, data in config/reviews.ts, centered in its half) and the
 * location on the right — a short text with the button to the Explore page,
 * and the map beside it.
 */
export async function LocationTeaser() {
  const t = await getTranslations("home");
  const tLocation = await getTranslations("location");

  return (
    <Section background="cream" className="py-10 sm:py-12 lg:py-14">
      <Container className="grid max-w-none 2xl:px-16 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-0">
        <Reveal className="lg:pr-12">
          <ReviewsPanel />
        </Reveal>

        <Reveal
          delay={100}
          className="lg:self-stretch lg:border-l-2 lg:border-ink/25 lg:pl-12"
        >
          <div className="grid h-full items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
            <div>
              <h2 className="t-h2 balance text-ink">{t("locationTitle")}</h2>
              <p className="t-lead mt-4">{t("locationLead")}</p>
              <Button
                href="/explore#location"
                variant="secondary"
                className="mt-7"
              >
                {t("locationCta")}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
            </div>
            <LocationMap
              title={tLocation("mapTitle")}
              className="aspect-[4/3] sm:aspect-[4/3]"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
