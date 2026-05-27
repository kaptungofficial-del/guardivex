import { Prisma, prisma } from "@guardivex/database"
import { evaluateDeterministicPolicies, type PolicyEvaluationInput } from "@guardivex/policy"

export async function evaluateAndRecordPolicy(input: PolicyEvaluationInput, resource: string, resourceId?: string) {
  const decision = evaluateDeterministicPolicies(input)
  const record = await prisma.policyEvaluation.create({
    data: {
      tenantId: input.tenantId,
      environment: input.environment,
      resource,
      resourceId,
      allowed: decision.allowed,
      requiredActions: decision.requiredActions as Prisma.InputJsonValue,
      matchedPolicies: decision.matchedPolicies as Prisma.InputJsonValue,
      reasons: decision.reasons as Prisma.InputJsonValue,
      riskScore: decision.riskScore,
      input: input as unknown as Prisma.InputJsonValue,
    },
  })
  return { decision, record }
}
