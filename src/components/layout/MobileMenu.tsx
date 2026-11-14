"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, bookingHref } from "@/config/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Client-only mount flag so the portal renders nothing during SSR
    // and the initial hydration pass (avoiding a hydration mismatch),
    // then appears once we're safely on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("menu")}
      className={cn(
        "fixed inset-0 z-[60] bg-cream transition-opacity duration-200 lg:hidden",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-lg text-ink">
            Lena <span className="text-terracotta">Apt</span>
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("closeMenu")}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-cream-deep"
          >
            <X aria-hidden className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 px-5">
          {primaryNav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "min-h-12 rounded-lg px-3 py-3 font-display text-2xl transition-colors",
                  active ? "text-terracotta" : "text-ink hover:text-terracotta"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 border-t border-cream-line px-5 py-6">
          <LanguageSwitcher />
          <Link
            href={bookingHref}
            onClick={onClose}
            className="flex min-h-12 items-center justify-center rounded-full bg-terracotta px-6 py-3 text-center font-medium text-white shadow-soft transition-colors hover:bg-terracotta-dark"
          >
            {tCommon("requestBooking")}
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
