import type { PrismaClient } from "@prisma/client"

export interface TenantScopedPrincipal {
  tenantId: string
}

export interface TenantScopedTarget {
  tenantId?: string | null
}

export function tenantWhere<T extends Record<string, unknown>>(tenantId: string, where?: T) {
  return { ...(where ?? {}), tenantId }
}

export function assertTenantScope(principal: TenantScopedPrincipal, target: TenantScopedTarget | null | undefined, resource = "resource") {
  if (!target || target.tenantId !== principal.tenantId) {
    const error = new Error(`${resource} is outside tenant scope or missing`)
    error.name = "TenantScopeDeniedError"
    throw error
  }
}

export async function assertCommandTargetInTenant(prisma: PrismaClient, tenantId: string, input: { targetDeviceId?: string | null; targetDoorId?: string | null }) {
  const [device, door] = await Promise.all([
    input.targetDeviceId ? prisma.device.findFirst({ where: { id: input.targetDeviceId, tenantId }, select: { id: true, tenantId: true } }) : Promise.resolve(null),
    input.targetDoorId ? prisma.door.findFirst({ where: { id: input.targetDoorId, tenantId }, select: { id: true, tenantId: true } }) : Promise.resolve(null),
  ])

  if ((input.targetDeviceId && !device) || (input.targetDoorId && !door)) {
    const error = new Error("Command target is outside tenant scope or missing")
    error.name = "TenantScopeDeniedError"
    throw error
  }

  return { device, door }
}
