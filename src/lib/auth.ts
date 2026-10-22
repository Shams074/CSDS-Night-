/**
 * Centralized authorization check for administrative users.
 */

export const DEFAULT_ADMIN_EMAILS = [
  "eliaj3618@gmail.com",
  "admin@csds.uop.edu.pk",
  "president.csds@gmail.com",
];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = String(email).trim().toLowerCase();

  const envList = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  // If wildcard '*' is in env, allow any valid authenticated user
  if (envList.includes("*")) {
    return true;
  }

  const allAdmins = new Set([
    ...envList,
    ...DEFAULT_ADMIN_EMAILS.map((e) => e.toLowerCase()),
  ]);

  return allAdmins.has(cleanEmail);
}
