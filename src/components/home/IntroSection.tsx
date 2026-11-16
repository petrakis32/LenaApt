import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { homePhotos } from "@/config/gallery";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Edge-to-edge split: photo fills the left ~57% of the screen, text sits
 * on sand to its right. Stacks (photo first) on phones.
 */
export async function IntroSection() {
  const t = await getTranslations("home");
  const tGallery = await getTranslations("gallery");

  return (
    <section className="grid bg-cream-deep lg:grid-cols-[1.35fr_1fr]">
      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[30rem]">
        <Photo
          src={homePhotos.introLarge}
          alt={tGallery("categories.balcony-large")}
          sizes="(min-width: 1024px) 57vw, 100vw"
          position="50% 15%"
        />
      </div>

      <div className="flex items-center px-5 py-14 sm:px-10 lg:px-14 xl:px-20">
        <Reveal className="max-w-md">
          <p className="t-eyebrow">{t("introEyebrow")}</p>
          <h2 className="t-h2 balance mt-4 text-ink">{t("introTitle")}</h2>
          <p className="t-lead mt-5">{t("introLead")}</p>
          <Button href="/apartment" className="mt-8">
            {t("introCta")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
