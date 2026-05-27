import type { FastifyPluginAsync } from "fastify"
import { z } from "zod"
import { Prisma, prisma } from "@guardivex/database"
import { enqueue, queueNames } from "@guardivex/queues"
import { commandApprovalSchema, commandRequestCreateSchema } from "@guardivex/shared"
import { requirePermission } from "../middleware/rbac.js"
import { writeAuditLog } from "../services/audit.js"
import { env } from "../config/env.js"
import { commandGuardMetadata, guardDangerousCommand } from "../core/security/command-guard.js"

const idParamsSchema = z.object({ id: z.string().uuid() })

export const commandRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/commands", { preHandler: [fastify.authenticate, requirePermission("commands:request")] }, async (request) => {
    const commands = await prisma.commandRequest.findMany({
      where: { tenantId: request.auth!.tenantId },
      include: { approvals: true, executions: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    })
    return { data: commands }
  })

  fastify.post("/commands", { preHandler: [fastify.authenticate, requirePermission("commands:request")] }, async (request, reply) => {
    const body = commandRequestCreateSchema.parse(request.body)
    const decision = await guardDangerousCommand({
      principal: {
        userId: request.auth!.userId,
        tenantId: request.auth!.tenantId,
        roles: request.auth!.roles,
        permissions: request.auth!.permissions,
      },
      action: body.action,
      targetDeviceId: body.targetDeviceId,
      targetDoorId: body.targetDoorId,
      reason: body.reason,
      metadata: body.metadata,
      environment: env.APP_ENV,
      ipAddress: request.ip,
      userAgent: request.headers["user-agent"],
    })

    if (!decision.allowed) {
      await writeAuditLog(request, { action: "command.request", resource: "command", outcome: "denied", metadata: { decision } })
      await reply.forbidden(decision.denialReasons.join("; "))
      return
    }

    const command = await prisma.commandRequest.create({
      data: {
        tenantId: request.auth!.tenantId,
        requestedById: request.auth!.userId,
        targetDeviceId: body.targetDeviceId,
        targetDoorId: body.targetDoorId,
        action: body.action,
        reason: body.reason,
        status: decision.status,
        riskScore: decision.risk.score,
        policyDecision: commandGuardMetadata(decision),
        policyEvaluationId: decision.policyEvaluationId,
        metadata: body.metadata as Prisma.InputJsonValue,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      },
    })

    await writeAuditLog(request, { action: "command.request", resource: "command", resourceId: command.id, outcome: "success", metadata: { decision } })
    await enqueue(queueNames.commandReview, { tenantId: request.auth!.tenantId, commandRequestId: command.id, requestedById: request.auth!.userId, action: body.action }, { redisUrl: env.REDIS_URL })
    return { data: command }
  })

  fastify.post("/commands/:id/approvals", { preHandler: [fastify.authenticate, requirePermission("commands:approve")] }, async (request, reply) => {
    const params = idParamsSchema.parse(request.params)
    const body = commandApprovalSchema.omit({ commandRequestId: true }).parse(request.body)
    const command = await prisma.commandRequest.findFirst({ where: { id: params.id, tenantId: request.auth!.tenantId } })

    if (!command) {
      await reply.notFound("Command request not found")
      return
    }

    const approval = await prisma.commandApproval.create({
      data: {
        tenantId: request.auth!.tenantId,
        commandRequestId: command.id,
        approverId: request.auth!.userId,
        decision: body.decision,
        comment: body.comment,
      },
    })

    const status = body.decision === "approved" ? "approved" : "rejected"
    await prisma.commandRequest.update({ where: { id: command.id }, data: { status } })
    await writeAuditLog(request, { action: body.decision === "approved" ? "command.approve" : "command.reject", resource: "command", resourceId: command.id, outcome: "success" })

    if (body.decision === "approved") {
      await prisma.commandRequest.update({ where: { id: command.id }, data: { status: "queued" } })
      await enqueue(queueNames.commandExecution, { tenantId: request.auth!.tenantId, commandRequestId: command.id, approvedById: request.auth!.userId, requestedById: command.requestedById, action: command.action }, { redisUrl: env.REDIS_URL })
      await writeAuditLog(request, { action: "command.queue", resource: "command", resourceId: command.id, outcome: "success" })
    }

    return { data: approval }
  })

  fastify.post("/commands/:id/execute", { preHandler: [fastify.authenticate, requirePermission("commands:execute")] }, async (request, reply) => {
    const params = idParamsSchema.parse(request.params)
    const command = await prisma.commandRequest.findFirst({ where: { id: params.id, tenantId: request.auth!.tenantId } })

    if (!command) {
      await reply.notFound("Command request not found")
      return
    }

    if (command.status !== "approved" && command.status !== "queued") {
      await reply.conflict("Only approved commands can enter the execution queue")
      return
    }

    await prisma.commandRequest.update({ where: { id: command.id }, data: { status: "queued" } })
    const job = await enqueue(queueNames.commandExecution, { tenantId: request.auth!.tenantId, commandRequestId: command.id, approvedById: request.auth!.userId, requestedById: command.requestedById, action: command.action }, { redisUrl: env.REDIS_URL })
    await writeAuditLog(request, { action: "command.queue", resource: "command", resourceId: command.id, outcome: "success", metadata: { jobId: job.id } })
    return { data: { commandRequestId: command.id, status: "queued", jobId: job.id } }
  })
}
