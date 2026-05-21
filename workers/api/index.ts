/**
 * guardivex API Worker — api.guardivex.com
 *
 * Deployed as a standalone Cloudflare Worker (separate from the Pages project).
 * Mount at: api.guardivex.com via a custom domain in the Cloudflare dashboard
 * or via `wrangler deploy` with the routes config below.
 *
 * Architecture
 * ─────────────
 *   api.guardivex.com/v1/auth/*      → auth sub-router
 *   api.guardivex.com/v1/devices/*   → devices sub-router
 *   api.guardivex.com/v1/sites/*     → sites sub-router
 *   api.guardivex.com/v1/alerts/*    → alerts sub-router
 *   api.guardivex.com/v1/incidents/* → incidents sub-router
 *   api.guardivex.com/v1/health      → health check (public)
 *   api.guardivex.com/v1/license     → license check (authenticated)
 *
 * All routes except /v1/health and /v1/auth/* require a valid Bearer JWT.
 *
 * Environment bindings (set in wrangler.toml / Cloudflare dashboard):
 *   JWT_SECRET   — HMAC-SHA256 secret used to verify access tokens
 *   API_VERSION  — e.g. "3.1" (optional, surfaced in X-API-Version header)
 */

export interface Env {
  JWT_SECRET: string
  API_VERSION?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = new Set([
  "https://app.guardivex.com",
  "https://www.guardivex.com",
  "https://docs.guardivex.com",
  // Vite dev server
  "http://localhost:5173",
  "http://localhost:5174",
])

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : ""
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Response helpers
// ─────────────────────────────────────────────────────────────────────────────

function jsonResponse(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  return Response.json(data, {
    status,
    headers: {
      "Content-Type": "application/json",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  })
}

function errorResponse(code: string, message: string, status: number, cors: Record<string, string>) {
  return jsonResponse({ error: { code, message } }, status, cors)
}

// ─────────────────────────────────────────────────────────────────────────────
// JWT verification (HS256 — symmetric, suitable for internal API)
// ─────────────────────────────────────────────────────────────────────────────

interface JwtPayload {
  sub: string
  role: string
  tenant: string
  iat: number
  exp: number
}

async function verifyJwt(token: string, secret: string): Promise<JwtPayload | null> {
  try {
    const [headerB64, payloadB64, sigB64] = token.split(".")
    if (!headerB64 || !payloadB64 || !sigB64) return null

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    )

    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`)
    const sigBytes = Uint8Array.from(
      atob(sigB64.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0),
    )

    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, data)
    if (!valid) return null

    const payload = JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null

    return payload as JwtPayload
  } catch {
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Route handlers
// ─────────────────────────────────────────────────────────────────────────────

function handleHealth(env: Env): Response {
  return jsonResponse({
    status: "ok",
    version: env.API_VERSION ?? "3.1",
    timestamp: new Date().toISOString(),
  })
}

function handleAuthToken(): Response {
  // In production: validate client_id/client_secret from a D1 database,
  // then sign and return a real JWT. This stub returns a demo response.
  return jsonResponse({
    access_token: "<signed-jwt>",
    token_type: "Bearer",
    expires_in: 900,
    refresh_token: "<refresh-token>",
  })
}

function handleDevices(payload: JwtPayload): Response {
  return jsonResponse({
    data: [],
    meta: { tenant: payload.tenant, total: 0, page: 1 },
  })
}

function handleSites(payload: JwtPayload): Response {
  return jsonResponse({
    data: [],
    meta: { tenant: payload.tenant, total: 0 },
  })
}

function handleAlerts(payload: JwtPayload): Response {
  return jsonResponse({
    data: [],
    meta: { tenant: payload.tenant, total: 0 },
  })
}

function handleIncidents(payload: JwtPayload): Response {
  return jsonResponse({
    data: [],
    meta: { tenant: payload.tenant, total: 0 },
  })
}

function handleLicense(payload: JwtPayload): Response {
  return jsonResponse({
    tenant: payload.tenant,
    tier: "enterprise",
    status: "active",
    licensed_sites: 50,
    licensed_devices: 5000,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Main fetch handler
// ─────────────────────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = request.headers.get("Origin")
    const cors = corsHeaders(origin)

    // Pre-flight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors })
    }

    const apiVersion = env.API_VERSION ?? "3.1"
    const sharedHeaders = {
      ...cors,
      "X-API-Version": apiVersion,
      "X-Content-Type-Options": "nosniff",
    }

    // ── Public routes ─────────────────────────────────────────────────────
    if (url.pathname === "/v1/health") {
      return new Response(handleHealth(env).body, {
        status: 200,
        headers: { ...handleHealth(env).headers, ...sharedHeaders },
      })
    }

    if (url.pathname === "/v1/auth/token" && request.method === "POST") {
      return new Response(handleAuthToken().body, {
        status: 200,
        headers: { ...handleAuthToken().headers, ...sharedHeaders },
      })
    }

    // ── Protected routes — require Bearer JWT ─────────────────────────────
    const authHeader = request.headers.get("Authorization") ?? ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
      return errorResponse("UNAUTHORIZED", "Missing Bearer token", 401, sharedHeaders)
    }

    const payload = await verifyJwt(token, env.JWT_SECRET)
    if (!payload) {
      return errorResponse("UNAUTHORIZED", "Invalid or expired token", 401, sharedHeaders)
    }

    // Route dispatch
    if (url.pathname.startsWith("/v1/devices")) return new Response(handleDevices(payload).body, { status: 200, headers: { ...handleDevices(payload).headers, ...sharedHeaders } })
    if (url.pathname.startsWith("/v1/sites"))   return new Response(handleSites(payload).body, { status: 200, headers: { ...handleSites(payload).headers, ...sharedHeaders } })
    if (url.pathname.startsWith("/v1/alerts"))  return new Response(handleAlerts(payload).body, { status: 200, headers: { ...handleAlerts(payload).headers, ...sharedHeaders } })
    if (url.pathname.startsWith("/v1/incidents")) return new Response(handleIncidents(payload).body, { status: 200, headers: { ...handleIncidents(payload).headers, ...sharedHeaders } })
    if (url.pathname === "/v1/license") return new Response(handleLicense(payload).body, { status: 200, headers: { ...handleLicense(payload).headers, ...sharedHeaders } })

    return errorResponse("NOT_FOUND", `No route matched ${url.pathname}`, 404, sharedHeaders)
  },
}
