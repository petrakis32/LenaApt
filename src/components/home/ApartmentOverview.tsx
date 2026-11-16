import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { homePhotos } from "@/config/gallery";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * "Our apartment": short text + gallery button on the left, three photos
 * butted together on the right that fill the section from top to bottom
 * and run to the screen edge (like the intro split above).
 */
export async function ApartmentOverview() {
  const t = await getTranslations("home");

  const spaces = [
    { key: "bedrooms", src: homePhotos.spaces.bedrooms, position: "50% 60%" },
    { key: "living", src: homePhotos.spaces.living, position: "50% 50%" },
    { key: "balconies", src: homePhotos.spaces.balconies, position: "50% 40%" },
  ] as const;

  return (
    <section className="grid bg-cream lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)]">
      {/* Left padding lines the text up with the page container on wide screens. */}
      <div className="flex items-center px-5 py-14 sm:px-8 lg:py-16 lg:pl-[max(3rem,calc((100vw-96rem)/2+3rem))] lg:pr-10">
        <Reveal>
          <h2 className="t-h2 balance text-ink">{t("overviewTitle")}</h2>
          <p className="t-lead mt-4 max-w-sm">{t("overviewLead")}</p>
          <Button href="/gallery" variant="secondary" className="mt-7">
            {t("galleryCta")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 sm:min-h-[26rem] sm:grid-cols-3 lg:min-h-[30rem]">
        {spaces.map(({ key, src, position }, i) => (
          <Reveal
            key={key}
            delay={i * 90}
            className={cn("sm:h-full", i === 0 && "col-span-2 sm:col-span-1")}
          >
            <Link
              href="/apartment#rooms"
              className={cn(
                "group relative block overflow-hidden sm:h-full",
                i === 0 ? "aspect-[16/10] sm:aspect-auto" : "aspect-[4/5] sm:aspect-auto"
              )}
            >
              <Photo
                src={src}
                alt=""
                position={position}
                sizes="(min-width: 1024px) 37vw, (min-width: 640px) 33vw, 100vw"
                className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/60 to-transparent"
              />
              <span className="absolute bottom-4 left-4 text-sm font-medium text-white">
                {t(`spaces.${key}`)}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
