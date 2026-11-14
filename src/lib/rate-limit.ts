/**
 * Minimal in-memory rate limiter for the booking form. Resets on
 * server restart and is per-instance only (not shared across
 * serverless replicas) — sufficient as a first line of defense
 * against basic spam floods; upgrade to a shared store (e.g. Redis)
 * if the site moves to a multi-instance deployment.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}
