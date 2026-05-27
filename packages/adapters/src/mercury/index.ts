import { BaseReadOnlyAdapter } from "../base.js"
import type { AdapterContext, InventoryItem, TelemetrySample } from "../types.js"

export class MercuryReadOnlyAdapter extends BaseReadOnlyAdapter {
  constructor() {
    super("mercury")
  }

  async syncInventory(context: AdapterContext): Promise<InventoryItem[]> {
    return [
      {
        externalId: `${context.sourceDevice}:lp1502`,
        name: "Mercury LP1502 Controller",
        type: "access_control_panel",
        vendor: "mercury",
        model: "LP1502",
        metadata: { siteId: context.siteId, readOnly: true, inventoryRole: "controller" },
      },
      {
        externalId: `${context.sourceDevice}:mr52:1`,
        name: "Mercury MR52 Reader Interface",
        type: "access_control_panel",
        vendor: "mercury",
        model: "MR52",
        metadata: { siteId: context.siteId, readOnly: true, inventoryRole: "reader_interface" },
      },
    ]
  }

  async collectTelemetry(context: AdapterContext): Promise<TelemetrySample[]> {
    const collectedAt = new Date().toISOString()
    return [
      { collectedAt, metric: "controller.health", value: "unknown", metadata: { sourceDevice: context.sourceDevice } },
      { collectedAt, metric: "panel.inventory.last_sync", value: collectedAt },
      { collectedAt, metric: "reader.inventory.count", value: 2 },
      { collectedAt, metric: "door.state.monitoring", value: true },
      { collectedAt, metric: "connectivity.status", value: "metadata_only" },
    ]
  }
}
