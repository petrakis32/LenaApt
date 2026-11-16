# Lena Apt — design system

Modern, minimal Mediterranean boutique: warm neutrals, large photography, one action color, quiet motion. Everything below is implemented; read this before re-reading components.

## Tokens (`src/app/globals.css`)
- **Colors:** `cream #faf6ee` (base) · `cream-deep #f1e9da` ("sand", the alternate section tone) · `cream-line #e4d8c3` (hairlines) · `ink #2b2622` · `ink-soft #5c5448` · `ink-faint #6f6558` · `terracotta #b3542a` (buttons; white text 5.0:1) · `terracotta-dark #93421e` (terracotta *text*, 6.4:1 on cream) · `aegean` (info only) · `olive` (calendar "available"/success only) · `gold #c9a15a` (accents on dark photos).
- **Fonts:** display = **EB Garamond** (`--font-garamond`; has Greek — Playfair did not, so Greek headings used a fallback), body = Inter. Loaded in `src/app/[locale]/layout.tsx`.
- **Type scale (use these, never raw sizes on pages):** `t-eyebrow`, `t-display` (home hero), `t-h1` (page title), `t-h2` (section), `t-h3`, `t-lead`. Body copy is `text-base`/`t-lead` in `ink-soft`.
- **Root size is the global dial:** `html` 15px, 14px from `lg` (the approved "smaller" look). Tailwind is rem-based, so it scales everything. Inputs are forced to 16px (iOS zoom).
- **Rhythm:** `py-section` utility (4.5 → 5.5 → 7rem). Container max `96rem`, gutters `px-5 sm:px-8 lg:px-12` (`ui/Container`). Radius: `rounded-card` (1.25rem) for cards/images, `rounded-full` for buttons/pills. Shadow: `shadow-soft` (one shadow).
- **Section tones alternate** via `Section background="cream" | "deep"`; never two equal tones in a row. Dark blocks: hero photo, `BookingCta` photo only. Footer is light sand.

## Components
- `ui/Button` (+ `buttonStyles()` for real `<button>`s), `ui/Card`, `ui/Notice`, `ui/Section`, `ui/SectionHeading` (eyebrow → title → lead), `ui/Reveal` (fade + 12px rise once, off for reduced motion), `ui/PageHero` (compact | collage), `media/Photo`, `media/PropertyImage`.
- Shell: `layout/Header` (fixed; transparent + white logo over photo heroes on `/` and `/apartment`, solid cream elsewhere/after scroll), `MobileMenu`, `Footer`, `MobileBookBar` (phones, hidden on `/booking`).
- Home (layout follows the owner's mockup): `Hero` (shorter photo, title block upper-left, filled "Explore" + outline "Book" buttons) → `FactsBar` (icon strip: bedrooms/beds/bathroom/guests/Wi-Fi/A-C from `config/property`) → `IntroSection` (edge-to-edge split: photo left ~57%, text on sand right) → `ApartmentOverview` (text + "View gallery" left, 3 photos right) → `LocationTeaser` (map | text; the nearby list was removed at the owner's request) → `BookingCta` (roomy photo band, text left / button right; shared with Apartment and Location). Photos live in `config/gallery.ts → homePhotos`. `AmenitiesTeaser` and `property/FactsLine` are no longer on Home (unused).
- Apartment: `PageHero collage` (8 photos, order commented in `apartment/page.tsx`), `StickySubNav`, `PinnedAbout` (desktop pinned scroll — text moves 1:1 with scroll; intentionally *not* disabled by prefers-reduced-motion), `RoomShowcase`, `AmenitiesGrid`.
- Booking: `StepsStrip`, `AvailabilityCalendar` (closed by default, 2 months wide), `BookingDatesContext` (calendar ⇄ form), `BookingForm`, `ContactLinks`.
- Gallery: `GalleryGrid` (underline tabs + CSS-columns masonry using each photo's real `ratio` from `config/gallery.ts`), `Lightbox` (object-contain, keys, swipe, focus trap).
- Location: `LocationMap` (+ address `Card` overlapping on desktop), `NearbyPlaces` (empty categories are hidden until filled in `config/location.ts`).

## Rules of thumb
- New text goes in `messages/en.json` **and** `messages/el.json`.
- Photo heroes need the transparent header: add the path to `PHOTO_HERO_PATHS` in `Header.tsx`.
- Unused leftovers: `components/home/GalleryTeaser.tsx` (removed from Home at the owner's request; not restyled), `AmenitiesTeaser.tsx`, `property/FactsLine.tsx`.
- The mockup's placeholder facts ("Beach – nearby", "Old Town – short walk", phone/email in the footer) were deliberately NOT copied: nothing is invented (see PRODUCT.md). `home.atAGlance` message is now unused.
