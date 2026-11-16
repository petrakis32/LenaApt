import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { OsmEmbed } from "./OsmEmbed";

interface LocationMapProps {
  title: string;
  className?: string;
  /** Half-height of the visible area, in degrees of latitude. */
  spread?: number;
}

/**
 * Embeds an OpenStreetMap view (no API key required) centred on the
 * owner's exact coordinates — decoded from their Google Plus Code,
 * see src/config/site.ts. `OsmEmbed` sizes the visible area to the frame.
 */
export function LocationMap({ title, className, spread = 0.014 }: LocationMapProps) {
  const { lat, lng } =
    siteConfig.location.exactCoordinates ??
    siteConfig.location.approximateCoordinates;

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-card border border-cream-line shadow-soft sm:aspect-video",
        className
      )}
    >
      <OsmEmbed title={title} lat={lat} lng={lng} spread={spread} />
    </div>
  );
}
