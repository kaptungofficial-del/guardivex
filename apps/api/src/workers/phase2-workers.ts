import { Prisma, prisma } from "@guardivex/database"
import { getReadOnlyAdapter } from "@guardivex/adapters"
import { createStructuredWorker, queueNames } from "@guardivex/queues"
import { normalizedEventSchema, vendorRawEventSchema } from "@guardivex/shared"
import { env } from "../config/env.js"

export function startPhase2Workers() {
  const redisUrl = env.REDIS_URL

  return [
    createStructuredWorker(queueNames.eventIngestion, async (job) => {
      const rawEvent = vendorRawEventSchema.parse(job.data)
      const adapter = getReadOnlyAdapter(rawEvent.sourceVendor)
      if (!adapter) throw new Error(`No read-only adapter for ${rawEvent.sourceVendor}`)
      return adapter.ingestEvent(rawEvent)
    }, { redisUrl }),

    createStructuredWorker(queueNames.eventProcessing, async (job) => {
      const event = normalizedEventSchema.parse(job.data)
      const existing = await prisma.event.findFirst({
        where: { tenantId: event.tenantId, correlationId: event.correlationId },
        select: { id: true },
      })
      if (existing) return

      await prisma.event.create({
        data: {
          tenantId: event.tenantId,
          siteId: event.siteId,
          deviceId: event.deviceId,
          type: event.type,
          severity: event.severity,
          message: `${event.sourceVendor} ${event.type}`,
          payload: event.normalizedPayload as Prisma.InputJsonValue,
          sourceVendor: event.sourceVendor,
          sourceDevice: event.sourceDevice,
          rawPayload: event.rawPayload as Prisma.InputJsonValue,
          normalizedPayload: event.normalizedPayload as Prisma.InputJsonValue,
          correlationId: event.correlationId,
          occurredAt: new Date(event.timestamp),
        },
      })
    }, { redisUrl }),

    createStructuredWorker(queueNames.auditWrites, async (job) => job.data, { redisUrl }),
    createStructuredWorker(queueNames.notifications, async (job) => job.data, { redisUrl }),
    createStructuredWorker(queueNames.aiAnalysis, async (job) => job.data, { redisUrl }),
    createStructuredWorker(queueNames.commandReview, async (job) => job.data, { redisUrl }),
  ]
}
