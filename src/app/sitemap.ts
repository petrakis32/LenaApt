import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

const paths = ["/", "/apartment", "/gallery", "/location", "/booking"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${siteConfig.url}${locale === routing.defaultLocale ? "" : `/${locale}`}${path === "/" ? "" : path}`,
        ])
      ),
    },
  }));
}
