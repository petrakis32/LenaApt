import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">{t("body")}</p>
      <div className="mt-8">
        <Button href="/">{t("cta")}</Button>
      </div>
    </Container>
  );
}
