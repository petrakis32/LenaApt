import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { homePhotos } from "@/config/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SpacesShowcase, type Space } from "./SpacesShowcase";

/**
 * "Our apartment": a title with soft lines, then only the gallery button on the left, four photos
 * butted together on the right that fill the section from top to bottom and
 * run to the screen edge. On desktop, hovering a photo opens a text panel
 * beside it (see SpacesShowcase). Room text reuses the apartment page copy.
 */
export async function ApartmentOverview() {
  const t = await getTranslations("home");
  const tApt = await getTranslations("apartment");

  const href = "/apartment#rooms";
  const spaces: Space[] = [
    {
      key: "bedrooms",
      href,
      src: homePhotos.spaces.bedrooms,
      position: "50% 60%",
      title: t("spaces.bedrooms"),
      paragraphs: [
        tApt("rooms.bedroom-1.description"),
        tApt("rooms.bedroom-2.description"),
      ],
    },
    {
      key: "living",
      href,
      src: homePhotos.spaces.living,
      position: "50% 50%",
      title: t("spaces.living"),
      paragraphs: [tApt("rooms.living.description")],
    },
    {
      key: "balconies",
      href,
      src: homePhotos.spaces.balconies,
      position: "50% 40%",
      title: t("spaces.balconies"),
      paragraphs: [
        tApt("rooms.balcony-large.description"),
        tApt("rooms.balcony-small.description"),
      ],
    },
    {
      key: "bathroom",
      href,
      src: homePhotos.spaces.bathroom,
      position: "50% 50%",
      title: t("spaces.bathroom"),
      paragraphs: [tApt("rooms.bathroom.description")],
    },
  ];
  // Balconies and bathroom share the last column, one above the other.
  const [bedrooms, living, balconies, bathroom] = spaces;
  const columns: Space[][] = [[bedrooms], [living], [balconies, bathroom]];

  return (
    <>
      {/* Section title with soft hairlines fading out to the sides; the breathing room above
          separates it from the intro block, the room below from the photo row. */}
      <div className="bg-cream px-5 pb-6 pt-5 sm:px-8 sm:pt-6 lg:pb-7 lg:pt-6">
        <Reveal className="mx-auto flex max-w-5xl items-center gap-5 sm:gap-8">
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-transparent to-ink/30"
          />
          <h2 className="t-h2 text-center text-ink">{t("overviewTitle")}</h2>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-l from-transparent to-ink/30"
          />
        </Reveal>
      </div>

      <section className="grid bg-cream lg:grid-cols-[minmax(0,0.5fr)_minmax(0,2.5fr)]">
        {/* Narrow column: just wide enough for the button, centered in it. */}
        <div className="flex items-center justify-center px-5 py-14 text-center sm:px-8 lg:px-4 lg:py-16">
          <Reveal>
            <Button href="/gallery" variant="secondary">
              {t("galleryCta")}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <SpacesShowcase columns={columns} />
      </section>
    </>
  );
}
