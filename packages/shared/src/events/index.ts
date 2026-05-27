import { z } from "zod"

const idSchema = z.string().uuid()
const tenantIdSchema = idSchema
const eventSeveritySchema = z.enum(["info", "low", "medium", "high", "critical"])

export const sourceVendorSchema = z.enum(["mercury", "cisco", "iq4", "2gig", "guardivex", "unknown"])

export const normalizedEventTypeSchema = z.enum([
  "access.controller.health",
  "access.panel.inventory",
  "access.reader.inventory",
  "access.door.state",
  "access.event",
  "network.switch.inventory",
  "network.interface.status",
  "network.poe.telemetry",
  "network.vlan.visibility",
  "network.interface.event",
  "alarm.panel.health",
  "alarm.zone.state",
  "adapter.connectivity",
  "device.telemetry",
  "security.signal",
])

export const normalizedEventSchema = z.object({
  tenantId: tenantIdSchema,
  siteId: idSchema.nullable(),
  sourceVendor: sourceVendorSchema,
  sourceDevice: z.string().min(1),
  deviceId: idSchema.nullable(),
  type: normalizedEventTypeSchema,
  severity: eventSeveritySchema,
  timestamp: z.string().datetime(),
  rawPayload: z.record(z.unknown()),
  normalizedPayload: z.record(z.unknown()),
  correlationId: z.string().min(8).max(160),
})

export const vendorRawEventSchema = z.object({
  tenantId: tenantIdSchema,
  siteId: idSchema.nullable().optional(),
  deviceId: idSchema.nullable().optional(),
  sourceVendor: sourceVendorSchema,
  sourceDevice: z.string().min(1),
  receivedAt: z.string().datetime().default(() => new Date().toISOString()),
  payload: z.record(z.unknown()),
})

export const eventTransformResultSchema = z.object({
  event: normalizedEventSchema,
  warnings: z.array(z.string()).default([]),
})

export type SourceVendor = z.infer<typeof sourceVendorSchema>
export type NormalizedEventType = z.infer<typeof normalizedEventTypeSchema>
export type NormalizedEvent = z.infer<typeof normalizedEventSchema>
export type VendorRawEvent = z.infer<typeof vendorRawEventSchema>
export type EventTransformResult = z.infer<typeof eventTransformResultSchema>
export type EventSeverity = z.infer<typeof eventSeveritySchema>
