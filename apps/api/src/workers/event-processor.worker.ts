import { Prisma, prisma } from "@guardivex/database"
import { normalizedEventSchema } from "@guardivex/shared"
import { publishRealtimeEvent } from "../realtime/websocket-gateway.js"

export async function processNormalizedEvent(job: { data: unknown }) {
  const event = normalizedEventSchema.parse(job.data)
  const existing = await prisma.event.findFirst({ where: { tenantId: event.tenantId, correlationId: event.correlationId }, select: { id: true } })
  if (existing) return existing

  const created = await prisma.event.create({
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

  publishRealtimeEvent({ type: "alert.created", tenantId: event.tenantId, payload: { eventId: created.id, severity: created.severity, message: created.message } })
  return created
}
