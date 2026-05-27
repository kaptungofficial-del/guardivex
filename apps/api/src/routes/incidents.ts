import type { FastifyPluginAsync } from "fastify"
import { z } from "zod"
import { prisma } from "@guardivex/database"
import { requirePermission } from "../middleware/rbac.js"
import { writeAuditLog } from "../services/audit.js"

const incidentCreateSchema = z.object({
  siteId: z.string().uuid().optional(),
  alertId: z.string().uuid().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(["info", "low", "medium", "high", "critical"]),
})

export const incidentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/incidents", { preHandler: [fastify.authenticate, requirePermission("incidents:read")] }, async (request) => {
    const incidents = await prisma.incident.findMany({
      where: { tenantId: request.auth!.tenantId },
      orderBy: { createdAt: "desc" },
      take: 100,
    })
    return { data: incidents }
  })

  fastify.post("/incidents", { preHandler: [fastify.authenticate, requirePermission("incidents:write")] }, async (request) => {
    const body = incidentCreateSchema.parse(request.body)
    const incident = await prisma.incident.create({ data: { tenantId: request.auth!.tenantId, ...body } })
    await writeAuditLog(request, { action: "incident.update", resource: "incident", resourceId: incident.id, outcome: "success" })
    return { data: incident }
  })
}
