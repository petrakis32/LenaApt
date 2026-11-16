"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * "Pinned" About section for desktop (>= lg):
 * the panel (text + photo) is pinned below the header for the length of the
 * description. While you scroll, the description moves up inside the panel so
 * it is always on screen, and the photo stays put. Once the last line has been
 * shown, the panel is released and scrolls away with the rest of the page.
 *
 * Below lg this is just a normal stacked layout.
 *
 * Deliberately NOT disabled for `prefers-reduced-motion`: the text moves 1:1
 * with the visitor's own scrolling (nothing animates or eases by itself), so
 * it is not the kind of motion that setting is meant to remove.
 */
export function PinnedAbout({
  children,
  media,
}: {
  children: ReactNode;
  media: ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const panel = panelRef.current;
    const text = textRef.current;
    const content = contentRef.current;
    if (!outer || !panel || !text || !content) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let overflow = 0;
    let stickyTop = 0;
    let raf = 0;

    const active = () => mq.matches;

    const reset = () => {
      outer.style.height = "";
      content.style.transform = "";
      overflow = 0;
    };

    const update = () => {
      if (!active() || overflow === 0) return;
      const scrolled = stickyTop - outer.getBoundingClientRect().top;
      const progress = Math.min(Math.max(scrolled, 0), overflow);
      content.style.transform = `translate3d(0, ${-progress}px, 0)`;
    };

    const measure = () => {
      if (!active()) return reset();
      stickyTop = parseFloat(getComputedStyle(panel).top) || 0;
      const panelH = panel.offsetHeight;
      overflow = Math.max(0, content.offsetHeight - text.offsetHeight);
      // The outer box is as tall as the panel plus the distance the text must travel.
      outer.style.height = `${panelH + overflow}px`;
      update();
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(content);
    ro.observe(text);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      ro.disconnect();
      reset();
    };
  }, []);

  return (
    <div ref={outerRef} className="relative">
      <div
        ref={panelRef}
        className="grid gap-10 lg:sticky lg:top-[8.5rem] lg:h-[calc(100svh-11rem)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
      >
        {/* text column: clipped to the panel on desktop, content slides inside it */}
        <div ref={textRef} className="lg:h-full lg:overflow-hidden">
          <div ref={contentRef} className="will-change-transform">
            {children}
          </div>
        </div>

        {/* photo column: fills the full height of the panel on desktop */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-soft sm:aspect-[4/3] lg:aspect-auto lg:h-full">
          {media}
        </div>
      </div>
    </div>
  );
}
