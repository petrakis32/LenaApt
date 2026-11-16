import { getTranslations } from "next-intl/server";
import { heroImage } from "@/config/gallery";
import { PropertyImage } from "@/components/media/PropertyImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Opening photo. The header floats over its top edge (transparent until
 * the visitor scrolls). Title block is centered, horizontally and vertically.
 */
export async function Hero() {
  const t = await getTranslations("hero");
  const tGallery = await getTranslations("gallery");

  return (
    <section className="relative flex min-h-[34rem] items-center overflow-hidden bg-ink pb-16 pt-28 sm:h-[78svh] sm:max-h-[50rem] sm:pb-12 lg:h-auto lg:max-h-none lg:flex-1">
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
        {/* Even wash, a little darker in the middle, keeps the centered title readable. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-ink/35 bg-[radial-gradient(ellipse_at_center,rgb(43_38_34/0.35),transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/40 to-transparent"
        />
      </div>

      <Container className="relative animate-fade-in-up">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center max-sm:pt-24">
          <h1 className="t-display text-white">{t("title")}</h1>
          <p className="balance mt-4 max-w-md text-lg leading-relaxed text-white/90 sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
