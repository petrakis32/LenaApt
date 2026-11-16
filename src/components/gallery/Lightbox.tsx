"use client";

import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { PropertyImage } from "@/components/media/PropertyImage";
import type { GalleryImage } from "@/config/gallery";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const t = useTranslations("gallery");
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const goPrev = () => onNavigate((index - 1 + total) % total);
  const goNext = () => onNavigate((index + 1) % total);

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Tab") {
        // Focus trap: keep Tab inside the dialog's three buttons.
        const buttons = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!buttons || buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        const activeEl = document.activeElement;
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const image = images[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/97 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 50) goPrev();
        else if (delta < -50) goNext();
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <p className="text-sm text-white/70">
          {t("lightbox.counter", { current: index + 1, total })}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("lightbox.close")}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
        >
          <X aria-hidden className="h-6 w-6" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-2 pb-6 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={goPrev}
          aria-label={t("lightbox.previous")}
          className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
        >
          <ChevronLeft aria-hidden className="h-6 w-6" />
        </button>

        {/* object-contain: portrait and panoramic photos show whole, never cropped */}
        <div className="relative h-[68svh] w-full max-w-5xl overflow-hidden rounded-card">
          <PropertyImage
            id={image.id}
            src={image.src}
            alt={t(`categories.${image.category}`)}
            category={image.category}
            categoryLabel={t(`categories.${image.category}`)}
            comingSoonLabel={t("photoComingSoon")}
            sizes="(min-width: 1024px) 70vw, 95vw"
            className="!object-contain"
            priority
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label={t("lightbox.next")}
          className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
        >
          <ChevronRight aria-hidden className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
