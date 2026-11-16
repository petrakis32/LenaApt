import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoProps {
  src: string;
  /** Empty string = decorative (hidden from screen readers). */
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** CSS object-position, e.g. "50% 60%". */
  position?: string;
}

/**
 * A photo that fills its (relative, sized) parent. For known files from
 * `config/gallery.ts`; use `PropertyImage` where a placeholder fallback is needed.
 */
export function Photo({ src, alt, sizes, priority, className, position }: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
