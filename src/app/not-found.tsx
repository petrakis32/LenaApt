import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import "./globals.css";

/**
 * Fallback for routes that don't match the `[locale]` segment at
 * all. In normal use, `proxy.ts` redirects every path into a locale
 * first, so localized 404s are handled by `[locale]/not-found.tsx`
 * — this only catches truly malformed URLs.
 */
export default function GlobalNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="t-eyebrow">404</p>
      <h1 className="t-h1 mt-4 text-ink">Page not found</h1>
      <p className="t-lead mt-5 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className={buttonStyles({ variant: "primary", className: "mt-9" })}>
        Back to home
      </Link>
    </div>
  );
}
