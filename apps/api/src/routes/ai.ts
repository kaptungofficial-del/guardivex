import type { FastifyPluginAsync } from "fastify"
import { z } from "zod"
import { Prisma, prisma } from "@guardivex/database"
import { enqueue, queueNames } from "@guardivex/queues"
import { env } from "../config/env.js"
import { requirePermission } from "../middleware/rbac.js"
import { writeAuditLog } from "../services/audit.js"
import { createAdvisoryRecommendation } from "../services/ai-recommendations.js"

const aiRequestSchema = z.object({
  incidentId: z.string().uuid().optional(),
  signals: z.array(z.string()).default([]),
  severity: z.string().optional(),
})

export const aiRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/ai/recommendations", { preHandler: [fastify.authenticate, requirePermission("ai:read")] }, async (request) => {
    const data = await prisma.aiRecommendation.findMany({ where: { tenantId: request.auth!.tenantId }, orderBy: { createdAt: "desc" }, take: 100 })
    return { data }
  })

  fastify.post("/ai/recommendations", { preHandler: [fastify.authenticate, requirePermission("ai:read")] }, async (request) => {
    const body = aiRequestSchema.parse(request.body)
    const advisory = createAdvisoryRecommendation({ severity: body.severity, signals: body.signals })
    await enqueue(queueNames.aiAnalysis, { tenantId: request.auth!.tenantId, incidentId: body.incidentId, promptType: "draft_recommendation" }, { redisUrl: env.REDIS_URL })
    const recommendation = await prisma.aiRecommendation.create({
      data: {
        tenantId: request.auth!.tenantId,
        incidentId: body.incidentId,
        summary: advisory.summary,
        recommendation: advisory.recommendation,
        suggestedAction: advisory.suggestedAction,
        draftCommand: advisory.draftCommand as Prisma.InputJsonValue,
        evidence: advisory.evidence as Prisma.InputJsonValue,
      },
    })
    await writeAuditLog(request, { action: "ai.recommendation.create", resource: "aiRecommendation", resourceId: recommendation.id, outcome: "success" })
    return { data: recommendation }
  })
}
