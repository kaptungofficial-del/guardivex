import type { FastifyRequest } from "fastify"
import { createHash } from "node:crypto"
import { Prisma, prisma } from "@guardivex/database"

interface AuditInput {
  action: string
  resource: string
  resourceId?: string
  outcome: "success" | "denied" | "failure"
  metadata?: Record<string, unknown>
}

export async function writeAuditLog(request: FastifyRequest, input: AuditInput) {
  const tenantId = request.auth?.tenantId
  if (!tenantId) return

  const previous = await prisma.auditLog.findFirst({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
    select: { recordHash: true },
  })
  const metadata = input.metadata ?? {}
  const recordHash = createHash("sha256").update(JSON.stringify({
    previousHash: previous?.recordHash ?? null,
    tenantId,
    userId: request.auth?.userId ?? null,
    action: input.action,
    resource: input.resource,
    resourceId: input.resourceId ?? null,
    outcome: input.outcome,
    metadata,
  })).digest("hex")

  await prisma.auditLog.create({
    data: {
      tenantId,
      userId: request.auth?.userId,
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId,
      outcome: input.outcome,
      ipAddress: request.ip,
      userAgent: request.headers["user-agent"],
      metadata: metadata as Prisma.InputJsonValue,
      previousHash: previous?.recordHash,
      recordHash,
    },
  })
}
