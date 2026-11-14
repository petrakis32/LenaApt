import Link from "next/link";
import "./globals.css";

/**
 * Fallback for routes that don't match the `[locale]` segment at
 * all. In normal use, `proxy.ts` redirects every path into a locale
 * first, so localized 404s are handled by `[locale]/not-found.tsx`
 * — this only catches truly malformed URLs.
 */
export default function GlobalNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-terracotta px-6 py-3 font-medium text-white hover:bg-terracotta-dark"
      >
        Back to home
      </Link>
    </div>
  );
}
