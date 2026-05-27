import type { NormalizedEvent, SourceVendor, VendorRawEvent } from "@guardivex/shared"

export type AdapterCapability = "ingest_events" | "monitor_status" | "sync_inventory" | "collect_telemetry" | "validate_connectivity"

export interface AdapterContext {
  tenantId: string
  siteId: string | null
  deviceId: string | null
  sourceDevice: string
}

export interface ConnectivityStatus {
  reachable: boolean
  checkedAt: string
  latencyMs?: number
  message: string
}

export interface InventoryItem {
  externalId: string
  name: string
  type: string
  vendor: SourceVendor
  model?: string
  serial?: string
  metadata: Record<string, unknown>
}

export interface TelemetrySample {
  collectedAt: string
  metric: string
  value: string | number | boolean
  unit?: string
  metadata?: Record<string, unknown>
}

export interface ReadOnlyHardwareAdapter {
  readonly vendor: SourceVendor
  readonly capabilities: readonly AdapterCapability[]
  validateConnectivity(context: AdapterContext): Promise<ConnectivityStatus>
  syncInventory(context: AdapterContext): Promise<InventoryItem[]>
  collectTelemetry(context: AdapterContext): Promise<TelemetrySample[]>
  ingestEvent(rawEvent: VendorRawEvent): Promise<NormalizedEvent>
}

export const READ_ONLY_CAPABILITIES: readonly AdapterCapability[] = ["ingest_events", "monitor_status", "sync_inventory", "collect_telemetry", "validate_connectivity"]

export function assertReadOnlyCapabilities(capabilities: readonly string[]) {
  const forbidden = capabilities.filter((capability) => !READ_ONLY_CAPABILITIES.includes(capability as AdapterCapability))
  if (forbidden.length > 0) {
    throw new Error(`Hardware adapter exposes forbidden capabilities: ${forbidden.join(", ")}`)
  }
}
