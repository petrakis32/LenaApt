import { getTranslations } from "next-intl/server";
import { homePhotos } from "@/config/gallery";
import { Photo } from "@/components/media/Photo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Slim closing band: photo under an ink overlay, text left, button right.
 * The only dark block before the (light) footer; shared by Home, Apartment, Location.
 */
export async function BookingCta() {
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-24 lg:py-28">
      <Photo src={homePhotos.cta} alt="" sizes="100vw" position="50% 35%" />
      <div aria-hidden className="absolute inset-0 bg-ink/60" />
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="max-w-2xl">
            <h2 className="t-h2 text-white">{t("ctaTitle")}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              {t("ctaBody")}
            </p>
          </div>
          <Button href="/booking" size="lg" className="shrink-0">
            {t("ctaButton")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
