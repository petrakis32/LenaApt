import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { primaryNav, bookingHref } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getGoogleMapsDirectionsUrl } from "@/lib/maps";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { ContactLinks } from "@/components/contact/ContactLinks";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-line bg-cream-deep pb-24 text-ink lg:pb-0">
      <Container className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
            {t("aboutBody")}
          </p>
          <a
            href={getGoogleMapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-ink-soft underline decoration-cream-line decoration-2 underline-offset-4 hover:text-terracotta-dark hover:decoration-terracotta"
          >
            {siteConfig.location.streetAddress
              ? `${siteConfig.location.streetAddress}, `
              : ""}
            {siteConfig.location.locality}, {siteConfig.location.region},{" "}
            {siteConfig.location.country}
          </a>
        </div>

        <nav aria-label={t("quickLinksTitle")}>
          <p className="t-eyebrow">{t("quickLinksTitle")}</p>
          <ul className="mt-5 space-y-3 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-soft transition-colors hover:text-terracotta-dark"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={bookingHref}
                className="text-ink-soft transition-colors hover:text-terracotta-dark"
              >
                {tNav("booking")}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="t-eyebrow">{t("contactTitle")}</p>
          <div className="mt-5">
            <ContactLinks variant="compact" />
          </div>
        </div>
      </Container>

      <div className="border-t border-cream-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year })}</p>
          <p>{t("craftedNote")}</p>
        </Container>
      </div>
    </footer>
  );
}
