import { getTranslations } from "next-intl/server";
import { amenities, type AmenityCategory } from "@/config/amenities";
import { Container } from "@/components/ui/Container";
import { asLooseT } from "@/lib/i18n";

const categoryOrder: AmenityCategory[] = ["essentials", "kitchen", "comfort"];

/** Amenities in three hairline columns, grouped by category. */
export async function AmenitiesGrid() {
  const t = await getTranslations("amenities");
  const tItem = asLooseT(t);

  return (
    <Container className="grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
      {categoryOrder.map((category) => {
        const items = amenities.filter((a) => a.category === category);
        if (items.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="t-eyebrow">{t(`categories.${category}`)}</h3>
            <ul className="mt-5 divide-y divide-cream-line border-y border-cream-line">
              {items.map(({ id, icon: Icon }) => (
                <li key={id} className="flex items-start gap-4 py-5">
                  <Icon
                    aria-hidden
                    className="mt-0.5 h-6 w-6 shrink-0 text-terracotta-dark"
                    strokeWidth={1.4}
                  />
                  <div>
                    <p className="font-medium text-ink">{tItem(`items.${id}.title`)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {tItem(`items.${id}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Container>
  );
}
