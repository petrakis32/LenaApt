import {
  ChefHat,
  BedDouble,
  BedSingle,
  Bath,
  Sun,
  Building2,
  Mountain,
  ImageIcon,
  type LucideIcon,
} from "lucide-react";
import type { GalleryCategory } from "@/config/gallery";

const categoryIcons: Record<GalleryCategory, LucideIcon> = {
  living: ChefHat,
  "bedroom-1": BedDouble,
  "bedroom-2": BedSingle,
  bathroom: Bath,
  "balcony-large": Sun,
  "balcony-small": Sun,
  exterior: Building2,
  view: Mountain,
};

const gradients = [
  ["#dcae7e", "#c1622e"],
  ["#7fa8ad", "#1f5c6b"],
  ["#a3ad84", "#6f7a4d"],
  ["#e3c992", "#c9a15a"],
] as const;

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

interface PlaceholderPhotoProps {
  id: string;
  category?: GalleryCategory;
  categoryLabel: string;
  comingSoonLabel: string;
  className?: string;
  /** Hide the icon/label overlay — for full-bleed backgrounds that already carry their own text (e.g. the hero). */
  minimal?: boolean;
}

/**
 * Honest stand-in for a real photo that hasn't been supplied yet —
 * a soft brand-colored gradient with a category icon and label,
 * never a fake stock photo. Swap `gallery.ts` entries to a real
 * `src` and this disappears automatically.
 */
export function PlaceholderPhoto({
  id,
  category,
  categoryLabel,
  comingSoonLabel,
  className,
  minimal = false,
}: PlaceholderPhotoProps) {
  const Icon = category ? categoryIcons[category] : ImageIcon;
  const [from, to] = gradients[hashString(id) % gradients.length];

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 text-center ${className ?? ""}`}
      style={{
        background: `linear-gradient(140deg, ${from} 0%, ${to} 100%)`,
      }}
      role="img"
      aria-label={`${categoryLabel} — ${comingSoonLabel}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
        }}
      />
      {!minimal && (
        <>
          <Icon
            aria-hidden
            className="relative h-8 w-8 text-white/90 sm:h-10 sm:w-10"
            strokeWidth={1.5}
          />
          <div className="relative px-3">
            <p className="font-display text-sm text-white sm:text-base">
              {categoryLabel}
            </p>
            <p className="text-xs text-white/75">{comingSoonLabel}</p>
          </div>
        </>
      )}
    </div>
  );
}
