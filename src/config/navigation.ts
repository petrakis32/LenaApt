/**
 * Primary navigation structure. Labels are resolved via
 * `useTranslations("nav")` using each entry's `key` — edit
 * messages/*.json to change label text, edit this array to
 * add/remove/reorder nav items.
 */
export interface NavItem {
  key: "home" | "apartment" | "gallery" | "location";
  href: "/" | "/apartment" | "/gallery" | "/location";
}

export const primaryNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "apartment", href: "/apartment" },
  { key: "gallery", href: "/gallery" },
  { key: "location", href: "/location" },
];

export const bookingHref = "/booking" as const;
