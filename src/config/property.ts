/**
 * Structural facts about the apartment. Copy/labels live in the
 * translation files (messages/*.json); this file only holds the
 * numbers and shape of the data so components can loop over it.
 *
 * To add/remove a room or bed, edit the arrays below — nothing else
 * in the codebase needs to change.
 */

export type BedType = "double" | "single";

export interface BedroomConfig {
  id: string;
  /** Translation key suffix, e.g. messages "apartment.bedrooms.<id>.*" */
  beds: { type: BedType; count: number }[];
}

export const bedrooms: BedroomConfig[] = [
  { id: "bedroom-1", beds: [{ type: "double", count: 1 }] },
  { id: "bedroom-2", beds: [{ type: "single", count: 2 }] },
];

export const balconies = [
  { id: "balcony-large", size: "large" as const },
  { id: "balcony-small", size: "small" as const },
];

const bedCapacity: Record<BedType, number> = {
  double: 2,
  single: 1,
};

/**
 * The living room also has a sofa-bed that converts on request for
 * 1-2 extra guests — it's deliberately NOT counted in bedCount/
 * maxGuests below, since it's optional/occasional rather than a
 * standing bed. It's described in the living room's copy instead
 * (messages: apartment.sofaBedNote).
 */
export const propertyFacts = {
  bedroomCount: bedrooms.length,
  bedCount: bedrooms.reduce(
    (sum, room) => sum + room.beds.reduce((s, b) => s + b.count, 0),
    0
  ),
  bathroomCount: 1,
  balconyCount: balconies.length,
  /** Derived from bed types (double=2, single=1) — not a marketing estimate. */
  maxGuests: bedrooms.reduce(
    (sum, room) =>
      sum + room.beds.reduce((s, b) => s + b.count * bedCapacity[b.type], 0),
    0
  ),
};
