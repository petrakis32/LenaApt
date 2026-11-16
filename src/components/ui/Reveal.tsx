"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle entrance: content fades in and rises 12px the first time it
 * scrolls into view. Skipped entirely for `prefers-reduced-motion`, and
 * content is visible by default if JS/IntersectionObserver is missing.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds, for gentle staggering of siblings. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "pending" = hidden until observed; "shown" = visible. Starts visible so
  // server-rendered HTML is never hidden if scripts fail.
  const [state, setState] = useState<"visible" | "pending" | "shown">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    // Only hide what is currently below the fold, so nothing flashes.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setState("pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
        state === "pending" && "translate-y-3 opacity-0",
        className
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
