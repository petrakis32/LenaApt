# Lena Apt — Website

Holiday apartment website for Lena Apt, Rethymno, Crete. Built with Next.js 16 (App Router), Tailwind CSS v4, and `next-intl` for English/Greek bilingual support.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site redirects to `/en` or `/el` based on the browser's language.

```bash
npm run build   # production build + type check
npm run start   # run the production build
```

## Where to edit things

Everything content-related is centralized so you don't need to touch component code for day-to-day edits.

| What | Where |
| --- | --- |
| All text (English & Greek) | `messages/en.json`, `messages/el.json` — same keys in both files |
| Contact details (phone, email, WhatsApp), location, logo path | `src/config/site.ts` |
| Bedrooms, beds, bathroom, balconies | `src/config/property.ts` |
| Amenities list (add/remove/reorder) | `src/config/amenities.ts` (+ matching entry under `amenities.items.<id>` in both message files) |
| Photos (hero + gallery) | `src/config/gallery.ts` — set `src` to a path once the file exists in `public/images/gallery/`; leave `src: null` to show a styled placeholder instead of a broken image |
| Nearby beaches/restaurants/cafés/etc. | `src/config/location.ts` |
| Nav menu items | `src/config/navigation.ts` |

### Adding real photos

1. Drop the image in `public/images/gallery/your-file.jpg`.
2. In `src/config/gallery.ts`, set that entry's `src` to `/images/gallery/your-file.jpg`.
3. Add real alt text for it under `gallery.categories` / translations as needed.

Until a photo is added, that spot shows a branded placeholder (never a stock photo) so the site never looks broken.

### Logo

Set `logoSrc` in `src/config/site.ts` to `/images/logo.svg` (or `.png`) once you drop the file in `public/images/`. Until then, a text wordmark is used. You'll also want to replace `src/app/favicon.ico` with a real favicon once you have a logo.

## Booking request emails

The booking form posts to `/api/booking-request`, which sends an email via SMTP. It is **not configured yet** — until you add the environment variables below, the form correctly tells visitors that online requests are temporarily unavailable (and points them to phone/email/WhatsApp instead) rather than pretending to succeed.

Copy `.env.example` to `.env.local` and fill in:

```
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
BOOKING_NOTIFICATION_EMAIL=
```

`BOOKING_NOTIFICATION_EMAIL` is optional if `siteConfig.contact.email` (in `src/config/site.ts`) is already set — that's used as the fallback recipient.

## Airbnb / Booking.com calendar sync

Not implemented yet by design (see the brief) — the seam for it is `src/config/availability.ts`. When you're ready to connect real calendar feeds, that's the one file to extend; nothing else needs to change.

## Still needed from the owner before launch

- ~~Logo file~~ ✅ added (`public/images/logo.png`, background made transparent)
- ~~Real photographs~~ ✅ added — 69 real photos across all rooms plus the hero (`public/images/gallery/`, `public/images/hero/`)
- ~~Exact address~~ ✅ added and shown publicly (owner's choice) — "Panepistimiou Kritis 4, Rethymno" (found on the property's own listing card, confirmed by the "4" building plaque); coordinates geocoded street-level via OpenStreetMap. Displayed on the Location page and in the footer, and included in structured data.
- Final property descriptions (current copy is a reasonable draft, not final)
- Phone, WhatsApp number, and email → `src/config/site.ts`
- Nearby beaches/restaurants/cafés/supermarkets/attractions with real names and distances → `src/config/location.ts`
- SMTP credentials for booking emails (see above)
- A real production domain (`siteConfig.url` in `src/config/site.ts`) once deployed

### Note on the living room / kitchen

The apartment has one open-plan living room + kitchen (not two separate rooms) — the site now presents it as a single "Living Room & Kitchen" gallery category and apartment-page room. It also has a sofa-bed that converts on request for 1–2 extra guests; that's described in the room text but deliberately **not** added to the official bed/guest counts shown elsewhere (those stay at the standing 3 beds / 4 guests), since the sofa-bed is optional/occasional rather than a fixed bed.
