import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-36 text-center">
      <p className="t-eyebrow">404</p>
      <h1 className="t-h1 mt-4 text-ink">{t("title")}</h1>
      <p className="t-lead mt-5 max-w-md">{t("body")}</p>
      <div className="mt-9">
        <Button href="/">{t("cta")}</Button>
      </div>
    </Container>
  );
}
