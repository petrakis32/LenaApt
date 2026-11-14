import { z } from "zod";

/**
 * Shared between the booking form (client) and the API route
 * (server) so both validate the same rules. Error `message` values
 * are short codes, not user-facing text — the form resolves them via
 * `t(\`validation.${code}\`)` in messages/*.json, so this file stays
 * language-agnostic.
 */
export const MESSAGE_MAX_LENGTH = 1000;

const isoDate = z
  .string()
  .min(1, "required")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "invalidDate");

export const bookingRequestSchema = z
  .object({
    name: z.string().trim().min(1, "required").max(120, "required"),
    email: z.string().trim().min(1, "required").email("invalidEmail"),
    phone: z
      .string()
      .trim()
      .min(1, "required")
      .max(30, "invalidPhone")
      .regex(/^[+0-9()\-\s]{6,30}$/, "invalidPhone"),
    checkIn: isoDate,
    checkOut: isoDate,
    guests: z.coerce
      .number()
      .int("minGuests")
      .min(1, "minGuests")
      .max(20, "maxGuests"),
    message: z
      .string()
      .trim()
      .max(MESSAGE_MAX_LENGTH, "messageTooLong")
      .optional()
      .or(z.literal("")),
    /** Honeypot — must stay empty. Real visitors never see or fill this field. */
    company: z.string().max(0).optional().or(z.literal("")),
    /** Client timestamp (ms) the form mounted — used server-side for a minimum fill-time bot check. */
    formLoadedAt: z.coerce.number().optional(),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "checkOutAfterCheckIn",
    path: ["checkOut"],
  })
  .refine((data) => data.checkIn >= todayIsoDate(), {
    message: "checkInPast",
    path: ["checkIn"],
  });

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export type BookingRequestInput = z.input<typeof bookingRequestSchema>;
export type BookingRequestValues = z.output<typeof bookingRequestSchema>;
