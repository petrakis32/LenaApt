import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export async function FinalCta() {
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-center sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #c1622e 0%, transparent 45%), radial-gradient(circle at 80% 80%, #1f5c6b 0%, transparent 45%)",
        }}
      />
      <Container className="relative">
        <h2 className="balance mx-auto max-w-2xl font-display text-4xl leading-[1.08] tracking-[-0.01em] text-white sm:text-5xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
          {t("ctaBody")}
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/booking" size="lg">
            {t("ctaButton")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
