import Image from "next/image";
import { PlaceholderPhoto } from "./PlaceholderPhoto";
import type { GalleryCategory } from "@/config/gallery";

interface PropertyImageProps {
  id: string;
  src: string | null;
  alt: string;
  category?: GalleryCategory;
  categoryLabel: string;
  comingSoonLabel: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Passed to the placeholder — hides its icon/label for full-bleed backgrounds that carry their own text. */
  minimal?: boolean;
}

/**
 * Drop-in replacement for `next/image` that gracefully falls back to
 * a labelled placeholder when a real photo hasn't been added yet.
 * Always render inside a `relative` box with a defined aspect ratio.
 */
export function PropertyImage({
  id,
  src,
  alt,
  category,
  categoryLabel,
  comingSoonLabel,
  sizes = "100vw",
  priority,
  className,
  minimal,
}: PropertyImageProps) {
  if (!src) {
    return (
      <PlaceholderPhoto
        id={id}
        category={category}
        categoryLabel={categoryLabel}
        comingSoonLabel={comingSoonLabel}
        className={className}
        minimal={minimal}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
