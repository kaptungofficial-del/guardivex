import type { FastifyPluginAsync } from "fastify"
import { prisma } from "@guardivex/database"

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/health", async () => {
    await prisma.$queryRaw`SELECT 1`
    return {
      status: "ok",
      service: "guardivex-api",
      timestamp: new Date().toISOString(),
    }
  })
}
