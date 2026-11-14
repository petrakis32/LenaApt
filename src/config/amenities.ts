import type { LucideIcon } from "lucide-react";
import {
  Wifi,
  UtensilsCrossed,
  AirVent,
  WashingMachine,
  Tv,
  SquareParking,
} from "lucide-react";

export type AmenityCategory = "essentials" | "kitchen" | "comfort";

export interface AmenityConfig {
  id: string;
  icon: LucideIcon;
  category: AmenityCategory;
}

/**
 * Add or remove an amenity by editing this array — each entry needs a
 * matching translation at messages.amenities.items.<id>.{title,description}
 * in both messages/en.json and messages/el.json.
 */
export const amenities: AmenityConfig[] = [
  { id: "wifi", icon: Wifi, category: "essentials" },
  { id: "parking", icon: SquareParking, category: "essentials" },
  { id: "kitchen", icon: UtensilsCrossed, category: "kitchen" },
  { id: "ac", icon: AirVent, category: "comfort" },
  { id: "washer", icon: WashingMachine, category: "comfort" },
  { id: "tv", icon: Tv, category: "comfort" },
];
