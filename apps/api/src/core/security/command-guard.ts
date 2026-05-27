import { Prisma, prisma } from "@guardivex/database"
import type { CommandAction } from "@guardivex/shared"
import { evaluateEnterprisePolicy, recordPolicyEvaluation, type PolicyDecision } from "./policy-engine.js"
import { evaluateRbac, type RbacPrincipal } from "./rbac.js"
import { scoreCommandRisk, type CommandRiskDecision } from "./risk-engine.js"
import { assertCommandTargetInTenant } from "./tenant-scope.js"
import { writeEnterpriseAudit } from "./audit-writer.js"

export interface GuardCommandInput {
  principal: RbacPrincipal
  action: CommandAction
  targetDeviceId?: string | null
  targetDoorId?: string | null
  reason: string
  metadata?: Record<string, unknown>
  environment: "dev" | "staging" | "production"
  ipAddress?: string
  userAgent?: string
}

export interface GuardCommandDecision {
  allowed: boolean
  status: "approval_required" | "policy_review"
  risk: CommandRiskDecision
  policy: PolicyDecision
  policyEvaluationId?: string
  denialReasons: string[]
}

function riskInput(input: GuardCommandInput) {
  return {
    action: input.action,
    targetDeviceId: input.targetDeviceId,
    targetDoorId: input.targetDoorId,
    requesterPermissions: input.principal.permissions,
    metadata: input.metadata,
  }
}

export async function guardDangerousCommand(input: GuardCommandInput): Promise<GuardCommandDecision> {
  const rbac = evaluateRbac(input.principal, "commands:request")
  if (!rbac.allowed) {
    await writeEnterpriseAudit({ tenantId: input.principal.tenantId, userId: input.principal.userId, action: "denial", resource: "command", outcome: "denied", metadata: { reasons: rbac.reasons }, ipAddress: input.ipAddress, userAgent: input.userAgent })
    return { allowed: false, status: "policy_review", risk: scoreCommandRisk(riskInput(input)), policy: { allowed: false, requiredActions: [], matchedPolicies: [], reasons: rbac.reasons }, denialReasons: rbac.reasons }
  }

  try {
    await assertCommandTargetInTenant(prisma, input.principal.tenantId, input)
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Tenant scope validation failed"
    await writeEnterpriseAudit({ tenantId: input.principal.tenantId, userId: input.principal.userId, action: "denial", resource: "command", outcome: "denied", metadata: { reason }, ipAddress: input.ipAddress, userAgent: input.userAgent })
    const risk = scoreCommandRisk(riskInput(input))
    return { allowed: false, status: "policy_review", risk, policy: { allowed: false, requiredActions: [], matchedPolicies: [], reasons: [reason] }, denialReasons: [reason] }
  }

  const risk = scoreCommandRisk(riskInput(input))
  const policy = await evaluateEnterprisePolicy({ tenantId: input.principal.tenantId, action: input.action, targetType: input.targetDoorId ? "door" : input.targetDeviceId ? "device" : "unknown", requesterPermissions: input.principal.permissions, risk, environment: input.environment })
  const policyRecord = await recordPolicyEvaluation({ tenantId: input.principal.tenantId, action: input.action, targetType: input.targetDoorId ? "door" : input.targetDeviceId ? "device" : "unknown", requesterPermissions: input.principal.permissions, risk, environment: input.environment }, policy, "command")

  if (!policy.allowed) {
    await writeEnterpriseAudit({ tenantId: input.principal.tenantId, userId: input.principal.userId, action: "policy.failure", resource: "command", outcome: "denied", metadata: { policy }, ipAddress: input.ipAddress, userAgent: input.userAgent })
    return { allowed: false, status: "policy_review", risk, policy, policyEvaluationId: policyRecord.id, denialReasons: policy.reasons }
  }

  const status = risk.requiresApproval || policy.requiredActions.includes("require_approval") ? "approval_required" : "policy_review"
  return { allowed: true, status, risk, policy, policyEvaluationId: policyRecord.id, denialReasons: [] }
}

export function commandGuardMetadata(decision: GuardCommandDecision): Prisma.InputJsonValue {
  return { risk: decision.risk, policy: decision.policy } as unknown as Prisma.InputJsonValue
}
