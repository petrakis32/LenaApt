"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface Space {
  key: string;
  href: string;
  src: string;
  /** CSS object-position for the photo. */
  position: string;
  title: string;
  paragraphs: string[];
}

/** A rectangle in percent of the row (left / top / width / height). */
interface Rect {
  l: number;
  t: number;
  w: number;
  h: number;
}

// Widths in percent of the row; they always add up to 100.
const FULL = 33.333; // an idle column, and the open photo
const PANEL = 28.667; // the text panel beside the open photo
const NARROW = 19; // the other columns while one photo is open
const SLIDE_MS = 350; // keep in sync with the transition duration below

/**
 * Where every photo (and the panel of the open one) sits, for a given open
 * photo. Everything is absolutely positioned on desktop so a photo can glide
 * from "half of a stacked pair" to "full height at the right end".
 *
 * - idle: each column FULL wide; a column with two photos stacks them.
 * - open photo in a single-photo column: that column stays FULL and the panel
 *   follows it; the other columns narrow, keeping their order (those before it
 *   stay left, those after it are pushed right).
 * - open photo in a stacked column: the stack breaks up — all photos go side by
 *   side in reading order at full height; the open one keeps FULL with its
 *   panel and the rest narrow to share what is left (so the bathroom goes to
 *   the right of the balconies when those open).
 */
function computeLayout(columns: Space[][], active: string | null) {
  const rects: Record<string, Rect> = {};
  const panelLeft: Record<string, number> = {};
  const all = columns.flat();
  const activeColumn = columns.findIndex((c) => c.some((s) => s.key === active));

  const placeColumn = (column: Space[], l: number, w: number) => {
    column.forEach((s, j) => {
      rects[s.key] = column.length > 1 ? { l, t: j * 50, w, h: 50 } : { l, t: 0, w, h: 100 };
    });
  };

  if (active === null || activeColumn === -1) {
    columns.forEach((c, i) => placeColumn(c, i * FULL, FULL));
  } else if (columns[activeColumn].length === 1) {
    let x = 0;
    columns.forEach((c, i) => {
      if (i === activeColumn) {
        placeColumn(c, x, FULL);
        panelLeft[c[0].key] = x + FULL;
        x += FULL + PANEL;
      } else {
        placeColumn(c, x, NARROW);
        x += NARROW;
      }
    });
  } else {
    // Every photo in reading order, full height: the open one keeps FULL and the panel,
    // the rest share what is left (those before it stay left, those after it go right).
    const w = (100 - FULL - PANEL) / (all.length - 1);
    let x = 0;
    all.forEach((s) => {
      if (s.key === active) {
        rects[s.key] = { l: x, t: 0, w: FULL, h: 100 };
        panelLeft[s.key] = x + FULL;
        x += FULL + PANEL;
      } else {
        rects[s.key] = { l: x, t: 0, w, h: 100 };
        x += w;
      }
    });
  }

  // Panels of photos that are not open are invisible; keep them attached to their photo.
  all.forEach((s) => {
    if (panelLeft[s.key] === undefined) panelLeft[s.key] = rects[s.key].l + rects[s.key].w;
  });
  return { rects, panelLeft };
}

/**
 * Photos that fill the section height, arranged in columns (a column holds
 * one photo, or two stacked one under the other).
 *
 * Desktop (lg+): with the cursor (or keyboard focus) on a photo it keeps its
 * size and a text panel opens on its right while the others make room (see
 * `computeLayout`); leaving the row returns to idle. The row never changes
 * width.
 *
 * Below lg there is no expanding: each photo is a card with its text under it.
 */
export function SpacesShowcase({ columns }: { columns: Space[][] }) {
  const [active, setActive] = useState<string | null>(null);
  const changedAt = useRef(0);
  const { rects, panelLeft } = computeLayout(columns, active);

  const open = (key: string, at: number) => {
    if (key === active) return;
    changedAt.current = at;
    setActive(key);
  };

  // Photos glide under a cursor that is standing still (e.g. the bathroom sweeping past while the
  // balconies open). That must not switch the open photo: when one is already open only real
  // pointer movement, and not right after a switch, may open another. Entering the row from
  // outside (nothing open yet) or keyboard focus opens immediately.
  const onEnter = (key: string, at: number) => {
    if (active === null) open(key, at);
  };
  const onMove = (key: string, at: number) => {
    if (at - changedAt.current > SLIDE_MS) open(key, at);
  };

  return (
    <Reveal className="min-w-0">
      <div
        className="@container grid grid-cols-1 sm:grid-cols-2 lg:relative lg:block lg:h-[26rem] lg:overflow-hidden"
        onPointerLeave={() => setActive(null)}
      >
        {columns.flat().map((space) => {
          const state = active === null ? "idle" : active === space.key ? "active" : "inactive";
          const r = rects[space.key];
          return (
            // On desktop the item is `contents`: its photo and panel are positioned against
            // the row; the state attribute still drives the group variants.
            <div key={space.key} data-state={state} className="group/space flex flex-col lg:contents">
              <Link
                href={space.href}
                onPointerEnter={(e) => onEnter(space.key, e.timeStamp)}
                onPointerMove={(e) => onMove(space.key, e.timeStamp)}
                onFocus={(e) => open(space.key, e.timeStamp)}
                onBlur={() => setActive(null)}
                style={
                  {
                    "--l": `${r.l}%`,
                    "--t": `${r.t}%`,
                    "--w": `${r.w}%`,
                    "--h": `${r.h}%`,
                  } as CSSProperties
                }
                className={cn(
                  "relative block aspect-[4/3] overflow-hidden",
                  "lg:absolute lg:left-(--l) lg:top-(--t) lg:h-(--h) lg:w-(--w) lg:aspect-auto",
                  "lg:transition-[left,top,width,height] lg:duration-[350ms]! lg:ease-[cubic-bezier(0.37,0,0.63,1)]"
                  // Deliberately NOT disabled by prefers-reduced-motion: the owner wants to
                  // see the slide, it only runs on an explicit hover/focus, and it is gentle.
                  // The trailing `!` on the durations beats the global reduced-motion rule in
                  // globals.css (`transition-duration: 0.01ms !important`), which otherwise
                  // makes the slide instant on machines with "reduce motion" turned on.
                )}
              >
                <Photo
                  src={space.src}
                  alt=""
                  position={space.position}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-ink/60 to-transparent lg:block"
                />
                <span
                  className={cn(
                    "absolute bottom-4 left-4 hidden max-w-[calc(100%-2rem)] truncate text-sm font-medium text-white lg:block",
                    "transition-opacity duration-500! lg:group-data-[state=active]/space:opacity-0"
                  )}
                >
                  {space.title}
                </span>
              </Link>

              {/* Desktop: the area beside the photo keeps the section's own cream; only the
                  text is framed, by a box that hugs it and is open on the side touching the
                  photo (top, right and bottom borders), so it reads as an extension of the
                  photo. It slides out of the photo's edge together with the photo's own slide
                  (no separate fade). Below lg it is plain text under the photo. */}
              <div
                style={{ "--pl": `${panelLeft[space.key]}%` } as CSSProperties}
                className={cn(
                  "px-5 py-6 sm:px-4",
                  // The panel is a clipping window that sits against the photo's right edge and
                  // widens from 0 with exactly the photo's timing, so the text box is wiped out
                  // of the photo's edge as the row slides (no fade of its own).
                  "lg:pointer-events-none lg:absolute lg:left-(--pl) lg:top-0 lg:flex lg:h-full lg:w-0 lg:flex-col lg:justify-center lg:overflow-hidden lg:p-0 lg:py-6",
                  "lg:group-data-[state=active]/space:w-[28.667%]",
                  "lg:[transition-property:left,width] lg:duration-[350ms]! lg:ease-[cubic-bezier(0.37,0,0.63,1)]"
                )}
              >
                {/* The frame hugs only the text; open on the photo side, flush against it. Its
                    width does not depend on the window (container units), so it is revealed,
                    never squeezed. */}
                <div className="lg:w-max lg:max-w-[calc(28.667cqw-1.5rem)] lg:rounded-r-lg lg:border-y-2 lg:border-r-2 lg:border-terracotta lg:bg-white lg:px-6 lg:py-6">
                  <h3 className="t-h3 text-ink">{space.title}</h3>
                  {space.paragraphs.map((text) => (
                    <p key={text} className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
