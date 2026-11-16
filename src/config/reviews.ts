/**
 * Guest ratings and reviews. Used by the home page "reviews + location"
 * band (1–2 featured quotes) and by the Explore page (everything).
 *
 * Everything here is real data supplied by the owner — nothing is invented.
 * Until a value is filled in, the pages show a neutral "coming soon" state
 * for it (and hide what can't be shown), so you can fill this in gradually:
 *
 *  - platform `rating` / `count`: the score and number of reviews, as shown
 *    on that platform (Google and Airbnb use a 5-point scale, Booking.com 10).
 *  - platform `url`: the public listing/profile page (public info, not a secret).
 *    The rating tile becomes a link to it, which is where guests read the rest.
 *  - `reviews`: short quotes, copied verbatim (original language), with the
 *    guest's permission or at least their displayed name. Mark the 1–2 best
 *    with `featured: true` for the home page (otherwise the first two are used).
 */

export type ReviewPlatformId = "google" | "booking" | "airbnb";

export interface ReviewPlatform {
  id: ReviewPlatformId;
  /** Brand name, shown as-is in every language. */
  name: string;
  /** Maximum score on this platform. */
  scale: 5 | 10;
  /** The score, e.g. 4.9 (leave undefined until known). */
  rating?: number;
  /** Total number of reviews on the platform. */
  count?: number;
  /** Public page for this listing, e.g. "https://www.airbnb.com/rooms/…". */
  url?: string;
}

export const reviewPlatforms: ReviewPlatform[] = [
  { id: "google", name: "Google", scale: 5, rating: 4.8 },
  { id: "booking", name: "Booking.com", scale: 10, rating: 10 },
  { id: "airbnb", name: "Airbnb", scale: 5 },
];

export interface Review {
  /** Guest's displayed name, e.g. "Maria, Greece". */
  author: string;
  platform: ReviewPlatformId;
  /** The quote, verbatim. */
  text: string;
  /** Optional, e.g. "August 2025". */
  date?: string;
  /** Show on the home page (max 2 are shown there). */
  featured?: boolean;
}

export const reviews: Review[] = [];

/** The 1–2 reviews for the home page. */
export function getFeaturedReviews(): Review[] {
  const flagged = reviews.filter((r) => r.featured);
  return (flagged.length > 0 ? flagged : reviews).slice(0, 2);
}
