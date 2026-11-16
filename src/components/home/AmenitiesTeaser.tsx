import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { amenities } from "@/config/amenities";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { asLooseT } from "@/lib/i18n";

export async function AmenitiesTeaser() {
  const t = await getTranslations("home");
  const tAmenities = asLooseT(await getTranslations("amenities"));

  return (
    <Section background="cream">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow={t("amenitiesEyebrow")}
            title={t("amenitiesTitle")}
          />
          <Button href="/apartment#amenities" variant="ghost" className="mt-6 px-0">
            {t("amenitiesCta")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {amenities.map(({ id, icon: Icon }) => (
              <li
                key={id}
                className="flex items-center gap-4 border-t border-cream-line py-5"
              >
                <Icon
                  aria-hidden
                  className="h-6 w-6 shrink-0 text-terracotta-dark"
                  strokeWidth={1.4}
                />
                <span className="font-medium text-ink">
                  {tAmenities(`items.${id}.title`)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
