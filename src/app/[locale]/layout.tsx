import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, resolveLocale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import "../globals.css";

// Display serif. Unlike Playfair Display, EB Garamond ships Greek glyphs, so
// Greek headings use the brand font instead of a system fallback.
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin", "latin-ext", "greek", "greek-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "greek"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      template: t("titleTemplate"),
      default: t("defaultTitle"),
    },
    description: t("defaultDescription"),
    alternates: {
      languages: {
        en: "/en",
        el: "/el",
      },
    },
    openGraph: {
      siteName: siteConfig.name,
      type: "website",
      locale,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${garamond.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <NextIntlClientProvider locale={locale}>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileBookBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
