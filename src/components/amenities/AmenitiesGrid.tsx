import { getTranslations } from "next-intl/server";
import { amenities, type AmenityCategory } from "@/config/amenities";
import { Container } from "@/components/ui/Container";
import { asLooseT } from "@/lib/i18n";

const categoryOrder: AmenityCategory[] = ["essentials", "kitchen", "comfort"];

export async function AmenitiesGrid() {
  const t = await getTranslations("amenities");
  const tItem = asLooseT(t);

  return (
    <Container className="flex flex-col gap-14">
      {categoryOrder.map((category) => {
        const items = amenities.filter((a) => a.category === category);
        if (items.length === 0) return null;

        return (
          <div key={category}>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {t(`categories.${category}`)}
            </h2>
            <div className="mt-6 divide-y divide-cream-line border-t border-cream-line">
              {items.map(({ id, icon: Icon }) => (
                <div key={id} className="flex items-start gap-5 py-5">
                  <Icon
                    aria-hidden
                    className="mt-0.5 h-6 w-6 shrink-0 text-olive"
                    strokeWidth={1.4}
                  />
                  <div>
                    <p className="font-display text-lg text-ink">
                      {tItem(`items.${id}.title`)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {tItem(`items.${id}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Container>
  );
}
