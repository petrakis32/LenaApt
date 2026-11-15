import { getTranslations } from "next-intl/server";
import { galleryImages } from "@/config/gallery";
import { PropertyImage } from "@/components/media/PropertyImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const thumbnailIds = ["bedroom-1-3", "bedroom-2-1", "living-1", "bathroom-1"];

export async function ApartmentOverview() {
  const t = await getTranslations("home");
  const tApartment = await getTranslations("apartment");
  const tGallery = await getTranslations("gallery");

  return (
    <Section background="deep">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-4">
          {thumbnailIds.map((id) => {
            const image = galleryImages.find((img) => img.id === id)!;
            const roomKey = image.category as
              | "bedroom-1"
              | "bedroom-2"
              | "living"
              | "bathroom";
            return (
              <div key={id} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                  <PropertyImage
                    id={image.id}
                    src={image.src}
                    alt={tApartment(`rooms.${roomKey}.title`)}
                    category={image.category}
                    categoryLabel={tGallery(`categories.${image.category}`)}
                    comingSoonLabel={tGallery("photoComingSoon")}
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-ink-soft">
                  {tApartment(`rooms.${roomKey}.title`)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col justify-center">
          <SectionHeading
            title={t("overviewTitle")}
            body={t("overviewBody")}
          />
          <div className="mt-7">
            <Button href="/apartment" variant="secondary">
              {t("overviewCta")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
