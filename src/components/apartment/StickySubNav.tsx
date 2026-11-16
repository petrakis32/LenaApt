"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Anchor menu that sticks under the header and highlights the section
 * currently in view. Items point at element ids on the same page.
 */
export function StickySubNav({
  items,
  label,
}: {
  items: { id: string; label: string }[];
  label: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const onScroll = () => {
      // Active = the last section whose top has passed ~1/3 of the viewport.
      const line = window.innerHeight * 0.33;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="sticky top-[4.5rem] z-30 border-b border-cream-line bg-cream/95 backdrop-blur"
    >
      <Container className="flex gap-8 overflow-x-auto">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "shrink-0 border-b-2 py-4 text-sm font-medium transition-colors",
              active === item.id
                ? "border-terracotta text-ink"
                : "border-transparent text-ink-soft hover:text-ink"
            )}
          >
            {item.label}
          </a>
        ))}
      </Container>
    </nav>
  );
}
