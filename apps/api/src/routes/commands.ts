import type { FastifyPluginAsync } from "fastify"
import { z } from "zod"
import { Prisma, prisma } from "@guardivex/database"
import { commandApprovalSchema, commandRequestCreateSchema } from "@guardivex/shared"
import { requirePermission } from "../middleware/rbac.js"
import { writeAuditLog } from "../services/audit.js"
import { evaluateCommandPolicy } from "../services/rules-engine.js"
import { evaluateAndRecordPolicy } from "../services/policy.js"
import { executeApprovedCommand } from "../adapters/command-executors/safe-executor.js"
import { env } from "../config/env.js"

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
    const decision = evaluateCommandPolicy({
      action: body.action,
      hasDeviceTarget: Boolean(body.targetDeviceId),
      hasDoorTarget: Boolean(body.targetDoorId),
      requesterPermissions: request.auth!.permissions,
    })

    if (!decision.allowedToRequest) {
      await writeAuditLog(request, { action: "command.request", resource: "command", outcome: "denied", metadata: { decision } })
      await reply.forbidden(decision.reasons.join("; "))
      return
    }

    const [targetDevice, targetDoor] = await Promise.all([
      body.targetDeviceId ? prisma.device.findFirst({ where: { id: body.targetDeviceId, tenantId: request.auth!.tenantId }, select: { id: true } }) : Promise.resolve(null),
      body.targetDoorId ? prisma.door.findFirst({ where: { id: body.targetDoorId, tenantId: request.auth!.tenantId }, select: { id: true } }) : Promise.resolve(null),
    ])

    if ((body.targetDeviceId && !targetDevice) || (body.targetDoorId && !targetDoor)) {
      await writeAuditLog(request, { action: "command.request", resource: "command", outcome: "denied", metadata: { reason: "Target is outside tenant scope or missing" } })
      await reply.forbidden("Command target is outside tenant scope or missing")
      return
    }

    const policy = await evaluateAndRecordPolicy({
      tenantId: request.auth!.tenantId,
      environment: env.APP_ENV,
      action: body.action,
      target: body.targetDoorId ? "door" : body.targetDeviceId ? "device" : "unknown",
      requesterPermissions: request.auth!.permissions,
      riskScore: decision.riskScore,
      mfaVerified: false,
    }, "command")

    if (!policy.decision.allowed) {
      await writeAuditLog(request, { action: "command.request", resource: "command", outcome: "denied", metadata: { decision: policy.decision } })
      await reply.forbidden(policy.decision.reasons.join("; "))
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
        status: decision.requiresApproval || policy.decision.requiredActions.includes("require_approval") ? "approval_required" : "policy_review",
        riskScore: decision.riskScore,
        policyDecision: { ruleDecision: decision, deterministicPolicy: policy.decision } as unknown as Prisma.InputJsonValue,
        policyEvaluationId: policy.record.id,
        metadata: body.metadata as Prisma.InputJsonValue,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      },
    })

    await writeAuditLog(request, { action: "command.request", resource: "command", resourceId: command.id, outcome: "success", metadata: { decision } })
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

    return { data: approval }
  })

  fastify.post("/commands/:id/execute", { preHandler: [fastify.authenticate, requirePermission("commands:execute")] }, async (request, reply) => {
    const params = idParamsSchema.parse(request.params)
    const command = await prisma.commandRequest.findFirst({ where: { id: params.id, tenantId: request.auth!.tenantId } })

    if (!command) {
      await reply.notFound("Command request not found")
      return
    }

    if (command.status !== "approved") {
      await reply.conflict("Only approved commands can enter the execution service")
      return
    }

    const result = await executeApprovedCommand(command)
    const execution = await prisma.commandExecution.create({
      data: {
        tenantId: request.auth!.tenantId,
        commandRequestId: command.id,
        executedById: request.auth!.userId,
        status: result.status,
        executor: result.executor,
        requestPayload: { action: command.action, targetDeviceId: command.targetDeviceId, targetDoorId: command.targetDoorId },
        responsePayload: result.responsePayload as Prisma.InputJsonValue,
        errorMessage: result.errorMessage,
        startedAt: new Date(),
        completedAt: new Date(),
      },
    })

    await prisma.commandRequest.update({ where: { id: command.id }, data: { status: result.status } })
    await writeAuditLog(request, { action: result.status === "failed" ? "command.fail" : "command.execute", resource: "command", resourceId: command.id, outcome: result.status === "failed" ? "failure" : "success" })
    return { data: execution }
  })
}
