import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { PageHero } from "@/components/ui/PageHero";
import { PinnedAbout } from "@/components/apartment/PinnedAbout";
import { StickySubNav } from "@/components/apartment/StickySubNav";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomShowcase } from "@/components/apartment/RoomShowcase";
import { BookingCta } from "@/components/home/BookingCta";
import { PropertyImage } from "@/components/media/PropertyImage";
import { galleryImages } from "@/config/gallery";
import { AmenitiesGrid } from "@/components/amenities/AmenitiesGrid";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/apartment">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.apartment" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/apartment" },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function ApartmentPage({
  params,
}: PageProps<"/[locale]/apartment">) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("apartment");
  const tGallery = await getTranslations("gallery");
  const tAmenities = await getTranslations("amenities");
  const aboutImage = galleryImages.find((img) => img.id === "living-1")!;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        body={t("intro")}
        // Order = left to right, top to bottom (first row, then second row).
        collage={[
          { src: "/images/gallery/bedroom-1/img_20210714_153436.jpg" }, // 1 large (double) bedroom
          { src: "/images/gallery/hall-kitchen/img_20210714_165422.jpg" }, // 2 kitchen
          { src: "/images/gallery/balcony-1/slide2.jpg" }, // 3 small balcony
          { src: "/images/gallery/hall-kitchen/img_20210714_165407.jpg" }, // 4 two chairs
          { src: "/images/gallery/balcony-2/img_20210714_161505.jpg" }, // 5 large balcony
          { src: "/images/gallery/bathroom/img_20210714_160356.jpg" }, // 6 bathroom
          { src: "/images/gallery/bedroom-2/img_20210714_155319.jpg" }, // 7 small (twin) bedroom
          { src: "/images/gallery/hall-kitchen/img_20210714_165518.jpg" }, // 8 living room, red sofa
        ]}
      />

      <StickySubNav
        label={t("jumpOverview")}
        items={[
          { id: "about", label: t("jumpOverview") },
          { id: "rooms", label: t("roomsTitle") },
          { id: "amenities", label: tAmenities("title") },
        ]}
      />

      <Section id="about" background="cream" className="scroll-mt-36">
        <Container>
          <PinnedAbout
            media={
              <PropertyImage
                id={aboutImage.id}
                src={aboutImage.src}
                alt={tGallery(`categories.${aboutImage.category}`)}
                category={aboutImage.category}
                categoryLabel={tGallery(`categories.${aboutImage.category}`)}
                comingSoonLabel={tGallery("photoComingSoon")}
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            }
          >
            <div className="flex flex-col gap-9">
              <h2 className="t-h2 text-ink">{t("aboutTitle")}</h2>

              {(
                [
                  ["about1Heading", "about1"],
                  ["about2Heading", "about2"],
                  ["about3Heading", "about3"],
                ] as const
              ).map(([heading, body]) => (
                <div key={heading} className="flex flex-col gap-3">
                  <h3 className="t-h3 text-ink">{t(heading)}</h3>
                  <p className="t-lead">{t(body)}</p>
                </div>
              ))}
            </div>
          </PinnedAbout>
        </Container>
      </Section>

      <Section background="deep" className="!py-16 sm:!py-20">
        <Container className="max-w-3xl text-center">
          <p className="font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
            “{t("about4")}”
          </p>
        </Container>
      </Section>

      <Section id="rooms" background="cream" className="scroll-mt-36">
        <Container className="mb-14">
          <SectionHeading title={t("roomsTitle")} />
        </Container>
        <RoomShowcase />
      </Section>

      <Section id="amenities" background="deep" className="scroll-mt-36">
        <Container className="mb-14">
          <SectionHeading title={tAmenities("title")} body={tAmenities("intro")} />
        </Container>
        <AmenitiesGrid />
      </Section>

      <BookingCta />
    </>
  );
}
