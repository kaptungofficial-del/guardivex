import type { CommandAction } from "@guardivex/shared"

const baseRiskByAction: Record<CommandAction, number> = {
  "door.unlock.momentary": 72,
  "door.lockdown": 88,
  "alarm.arm": 48,
  "alarm.disarm": 82,
  "switch.port.disable": 86,
  "switch.port.enable": 58,
  "device.sync": 28,
  "device.test_connection": 18,
}

export interface CommandRiskInput {
  action: CommandAction
  targetDeviceId?: string | null
  targetDoorId?: string | null
  requesterPermissions: string[]
  metadata?: Record<string, unknown>
}

export interface CommandRiskDecision {
  score: number
  severity: "low" | "medium" | "high" | "critical"
  reasons: string[]
  requiresApproval: boolean
}

export function scoreCommandRisk(input: CommandRiskInput): CommandRiskDecision {
  const reasons: string[] = []
  let score = baseRiskByAction[input.action]

  if (input.targetDoorId) reasons.push("Physical access target")
  if (input.targetDeviceId) reasons.push("Infrastructure device target")
  if (!input.requesterPermissions.includes("commands:execute")) {
    score += 8
    reasons.push("Requester cannot execute commands directly")
  }
  if (input.metadata?.emergency === true) {
    score += 10
    reasons.push("Emergency metadata supplied")
  }

  const clampedScore = Math.min(100, score)
  const severity = clampedScore >= 85 ? "critical" : clampedScore >= 65 ? "high" : clampedScore >= 35 ? "medium" : "low"
  return { score: clampedScore, severity, reasons, requiresApproval: clampedScore >= 35 }
}
