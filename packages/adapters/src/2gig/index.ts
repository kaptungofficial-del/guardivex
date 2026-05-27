import { BaseReadOnlyAdapter } from "../base.js"
import type { AdapterContext, InventoryItem, TelemetrySample } from "../types.js"

export class TwoGigReadOnlyAdapter extends BaseReadOnlyAdapter {
  constructor() {
    super("2gig")
  }

  async syncInventory(context: AdapterContext): Promise<InventoryItem[]> {
    return [{ externalId: `${context.sourceDevice}:panel`, name: "2GIG Alarm Panel", type: "alarm_panel", vendor: "2gig", metadata: { siteId: context.siteId, readOnly: true } }]
  }

  async collectTelemetry(context: AdapterContext): Promise<TelemetrySample[]> {
    const collectedAt = new Date().toISOString()
    return [
      { collectedAt, metric: "panel.health", value: "unknown", metadata: { sourceDevice: context.sourceDevice } },
      { collectedAt, metric: "radio.status.visible", value: true },
    ]
  }
}
