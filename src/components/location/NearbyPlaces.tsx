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

export async function NearbyPlaces() {
  const t = await getTranslations("location");

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {poiCategoryOrder.map((category) => {
        const Icon = categoryIcons[category];
        const items = pointsOfInterest[category];

        return (
          <div
            key={category}
            className="rounded-2xl border border-cream-line bg-white p-6 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-light text-terracotta">
                <Icon aria-hidden className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="font-display text-lg text-ink">
                {t(`categories.${category}`)}
              </h3>
            </div>

            {items.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item.name} className="text-sm text-ink-soft">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink hover:text-terracotta hover:underline"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{item.name}</span>
                    )}
                    {item.distance ? (
                      <span className="text-ink-faint"> — {item.distance}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm italic text-ink-faint">
                {t("emptyCategory")}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
