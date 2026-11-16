import Image from "next/image";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface CollagePhoto {
  src: string;
  /** CSS object-position, e.g. "50% 60%" — picks which part of the photo stays visible. */
  position?: string;
}

interface PageHeroProps {
  title: string;
  body?: string;
  /** Small uppercase label above the title (usually the page's nav label). */
  eyebrow?: string;
  className?: string;
  /**
   * Optional collage: several photos joined edge to edge as the whole hero
   * background (6 on phones, 8 from `sm` up). Decorative, hidden from
   * screen readers. Without it the hero is the quiet "compact" variant.
   */
  collage?: CollagePhoto[];
}

/**
 * The two hero styles used on every inner page:
 *  - compact (default): calm sand band with the title
 *  - collage: photo mosaic behind the title (the header floats over it)
 */
export function PageHero({ title, body, eyebrow, className, collage }: PageHeroProps) {
  const hasCollage = Boolean(collage?.length);

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        hasCollage
          ? "flex min-h-[28rem] items-end bg-ink pb-12 pt-32 sm:min-h-[32rem] sm:pb-16 sm:pt-40"
          : "border-b border-cream-line bg-cream-deep pb-12 pt-32 sm:pb-16 sm:pt-40",
        className
      )}
    >
      {hasCollage ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 grid grid-cols-3 grid-rows-2 sm:grid-cols-4"
          >
            {collage!.slice(0, 8).map((photo, i) => (
              <div key={photo.src} className={cn("relative", i >= 6 && "hidden sm:block")}>
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  priority={i < 4}
                  sizes="(min-width: 640px) 25vw, 34vw"
                  className="object-cover"
                  style={{ objectPosition: photo.position ?? "50% 50%" }}
                />
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25"
          />
        </>
      ) : null}

      <Container className="relative">
        {eyebrow ? (
          <p className={cn("t-eyebrow mb-4", hasCollage && "!text-gold")}>{eyebrow}</p>
        ) : null}
        <h1 className={cn("balance t-h1 max-w-3xl", hasCollage ? "text-white" : "text-ink")}>
          {title}
        </h1>
        {body ? (
          <p
            className={cn(
              "t-lead mt-5 max-w-2xl",
              hasCollage && "!text-cream/90"
            )}
          >
            {body}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
