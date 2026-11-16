import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BookingCta } from "@/components/home/BookingCta";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.gallery" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/gallery" },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function GalleryPage({
  params,
}: PageProps<"/[locale]/gallery">) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero eyebrow={tNav("gallery")} title={t("title")} body={t("intro")} />
      <Section background="cream" className="!pt-0">
        <Container>
          <GalleryGrid />
        </Container>
      </Section>
      <BookingCta />
    </>
  );
}
