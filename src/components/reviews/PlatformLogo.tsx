import { siAirbnb, siBookingdotcom, siGoogle } from "simple-icons";
import type { ReviewPlatformId } from "@/config/reviews";

/**
 * Brand mark + brand colour of each review platform (logo paths and colours
 * from the `simple-icons` package; the marks are the platforms' trademarks and
 * are used only to identify where a rating comes from and link to it).
 */
const brands: Record<ReviewPlatformId, { path: string; color: string }> = {
  google: { path: siGoogle.path, color: `#${siGoogle.hex}` },
  booking: { path: siBookingdotcom.path, color: `#${siBookingdotcom.hex}` },
  airbnb: { path: siAirbnb.path, color: `#${siAirbnb.hex}` },
};

export function platformColor(id: ReviewPlatformId) {
  return brands[id].color;
}

/** The platform's logo mark in its brand colour (decorative: the name sits beside it). */
export function PlatformLogo({
  id,
  className,
}: {
  id: ReviewPlatformId;
  className?: string;
}) {
  const { path, color } = brands[id];
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill={color}
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
