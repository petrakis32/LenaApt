import { getTranslations } from "next-intl/server";
import { galleryImages } from "@/config/gallery";
import { PropertyImage } from "@/components/media/PropertyImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FactStrip } from "@/components/property/FactStrip";

export async function IntroSection() {
  const t = await getTranslations("home");
  const tGallery = await getTranslations("gallery");
  const image = galleryImages.find((img) => img.id === "living-1")!;

  return (
    <Section>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="balance font-display text-[2.75rem] leading-[1.08] tracking-[-0.01em] text-ink sm:text-5xl">
            {t("introTitle")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {t("introBody")}
          </p>

          <FactStrip className="mt-10 sm:grid-cols-3" />
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lifted lg:aspect-[3/4]">
          <PropertyImage
            id={image.id}
            src={image.src}
            alt={tGallery(`categories.${image.category}`)}
            category={image.category}
            categoryLabel={tGallery(`categories.${image.category}`)}
            comingSoonLabel={tGallery("photoComingSoon")}
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </div>
      </Container>
    </Section>
  );
}
