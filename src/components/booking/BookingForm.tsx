"use client";

import { useState, useEffect, isValidElement, cloneElement } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { buttonStyles } from "@/components/ui/Button";
import {
  bookingRequestSchema,
  MESSAGE_MAX_LENGTH,
  type BookingRequestInput,
} from "@/lib/validation/booking";
import { cn } from "@/lib/utils";
import { rangeIsFree, useBookingDates } from "./BookingDatesContext";

type SubmitState = "idle" | "submitting" | "success" | "error" | "not-configured";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function BookingForm() {
  const t = useTranslations("booking.form");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [formLoadedAt] = useState(() => Date.now());

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BookingRequestInput>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      message: "",
      company: "",
      formLoadedAt,
    },
    mode: "onBlur",
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const dates = useBookingDates();

  // Calendar -> form: a click on the calendar fills the date inputs.
  // Runs only when the calendar bumps `revision`, never because of the form's own edits.
  useEffect(() => {
    if (dates.revision === 0) return;
    setValue("checkIn", dates.checkIn, { shouldValidate: !!dates.checkIn });
    setValue("checkOut", dates.checkOut, { shouldValidate: !!dates.checkOut });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates.revision]);

  // Form -> calendar: typing a date in the inputs highlights it in the calendar.
  useEffect(() => {
    dates.setDates(checkIn ?? "", checkOut ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIn, checkOut]);
  const tLoose = t as unknown as LooseT;

  async function onSubmit(values: BookingRequestInput) {
    if (!rangeIsFree(values.checkIn, values.checkOut, dates.nights)) {
      setError("checkIn", { type: "validate", message: "datesUnavailable" });
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const body = await res.json().catch(() => null);
      if (res.status === 503 || body?.error === "not_configured") {
        setStatus("not-configured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="flex flex-col items-center gap-4 p-8 text-center">
        <CheckCircle2 aria-hidden className="h-10 w-10 text-olive" />
        <h3 className="t-h3 text-ink">{t("successTitle")}</h3>
        <p className="max-w-md text-ink-soft">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
          className={buttonStyles({ variant: "secondary", className: "mt-2" })}
        >
          {t("sendAnother")}
        </button>
      </Card>
    );
  }

  if (status === "not-configured") {
    return (
      <Notice tone="warning" className="p-6">
        <p className="font-display text-xl text-ink">{t("notConfiguredTitle")}</p>
        <p className="mt-1 text-ink-soft">{t("notConfiguredBody")}</p>
      </Notice>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative rounded-card border border-cream-line bg-white p-6 shadow-soft sm:p-8"
    >
      {status === "error" ? (
        <Notice tone="warning" className="mb-6">
          <p className="font-medium">{t("errorTitle")}</p>
          <p className="mt-0.5">{t("errorBody")}</p>
        </Notice>
      ) : null}

      {/* Honeypot — left blank by real visitors, invisible but not display:none */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>
      <input type="hidden" {...register("formLoadedAt", { valueAsNumber: true })} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={t("name")} htmlFor="name" error={errors.name} t={tLoose}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label={t("email")} htmlFor="email" error={errors.email} t={tLoose}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
        </Field>

        <Field label={t("phone")} htmlFor="phone" error={errors.phone} t={tLoose}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            aria-invalid={!!errors.phone}
            className={inputClass(!!errors.phone)}
            {...register("phone")}
          />
        </Field>

        <Field label={t("guests")} htmlFor="guests" error={errors.guests} t={tLoose}>
          <input
            id="guests"
            type="number"
            min={1}
            max={20}
            inputMode="numeric"
            aria-invalid={!!errors.guests}
            className={inputClass(!!errors.guests)}
            {...register("guests")}
          />
        </Field>

        <Field label={t("checkIn")} htmlFor="checkIn" error={errors.checkIn} t={tLoose}>
          <input
            id="checkIn"
            type="date"
            min={todayIso()}
            aria-invalid={!!errors.checkIn}
            className={inputClass(!!errors.checkIn)}
            {...register("checkIn")}
          />
        </Field>

        <Field label={t("checkOut")} htmlFor="checkOut" error={errors.checkOut} t={tLoose}>
          <input
            id="checkOut"
            type="date"
            min={checkIn || todayIso()}
            aria-invalid={!!errors.checkOut}
            className={inputClass(!!errors.checkOut)}
            {...register("checkOut")}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label={t("message")} htmlFor="message" error={errors.message} t={tLoose}>
            <textarea
              id="message"
              rows={4}
              maxLength={MESSAGE_MAX_LENGTH}
              placeholder={t("messagePlaceholder")}
              aria-invalid={!!errors.message}
              className={inputClass(!!errors.message)}
              {...register("message")}
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || status === "submitting"}
        className={buttonStyles({
          variant: "primary",
          size: "lg",
          className: "mt-7 w-full sm:w-auto",
        })}
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    // 16px on purpose: smaller text makes iOS Safari zoom the page on focus.
    "min-h-12 w-full rounded-xl border bg-cream/40 px-4 py-2.5 text-[16px] text-ink placeholder:text-ink-faint focus-visible:bg-white",
    hasError
      ? "border-terracotta focus-visible:outline-terracotta"
      : "border-cream-line focus-visible:outline-terracotta"
  );
}

type LooseT = (key: string, values?: Record<string, unknown>) => string;

function Field({
  label,
  htmlFor,
  error,
  t,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: { message?: string };
  t: LooseT;
  children: ReactElement<{ "aria-describedby"?: string }>;
}) {
  const errorId = `${htmlFor}-error`;
  const input = isValidElement(children)
    ? cloneElement(children, {
        "aria-describedby": error?.message ? errorId : undefined,
      })
    : children;

  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {input}
      {error?.message ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-terracotta-dark">
          {t(`validation.${error.message}`)}
        </p>
      ) : null}
    </div>
  );
}
