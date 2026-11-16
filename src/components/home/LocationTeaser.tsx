import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { LocationMap } from "@/components/location/LocationMap";

/** Map on the left, short location text and link on the right. */
export async function LocationTeaser() {
  const t = await getTranslations("home");
  const tLocation = await getTranslations("location");

  return (
    <Section background="deep" className="py-9 sm:py-10 lg:py-12">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal>
          <LocationMap
            title={tLocation("mapTitle")}
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/9]"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="t-eyebrow">{t("locationEyebrow")}</p>
          <h2 className="t-h2 balance mt-3 text-ink">{t("locationTitle")}</h2>
          <p className="t-lead mt-4 max-w-md">{t("locationLead")}</p>
          <Button href="/location" variant="secondary" className="mt-7">
            {t("locationCta")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
