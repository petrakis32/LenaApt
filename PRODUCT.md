# Lena Apt — product notes

**What it is:** a direct-booking website for a two-bedroom holiday apartment in Rethymno, Crete (Greek default, English). Guests browse photos, check the availability calendar and send a booking *request*; the owners confirm personally by email/phone. No payments or instant booking.

**Audience:** mostly Greek-speaking and international leisure travelers (couples, families, friends up to 6 guests) comparing Airbnb/Booking.com listings; mobile-first.

**Durable constraints**
- Booking requests are requests, never confirmations; the calendar is indicative (Airbnb + Booking.com iCal feeds, hourly refresh; manual ranges in `src/config/availability.ts`).
- Real secrets (iCal URLs, SMTP, owner phone/WhatsApp/email) live only in `.env.local` / hosting env vars, never in tracked files (public repo). Names of the variables are in `.env.example`.
- Never invent facts: contact details are still "coming soon" (`src/config/site.ts`), nearby places are only the real entries in `src/config/location.ts`.
- Booking behavior (zod schema, honeypot, rate limit, email, calendar⇄form sync, "dates already booked" check) must keep working through any redesign.

- Guest ratings/reviews are never invented: only real values from the owner go into `src/config/reviews.ts` (platform scores, counts, public listing URLs, verbatim quotes). Empty values render as "coming soon" placeholders.

**Known open items:** owner phone/WhatsApp/email; more nearby places (beaches, restaurants, cafés, supermarkets); in `config/reviews.ts`: Airbnb rating, review counts and public listing URLs for all three platforms, and review quotes (Google 4.8/5 and Booking.com 10/10 are already filled, supplied by the owner); production env vars on the host (iCal URLs, SMTP).
