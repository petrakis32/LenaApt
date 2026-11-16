import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { BookingForm } from "@/components/booking/BookingForm";
import { StepsStrip } from "@/components/booking/StepsStrip";
import { Notice } from "@/components/ui/Notice";
import { BookingDatesProvider } from "@/components/booking/BookingDatesContext";
import { AvailabilityCalendar } from "@/components/booking/AvailabilityCalendar";
import { getBookedDateRanges } from "@/config/availability";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/booking">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.booking" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/booking" },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function BookingPage({
  params,
}: PageProps<"/[locale]/booking">) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const tNav = await getTranslations("nav");
  const bookedRanges = await getBookedDateRanges();
  const hasChannels =
    siteConfig.channels.airbnbListingUrl || siteConfig.channels.bookingComListingUrl;

  return (
    <>
      <PageHero eyebrow={tNav("booking")} title={t("title")} body={t("intro")} />

      <Section background="cream" className="!pt-12 sm:!pt-14">
        <Container>
          <BookingDatesProvider bookedRanges={bookedRanges}>
            <StepsStrip />

            <Notice className="mt-10">{t("requestNotice")}</Notice>

            <div className="mt-6">
              <AvailabilityCalendar />
            </div>

            <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
              <div>
                <h2 className="t-h3 text-ink">{t("formTitle")}</h2>
                <div className="mt-6">
                  <BookingForm />
                </div>
              </div>

              <aside className="lg:sticky lg:top-28">
                <h2 className="t-h3 text-ink">{t("contactTitle")}</h2>
                <p className="mt-3 text-ink-soft">{t("contactIntro")}</p>
                <div className="mt-6">
                  <ContactLinks className="grid-cols-1 sm:grid-cols-1" />
                </div>

                {hasChannels ? (
                  <div className="mt-8">
                    <h3 className="t-eyebrow">{t("channelsTitle")}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{t("channelsNote")}</p>
                  </div>
                ) : null}
              </aside>
            </div>
          </BookingDatesProvider>
        </Container>
      </Section>
    </>
  );
}
