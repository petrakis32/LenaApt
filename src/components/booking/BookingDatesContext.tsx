"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DateRange } from "@/config/availability";

const DAY_MS = 86_400_000;

export function addDays(isoDate: string, days: number) {
  return new Date(Date.parse(isoDate) + days * DAY_MS).toISOString().slice(0, 10);
}

/** Every booked night (start inclusive, end exclusive). */
function expandNights(ranges: DateRange[]) {
  const nights = new Set<string>();
  for (const { start, end } of ranges) {
    const endMs = Date.parse(end);
    for (let t = Date.parse(start); t < endMs; t += DAY_MS) {
      nights.add(new Date(t).toISOString().slice(0, 10));
    }
  }
  return nights;
}

/** True when every night from checkIn up to (not including) checkOut is free. */
export function rangeIsFree(checkIn: string, checkOut: string, nights: Set<string>) {
  if (!checkIn || !checkOut || checkOut <= checkIn) return true;
  for (let d = checkIn; d < checkOut; d = addDays(d, 1)) {
    if (nights.has(d)) return false;
  }
  return true;
}

interface BookingDatesValue {
  nights: Set<string>;
  checkIn: string;
  checkOut: string;
  /** Bumps whenever the *calendar* changes the dates, so the form knows to copy them in. */
  revision: number;
  /** Used by the form to mirror what the user typed (does not bump `revision`). */
  setDates: (checkIn: string, checkOut: string) => void;
  /** Used by the calendar: updates the dates and tells the form to copy them in. */
  pickDates: (checkIn: string, checkOut: string) => void;
}

const BookingDatesContext = createContext<BookingDatesValue | null>(null);

/**
 * Shared check-in / check-out selection, so the availability calendar
 * and the booking form always show the same dates.
 */
export function BookingDatesProvider({
  bookedRanges,
  children,
}: {
  bookedRanges: DateRange[];
  children: ReactNode;
}) {
  const nights = useMemo(() => expandNights(bookedRanges), [bookedRanges]);
  const [dates, setDatesState] = useState({ checkIn: "", checkOut: "", revision: 0 });

  const setDates = useCallback((checkIn: string, checkOut: string) => {
    setDatesState((prev) =>
      prev.checkIn === checkIn && prev.checkOut === checkOut ? prev : { ...prev, checkIn, checkOut }
    );
  }, []);

  const pickDates = useCallback((checkIn: string, checkOut: string) => {
    setDatesState((prev) => ({ checkIn, checkOut, revision: prev.revision + 1 }));
  }, []);

  const value = useMemo(
    () => ({ nights, ...dates, setDates, pickDates }),
    [nights, dates, setDates, pickDates]
  );

  return <BookingDatesContext.Provider value={value}>{children}</BookingDatesContext.Provider>;
}

export function useBookingDates() {
  const ctx = useContext(BookingDatesContext);
  if (!ctx) throw new Error("useBookingDates must be used inside <BookingDatesProvider>");
  return ctx;
}
