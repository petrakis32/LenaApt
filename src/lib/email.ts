import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";
import type { BookingRequestValues } from "@/lib/validation/booking";

/**
 * Centralized email delivery. Reads SMTP credentials from
 * environment variables only — never hard-code them. Until
 * SMTP_HOST/SMTP_USER/SMTP_PASS and BOOKING_NOTIFICATION_EMAIL (or
 * siteConfig.contact.email) are set, `isEmailConfigured()` is false
 * and the booking API route reports "not configured" rather than
 * silently failing or pretending to succeed.
 */
export function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      getRecipientEmail()
  );
}

export function getRecipientEmail() {
  return process.env.BOOKING_NOTIFICATION_EMAIL || siteConfig.contact.email;
}

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendBookingRequestEmail(data: BookingRequestValues) {
  const recipient = getRecipientEmail();
  if (!recipient) {
    throw new Error("No booking notification recipient configured");
  }

  const transport = getTransport();
  const subject = `New booking request — ${data.name} (${data.checkIn} → ${data.checkOut})`;

  const text = [
    `New booking request for ${siteConfig.name}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    `Check-in: ${data.checkIn}`,
    `Check-out: ${data.checkOut}`,
    `Guests: ${data.guests}`,
    "",
    "Message:",
    data.message?.trim() ? data.message : "(none)",
  ].join("\n");

  const html = `
    <h2>New booking request for ${escapeHtml(siteConfig.name)}</h2>
    <table cellpadding="4" cellspacing="0">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
      <tr><td><strong>Check-in</strong></td><td>${escapeHtml(data.checkIn)}</td></tr>
      <tr><td><strong>Check-out</strong></td><td>${escapeHtml(data.checkOut)}</td></tr>
      <tr><td><strong>Guests</strong></td><td>${data.guests}</td></tr>
    </table>
    <p><strong>Message:</strong></p>
    <p>${data.message?.trim() ? escapeHtml(data.message) : "(none)"}</p>
  `;

  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: recipient,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
