import { getFormatter, getTranslations } from "next-intl/server";
import { ArrowUpRight, Star } from "lucide-react";
import type { ReviewPlatform } from "@/config/reviews";
import { cn } from "@/lib/utils";
import { PlatformLogo, platformColor } from "./PlatformLogo";

/** Five solid stars, the first `value/max` of them in `color` (fractions included). */
function PartialStars({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className="h-5 w-5 shrink-0 fill-current" strokeWidth={0} />
  ));
  return (
    <span aria-hidden className="relative inline-flex">
      <span className="flex" style={{ color: "#c8ccd1" }}>
        {stars}
      </span>
      <span
        className="absolute inset-y-0 left-0 flex overflow-hidden"
        style={{ width: `${pct}%`, color }}
      >
        {stars}
      </span>
    </span>
  );
}

/**
 * Rating tile for one platform, with the score shown the way that platform
 * shows it (Google stars, Booking.com badge, Airbnb star). Shows "–" / "Coming soon" until the rating is
 * filled in `config/reviews.ts` (a rating without a review count simply shows no
 * count line); links to the platform when a `url` is set.
 */
export async function PlatformTile({ platform }: { platform: ReviewPlatform }) {
  const t = await getTranslations("reviews");
  const format = await getFormatter();
  const { name, rating, scale, count, url } = platform;
  const hasRating = typeof rating === "number";
  const shown = hasRating
    ? format.number(rating, { maximumFractionDigits: 1 })
    : "–";
  const color = platformColor(platform.id);
  const outOf = <span className="sr-only"> / {scale}</span>;

  // Each platform's own way of showing a score.
  let ratingBlock;
  if (platform.id === "booking") {
    // Booking.com: the score in a blue badge (square, one sharp corner).
    ratingBlock = (
      <span className="mt-3 flex items-center">
        <span
          className="flex h-9 min-w-9 items-center justify-center rounded-md rounded-bl-none px-1.5 text-base font-bold text-white"
          style={{ backgroundColor: hasRating ? color : "#c9c2b4" }}
        >
          {shown}
        </span>
        {outOf}
      </span>
    );
  } else if (platform.id === "airbnb") {
    // Airbnb: a solid dark star followed by the score.
    ratingBlock = (
      <span className="mt-3 flex items-center gap-1.5 text-[#222222]">
        <Star aria-hidden className="h-4 w-4 fill-current" strokeWidth={0} />
        <span className="text-xl font-semibold leading-none">{shown}</span>
        {outOf}
      </span>
    );
  } else {
    // Google: the score, then five yellow stars filled to the score.
    ratingBlock = (
      <span className="mt-3 flex items-center gap-2">
        <span className="text-2xl font-medium leading-none text-ink">
          {shown}
        </span>
        <PartialStars
          value={hasRating ? rating : 0}
          max={scale}
          color="#FBBC04"
        />
        {outOf}
      </span>
    );
  }

  const body = (
    <>
      <span className="flex items-center justify-between gap-2 text-sm font-medium text-ink">
        <span className="flex items-center gap-2">
          <PlatformLogo id={platform.id} className="h-5 w-5 shrink-0" />
          {name}
        </span>
        {url ? (
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 text-ink-faint"
            strokeWidth={1.5}
          />
        ) : null}
      </span>
      {ratingBlock}
      <span className="mt-2 block text-xs text-ink-faint">
        {typeof count === "number"
          ? t("count", { count })
          : hasRating
            ? null
            : t("soon")}
      </span>
    </>
  );

  const base =
    "block h-full rounded-card border border-t-[3px] border-cream-line bg-white p-4 shadow-soft";
  // Brand colour as a slim accent along the top edge of the tile.
  const accent = { borderTopColor: platformColor(platform.id) };

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("openOn", { platform: name })}
      className={cn(
        base,
        "transition-colors hover:border-x-ink/30 hover:border-b-ink/30",
      )}
      style={accent}
    >
      {body}
    </a>
  ) : (
    <div className={base} style={accent}>
      {body}
    </div>
  );
}
