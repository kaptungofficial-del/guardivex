import type { FastifyPluginAsync } from "fastify"
import { register } from "../services/observability.js"

export const metricsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/metrics", async (_request, reply) => {
    reply.header("Content-Type", register.contentType)
    return register.metrics()
  })
}
