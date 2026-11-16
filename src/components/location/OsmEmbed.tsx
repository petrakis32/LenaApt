"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OpenStreetMap embed that always fills its frame.
 *
 * The embed fits its `bbox` into whatever size the iframe had when it loaded
 * and never recomputes after a resize — so a frame that changed size after
 * load (responsive layout, window resize, fonts) showed a mis-zoomed,
 * off-centre map with empty margins. Here the bbox is built from the frame's
 * *measured* aspect ratio (so the area fits exactly and the marker is
 * centred) and the iframe reloads with a new bbox when the frame is resized.
 */
export function OsmEmbed({
  title,
  lat,
  lng,
  spread,
}: {
  title: string;
  lat: number;
  lng: number;
  /** Half-height of the visible area, in degrees of latitude. */
  spread: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 50 || height < 50) return;
      const next = { w: Math.round(width), h: Math.round(height) };
      // Ignore tiny changes (scrollbars, sub-pixel rounding): they don't need a reload.
      setSize((prev) =>
        prev && Math.abs(prev.w - next.w) < 24 && Math.abs(prev.h - next.h) < 24 ? prev : next
      );
    };

    measure();
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 250);
    });
    ro.observe(el);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  let src: string | null = null;
  if (size) {
    const aspect = size.w / size.h;
    const latSpan = spread * 2;
    // Degrees of longitude are shorter than degrees of latitude by cos(lat).
    const lngSpan = (latSpan * aspect) / Math.cos((lat * Math.PI) / 180);
    const bbox = [
      lng - lngSpan / 2,
      lat - latSpan / 2,
      lng + lngSpan / 2,
      lat + latSpan / 2,
    ]
      .map((n) => n.toFixed(6))
      .join("%2C");
    src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  }

  return (
    <div ref={frameRef} className="h-full w-full bg-cream-deep">
      {src ? (
        <iframe
          key={src}
          title={title}
          src={src}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  );
}
