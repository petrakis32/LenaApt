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
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">(
    "all"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const usedCategories = categories.filter((c) =>
    galleryImages.some((img) => img.category === c)
  );

  const filtered =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("title")}>
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === "all"
              ? "border-terracotta bg-terracotta text-white"
              : "border-cream-line bg-white text-ink-soft hover:border-terracotta/50"
          )}
        >
          {t("filterAll")}
        </button>
        {usedCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category
                ? "border-terracotta bg-terracotta text-white"
                : "border-cream-line bg-white text-ink-soft hover:border-terracotta/50"
            )}
          >
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>

      <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[260px] lg:grid-cols-4">
        {filtered.map((image) => {
          const globalIndex = galleryImages.findIndex((i) => i.id === image.id);
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setLightboxIndex(globalIndex)}
              className={cn(
                "group relative overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2",
                image.wide && "col-span-2"
              )}
              aria-label={t(`categories.${image.category}`)}
            >
              <PropertyImage
                id={image.id}
                src={image.src}
                alt={t(`categories.${image.category}`)}
                category={image.category}
                categoryLabel={t(`categories.${image.category}`)}
                comingSoonLabel={t("photoComingSoon")}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="transition-transform duration-500 ease-out group-hover:scale-105"
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
