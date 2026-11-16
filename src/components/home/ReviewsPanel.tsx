import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { getFeaturedReviews, reviewPlatforms } from "@/config/reviews";
import { Button } from "@/components/ui/Button";
import { PlatformTile } from "@/components/reviews/PlatformTile";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewsPlaceholder } from "@/components/reviews/ReviewsPlaceholder";

/**
 * Left half of the home "reviews + location" section, centered in its half: one rating tile per
 * platform, 1–2 featured quotes and a button to the full reviews on the
 * Explore page. All data comes from `config/reviews.ts`.
 */
export async function ReviewsPanel() {
  const t = await getTranslations("reviews");
  const featured = getFeaturedReviews();

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <p className="t-eyebrow self-start">{t("eyebrow")}</p>
      {/* Only the eyebrow is visible (the heading is just for screen readers). */}
      <h2 className="sr-only">{t("title")}</h2>

      <ul className="mt-5 grid w-full gap-3 text-left sm:grid-cols-3">
        {reviewPlatforms.map((platform) => (
          <li key={platform.id}>
            <PlatformTile platform={platform} />
          </li>
        ))}
      </ul>

      <div className="mt-6 grid w-full gap-3 text-left">
        {featured.length > 0 ? (
          featured.map((review) => (
            <ReviewCard
              key={`${review.platform}-${review.author}`}
              review={review}
            />
          ))
        ) : (
          <ReviewsPlaceholder />
        )}
      </div>

      <Button href="/explore#reviews" variant="secondary" className="mt-7">
        {t("cta")}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Button>
    </div>
  );
}
