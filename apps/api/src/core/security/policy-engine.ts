import { Prisma, prisma } from "@guardivex/database"
import type { CommandAction } from "@guardivex/shared"
import type { CommandRiskDecision } from "./risk-engine.js"

export interface PolicyInput {
  tenantId: string
  action: CommandAction
  targetType: "door" | "device" | "unknown"
  requesterPermissions: string[]
  risk: CommandRiskDecision
  environment: "dev" | "staging" | "production"
}

export interface PolicyDecision {
  allowed: boolean
  requiredActions: string[]
  matchedPolicies: string[]
  reasons: string[]
}

const dangerousActions: CommandAction[] = [
  "door.unlock.momentary",
  "door.lockdown",
  "alarm.disarm",
  "switch.port.disable",
]

export async function evaluateEnterprisePolicy(input: PolicyInput): Promise<PolicyDecision> {
  const activePolicies = await prisma.policy.findMany({
    where: { tenantId: input.tenantId, enabled: true, deletedAt: null },
    select: { id: true, name: true, action: true, effect: true, conditions: true },
    take: 100,
  })

  const reasons: string[] = []
  const requiredActions = new Set<string>()
  const matchedPolicies: string[] = []

  if (dangerousActions.includes(input.action)) {
    requiredActions.add("require_approval")
    requiredActions.add("require_audit")
    requiredActions.add("require_worker_execution")
    reasons.push("Dangerous action requires approval, audit, queueing, and worker-only execution")
  }

  if (input.risk.requiresApproval) requiredActions.add("require_approval")
  if (input.environment === "production" && input.risk.score >= 65) requiredActions.add("require_second_reviewer")

  for (const policy of activePolicies) {
    if (policy.action && policy.action !== input.action) continue
    matchedPolicies.push(policy.name)
    if (policy.effect === "deny") {
      reasons.push(`Denied by policy: ${policy.name}`)
      return { allowed: false, requiredActions: Array.from(requiredActions), matchedPolicies, reasons }
    }
    if (policy.effect === "approval_required") requiredActions.add("require_approval")
  }

  if (!input.requesterPermissions.includes("commands:request")) {
    reasons.push("Requester lacks commands:request")
    return { allowed: false, requiredActions: Array.from(requiredActions), matchedPolicies, reasons }
  }

  return { allowed: true, requiredActions: Array.from(requiredActions), matchedPolicies, reasons }
}

export async function recordPolicyEvaluation(input: PolicyInput, decision: PolicyDecision, resource: string, resourceId?: string) {
  return prisma.policyEvaluation.create({
    data: {
      tenantId: input.tenantId,
      environment: input.environment,
      resource,
      resourceId,
      allowed: decision.allowed,
      requiredActions: decision.requiredActions as Prisma.InputJsonValue,
      matchedPolicies: decision.matchedPolicies as Prisma.InputJsonValue,
      reasons: decision.reasons as Prisma.InputJsonValue,
      riskScore: input.risk.score,
      input: input as unknown as Prisma.InputJsonValue,
    },
  })
}
