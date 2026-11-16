import { getTranslations } from "next-intl/server";
import { propertyFacts } from "@/config/property";

/** One quiet row of key numbers (no icon boxes). Data from config/property. */
export async function FactsLine() {
  const t = await getTranslations("apartment");

  const facts = [
    { label: t("factsLabels.bedrooms"), value: propertyFacts.bedroomCount },
    { label: t("factsLabels.beds"), value: propertyFacts.bedCount },
    { label: t("factsLabels.bathrooms"), value: propertyFacts.bathroomCount },
    { label: t("factsLabels.balconies"), value: propertyFacts.balconyCount },
    // "Sleeps up to" reads before its number, so its label goes on top.
    { label: t("factsLabels.maxGuests"), value: propertyFacts.maxGuests, labelFirst: true },
  ];

  return (
    <dl className="grid grid-cols-3 gap-x-6 gap-y-6 border-t border-cream-line pt-7 sm:grid-cols-5">
      {facts.map(({ label, value, labelFirst }) => (
        <div key={label} className="flex flex-col">
          <dd className="font-display text-4xl leading-none tabular-nums text-ink">{value}</dd>
          <dt
            className={
              labelFirst
                ? "order-first mb-2 text-sm leading-snug text-ink-soft"
                : "mt-2 text-sm leading-snug text-ink-soft"
            }
          >
            {label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
