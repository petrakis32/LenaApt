import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/routing";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingDatesProvider } from "@/components/booking/BookingDatesContext";
import { AvailabilityCalendar } from "@/components/booking/AvailabilityCalendar";
import { getBookedDateRanges } from "@/config/availability";
import { siteConfig } from "@/config/site";
import { Info } from "lucide-react";

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
  const bookedRanges = await getBookedDateRanges();
  const hasChannels =
    siteConfig.channels.airbnbListingUrl || siteConfig.channels.bookingComListingUrl;

  return (
    <>
      <PageHero title={t("title")} body={t("intro")} />

      <Section background="cream" className="pt-10 sm:pt-12">
        <Container>
          <BookingDatesProvider bookedRanges={bookedRanges}>
          <div
            className="flex items-start gap-3 rounded-2xl border border-aegean/25 bg-aegean-light px-5 py-4 text-sm text-aegean-dark"
            role="note"
          >
            <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{t("requestNotice")}</p>
          </div>

          <div className="mt-6">
            <AvailabilityCalendar />
          </div>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                {t("formTitle")}
              </h2>
              <div className="mt-6">
                <BookingForm />
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                {t("contactTitle")}
              </h2>
              <p className="mt-2 text-ink-soft">{t("contactIntro")}</p>
              <div className="mt-6">
                <ContactLinks className="grid-cols-1 sm:grid-cols-1" />
              </div>

              {hasChannels ? (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-faint">
                    {t("channelsTitle")}
                  </h3>
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
