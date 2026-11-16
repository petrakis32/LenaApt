import { getTranslations } from "next-intl/server";
import { heroImage } from "@/config/gallery";
import { PropertyImage } from "@/components/media/PropertyImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Opening photo. The header floats over its top edge (transparent until
 * the visitor scrolls). Title block sits upper-left, vertically centered,
 * so the right side of the photo stays clear.
 */
export async function Hero() {
  const t = await getTranslations("hero");
  const tGallery = await getTranslations("gallery");

  return (
    <section className="relative flex min-h-[34rem] items-center overflow-hidden bg-ink pb-16 pt-28 sm:h-[78svh] sm:max-h-[50rem] sm:pb-12">
      <div className="absolute inset-0">
        <PropertyImage
          id={heroImage.id}
          src={heroImage.src}
          alt={t("title")}
          category={heroImage.category}
          categoryLabel={tGallery(`categories.${heroImage.category}`)}
          comingSoonLabel={tGallery("photoComingSoon")}
          priority
          minimal
          sizes="100vw"
        />
        {/* Left-to-right wash keeps the title readable; the right stays clear. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent max-sm:bg-gradient-to-t max-sm:from-ink/75 max-sm:via-ink/30 max-sm:to-ink/20"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/40 to-transparent"
        />
      </div>

      <Container className="relative animate-fade-in-up">
        <div className="flex max-w-xl flex-col items-start text-left max-sm:pt-24">
          <h1 className="t-display text-white">{t("title")}</h1>
          <p className="balance mt-4 max-w-sm text-lg leading-relaxed text-white/90 sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/apartment" size="lg">
              {t("secondaryCta")}
            </Button>
            <Button href="/booking" size="lg" variant="outline">
              {t("primaryCta")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
