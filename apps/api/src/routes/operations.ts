import type { FastifyPluginAsync } from "fastify"
import { prisma } from "@guardivex/database"
import { requirePermission } from "../middleware/rbac.js"

const limit = 100

export const operationsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/operations/denied-actions", { preHandler: [fastify.authenticate, requirePermission("audit:read")] }, async (request) => {
    const data = await prisma.auditLog.findMany({ where: { tenantId: request.auth!.tenantId, outcome: "denied" }, orderBy: { createdAt: "desc" }, take: limit })
    return { data }
  })

  fastify.get("/operations/session-history", { preHandler: [fastify.authenticate, requirePermission("sessions:read")] }, async (request) => {
    const data = await prisma.session.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { createdAt: "desc" }, take: limit, select: { id: true, userId: true, userAgent: true, ipAddress: true, deviceFingerprint: true, deviceName: true, lastSeenAt: true, expiresAt: true, revokedAt: true, createdAt: true } })
    return { data }
  })

  fastify.get("/operations/tenant-activity", { preHandler: [fastify.authenticate, requirePermission("audit:read")] }, async (request) => {
    const data = await prisma.auditLog.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { createdAt: "desc" }, take: limit })
    return { data }
  })

  fastify.get("/operations/device-health", { preHandler: [fastify.authenticate, requirePermission("devices:read")] }, async (request) => {
    const [devices, heartbeats] = await Promise.all([
      prisma.device.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { updatedAt: "desc" }, take: limit }),
      prisma.adapterHeartbeat.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { checkedAt: "desc" }, take: limit }),
    ])
    return { data: { devices, heartbeats } }
  })

  fastify.get("/operations/event-timeline", { preHandler: [fastify.authenticate, requirePermission("events:read")] }, async (request) => {
    const data = await prisma.event.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { occurredAt: "desc" }, take: limit })
    return { data }
  })

  fastify.get("/operations/incident-correlation", { preHandler: [fastify.authenticate, requirePermission("incidents:read")] }, async (request) => {
    const incidents = await prisma.incident.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { updatedAt: "desc" }, take: 50, include: { alert: { include: { sourceEvent: true } } } })
    return { data: incidents }
  })

  fastify.get("/operations/policy-evaluations", { preHandler: [fastify.authenticate, requirePermission("policies:read")] }, async (request) => {
    const data = await prisma.policyEvaluation.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { createdAt: "desc" }, take: limit })
    return { data }
  })
}
