/**
 * 6-character alphanumeric ID generator and formatter (e.g. "K9B3X7")
 * Uses high-legibility characters (omitting 0, 1, I, O to prevent confusion).
 */

const CHARS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateShortId(): string {
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
}

export function formatShortId(id?: string | null): string {
  if (!id) return "CC0001";
  const clean = id.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (clean.length <= 6) return clean;
  return clean.slice(0, 6);
}
