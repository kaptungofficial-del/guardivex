import { BaseReadOnlyAdapter } from "../base.js"
import type { AdapterContext, InventoryItem, TelemetrySample } from "../types.js"

export class IQ4ReadOnlyAdapter extends BaseReadOnlyAdapter {
  constructor() {
    super("iq4")
  }

  async syncInventory(context: AdapterContext): Promise<InventoryItem[]> {
    return [{ externalId: `${context.sourceDevice}:panel`, name: "IQ Panel 4", type: "alarm_panel", vendor: "iq4", metadata: { siteId: context.siteId, readOnly: true } }]
  }

  async collectTelemetry(context: AdapterContext): Promise<TelemetrySample[]> {
    const collectedAt = new Date().toISOString()
    return [
      { collectedAt, metric: "panel.health", value: "unknown", metadata: { sourceDevice: context.sourceDevice } },
      { collectedAt, metric: "zone.state.monitoring", value: true },
    ]
  }
}
