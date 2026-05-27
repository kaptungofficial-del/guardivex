import type { FastifyPluginAsync } from "fastify"
import { randomBytes, createHash } from "node:crypto"
import argon2 from "argon2"
import { prisma } from "@guardivex/database"
import { loginRequestSchema, refreshTokenRequestSchema } from "@guardivex/shared"
import { env } from "../config/env.js"
import { assertLoginAllowed, recordLoginAttempt } from "../services/brute-force.js"
import { writeAuditLog } from "../services/audit.js"
import { createCsrfToken, setCsrfCookie } from "../middleware/csrf.js"

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex")
}

function createOpaqueToken() {
  return randomBytes(48).toString("base64url")
}

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/auth/csrf", async (_request, reply) => {
    const token = createCsrfToken()
    setCsrfCookie(reply, token)
    return { csrfToken: token }
  })

  fastify.post("/auth/login", async (request, reply) => {
    const credentials = loginRequestSchema.parse(request.body)
    assertLoginAllowed(credentials.email, request.ip)
    const user = await prisma.user.findFirst({
      where: { email: credentials.email.toLowerCase(), status: "active" },
      include: {
        roles: {
          include: {
            role: { include: { permissions: { include: { permission: true } } } },
          },
        },
      },
    })

    if (!user || !(await argon2.verify(user.passwordHash, credentials.password))) {
      recordLoginAttempt(credentials.email, request.ip, false)
      await prisma.loginAttempt.create({ data: { email: credentials.email.toLowerCase(), ipAddress: request.ip, userAgent: request.headers["user-agent"], success: false, reason: "invalid_credentials" } })
      await reply.unauthorized("Invalid email or password")
      return
    }

    recordLoginAttempt(credentials.email, request.ip, true)

    const permissions = Array.from(new Set(user.roles.flatMap((entry) => entry.role.permissions.map((permission) => permission.permission.key))))
    const roles = user.roles.map((entry) => entry.role.name)
    const accessToken = fastify.jwt.sign({ sub: user.id, tenantId: user.tenantId }, { expiresIn: "15m" })
    const refreshToken = createOpaqueToken()

    await prisma.session.create({
      data: {
        tenantId: user.tenantId,
        userId: user.id,
        refreshTokenHash: sha256(refreshToken),
        userAgent: request.headers["user-agent"],
        ipAddress: request.ip,
        deviceFingerprint: typeof request.headers["x-device-fingerprint"] === "string" ? request.headers["x-device-fingerprint"] : undefined,
        deviceName: typeof request.headers["x-device-name"] === "string" ? request.headers["x-device-name"] : undefined,
        lastSeenAt: new Date(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    })
    await prisma.loginAttempt.create({ data: { tenantId: user.tenantId, email: user.email, ipAddress: request.ip, userAgent: request.headers["user-agent"], success: true } })

    reply.setCookie(env.REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/auth",
      maxAge: 60 * 60 * 24 * 30,
    })

    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
    request.auth = { userId: user.id, tenantId: user.tenantId, email: user.email, roles: roles as never, permissions: permissions as never }
    await writeAuditLog(request, { action: "auth.login", resource: "session", outcome: "success" })

    return {
      accessToken,
      expiresIn: 900,
      user: {
        id: user.id,
        tenantId: user.tenantId,
        email: user.email,
        name: user.name,
        roles,
        permissions,
      },
    }
  })

  fastify.post("/auth/refresh", async (request, reply) => {
    const body = refreshTokenRequestSchema.partial().parse(request.body ?? {})
    const refreshToken = body.refreshToken ?? request.cookies[env.REFRESH_COOKIE_NAME]
    if (!refreshToken) {
      await reply.unauthorized("Invalid refresh token")
      return
    }
    const session = await prisma.session.findUnique({
      where: { refreshTokenHash: sha256(refreshToken) },
      include: { user: true },
    })

    if (!session || session.revokedAt || session.expiresAt <= new Date() || session.user.status !== "active") {
      await reply.unauthorized("Invalid refresh token")
      return
    }

    const accessToken = fastify.jwt.sign({ sub: session.userId, tenantId: session.tenantId }, { expiresIn: "15m" })
    await prisma.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date(), ipAddress: request.ip, userAgent: request.headers["user-agent"] } })
    return { accessToken, expiresIn: 900 }
  })

  fastify.get("/auth/me", { preHandler: [fastify.authenticate] }, async (request) => {
    return { user: request.auth }
  })

  fastify.post("/auth/logout", { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const refreshToken = request.cookies[env.REFRESH_COOKIE_NAME]
    if (refreshToken) {
      await prisma.session.updateMany({ where: { tenantId: request.auth!.tenantId, refreshTokenHash: sha256(refreshToken), revokedAt: null }, data: { revokedAt: new Date() } })
    }
    reply.clearCookie(env.REFRESH_COOKIE_NAME, { path: "/auth" })
    await writeAuditLog(request, { action: "auth.logout", resource: "session", outcome: "success" })
    return { ok: true }
  })
}
