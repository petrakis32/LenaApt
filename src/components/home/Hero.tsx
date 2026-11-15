import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { heroImage } from "@/config/gallery";
import { PropertyImage } from "@/components/media/PropertyImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export async function Hero() {
  const t = await getTranslations("hero");
  const tGallery = await getTranslations("gallery");

  return (
    <section className="relative flex min-h-[88svh] flex-col overflow-hidden bg-ink">
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
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10"
        />
      </div>

      <Container className="relative flex flex-1 animate-fade-in-up flex-col items-center text-center">
        {/* Title sits at the top of the hero, below the fixed header. */}
        <h1 className="balance pt-24 font-display text-5xl leading-[1.04] tracking-[-0.02em] text-white sm:pt-28 sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>

        {/* Tagline + buttons are centred in the remaining space. */}
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <p className="balance max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button href="/booking" size="lg">
              {t("primaryCta")}
            </Button>
            <Button href="/apartment" size="lg" variant="outline">
              {t("secondaryCta")}
            </Button>
          </div>
        </div>
      </Container>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-5 hidden justify-center sm:flex"
      >
        <span className="flex flex-col items-center gap-1 text-xs text-white/70">
          {t("scrollHint")}
          <ChevronDown className="h-4 w-4 animate-scroll-hint" />
        </span>
      </div>
    </section>
  );
}
