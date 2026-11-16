import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // The Location page was merged into Explore; keep old links/bookmarks/SEO working.
    return [
      { source: "/location", destination: "/explore#location", permanent: true },
      { source: "/el/location", destination: "/el/explore#location", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
