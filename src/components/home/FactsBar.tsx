import { getTranslations } from "next-intl/server";
import { AirVent, Bath, BedDouble, BedSingle, Users, Wifi } from "lucide-react";
import { propertyFacts } from "@/config/property";
import { Container } from "@/components/ui/Container";

/**
 * Slim icon strip right under the hero: key numbers + two headline amenities.
 * Numbers come from config/property; Wi-Fi and A/C match config/amenities.
 */
export async function FactsBar() {
  const t = await getTranslations("home.facts");

  const items = [
    { icon: BedDouble, label: t("bedrooms", { count: propertyFacts.bedroomCount }) },
    { icon: BedSingle, label: t("beds", { count: propertyFacts.bedCount }) },
    { icon: Bath, label: t("bathrooms", { count: propertyFacts.bathroomCount }) },
    { icon: Users, label: t("guests", { count: propertyFacts.maxGuests }) },
    { icon: Wifi, label: t("wifi") },
    { icon: AirVent, label: t("ac") },
  ];

  return (
    <section className="border-b border-cream-line bg-cream">
      <Container>
        <ul className="grid grid-cols-2 gap-y-px sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-cream-line">
          {items.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 px-2 py-4 max-sm:justify-start sm:justify-center lg:py-6"
            >
              <Icon
                aria-hidden
                className="h-6 w-6 shrink-0 text-terracotta-dark"
                strokeWidth={1.4}
              />
              <span className="text-sm font-medium text-ink">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
