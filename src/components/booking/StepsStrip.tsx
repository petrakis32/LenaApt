import { getTranslations } from "next-intl/server";

const steps = ["one", "two", "three"] as const;

/** Three quiet numbered steps explaining how a booking request works. */
export async function StepsStrip() {
  const t = await getTranslations("booking.steps");

  return (
    <ol className="grid gap-6 sm:grid-cols-3 sm:gap-10">
      {steps.map((key, i) => (
        <li key={key} className="flex gap-4">
          <span
            aria-hidden
            className="font-display text-4xl leading-none text-terracotta-dark"
          >
            {i + 1}
          </span>
          <div>
            <p className="font-medium text-ink">{t(`${key}.title`)}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t(`${key}.body`)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
