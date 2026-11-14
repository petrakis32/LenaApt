import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FactStrip } from "@/components/property/FactStrip";
import { RoomShowcase } from "@/components/apartment/RoomShowcase";
import { FinalCta } from "@/components/home/FinalCta";
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
  const welcomeParagraph = t("about1");
  const interiorParagraph = t("about2");
  const philosophyParagraph = t("about3");
  const guestsParagraph = t("about4");
  const aboutImage = galleryImages.find((img) => img.id === "living-1")!;

  return (
    <>
      <PageHero title={t("title")} body={t("intro")} />

      <nav aria-label={t("jumpOverview")} className="border-b border-cream-line bg-cream">
        <Container className="flex gap-6 overflow-x-auto py-4 text-sm font-medium text-ink-soft">
          <a href="#about" className="shrink-0 transition-colors hover:text-terracotta">
            {t("jumpOverview")}
          </a>
          <a href="#rooms" className="shrink-0 transition-colors hover:text-terracotta">
            {t("roomsTitle")}
          </a>
          <a href="#amenities" className="shrink-0 transition-colors hover:text-terracotta">
            {tAmenities("title")}
          </a>
        </Container>
      </nav>

      <Section background="cream" className="pt-10 sm:pt-12">
        <Container>
          <FactStrip />
        </Container>
      </Section>

      <Section id="about" background="cream" className="scroll-mt-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {t("aboutTitle")}
            </h2>

            <div className="flex flex-col gap-2">
              <h3 className="font-display text-lg text-ink">{t("about1Heading")}</h3>
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                {welcomeParagraph}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-display text-lg text-ink">{t("about2Heading")}</h3>
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                {interiorParagraph}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-display text-lg text-ink">{t("about3Heading")}</h3>
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                {philosophyParagraph}
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lifted lg:aspect-[3/4] lg:sticky lg:top-24">
            <PropertyImage
              id={aboutImage.id}
              src={aboutImage.src}
              alt={tGallery(`categories.${aboutImage.category}`)}
              category={aboutImage.category}
              categoryLabel={tGallery(`categories.${aboutImage.category}`)}
              comingSoonLabel={tGallery("photoComingSoon")}
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
        </Container>
      </Section>

      <Section background="deep" className="pt-0">
        <Container className="max-w-2xl text-center">
          <span
            aria-hidden
            className="font-display text-6xl leading-none text-terracotta/30"
          >
            “
          </span>
          <p className="-mt-4 font-display text-xl leading-relaxed text-ink sm:text-2xl">
            {guestsParagraph}
          </p>
        </Container>
      </Section>

      <Section id="rooms" background="cream" className="scroll-mt-24 pt-0">
        <Container>
          <h2 className="mb-10 font-display text-2xl text-ink sm:text-3xl">
            {t("roomsTitle")}
          </h2>
        </Container>
        <RoomShowcase />
      </Section>

      <Section id="amenities" background="deep" className="scroll-mt-24">
        <Container className="mb-10">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            {tAmenities("title")}
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">{tAmenities("intro")}</p>
        </Container>
        <AmenitiesGrid />
      </Section>

      <FinalCta />
    </>
  );
}
