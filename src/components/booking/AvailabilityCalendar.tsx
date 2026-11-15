"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { rangeIsFree, useBookingDates } from "./BookingDatesContext";

function iso(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m, d)).toISOString().slice(0, 10);
}

function MonthGrid({
  year,
  month,
  nights,
  todayIso,
  locale,
  labels,
  checkIn,
  checkOut,
  onPick,
}: {
  year: number;
  month: number;
  nights: Set<string>;
  todayIso: string;
  locale: string;
  labels: { booked: string; available: string; selected: string };
  checkIn: string;
  checkOut: string;
  onPick: (date: string) => void;
}) {
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1)));

  // Monday-first weekday headers (2024-01-01 is a Monday).
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(
      new Date(Date.UTC(2024, 0, 1 + i))
    )
  );

  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <h4 className="mb-3 text-center font-display text-lg capitalize text-ink">
        {monthLabel}
      </h4>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium uppercase tracking-wide text-ink-faint">
        {weekdays.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`b${i}`} />;
          const date = iso(year, month, day);
          const past = date < todayIso;
          const booked = nights.has(date);
          const isStart = date === checkIn;
          const isEnd = date === checkOut;
          const inRange = !!checkIn && !!checkOut && date > checkIn && date < checkOut;
          // A booked day can still be a departure day if every night before it is free.
          const canDepart =
            booked && !!checkIn && !checkOut && date > checkIn && rangeIsFree(checkIn, date, nights);
          const selectable = !past && (!booked || canDepart);
          const state = isStart || isEnd ? labels.selected : booked && !canDepart ? labels.booked : labels.available;
          return (
            <button
              key={date}
              type="button"
              disabled={!selectable}
              onClick={() => onPick(date)}
              aria-pressed={isStart || isEnd}
              aria-label={past ? String(day) : `${day} — ${state}`}
              className={cn(
                "flex h-10 items-center justify-center rounded-lg text-sm transition-colors",
                past && "text-ink-faint/50",
                !past && !booked && "bg-olive/10 text-ink hover:bg-olive/25",
                !past && booked && "bg-terracotta-light text-terracotta-dark line-through",
                canDepart && "hover:bg-terracotta/25",
                inRange && "bg-aegean-light text-aegean-dark no-underline hover:bg-aegean-light",
                (isStart || isEnd) && "bg-aegean text-white no-underline hover:bg-aegean",
                date === todayIso && !isStart && !isEnd && "ring-2 ring-aegean",
                !selectable && "cursor-default"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AvailabilityCalendar() {
  const t = useTranslations("booking.calendar");
  const locale = useLocale();
  const { nights, checkIn, checkOut, pickDates: setDates } = useBookingDates();

  const now = new Date();
  const todayIso = iso(now.getFullYear(), now.getMonth(), now.getDate());
  const [open, setOpen] = useState(false); // always starts closed
  const [cursor, setCursor] = useState({ y: now.getFullYear(), m: now.getMonth() });

  const next = new Date(Date.UTC(cursor.y, cursor.m + 1, 1));
  const atCurrentMonth = cursor.y === now.getFullYear() && cursor.m === now.getMonth();

  function shift(delta: number) {
    setCursor(({ y, m }) => {
      const d = new Date(Date.UTC(y, m + delta, 1));
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
    });
  }

  const labels = { booked: t("booked"), available: t("available"), selected: t("selected") };

  function pick(date: string) {
    if (!checkIn || checkOut) {
      setDates(date, ""); // start a new selection
    } else if (date > checkIn && rangeIsFree(checkIn, date, nights)) {
      setDates(checkIn, date);
    } else if (!nights.has(date)) {
      setDates(date, ""); // clicked earlier / across a booking: restart here
    }
  }

  const nightCount = checkIn && checkOut ? Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000) : 0;
  const fmt = (d: string) =>
    new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(d));
  const navBtn =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-line text-ink hover:border-ink/30 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="rounded-2xl border border-cream-line bg-white shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="availability-panel"
        className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left sm:px-6"
      >
        <span className="flex items-center gap-3">
          <CalendarDays aria-hidden className="h-5 w-5 shrink-0 text-terracotta" />
          <span>
            <span className="block font-display text-xl text-ink">{t("title")}</span>
            <span className="block text-sm text-ink-soft">
              {open ? t("intro") : t("toggleHint")}
            </span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-terracotta">
          <span className="hidden sm:inline">{open ? t("hide") : t("show")}</span>
          <ChevronDown
            aria-hidden
            className={cn("h-5 w-5 transition-transform", open && "rotate-180")}
          />
        </span>
      </button>

      <div
        id="availability-panel"
        hidden={!open}
        className="border-t border-cream-line p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={atCurrentMonth}
            aria-label={t("prev")}
            className={navBtn}
          >
            <ChevronLeft aria-hidden className="h-5 w-5" />
          </button>

          <div className="grid min-w-0 flex-1 gap-8 md:grid-cols-2 md:gap-10">
            <MonthGrid
              year={cursor.y}
              month={cursor.m}
              nights={nights}
              todayIso={todayIso}
              locale={locale}
              labels={labels}
              checkIn={checkIn}
              checkOut={checkOut}
              onPick={pick}
            />
            <div className="hidden md:block">
              <MonthGrid
                year={next.getUTCFullYear()}
                month={next.getUTCMonth()}
                nights={nights}
                todayIso={todayIso}
                locale={locale}
                labels={labels}
                checkIn={checkIn}
                checkOut={checkOut}
                onPick={pick}
              />
            </div>
          </div>

          <button type="button" onClick={() => shift(1)} aria-label={t("next")} className={navBtn}>
            <ChevronRight aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <div
          aria-live="polite"
          className="mt-5 flex min-h-11 flex-wrap items-center justify-between gap-3 rounded-xl bg-cream px-4 py-2.5 text-sm text-ink"
        >
          <span>
            {checkIn && checkOut
              ? t("summary", { checkIn: fmt(checkIn), checkOut: fmt(checkOut), nights: nightCount })
              : checkIn
                ? t("pickCheckOut", { checkIn: fmt(checkIn) })
                : t("pickCheckIn")}
          </span>
          {checkIn ? (
            <button
              type="button"
              onClick={() => setDates("", "")}
              className="font-medium text-terracotta hover:text-terracotta-dark"
            >
              {t("clear")}
            </button>
          ) : null}
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-4 w-4 rounded bg-olive/10 ring-1 ring-olive/30" />
            {t("available")}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-4 w-4 rounded bg-terracotta-light ring-1 ring-terracotta/30" />
            {t("booked")}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-4 w-4 rounded bg-aegean" />
            {t("selected")}
          </li>
        </ul>
        <p className="mt-3 text-xs text-ink-faint">{t("note")}</p>
      </div>
    </div>
  );
}
