import type { FastifyPluginAsync } from "fastify"
import { createHash, randomBytes } from "node:crypto"
import { z } from "zod"
import { Prisma, prisma } from "@guardivex/database"
import { requirePermission } from "../middleware/rbac.js"
import { writeAuditLog } from "../services/audit.js"

const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
})

const idParamsSchema = z.object({ id: z.string().uuid() })

const siteCreateSchema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  timezone: z.string().default("UTC"),
})

const buildingCreateSchema = z.object({
  siteId: z.string().uuid(),
  name: z.string().min(1),
  code: z.string().optional(),
  address: z.string().optional(),
  metadata: z.record(z.unknown()).default({}),
})

const doorCreateSchema = z.object({
  siteId: z.string().uuid(),
  buildingId: z.string().uuid().optional(),
  name: z.string().min(1),
  location: z.string().optional(),
})

const deviceTypeCatalogCreateSchema = z.object({
  key: z.enum(["camera", "nvr", "access_control_panel", "door_contact", "alarm_panel", "network_switch", "sensor", "server"]),
  label: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).default({}),
})

const deviceCreateSchema = z.object({
  siteId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  doorId: z.string().uuid().optional(),
  deviceTypeCatalogId: z.string().uuid().optional(),
  name: z.string().min(1),
  type: z.enum(["camera", "nvr", "access_control_panel", "door_contact", "alarm_panel", "network_switch", "sensor", "server"]),
  vendor: z.string().optional(),
  model: z.string().optional(),
  ipAddress: z.string().optional(),
})

const integrationCreateSchema = z.object({
  name: z.string().min(1),
  vendor: z.string().min(1),
  type: z.string().min(1),
  config: z.record(z.unknown()).default({}),
})

const apiKeyCreateSchema = z.object({
  name: z.string().min(1),
  scopes: z.array(z.string()).default([]),
  expiresAt: z.string().datetime().optional(),
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

  fastify.get("/buildings", { preHandler: [fastify.authenticate, requirePermission("sites:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const buildings = await prisma.building.findMany({ where: { tenantId: request.auth!.tenantId }, take: query.limit, skip: query.offset, orderBy: { name: "asc" } })
    return { data: buildings }
  })

  fastify.post("/buildings", { preHandler: [fastify.authenticate, requirePermission("sites:write")] }, async (request) => {
    const body = buildingCreateSchema.parse(request.body)
    const site = await prisma.site.findFirst({ where: { id: body.siteId, tenantId: request.auth!.tenantId }, select: { id: true } })
    if (!site) throw fastify.httpErrors.forbidden("Site is outside tenant scope or missing")

    const building = await prisma.building.create({ data: { tenantId: request.auth!.tenantId, ...body, metadata: body.metadata as Prisma.InputJsonValue } })
    await writeAuditLog(request, { action: "building.create", resource: "building", resourceId: building.id, outcome: "success" })
    return { data: building }
  })

  fastify.get("/doors", { preHandler: [fastify.authenticate, requirePermission("devices:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const doors = await prisma.door.findMany({ where: { tenantId: request.auth!.tenantId }, take: query.limit, skip: query.offset, orderBy: { name: "asc" } })
    return { data: doors }
  })

  fastify.post("/doors", { preHandler: [fastify.authenticate, requirePermission("devices:write")] }, async (request) => {
    const body = doorCreateSchema.parse(request.body)
    const [site, building] = await Promise.all([
      prisma.site.findFirst({ where: { id: body.siteId, tenantId: request.auth!.tenantId }, select: { id: true } }),
      body.buildingId ? prisma.building.findFirst({ where: { id: body.buildingId, tenantId: request.auth!.tenantId, siteId: body.siteId }, select: { id: true } }) : Promise.resolve(null),
    ])
    if (!site) throw fastify.httpErrors.forbidden("Site is outside tenant scope or missing")
    if (body.buildingId && !building) throw fastify.httpErrors.forbidden("Building is outside tenant scope or missing")

    const door = await prisma.door.create({ data: { tenantId: request.auth!.tenantId, ...body } })
    await writeAuditLog(request, { action: "door.create", resource: "door", resourceId: door.id, outcome: "success" })
    return { data: door }
  })

  fastify.get("/device-types", { preHandler: [fastify.authenticate, requirePermission("devices:read")] }, async (request) => {
    const catalog = await prisma.deviceTypeCatalog.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: [{ category: "asc" }, { label: "asc" }] })
    return { data: catalog }
  })

  fastify.post("/device-types", { preHandler: [fastify.authenticate, requirePermission("devices:write")] }, async (request) => {
    const body = deviceTypeCatalogCreateSchema.parse(request.body)
    const catalogItem = await prisma.deviceTypeCatalog.create({ data: { tenantId: request.auth!.tenantId, ...body, metadata: body.metadata as Prisma.InputJsonValue } })
    await writeAuditLog(request, { action: "device_type.create", resource: "deviceType", resourceId: catalogItem.id, outcome: "success" })
    return { data: catalogItem }
  })

  fastify.get("/devices", { preHandler: [fastify.authenticate, requirePermission("devices:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const devices = await prisma.device.findMany({ where: { tenantId: request.auth!.tenantId }, include: { site: true, building: true, door: true, deviceTypeCatalog: true }, take: query.limit, skip: query.offset, orderBy: { name: "asc" } })
    return { data: devices }
  })

  fastify.get("/devices/:id", { preHandler: [fastify.authenticate, requirePermission("devices:read")] }, async (request, reply) => {
    const params = idParamsSchema.parse(request.params)
    const device = await prisma.device.findFirst({
      where: { id: params.id, tenantId: request.auth!.tenantId },
      include: { site: true, building: true, door: true, deviceTypeCatalog: true, events: { orderBy: { occurredAt: "desc" }, take: 25 }, alerts: { orderBy: { createdAt: "desc" }, take: 25 } },
    })
    if (!device) {
      await reply.notFound("Device not found")
      return
    }
    await writeAuditLog(request, { action: "device.view", resource: "device", resourceId: device.id, outcome: "success" })
    return { data: device }
  })

  fastify.post("/devices", { preHandler: [fastify.authenticate, requirePermission("devices:write")] }, async (request) => {
    const body = deviceCreateSchema.parse(request.body)
    if (body.siteId) {
      const site = await prisma.site.findFirst({ where: { id: body.siteId, tenantId: request.auth!.tenantId }, select: { id: true } })
      if (!site) throw fastify.httpErrors.forbidden("Site is outside tenant scope or missing")
    }
    if (body.buildingId) {
      const building = await prisma.building.findFirst({ where: { id: body.buildingId, tenantId: request.auth!.tenantId, ...(body.siteId ? { siteId: body.siteId } : {}) }, select: { id: true } })
      if (!building) throw fastify.httpErrors.forbidden("Building is outside tenant scope or missing")
    }
    if (body.doorId) {
      const door = await prisma.door.findFirst({ where: { id: body.doorId, tenantId: request.auth!.tenantId }, select: { id: true } })
      if (!door) throw fastify.httpErrors.forbidden("Door is outside tenant scope or missing")
    }
    if (body.deviceTypeCatalogId) {
      const catalogItem = await prisma.deviceTypeCatalog.findFirst({ where: { id: body.deviceTypeCatalogId, tenantId: request.auth!.tenantId }, select: { id: true } })
      if (!catalogItem) throw fastify.httpErrors.forbidden("Device type catalog item is outside tenant scope or missing")
    }
    const device = await prisma.device.create({ data: { tenantId: request.auth!.tenantId, ...body } })
    await writeAuditLog(request, { action: "device.create", resource: "device", resourceId: device.id, outcome: "success" })
    return { data: device }
  })

  fastify.get("/integrations", { preHandler: [fastify.authenticate, requirePermission("devices:read")] }, async (request) => {
    const query = paginationSchema.parse(request.query)
    const integrations = await prisma.integration.findMany({ where: { tenantId: request.auth!.tenantId }, take: query.limit, skip: query.offset, orderBy: { createdAt: "desc" } })
    return { data: integrations }
  })

  fastify.post("/integrations", { preHandler: [fastify.authenticate, requirePermission("devices:write")] }, async (request) => {
    const body = integrationCreateSchema.parse(request.body)
    const integration = await prisma.integration.create({ data: { tenantId: request.auth!.tenantId, ...body, config: body.config as Prisma.InputJsonValue } })
    await writeAuditLog(request, { action: "integration.create", resource: "integration", resourceId: integration.id, outcome: "success" })
    return { data: integration }
  })

  fastify.get("/api-keys", { preHandler: [fastify.authenticate, requirePermission("users:read")] }, async (request) => {
    const keys = await prisma.apiKey.findMany({
      where: { tenantId: request.auth!.tenantId },
      select: { id: true, name: true, keyPrefix: true, scopes: true, lastUsedAt: true, expiresAt: true, revokedAt: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    })
    return { data: keys }
  })

  fastify.post("/api-keys", { preHandler: [fastify.authenticate, requirePermission("users:write")] }, async (request) => {
    const body = apiKeyCreateSchema.parse(request.body)
    const secret = `gvx_${randomBytes(32).toString("base64url")}`
    const apiKey = await prisma.apiKey.create({
      data: {
        tenantId: request.auth!.tenantId,
        name: body.name,
        keyPrefix: secret.slice(0, 12),
        keyHash: createHash("sha256").update(secret).digest("hex"),
        scopes: body.scopes as Prisma.InputJsonValue,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
      },
      select: { id: true, name: true, keyPrefix: true, scopes: true, expiresAt: true, createdAt: true },
    })
    await writeAuditLog(request, { action: "api_key.create", resource: "apiKey", resourceId: apiKey.id, outcome: "success" })
    return { data: { ...apiKey, secret } }
  })

  fastify.post("/api-keys/:id/revoke", { preHandler: [fastify.authenticate, requirePermission("users:write")] }, async (request, reply) => {
    const params = idParamsSchema.parse(request.params)
    const key = await prisma.apiKey.findFirst({ where: { id: params.id, tenantId: request.auth!.tenantId, revokedAt: null }, select: { id: true } })
    if (!key) {
      await reply.notFound("API key not found")
      return
    }
    const revoked = await prisma.apiKey.update({ where: { id: key.id }, data: { revokedAt: new Date() }, select: { id: true, revokedAt: true } })
    await writeAuditLog(request, { action: "api_key.revoke", resource: "apiKey", resourceId: key.id, outcome: "success" })
    return { data: revoked }
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
