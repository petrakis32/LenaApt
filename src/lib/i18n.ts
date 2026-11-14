/**
 * next-intl types translation keys as a strict literal union, which
 * breaks for keys built from runtime data (e.g. `items.${id}.title`
 * where `id` comes from a config array). Use this to loosen the type
 * at the specific call sites that need a dynamic key — keep the
 * regular typed `t` for everything else in the same file.
 */
export type LooseT = (key: string, values?: Record<string, unknown>) => string;

export function asLooseT(t: unknown): LooseT {
  return t as LooseT;
}
