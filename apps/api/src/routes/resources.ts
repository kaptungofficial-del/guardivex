import type { FastifyPluginAsync } from "fastify"
import { z } from "zod"
import { Prisma, prisma } from "@guardivex/database"
import { requirePermission } from "../middleware/rbac.js"
import { writeAuditLog } from "../services/audit.js"

const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
})

const siteCreateSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  timezone: z.string().default("UTC"),
})

const deviceCreateSchema = z.object({
  siteId: z.string().uuid().optional(),
  doorId: z.string().uuid().optional(),
  name: z.string().min(1),
  type: z.enum(["camera", "nvr", "access_control_panel", "door_contact", "alarm_panel", "network_switch", "sensor", "server"]),
  vendor: z.string().optional(),
  model: z.string().optional(),
  ipAddress: z.string().optional(),
})

const eventCreateSchema = z.object({
  siteId: z.string().uuid().optional(),
  deviceId: z.string().uuid().optional(),
  type: z.string().min(1),
  severity: z.enum(["info", "low", "medium", "high", "critical"]).default("info"),
  message: z.string().min(1),
  payload: z.record(z.unknown()).default({}),
})

export const resourceRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/users", { preHandler: [fastify.authenticate, requirePermission("users:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const users = await prisma.user.findMany({
      where: { tenantId: request.auth!.tenantId },
      select: { id: true, email: true, name: true, status: true, lastLoginAt: true, createdAt: true },
      take: query.limit,
      skip: query.offset,
      orderBy: { createdAt: "desc" },
    })
    return { data: users }
  })

  fastify.get("/sites", { preHandler: [fastify.authenticate, requirePermission("sites:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const sites = await prisma.site.findMany({ where: { tenantId: request.auth!.tenantId }, take: query.limit, skip: query.offset, orderBy: { name: "asc" } })
    return { data: sites }
  })

  fastify.post("/sites", { preHandler: [fastify.authenticate, requirePermission("sites:write")] }, async (request) => {
    const body = siteCreateSchema.parse(request.body)
    const site = await prisma.site.create({ data: { tenantId: request.auth!.tenantId, ...body } })
    await writeAuditLog(request, { action: "site.create", resource: "site", resourceId: site.id, outcome: "success" })
    return { data: site }
  })

  fastify.get("/devices", { preHandler: [fastify.authenticate, requirePermission("devices:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const devices = await prisma.device.findMany({ where: { tenantId: request.auth!.tenantId }, take: query.limit, skip: query.offset, orderBy: { name: "asc" } })
    return { data: devices }
  })

  fastify.post("/devices", { preHandler: [fastify.authenticate, requirePermission("devices:write")] }, async (request) => {
    const body = deviceCreateSchema.parse(request.body)
    if (body.siteId) {
      const site = await prisma.site.findFirst({ where: { id: body.siteId, tenantId: request.auth!.tenantId }, select: { id: true } })
      if (!site) throw fastify.httpErrors.forbidden("Site is outside tenant scope or missing")
    }
    if (body.doorId) {
      const door = await prisma.door.findFirst({ where: { id: body.doorId, tenantId: request.auth!.tenantId }, select: { id: true } })
      if (!door) throw fastify.httpErrors.forbidden("Door is outside tenant scope or missing")
    }
    const device = await prisma.device.create({ data: { tenantId: request.auth!.tenantId, ...body } })
    await writeAuditLog(request, { action: "device.create", resource: "device", resourceId: device.id, outcome: "success" })
    return { data: device }
  })

  fastify.get("/events", { preHandler: [fastify.authenticate, requirePermission("events:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const events = await prisma.event.findMany({ where: { tenantId: request.auth!.tenantId }, take: query.limit, skip: query.offset, orderBy: { occurredAt: "desc" } })
    return { data: events }
  })

  fastify.post("/events", { preHandler: [fastify.authenticate, requirePermission("events:write")] }, async (request) => {
    const body = eventCreateSchema.parse(request.body)
    if (body.siteId) {
      const site = await prisma.site.findFirst({ where: { id: body.siteId, tenantId: request.auth!.tenantId }, select: { id: true } })
      if (!site) throw fastify.httpErrors.forbidden("Site is outside tenant scope or missing")
    }
    if (body.deviceId) {
      const device = await prisma.device.findFirst({ where: { id: body.deviceId, tenantId: request.auth!.tenantId }, select: { id: true } })
      if (!device) throw fastify.httpErrors.forbidden("Device is outside tenant scope or missing")
    }
    const event = await prisma.event.create({ data: { tenantId: request.auth!.tenantId, ...body, payload: body.payload as Prisma.InputJsonValue } })
    await writeAuditLog(request, { action: "event.ingest", resource: "event", resourceId: event.id, outcome: "success" })
    return { data: event }
  })

  fastify.get("/alerts", { preHandler: [fastify.authenticate, requirePermission("alerts:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const alerts = await prisma.alert.findMany({ where: { tenantId: request.auth!.tenantId }, take: query.limit, skip: query.offset, orderBy: { createdAt: "desc" } })
    return { data: alerts }
  })

  fastify.get("/audit", { preHandler: [fastify.authenticate, requirePermission("audit:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const logs = await prisma.auditLog.findMany({ where: { tenantId: request.auth!.tenantId }, take: query.limit, skip: query.offset, orderBy: { createdAt: "desc" } })
    return { data: logs }
  })
}
