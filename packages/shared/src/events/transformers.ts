import { createHash } from "node:crypto"
import type { EventSeverity, NormalizedEvent, NormalizedEventType, SourceVendor, VendorRawEvent } from "./index.js"

interface TransformOptions {
  type: NormalizedEventType
  severity?: EventSeverity
  normalizedPayload?: Record<string, unknown>
  timestamp?: string
  warnings?: string[]
}

export interface EventTransformer {
  vendor: SourceVendor
  canTransform(rawEvent: VendorRawEvent): boolean
  transform(rawEvent: VendorRawEvent): { event: NormalizedEvent; warnings: string[] }
}

export function createCorrelationId(parts: Array<string | null | undefined>) {
  return createHash("sha256").update(parts.filter(Boolean).join(":"), "utf8").digest("hex").slice(0, 32)
}

export function normalizeVendorEvent(rawEvent: VendorRawEvent, options: TransformOptions): { event: NormalizedEvent; warnings: string[] } {
  const timestamp = options.timestamp ?? rawEvent.receivedAt ?? new Date().toISOString()
  const correlationId = createCorrelationId([
    rawEvent.tenantId,
    rawEvent.siteId,
    rawEvent.deviceId,
    rawEvent.sourceVendor,
    rawEvent.sourceDevice,
    options.type,
    timestamp,
  ])

  return {
    warnings: options.warnings ?? [],
    event: {
      tenantId: rawEvent.tenantId,
      siteId: rawEvent.siteId ?? null,
      sourceVendor: rawEvent.sourceVendor,
      sourceDevice: rawEvent.sourceDevice,
      deviceId: rawEvent.deviceId ?? null,
      type: options.type,
      severity: options.severity ?? "info",
      timestamp,
      rawPayload: rawEvent.payload,
      normalizedPayload: options.normalizedPayload ?? {},
      correlationId,
    },
  }
}

export function getString(payload: Record<string, unknown>, key: string) {
  const value = payload[key]
  return typeof value === "string" ? value : undefined
}

export function getNumber(payload: Record<string, unknown>, key: string) {
  const value = payload[key]
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

export function normalizeSeverity(value: unknown, fallback: EventSeverity = "info"): EventSeverity {
  if (value === "critical" || value === "high" || value === "medium" || value === "low" || value === "info") return value
  if (typeof value === "number") {
    if (value >= 90) return "critical"
    if (value >= 70) return "high"
    if (value >= 40) return "medium"
    if (value >= 10) return "low"
  }
  return fallback
}
