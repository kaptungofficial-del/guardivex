import { Prisma, prisma } from "@guardivex/database"
import { executeApprovedCommand } from "../adapters/command-executors/safe-executor.js"
import { writeEnterpriseAudit } from "../core/security/audit-writer.js"
import { publishRealtimeEvent } from "../realtime/websocket-gateway.js"

export async function processCommandExecution(job: { data: { tenantId: string; commandRequestId: string; approvedById?: string; requestedById?: string; action: string } }) {
  const { tenantId, commandRequestId, approvedById } = job.data
  const command = await prisma.commandRequest.findFirst({ where: { id: commandRequestId, tenantId } })
  if (!command) throw new Error("Command request not found")
  if (command.status !== "approved" && command.status !== "queued") throw new Error("Only approved or queued commands can be executed by the worker")

  await prisma.commandRequest.update({ where: { id: command.id }, data: { status: "executing" } })
  publishRealtimeEvent({ type: "command.updated", tenantId, payload: { commandRequestId: command.id, status: "executing" } })

  const result = await executeApprovedCommand(command)
  const execution = await prisma.commandExecution.create({
    data: {
      tenantId,
      commandRequestId: command.id,
      executedById: approvedById,
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
  await writeEnterpriseAudit({ tenantId, userId: approvedById, action: result.status === "failed" ? "command.fail" : "command.execute", resource: "command", resourceId: command.id, outcome: result.status === "failed" ? "failure" : "success", metadata: { executor: result.executor, workerOnly: true } })
  publishRealtimeEvent({ type: "command.updated", tenantId, payload: { commandRequestId: command.id, status: result.status, executionId: execution.id } })
  return execution
}
