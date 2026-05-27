import { z } from "zod"
import { commandActionSchema, eventSeveritySchema, permissionSchema, type CommandAction, type Permission } from "@guardivex/shared"

export const policyActionSchema = z.enum(["require_approval", "escalate_severity", "notify_operators", "suppress_duplicates", "require_mfa", "deny"])
export type PolicyAction = z.infer<typeof policyActionSchema>

export const policyConditionSchema = z.object({
  field: z.enum(["command.action", "command.target", "risk.score", "requester.permission", "event.severity", "event.type", "tenant.environment"]),
  operator: z.enum(["equals", "not_equals", "in", "gte", "lte", "missing"]),
  value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
})

export const deterministicPolicySchema = z.object({
  id: z.string().min(3),
  name: z.string().min(3),
  enabled: z.boolean().default(true),
  conditions: z.array(policyConditionSchema).min(1),
  actions: z.array(policyActionSchema).min(1),
  reason: z.string().min(3),
})

export type PolicyCondition = z.infer<typeof policyConditionSchema>
export type DeterministicPolicy = z.infer<typeof deterministicPolicySchema>

export interface PolicyEvaluationInput {
  tenantId: string
  environment: "dev" | "staging" | "production"
  action: CommandAction
  target: "device" | "door" | "unknown"
  requesterPermissions: Permission[]
  riskScore: number
  eventSeverity?: z.infer<typeof eventSeveritySchema>
  eventType?: string
  mfaVerified?: boolean
}

export interface PolicyEvaluationResult {
  allowed: boolean
  requiredActions: PolicyAction[]
  matchedPolicies: Array<{ id: string; name: string; reason: string }>
  reasons: string[]
  riskScore: number
}

export const defaultCommandPolicies: DeterministicPolicy[] = [
  {
    id: "cmd-high-risk-approval",
    name: "High risk commands require approval",
    enabled: true,
    conditions: [{ field: "risk.score", operator: "gte", value: 50 }],
    actions: ["require_approval", "notify_operators"],
    reason: "Command risk score is elevated.",
  },
  {
    id: "cmd-physical-actions-approval",
    name: "Physical actions require approval",
    enabled: true,
    conditions: [{ field: "command.action", operator: "in", value: ["door.unlock.momentary", "door.lockdown", "alarm.arm", "alarm.disarm", "switch.port.disable", "switch.port.enable"] }],
    actions: ["require_approval", "require_mfa", "notify_operators"],
    reason: "Physical control commands must be approved and MFA verified.",
  },
  {
    id: "cmd-execution-permission",
    name: "Execution requires explicit permission",
    enabled: true,
    conditions: [{ field: "requester.permission", operator: "not_equals", value: "commands:execute" }],
    actions: ["require_approval"],
    reason: "Requester cannot execute directly without command execution permission.",
  },
]

function conditionMatches(condition: PolicyCondition, input: PolicyEvaluationInput) {
  const values: Record<PolicyCondition["field"], string | number | string[] | undefined> = {
    "command.action": input.action,
    "command.target": input.target,
    "risk.score": input.riskScore,
    "requester.permission": input.requesterPermissions,
    "event.severity": input.eventSeverity,
    "event.type": input.eventType,
    "tenant.environment": input.environment,
  }
  const actual = values[condition.field]

  if (condition.operator === "missing") return actual === undefined || (Array.isArray(actual) && actual.length === 0)
  if (condition.operator === "equals") return actual === condition.value
  if (condition.operator === "not_equals") return Array.isArray(actual) ? !actual.includes(String(condition.value)) : actual !== condition.value
  if (condition.operator === "in") return Array.isArray(condition.value) && condition.value.includes(String(actual))
  if (condition.operator === "gte") return typeof actual === "number" && typeof condition.value === "number" && actual >= condition.value
  if (condition.operator === "lte") return typeof actual === "number" && typeof condition.value === "number" && actual <= condition.value
  return false
}

export function evaluateDeterministicPolicies(input: PolicyEvaluationInput, policies: DeterministicPolicy[] = defaultCommandPolicies): PolicyEvaluationResult {
  commandActionSchema.parse(input.action)
  input.requesterPermissions.forEach((permission) => permissionSchema.parse(permission))

  const matchedPolicies = policies
    .filter((policy) => policy.enabled && policy.conditions.every((condition) => conditionMatches(condition, input)))
    .map((policy) => ({ id: policy.id, name: policy.name, reason: policy.reason, actions: policy.actions }))

  const requiredActions = Array.from(new Set(matchedPolicies.flatMap((policy) => policy.actions)))
  return {
    allowed: !requiredActions.includes("deny"),
    requiredActions,
    matchedPolicies: matchedPolicies.map(({ id, name, reason }) => ({ id, name, reason })),
    reasons: matchedPolicies.map((policy) => policy.reason),
    riskScore: input.riskScore,
  }
}
