import type { CommandAction } from "@guardivex/shared"

interface CommandPolicyInput {
  action: CommandAction
  hasDoorTarget: boolean
  hasDeviceTarget: boolean
  requesterPermissions: string[]
}

export interface CommandPolicyDecision {
  allowedToRequest: boolean
  requiresApproval: boolean
  riskScore: number
  reasons: string[]
}

const highRiskActions = new Set<CommandAction>([
  "door.unlock.momentary",
  "door.lockdown",
  "alarm.disarm",
  "switch.port.disable",
])

export function evaluateCommandPolicy(input: CommandPolicyInput): CommandPolicyDecision {
  const reasons: string[] = []

  if (!input.requesterPermissions.includes("commands:request")) {
    reasons.push("Requester lacks command request permission")
    return { allowedToRequest: false, requiresApproval: true, riskScore: 100, reasons }
  }

  if (!input.hasDoorTarget && !input.hasDeviceTarget) {
    reasons.push("Command must target a known device or door")
    return { allowedToRequest: false, requiresApproval: true, riskScore: 100, reasons }
  }

  const riskScore = highRiskActions.has(input.action) ? 90 : 35
  if (highRiskActions.has(input.action)) {
    reasons.push("Physical control command requires human approval")
  } else {
    reasons.push("Low-risk operational command still requires audit trail")
  }

  return {
    allowedToRequest: true,
    requiresApproval: true,
    riskScore,
    reasons,
  }
}
