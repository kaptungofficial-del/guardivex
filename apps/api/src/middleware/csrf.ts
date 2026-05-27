import type { FastifyReply, FastifyRequest } from "fastify"
import { randomBytes, timingSafeEqual } from "node:crypto"
import { env } from "../config/env.js"

const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"])

export function createCsrfToken() {
  return randomBytes(32).toString("base64url")
}

function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export async function csrfProtection(request: FastifyRequest, reply: FastifyReply) {
  if (!env.CSRF_REQUIRED || !unsafeMethods.has(request.method)) return
  if (request.url === "/auth/csrf") return

  const cookieValue = request.cookies[env.CSRF_COOKIE_NAME]
  const headerValue = request.headers["x-csrf-token"]
  const token = Array.isArray(headerValue) ? headerValue[0] : headerValue

  if (!cookieValue || !token || !safeEquals(cookieValue, token)) {
    await reply.code(403).send({ error: { code: "CSRF_VALIDATION_FAILED", message: "CSRF token is missing or invalid" } })
  }
}

export function setCsrfCookie(reply: FastifyReply, token: string) {
  reply.setCookie(env.CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  })
}
