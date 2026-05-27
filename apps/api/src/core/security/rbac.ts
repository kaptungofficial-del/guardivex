import type { Permission } from "@guardivex/shared"

export interface RbacPrincipal {
  userId: string
  tenantId: string
  roles: string[]
  permissions: string[]
}

export interface RbacDecision {
  allowed: boolean
  permission: Permission
  reasons: string[]
}

export function evaluateRbac(principal: RbacPrincipal | null | undefined, permission: Permission): RbacDecision {
  if (!principal) {
    return { allowed: false, permission, reasons: ["Authentication is required"] }
  }

  if (!principal.permissions.includes(permission)) {
    return { allowed: false, permission, reasons: [`Missing permission: ${permission}`] }
  }

  return { allowed: true, permission, reasons: [] }
}

export function requireRbac(principal: RbacPrincipal | null | undefined, permission: Permission) {
  const decision = evaluateRbac(principal, permission)
  if (!decision.allowed) {
    const error = new Error(decision.reasons.join("; "))
    error.name = "RbacDeniedError"
    throw error
  }
  return decision
}
