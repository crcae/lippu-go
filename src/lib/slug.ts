export function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9-\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isReservedSlug(slug: string): boolean {
  const reserved = new Set([
    "admin",
    "api",
    "out",
    "login",
    "logout",
    "health",
    "robots.txt",
    "sitemap.xml",
    "favicon.ico",
  ]);
  return reserved.has(slug);
}
