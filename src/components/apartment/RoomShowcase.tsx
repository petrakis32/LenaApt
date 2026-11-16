import { getTranslations } from "next-intl/server";
import { galleryImages, type GalleryCategory } from "@/config/gallery";
import { bedrooms } from "@/config/property";
import { PropertyImage } from "@/components/media/PropertyImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type RoomKey =
  | "bedroom-1"
  | "bedroom-2"
  | "living"
  | "bathroom"
  | "balcony-large"
  | "balcony-small";

const rooms: { key: RoomKey; imageId: string; category: GalleryCategory }[] = [
  { key: "bedroom-1", imageId: "bedroom-1-3", category: "bedroom-1" },
  { key: "bedroom-2", imageId: "bedroom-2-1", category: "bedroom-2" },
  { key: "living", imageId: "living-2", category: "living" },
  { key: "bathroom", imageId: "bathroom-1", category: "bathroom" },
  { key: "balcony-large", imageId: "balcony-large-5", category: "balcony-large" },
  { key: "balcony-small", imageId: "balcony-small-1", category: "balcony-small" },
];

const chip =
  "rounded-full border border-cream-line bg-white px-4 py-1.5 text-sm font-medium text-ink-soft";

export async function RoomShowcase() {
  const t = await getTranslations("apartment");
  const tGallery = await getTranslations("gallery");

  return (
    <Container className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
      {rooms.map((room, index) => {
        const image = galleryImages.find((img) => img.id === room.imageId)!;
        const reversed = index % 2 === 1;
        const bedroomConfig =
          room.key === "bedroom-1" || room.key === "bedroom-2"
            ? bedrooms.find((b) => b.id === room.key)
            : undefined;

        return (
          <Reveal
            key={room.key}
            className={cn(
              "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
              reversed && "lg:[&>*:first-child]:order-2"
            )}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              <PropertyImage
                id={image.id}
                src={image.src}
                alt={t(`rooms.${room.key}.title`)}
                category={image.category}
                categoryLabel={tGallery(`categories.${image.category}`)}
                comingSoonLabel={tGallery("photoComingSoon")}
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
            <div className="max-w-lg">
              <h3 className="t-h3 text-ink">{t(`rooms.${room.key}.title`)}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {t(`rooms.${room.key}.description`)}
              </p>
              {bedroomConfig ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {bedroomConfig.beds.map((bed) => (
                    <li key={bed.type} className={chip}>
                      {t(`bedsSummary.${bed.type}`, { count: bed.count })}
                    </li>
                  ))}
                </ul>
              ) : null}
              {room.key === "living" ? (
                <p className={cn(chip, "mt-5 inline-block")}>{t("sofaBedNote")}</p>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </Container>
  );
}
