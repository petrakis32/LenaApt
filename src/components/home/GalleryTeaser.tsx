import { getTranslations } from "next-intl/server";
import { galleryImages } from "@/config/gallery";
import { PropertyImage } from "@/components/media/PropertyImage";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export async function GalleryTeaser() {
  const t = await getTranslations("home");
  const tGallery = await getTranslations("gallery");
  const featured = galleryImages.filter((img) => img.featured).slice(0, 6);

  return (
    <Section background="deep">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading title={t("galleryTitle")} />
          <Button href="/gallery" variant="ghost" className="hidden sm:inline-flex">
            {t("galleryCta")} →
          </Button>
        </div>

        <div className="mt-10 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4">
          {featured.map((image) => (
            <Link
              key={image.id}
              href="/gallery"
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                image.wide && "col-span-2"
              )}
            >
              <PropertyImage
                id={image.id}
                src={image.src}
                alt={tGallery(`categories.${image.category}`)}
                category={image.category}
                categoryLabel={tGallery(`categories.${image.category}`)}
                comingSoonLabel={tGallery("photoComingSoon")}
                sizes="(min-width: 640px) 25vw, 50vw"
                className="transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Button href="/gallery" variant="secondary">
            {t("galleryCta")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
