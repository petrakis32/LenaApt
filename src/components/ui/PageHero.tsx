import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  body?: string;
  className?: string;
}

export function PageHero({ title, body, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-cream-deep pb-14 pt-32 sm:pb-16 sm:pt-40",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, #c1622e 0%, transparent 40%), radial-gradient(circle at 88% 0%, #1f5c6b 0%, transparent 45%)",
        }}
      />
      <Container className="relative">
        <h1 className="balance max-w-2xl font-display text-5xl leading-[1.05] tracking-[-0.01em] text-ink sm:text-6xl">
          {title}
        </h1>
        {body ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {body}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
