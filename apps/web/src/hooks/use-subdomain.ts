/**
 * Subdomain detection and cross-subdomain navigation utilities.
 *
 * Subdomains:
 *   www   → public marketing site  (www.guardivex.com)
 *   app   → SOC dashboard / auth   (app.guardivex.com)
 *   docs  → documentation portal   (docs.guardivex.com)
 *
 * Dev usage:
 *   Add ?subdomain=app (or docs / www) to any localhost URL to simulate
 *   a different subdomain without extra DNS or virtual-host config.
 */

export type Subdomain = "www" | "app" | "docs"

const KNOWN_SUBDOMAINS: ReadonlySet<string> = new Set(["www", "app", "docs"])

/** Returns the active subdomain. Falls back to "www" for unknown subdomains. */
export function useSubdomain(): Subdomain {
  const { hostname, search } = window.location

  // Dev override: ?subdomain=app
  const params = new URLSearchParams(search)
  const override = params.get("subdomain")
  if (override && KNOWN_SUBDOMAINS.has(override)) {
    return override as Subdomain
  }

  // Localhost / bare IP → default to www
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.")
  if (isLocalhost) return "www"

  // Extract leftmost label: app.guardivex.com → "app"
  const sub = hostname.split(".")[0].toLowerCase()
  return KNOWN_SUBDOMAINS.has(sub) ? (sub as Subdomain) : "www"
}

/**
 * Returns a fully-qualified URL for a given subdomain + path.
 * On localhost it preserves the dev-override query parameter.
 *
 * @example
 *   getSubdomainUrl("app", "/dashboard")
 *   // prod  → "https://app.guardivex.com/dashboard"
 *   // local → "http://localhost:5173/dashboard?subdomain=app"
 */
export function getSubdomainUrl(subdomain: Subdomain, path = "/"): string {
  const { hostname, port, protocol } = window.location
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.")

  if (isLocalhost) {
    const portSuffix = port ? `:${port}` : ""
    const query = `?subdomain=${subdomain}`
    return `${protocol}//${hostname}${portSuffix}${path}${query}`
  }

  // Swap or prepend subdomain label on the real domain
  const parts = hostname.split(".")
  const baseDomain =
    parts.length >= 3
      ? parts.slice(1).join(".")     // strip existing subdomain
      : parts.join(".")              // already bare domain
  return `${protocol}//${subdomain}.${baseDomain}${path}`
}
