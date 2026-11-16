import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";

/** Shown instead of review cards until real reviews are added to config/reviews.ts. */
export async function ReviewsPlaceholder() {
  const t = await getTranslations("reviews");

  return (
    <div className="flex items-start gap-3 rounded-card border border-dashed border-cream-line bg-cream/60 p-5">
      <Quote
        aria-hidden
        className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-dark/70"
        strokeWidth={1.5}
      />
      <p className="text-sm leading-relaxed text-ink-faint">
        {t("placeholder")}
      </p>
    </div>
  );
}
