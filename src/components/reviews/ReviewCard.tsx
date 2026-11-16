import { Quote } from "lucide-react";
import { reviewPlatforms, type Review } from "@/config/reviews";
import { PlatformLogo } from "./PlatformLogo";

/** One guest quote: text, then "Name · Platform · Date". */
export function ReviewCard({ review }: { review: Review }) {
  const platform =
    reviewPlatforms.find((p) => p.id === review.platform)?.name ??
    review.platform;

  return (
    <figure className="rounded-card bg-white p-5 shadow-soft">
      <Quote
        aria-hidden
        className="h-5 w-5 text-terracotta-dark"
        strokeWidth={1.5}
      />
      <blockquote className="mt-2 text-sm leading-relaxed text-ink-soft">
        {review.text}
      </blockquote>
      <figcaption className="mt-3 text-sm font-medium text-ink">
        {review.author}
        <span className="font-normal text-ink-faint">
          {" · "}
          <PlatformLogo
            id={review.platform}
            className="mr-1 inline-block h-3.5 w-3.5 align-[-0.15em]"
          />
          {platform}
          {review.date ? ` · ${review.date}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}
