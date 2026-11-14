/**
 * Availability calendar architecture (not yet connected).
 *
 * The booking page does NOT claim to know real-time availability —
 * it only collects a booking *request* that the owner confirms by
 * email. This file is the seam where a future calendar sync would
 * plug in, so it can be added without reshaping the rest of the app:
 *
 *   1. An iCal feed URL from Airbnb/Booking.com is added to
 *      `siteConfig.channels` (see src/config/site.ts).
 *   2. A server-side job/route fetches and parses those feeds
 *      (e.g. with `node-ical`) into an array of booked date ranges.
 *   3. `getBookedDateRanges()` below returns that data instead of
 *      an empty array, and the booking form date pickers can disable
 *      booked dates.
 *
 * Until then this intentionally returns nothing — the UI must never
 * assert a date is free without real data behind it.
 */

export interface DateRange {
  start: string; // ISO date, e.g. "2026-07-10"
  end: string;
}

export async function getBookedDateRanges(): Promise<DateRange[]> {
  return [];
}
