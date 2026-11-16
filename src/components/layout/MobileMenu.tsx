"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNav, bookingHref } from "@/config/navigation";
import { Logo } from "@/components/brand/Logo";
import { buttonStyles } from "@/components/ui/Button";
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
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[60] bg-cream transition-opacity duration-200 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-[4.5rem] items-center justify-between px-5">
          <Logo />
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

        <nav className="flex flex-1 flex-col justify-center gap-1 px-5">
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
                  "t-h2 min-h-12 border-b border-cream-line/70 py-3 transition-colors",
                  active ? "text-terracotta-dark" : "text-ink hover:text-terracotta-dark"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 px-5 pb-8 pt-4">
          <Link
            href={bookingHref}
            onClick={onClose}
            className={buttonStyles({ variant: "primary", size: "lg", className: "w-full" })}
          >
            {tCommon("requestBooking")}
          </Link>
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
