import { describe, expect, it } from "vitest"
import { MercuryReadOnlyAdapter, CiscoReadOnlyAdapter } from "../packages/adapters/src/index.js"
import { defaultJobOptions, queueNames } from "../packages/queues/src/index.js"
import { evaluateDeterministicPolicies } from "../packages/policy/src/index.js"
import { transformVendorEvent, type VendorRawEvent } from "../packages/shared/src/index.js"
import { createAdvisoryRecommendation } from "../apps/api/src/services/ai-recommendations.js"
import { evaluateCommandPolicy } from "../apps/api/src/services/rules-engine.js"

const tenantId = "00000000-0000-4000-8000-000000000001"
const siteId = "00000000-0000-4000-8000-000000000002"
const deviceId = "00000000-0000-4000-8000-000000000003"

describe("Phase 2 safety and infrastructure contracts", () => {
  it("normalizes Mercury door events into the shared contract", () => {
    const rawEvent: VendorRawEvent = {
      tenantId,
      siteId,
      deviceId,
      sourceVendor: "mercury",
      sourceDevice: "lp1502-main",
      receivedAt: new Date().toISOString(),
      payload: { doorState: "forced_open", controllerId: "lp1502", eventCode: "door_forced" },
    }

    const result = transformVendorEvent(rawEvent)
    expect(result.event.type).toBe("access.door.state")
    expect(result.event.severity).toBe("high")
    expect(result.event.correlationId).toHaveLength(32)
  })

  it("keeps hardware adapters read-only", async () => {
    const mercury = new MercuryReadOnlyAdapter()
    const cisco = new CiscoReadOnlyAdapter()

    expect(mercury.capabilities).toEqual(["ingest_events", "monitor_status", "sync_inventory", "collect_telemetry", "validate_connectivity"])
    expect(cisco.capabilities).not.toContain("execute_hardware_command")
    await expect(mercury.validateConnectivity({ tenantId, siteId, deviceId, sourceDevice: "lp1502-main" })).resolves.toMatchObject({ reachable: true })
  })

  it("requires deterministic approval controls for physical commands", () => {
    const result = evaluateDeterministicPolicies({
      tenantId,
      environment: "production",
      action: "door.unlock.momentary",
      target: "door",
      requesterPermissions: ["commands:request"],
      riskScore: 90,
    })

    expect(result.allowed).toBe(true)
    expect(result.requiredActions).toContain("require_approval")
    expect(result.requiredActions).toContain("require_mfa")
  })

  it("denies command requests without RBAC command request permission", () => {
    const decision = evaluateCommandPolicy({ action: "door.lockdown", hasDoorTarget: true, hasDeviceTarget: false, requesterPermissions: [] })
    expect(decision.allowedToRequest).toBe(false)
    expect(decision.reasons[0]).toContain("permission")
  })

  it("defines retry and dead-letter capable queue topology", () => {
    expect(Object.values(queueNames)).toEqual(["event-ingestion", "event-processing", "audit-writes", "notifications", "AI-analysis", "command-review", "command-execution", "alert-fanout", "device-heartbeat"])
    expect(defaultJobOptions.attempts).toBe(5)
    expect(defaultJobOptions.backoff).toMatchObject({ type: "exponential" })
  })

  it("AI recommendations remain advisory drafts", () => {
    const recommendation = createAdvisoryRecommendation({ severity: "critical", signals: ["forced door", "offline reader"] })
    expect(recommendation.draftCommand).toMatchObject({ action: "door.lockdown" })
    expect(recommendation.recommendation).toContain("human approval")
  })
})
