import type { FastifyPluginAsync } from "fastify"
import { Prisma, prisma } from "@guardivex/database"
import { getReadOnlyAdapter, listReadOnlyAdapters } from "@guardivex/adapters"
import { enqueue, queueNames } from "@guardivex/queues"
import { normalizedEventSchema, vendorRawEventSchema } from "@guardivex/shared"
import { env } from "../config/env.js"
import { requirePermission } from "../middleware/rbac.js"
import { writeAuditLog } from "../services/audit.js"

export const eventRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/adapters", { preHandler: [fastify.authenticate, requirePermission("devices:read")] }, async () => {
    return { data: listReadOnlyAdapters().map((adapter) => ({ vendor: adapter.vendor, capabilities: adapter.capabilities })) }
  })

  fastify.post("/events/ingest", { preHandler: [fastify.authenticate, requirePermission("events:write")] }, async (request, reply) => {
    const rawEvent = vendorRawEventSchema.parse({ ...(request.body as object), tenantId: request.auth!.tenantId })
    const adapter = getReadOnlyAdapter(rawEvent.sourceVendor)
    if (!adapter) {
      await reply.badRequest(`No read-only adapter registered for ${rawEvent.sourceVendor}`)
      return
    }

    await enqueue(queueNames.eventIngestion, rawEvent, { redisUrl: env.REDIS_URL })
    const normalized = normalizedEventSchema.parse(await adapter.ingestEvent(rawEvent))
    const event = await prisma.event.create({
      data: {
        tenantId: normalized.tenantId,
        siteId: normalized.siteId,
        deviceId: normalized.deviceId,
        type: normalized.type,
        severity: normalized.severity,
        message: `${normalized.sourceVendor} ${normalized.type}`,
        payload: normalized.normalizedPayload as Prisma.InputJsonValue,
        sourceVendor: normalized.sourceVendor,
        sourceDevice: normalized.sourceDevice,
        rawPayload: normalized.rawPayload as Prisma.InputJsonValue,
        normalizedPayload: normalized.normalizedPayload as Prisma.InputJsonValue,
        correlationId: normalized.correlationId,
        occurredAt: new Date(normalized.timestamp),
      },
    })
    await enqueue(queueNames.eventProcessing, normalized, { redisUrl: env.REDIS_URL })
    await writeAuditLog(request, { action: "event.ingest", resource: "event", resourceId: event.id, outcome: "success", metadata: { correlationId: normalized.correlationId } })
    return { data: event, normalized }
  })
}
