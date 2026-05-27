import { BaseReadOnlyAdapter } from "../base.js"
import type { AdapterContext, InventoryItem, TelemetrySample } from "../types.js"

export class CiscoReadOnlyAdapter extends BaseReadOnlyAdapter {
  constructor() {
    super("cisco")
  }

  async syncInventory(context: AdapterContext): Promise<InventoryItem[]> {
    return [
      {
        externalId: `${context.sourceDevice}:switch`,
        name: "Cisco Access Switch",
        type: "network_switch",
        vendor: "cisco",
        metadata: { siteId: context.siteId, readOnly: true, inventoryRole: "switch" },
      },
    ]
  }

  async collectTelemetry(context: AdapterContext): Promise<TelemetrySample[]> {
    const collectedAt = new Date().toISOString()
    return [
      { collectedAt, metric: "switch.health", value: "unknown", metadata: { sourceDevice: context.sourceDevice } },
      { collectedAt, metric: "port.status.visible", value: true },
      { collectedAt, metric: "poe.telemetry.visible", value: true },
      { collectedAt, metric: "vlan.visibility.enabled", value: true },
      { collectedAt, metric: "interface.events.visible", value: true },
    ]
  }
}
