"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { galleryImages, type GalleryCategory } from "@/config/gallery";
import { PropertyImage } from "@/components/media/PropertyImage";
import { Lightbox } from "./Lightbox";
import { cn } from "@/lib/utils";

const categories: GalleryCategory[] = [
  "living",
  "bedroom-1",
  "bedroom-2",
  "bathroom",
  "balcony-large",
  "balcony-small",
  "exterior",
  "view",
];

export function GalleryGrid() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const usedCategories = categories.filter((c) =>
    galleryImages.some((img) => img.category === c)
  );

  const filtered =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const tab = (active: boolean) =>
    cn(
      "shrink-0 border-b-2 py-4 text-sm font-medium transition-colors",
      active
        ? "border-terracotta text-ink"
        : "border-transparent text-ink-soft hover:text-ink"
    );

  return (
    <div>
      {/* Filter tabs: stay under the header while the photos scroll. */}
      <div
        className="sticky top-[4.5rem] z-30 -mx-5 border-b border-cream-line bg-cream/95 px-5 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
      >
        <div
          className="flex gap-7 overflow-x-auto"
          role="group"
          aria-label={t("title")}
        >
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            aria-pressed={activeCategory === "all"}
            className={tab(activeCategory === "all")}
          >
            {t("filterAll")}
          </button>
          {usedCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={tab(activeCategory === category)}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry: every photo keeps its real shape (no cropped portraits). */}
      <div className="mt-8 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        {filtered.map((image) => {
          const globalIndex = galleryImages.findIndex((i) => i.id === image.id);
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setLightboxIndex(globalIndex)}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-card sm:mb-4"
              style={{ aspectRatio: image.ratio ?? 4 / 3 }}
              aria-label={t(`categories.${image.category}`)}
            >
              <PropertyImage
                id={image.id}
                src={image.src}
                alt={t(`categories.${image.category}`)}
                category={image.category}
                categoryLabel={t(`categories.${image.category}`)}
                comingSoonLabel={t("photoComingSoon")}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </div>
  );
}
