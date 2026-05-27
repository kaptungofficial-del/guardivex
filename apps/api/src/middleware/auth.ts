import fp from "fastify-plugin"
import type { FastifyPluginAsync, FastifyRequest } from "fastify"
import { prisma } from "@guardivex/database"
import type { Permission, RoleName } from "@guardivex/shared"

export const authPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate("authenticate", async (request: FastifyRequest) => {
    try {
      const token = await request.jwtVerify<{ sub: string }>()
      const user = await prisma.user.findUnique({
        where: { id: token.sub },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: { include: { permission: true } },
                },
              },
            },
          },
        },
      })

      if (!user || user.status !== "active") {
        throw fastify.httpErrors.unauthorized("User is inactive or missing")
      }

      const roles = user.roles.map((entry) => entry.role.name as RoleName)
      const permissions = Array.from(
        new Set(user.roles.flatMap((entry) => entry.role.permissions.map((permission) => permission.permission.key as Permission))),
      )

      request.auth = {
        userId: user.id,
        tenantId: user.tenantId,
        email: user.email,
        roles,
        permissions,
      }
    } catch (error) {
      request.log.warn({ error }, "Authentication failed")
      throw fastify.httpErrors.unauthorized("Invalid or expired access token")
    }
  })
})

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>
  }
}
