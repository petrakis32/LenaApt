import { getTranslations } from "next-intl/server";
import { amenities } from "@/config/amenities";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { asLooseT } from "@/lib/i18n";

export async function AmenitiesTeaser() {
  const t = await getTranslations("home");
  const tAmenities = asLooseT(await getTranslations("amenities"));

  return (
    <Section background="cream">
      <Container>
        <SectionHeading
          title={t("amenitiesTitle")}
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 flex flex-wrap items-start justify-center gap-x-10 gap-y-7">
          {amenities.map(({ id, icon: Icon }) => (
            <div key={id} className="flex flex-col items-center gap-2.5">
              <Icon
                aria-hidden
                className="h-7 w-7 text-olive"
                strokeWidth={1.4}
              />
              <p className="text-sm font-medium text-ink">
                {tAmenities(`items.${id}.title`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/apartment" variant="secondary">
            {t("amenitiesCta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
