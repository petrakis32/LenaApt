/**
 * Nearby points of interest, grouped by category. Kept empty until
 * the owner supplies real names/walking distances — we never invent
 * specific places or travel times. Add entries like:
 *
 *   { name: "Rethymno Old Town", distance: "10 min walk" }
 *
 * `distance` is free text on purpose (walking/driving time or metres
 * — whatever the owner supplies) rather than a computed figure.
 */

export interface PointOfInterest {
  name: string;
  distance?: string;
  /** Optional external link, e.g. a maps or restaurant website URL. */
  url?: string;
}

export type POICategory =
  | "beaches"
  | "restaurants"
  | "cafes"
  | "supermarkets"
  | "attractions";

export const pointsOfInterest: Record<POICategory, PointOfInterest[]> = {
  beaches: [],
  restaurants: [],
  cafes: [],
  supermarkets: [],
  attractions: [
    { name: "Rethymno Archaeological Museum", distance: "1.8 km" },
    { name: "Venetian Harbour", distance: "20 min walk" },
  ],
};

export const poiCategoryOrder: POICategory[] = [
  "beaches",
  "restaurants",
  "cafes",
  "supermarkets",
  "attractions",
];
