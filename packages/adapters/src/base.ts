import type { NormalizedEvent, SourceVendor, VendorRawEvent } from "@guardivex/shared"
import { transformVendorEvent } from "@guardivex/shared"
import { assertReadOnlyCapabilities, READ_ONLY_CAPABILITIES, type AdapterContext, type ConnectivityStatus, type InventoryItem, type ReadOnlyHardwareAdapter, type TelemetrySample } from "./types.js"

export abstract class BaseReadOnlyAdapter implements ReadOnlyHardwareAdapter {
  readonly capabilities = READ_ONLY_CAPABILITIES

  protected constructor(readonly vendor: SourceVendor) {
    assertReadOnlyCapabilities(this.capabilities)
  }

  async validateConnectivity(context: AdapterContext): Promise<ConnectivityStatus> {
    return {
      reachable: Boolean(context.sourceDevice),
      checkedAt: new Date().toISOString(),
      message: context.sourceDevice ? `${this.vendor} endpoint metadata accepted` : `${this.vendor} endpoint missing`,
    }
  }

  abstract syncInventory(context: AdapterContext): Promise<InventoryItem[]>
  abstract collectTelemetry(context: AdapterContext): Promise<TelemetrySample[]>

  async ingestEvent(rawEvent: VendorRawEvent): Promise<NormalizedEvent> {
    if (rawEvent.sourceVendor !== this.vendor) {
      throw new Error(`Adapter ${this.vendor} cannot ingest ${rawEvent.sourceVendor} events`)
    }
    return transformVendorEvent(rawEvent).event
  }
}
