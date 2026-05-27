import type { FastifyReply, FastifyRequest } from "fastify"
import type { Permission } from "@guardivex/shared"
import { writeAuditLog } from "../services/audit.js"

export function requirePermission(permission: Permission) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.auth) {
      await reply.unauthorized("Authentication required")
      return
    }

    if (!request.auth.permissions.includes(permission)) {
      await writeAuditLog(request, {
        action: "rbac.denied",
        resource: "permission",
        resourceId: permission,
        outcome: "denied",
      })
      await reply.forbidden(`Missing permission: ${permission}`)
    }
  }
}
