"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { bookingHref } from "@/config/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Phone-only booking shortcut pinned to the bottom of the screen.
 * Appears once the visitor has scrolled past the top of the page, and is
 * hidden on the booking page itself (where the form already is).
 */
export function MobileBookBar() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith(bookingHref)) return null;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-cream-line bg-cream/95 px-5 pt-3 backdrop-blur transition-transform duration-300 ease-[var(--ease-out-soft)] lg:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <Link
        href={bookingHref}
        tabIndex={visible ? 0 : -1}
        className={buttonStyles({ variant: "primary", className: "w-full" })}
      >
        {t("requestBooking")}
      </Link>
    </div>
  );
}
