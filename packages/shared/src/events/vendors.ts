import type { VendorRawEvent } from "./index.js"
import type { EventTransformer } from "./transformers.js"
import { getNumber, getString, normalizeSeverity, normalizeVendorEvent } from "./transformers.js"

export const mercuryTransformer: EventTransformer = {
  vendor: "mercury",
  canTransform: (rawEvent) => rawEvent.sourceVendor === "mercury",
  transform(rawEvent) {
    const code = getString(rawEvent.payload, "eventCode") ?? getString(rawEvent.payload, "type") ?? "access.event"
    const doorState = getString(rawEvent.payload, "doorState")
    const health = getString(rawEvent.payload, "health")
    const type = doorState ? "access.door.state" : health ? "access.controller.health" : code.includes("reader") ? "access.reader.inventory" : "access.event"

    return normalizeVendorEvent(rawEvent, {
      type,
      severity: normalizeSeverity(rawEvent.payload.severity, doorState === "forced_open" ? "high" : "info"),
      normalizedPayload: {
        controllerId: getString(rawEvent.payload, "controllerId"),
        panelId: getString(rawEvent.payload, "panelId"),
        readerId: getString(rawEvent.payload, "readerId"),
        doorId: getString(rawEvent.payload, "doorId"),
        doorState,
        eventCode: code,
        health,
      },
    })
  },
}

export const ciscoTransformer: EventTransformer = {
  vendor: "cisco",
  canTransform: (rawEvent) => rawEvent.sourceVendor === "cisco",
  transform(rawEvent) {
    const interfaceName = getString(rawEvent.payload, "interface") ?? getString(rawEvent.payload, "ifName")
    const poeWatts = getNumber(rawEvent.payload, "poeWatts")
    const vlanId = getNumber(rawEvent.payload, "vlanId")
    const status = getString(rawEvent.payload, "status")
    const type = poeWatts !== undefined ? "network.poe.telemetry" : vlanId !== undefined ? "network.vlan.visibility" : interfaceName ? "network.interface.status" : "network.switch.inventory"

    return normalizeVendorEvent(rawEvent, {
      type,
      severity: normalizeSeverity(rawEvent.payload.severity, status === "down" ? "medium" : "info"),
      normalizedPayload: {
        switchId: getString(rawEvent.payload, "switchId"),
        interface: interfaceName,
        status,
        poeWatts,
        vlanId,
        macAddress: getString(rawEvent.payload, "macAddress"),
      },
    })
  },
}

export const iq4Transformer: EventTransformer = {
  vendor: "iq4",
  canTransform: (rawEvent) => rawEvent.sourceVendor === "iq4",
  transform(rawEvent) {
    const zoneState = getString(rawEvent.payload, "zoneState")
    return normalizeVendorEvent(rawEvent, {
      type: zoneState ? "alarm.zone.state" : "alarm.panel.health",
      severity: normalizeSeverity(rawEvent.payload.severity, zoneState === "alarm" ? "high" : "info"),
      normalizedPayload: {
        panelId: getString(rawEvent.payload, "panelId"),
        zoneId: getString(rawEvent.payload, "zoneId"),
        zoneState,
        battery: getString(rawEvent.payload, "battery"),
      },
    })
  },
}

export const twoGigTransformer: EventTransformer = {
  vendor: "2gig",
  canTransform: (rawEvent) => rawEvent.sourceVendor === "2gig",
  transform(rawEvent) {
    const zoneState = getString(rawEvent.payload, "zoneState")
    return normalizeVendorEvent(rawEvent, {
      type: zoneState ? "alarm.zone.state" : "alarm.panel.health",
      severity: normalizeSeverity(rawEvent.payload.severity, zoneState === "alarm" ? "high" : "info"),
      normalizedPayload: {
        panelId: getString(rawEvent.payload, "panelId"),
        zoneId: getString(rawEvent.payload, "zoneId"),
        zoneState,
        radioStatus: getString(rawEvent.payload, "radioStatus"),
      },
    })
  },
}

export const vendorTransformers = [mercuryTransformer, ciscoTransformer, iq4Transformer, twoGigTransformer]

export function transformVendorEvent(rawEvent: VendorRawEvent) {
  const transformer = vendorTransformers.find((candidate) => candidate.canTransform(rawEvent))
  if (!transformer) {
    return normalizeVendorEvent(rawEvent, {
      type: "security.signal",
      severity: normalizeSeverity(rawEvent.payload.severity),
      warnings: [`No vendor transformer registered for ${rawEvent.sourceVendor}`],
      normalizedPayload: {},
    })
  }
  return transformer.transform(rawEvent)
}
