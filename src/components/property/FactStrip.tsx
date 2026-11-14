import { BedDouble, Bed, Bath, Sun, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { propertyFacts } from "@/config/property";
import { cn } from "@/lib/utils";

interface FactStripProps {
  className?: string;
  tone?: "default" | "inverted";
}

export async function FactStrip({
  className,
  tone = "default",
}: FactStripProps) {
  const t = await getTranslations("apartment");

  const facts = [
    { icon: BedDouble, label: t("factsLabels.bedrooms"), value: propertyFacts.bedroomCount },
    { icon: Bed, label: t("factsLabels.beds"), value: propertyFacts.bedCount },
    { icon: Bath, label: t("factsLabels.bathrooms"), value: propertyFacts.bathroomCount },
    { icon: Sun, label: t("factsLabels.balconies"), value: propertyFacts.balconyCount },
    { icon: Users, label: t("factsLabels.maxGuests"), value: propertyFacts.maxGuests },
  ];

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 sm:grid-cols-5",
        tone === "inverted" ? "border-white/15" : "border-cream-line",
        className
      )}
    >
      {facts.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3">
          <Icon
            aria-hidden
            className={cn(
              "h-[18px] w-[18px] shrink-0",
              tone === "inverted" ? "text-gold" : "text-terracotta"
            )}
            strokeWidth={1.75}
          />
          <div className="flex items-baseline gap-1.5">
            <dd
              className={cn(
                "font-display text-2xl leading-none tabular-nums",
                tone === "inverted" ? "text-white" : "text-ink"
              )}
            >
              {value}
            </dd>
            <dt
              className={cn(
                "text-sm leading-none",
                tone === "inverted" ? "text-cream/70" : "text-ink-soft"
              )}
            >
              {label}
            </dt>
          </div>
        </div>
      ))}
    </dl>
  );
}
