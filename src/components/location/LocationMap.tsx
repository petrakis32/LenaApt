import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LocationMapProps {
  title: string;
  className?: string;
  /** Half-width/height of the map bounding box, in degrees. */
  spread?: number;
}

/**
 * Embeds an OpenStreetMap view (no API key required) centred on the
 * owner's exact coordinates — decoded from their Google Plus Code,
 * see src/config/site.ts.
 */
export function LocationMap({ title, className, spread = 0.01 }: LocationMapProps) {
  const { lat, lng } =
    siteConfig.location.exactCoordinates ??
    siteConfig.location.approximateCoordinates;

  const bbox = [lng - spread, lat - spread, lng + spread, lat + spread].join(
    "%2C"
  );
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-card border border-cream-line shadow-soft sm:aspect-video",
        className
      )}
    >
      <iframe
        title={title}
        src={src}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
