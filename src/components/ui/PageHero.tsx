import Image from "next/image";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface HeroPhoto {
  src: string;
  /** CSS object-position, e.g. "50% 60%" — picks which part of the photo stays visible. */
  position?: string;
}

interface PageHeroProps {
  title: string;
  body?: string;
  className?: string;
  /**
   * Optional single photo behind the title. Decorative (the page text
   * carries the meaning), so it is hidden from screen readers.
   */
  image?: HeroPhoto;
  /**
   * Optional collage: several photos joined edge to edge as the whole
   * hero background (6 on phones, 8 from `sm` up). Decorative, like `image`.
   */
  collage?: HeroPhoto[];
}

export function PageHero({ title, body, className, image, collage }: PageHeroProps) {
  const hasPhoto = Boolean(image) || Boolean(collage?.length);

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        hasPhoto
          ? "flex min-h-[26rem] items-end bg-ink pb-12 pt-32 sm:min-h-[30rem] sm:pb-16 sm:pt-40"
          : "bg-cream-deep pb-14 pt-32 sm:pb-16 sm:pt-40",
        className
      )}
    >
      {collage?.length ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 grid grid-cols-3 grid-rows-2 sm:grid-cols-4"
          >
            {collage.slice(0, 8).map((photo, i) => (
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
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/20"
          />
        </>
      ) : image ? (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/25"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 20%, #c1622e 0%, transparent 40%), radial-gradient(circle at 88% 0%, #1f5c6b 0%, transparent 45%)",
          }}
        />
      )}
      <Container className="relative">
        <h1
          className={cn(
            "balance max-w-2xl font-display text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl",
            hasPhoto ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h1>
        {body ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
              hasPhoto ? "text-cream/90" : "text-ink-soft"
            )}
          >
            {body}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
