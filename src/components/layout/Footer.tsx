import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { primaryNav, bookingHref } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getGoogleMapsDirectionsUrl } from "@/lib/maps";
import { ContactLinks } from "@/components/contact/ContactLinks";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-8xl gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl text-white">
            Lena <span className="text-terracotta">Apt</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/80">
            {t("aboutBody")}
          </p>
          <a
            href={getGoogleMapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm text-cream/60 hover:text-white hover:underline"
          >
            {siteConfig.location.streetAddress
              ? `${siteConfig.location.streetAddress}, `
              : ""}
            {siteConfig.location.locality}, {siteConfig.location.region},{" "}
            {siteConfig.location.country}
          </a>
        </div>

        <div>
          <h2 className="font-display text-base text-white">
            {t("quickLinksTitle")}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/80 hover:text-white hover:underline"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={bookingHref}
                className="text-cream/80 hover:text-white hover:underline"
              >
                {tNav("booking")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-base text-white">
            {t("contactTitle")}
          </h2>
          <div className="mt-4">
            <ContactLinks variant="compact" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-8xl flex-col gap-2 px-5 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{t("rights", { year })}</p>
          <p>{t("craftedNote")}</p>
        </div>
      </div>
    </footer>
  );
}
