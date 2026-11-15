import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { LocationMap } from "@/components/location/LocationMap";

export async function LocationTeaser() {
  const t = await getTranslations("home");
  const tLocation = await getTranslations("location");

  return (
    <Section background="deep">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            title={t("locationTitle")}
            body={t("locationBody")}
          />
          <div className="mt-7">
            <Button href="/location" variant="secondary">
              {t("locationCta")}
            </Button>
          </div>
        </div>

        <LocationMap title={tLocation("mapTitle")} />
      </Container>
    </Section>
  );
}
