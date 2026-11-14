/**
 * Single source of truth for site-wide identity, contact and location
 * facts. Every component that needs the owner's email/phone/address
 * must import it from here — never hard-code it elsewhere.
 *
 * Fields set to `null` are facts the owner hasn't supplied yet. UI
 * components must treat `null` as "not yet available" and render a
 * clearly-labelled placeholder instead of inventing a value.
 */
export const siteConfig = {
  name: "Lena Apt",

  /** Placeholder production domain — set once the site is deployed. */
  url: "https://www.lenaapt.example",

  logoSrc: "/images/logo.png" as string | null,

  location: {
    locality: "Rethymno",
    region: "Crete",
    country: "Greece",
    countryCode: "GR" as const,
    streetAddress: "Panepistimiou Kritis 4" as string | null,
    postalCode: "74100" as string | null,
    /**
     * Google Plus Code (Open Location Code) pinpointing the exact
     * building, supplied directly by the owner from Google Maps.
     * This is what the embedded map and the "get directions" link
     * actually use — more reliable than a geocoded address text or
     * a single lat/lng pin.
     */
    plusCode: "9F8R+F8 Rethymno" as string | null,
    /**
     * The owner's actual "Lena Apt" Google Maps place listing
     * (includes Google's permanent place CID) — clicking the address
     * anywhere on the site opens directions to this exact listing,
     * not just a bare coordinate/Plus Code pin.
     */
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir//Lena+Apt,+%CE%A0%CE%B1%CE%BD%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%B7%CE%BC%CE%AF%CE%BF%CF%85+%CE%9A%CF%81%CE%AE%CF%84%CE%B7%CF%82+4,+%CE%A1%CE%AD%CE%B8%CF%85%CE%BC%CE%BD%CE%BF+741+00/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x149b75b5e12c22d7:0x3b45c6e359924c3c" as
        | string
        | null,
    /**
     * Approximate coordinates of Rethymno's town centre (public
     * knowledge) — kept as a fallback if exactCoordinates is ever
     * cleared.
     */
    approximateCoordinates: { lat: 35.367, lng: 24.474 },
    /**
     * Decoded directly from the Plus Code above (Open Location Code
     * algorithm, verified by round-tripping: re-encoding this point
     * reproduces "9F8R+F8"). Rooftop-accurate — used for the map pin
     * and structured data alike.
     */
    exactCoordinates: { lat: 35.3661875, lng: 24.4908125 } as {
      lat: number;
      lng: number;
    } | null,
  },

  contact: {
    phone: null as string | null,
    /** E.164 format for tel:/wa.me links, e.g. "306912345678". */
    phoneIntl: null as string | null,
    whatsappIntl: null as string | null,
    email: null as string | null,
  },

  /**
   * Availability calendar sync placeholders. No integration is wired
   * up yet — these are here so the booking page and future API route
   * have a stable place to read from once Airbnb/Booking.com feeds
   * are connected (see src/config/availability.ts).
   */
  channels: {
    airbnbListingUrl: null as string | null,
    bookingComListingUrl: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
