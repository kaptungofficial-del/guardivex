import { createHash } from "node:crypto"
import { Prisma, prisma } from "@guardivex/database"

export type EnterpriseAuditAction = "auth.login" | "auth.logout" | "auth.refresh" | "approval" | "denial" | "export" | "device.command" | "policy.failure" | "command.request" | "command.approve" | "command.reject" | "command.queue" | "command.execute" | "command.fail" | string

export interface EnterpriseAuditInput {
  tenantId: string
  userId?: string | null
  action: EnterpriseAuditAction
  resource: string
  resourceId?: string | null
  outcome: "success" | "denied" | "failure"
  ipAddress?: string | null
  userAgent?: string | null
  metadata?: Record<string, unknown>
}

export async function writeEnterpriseAudit(input: EnterpriseAuditInput) {
  const previous = await prisma.auditLog.findFirst({
    where: { tenantId: input.tenantId },
    orderBy: { createdAt: "desc" },
    select: { recordHash: true },
  })

  const canonical = {
    previousHash: previous?.recordHash ?? null,
    tenantId: input.tenantId,
    userId: input.userId ?? null,
    action: input.action,
    resource: input.resource,
    resourceId: input.resourceId ?? null,
    outcome: input.outcome,
    metadata: input.metadata ?? {},
  }
  const recordHash = createHash("sha256").update(JSON.stringify(canonical)).digest("hex")

  return prisma.auditLog.create({
    data: {
      tenantId: input.tenantId,
      userId: input.userId ?? undefined,
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId ?? undefined,
      outcome: input.outcome,
      ipAddress: input.ipAddress ?? undefined,
      userAgent: input.userAgent ?? undefined,
      metadata: (input.metadata ?? {}) as Prisma.InputJsonValue,
      previousHash: previous?.recordHash,
      recordHash,
    },
  })
}
