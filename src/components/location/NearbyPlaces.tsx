import { getTranslations } from "next-intl/server";
import { Waves, UtensilsCrossed, Coffee, ShoppingCart, Landmark } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pointsOfInterest, poiCategoryOrder, type POICategory } from "@/config/location";

const categoryIcons: Record<POICategory, LucideIcon> = {
  beaches: Waves,
  restaurants: UtensilsCrossed,
  cafes: Coffee,
  supermarkets: ShoppingCart,
  attractions: Landmark,
};

/**
 * Nearby places as quiet hairline lists. Categories with no entries yet are
 * left out (instead of showing "coming soon" boxes) and appear automatically
 * once real places are added to config/location.ts.
 */
export async function NearbyPlaces() {
  const t = await getTranslations("location");

  const filled = poiCategoryOrder.filter((c) => pointsOfInterest[c].length > 0);

  return (
    <div className="grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {filled.map((category) => {
        const Icon = categoryIcons[category];
        const items = pointsOfInterest[category];

        return (
          <div key={category}>
            <div className="flex items-center gap-3">
              <Icon
                aria-hidden
                className="h-6 w-6 text-terracotta-dark"
                strokeWidth={1.5}
              />
              <h3 className="font-display text-2xl text-ink">
                {t(`categories.${category}`)}
              </h3>
            </div>

            <ul className="mt-5 border-t border-cream-line">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-4 border-b border-cream-line py-3.5 text-sm"
                >
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink hover:text-terracotta-dark hover:underline"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="font-medium text-ink">{item.name}</span>
                  )}
                  {item.distance ? (
                    <span className="shrink-0 text-ink-soft">{item.distance}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
