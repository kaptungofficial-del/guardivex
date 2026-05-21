/**
 * Cloudflare Pages Functions — global middleware
 * Runs at the edge before every request on this Pages deployment.
 *
 * Responsibilities
 * ─────────────────
 * 1. Security headers on every response (OWASP baseline)
 * 2. X-Subdomain header so client-side code can optionally read the
 *    resolved subdomain from a cookie/header on first paint.
 * 3. Hard-redirect bare domain (guardivex.com) → www.guardivex.com
 * 4. Pass-through to the static asset handler.
 *
 * @see https://developers.cloudflare.com/pages/functions/middleware/
 */

import type { PagesFunction } from "@cloudflare/workers-types"

interface Env {
  /** Injected automatically by Cloudflare Pages — do not add to wrangler config */
  ASSETS: Fetcher
}

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",   // tighten when you add a nonce pipeline
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.guardivex.com",
    "frame-ancestors 'none'",
  ].join("; "),
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context
  const url = new URL(request.url)
  const hostname = url.hostname

  // ── Bare-domain redirect ──────────────────────────────────────────────────
  // guardivex.com → www.guardivex.com
  if (hostname === "guardivex.com") {
    return Response.redirect(
      `https://www.guardivex.com${url.pathname}${url.search}`,
      301,
    )
  }

  // ── Derive subdomain label ────────────────────────────────────────────────
  const parts = hostname.split(".")
  const subdomain = parts.length >= 3 ? parts[0] : "www"

  // ── Serve the static SPA and attach headers ───────────────────────────────
  const response = await context.next()

  const enriched = new Response(response.body, response)

  // Security headers
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    enriched.headers.set(key, value)
  }

  // Diagnostic / routing header (readable by the SPA on SSR-like setups)
  enriched.headers.set("X-Guardivex-Subdomain", subdomain)

  return enriched
}
