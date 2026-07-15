const DEFAULT_ALLOWED_HOSTS = ["lippu.app", "eventos.lippu.app", "www.lippu.app"];

export function getAllowedHosts(): string[] | "all" {
  const raw = process.env.ALLOWED_TARGET_HOSTS;
  if (!raw) return DEFAULT_ALLOWED_HOSTS;
  if (raw.trim().toLowerCase() === "all") return "all";
  return raw
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function validateTargetUrl(value: string): { ok: true; url: string } | { ok: false; error: string } {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return { ok: false, error: "La URL destino no es válida." };
  }

  if (parsed.protocol !== "https:") {
    return { ok: false, error: "La URL destino debe iniciar con https://" };
  }

  const allowedHosts = getAllowedHosts();
  if (allowedHosts !== "all") {
    const host = parsed.hostname.toLowerCase();
    const allowed = allowedHosts.some((allowedHost) => host === allowedHost || host.endsWith(`.${allowedHost}`));
    if (!allowed) {
      return {
        ok: false,
        error: `El destino debe pertenecer a: ${allowedHosts.join(", ")}. Ajusta ALLOWED_TARGET_HOSTS si necesitas otro dominio.`,
      };
    }
  }

  return { ok: true, url: parsed.toString() };
}

export function displayHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
