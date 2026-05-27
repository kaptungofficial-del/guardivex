import "./types.js"
import Fastify from "fastify"
import cookie from "@fastify/cookie"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import jwt from "@fastify/jwt"
import rateLimit from "@fastify/rate-limit"
import sensible from "@fastify/sensible"
import { ZodError } from "zod"
import { env, corsOrigins } from "./config/env.js"
import { csrfProtection } from "./middleware/csrf.js"
import { authPlugin } from "./middleware/auth.js"
import { aiRoutes } from "./routes/ai.js"
import { authRoutes } from "./routes/auth.js"
import { commandRoutes } from "./routes/commands.js"
import { eventRoutes } from "./routes/events.js"
import { healthRoutes } from "./routes/health.js"
import { incidentRoutes } from "./routes/incidents.js"
import { metricsRoutes } from "./routes/metrics.js"
import { operationsRoutes } from "./routes/operations.js"
import { resourceRoutes } from "./routes/resources.js"
import { httpRequestCounter, startTracing } from "./services/observability.js"

export function buildServer() {
  startTracing()
  const app = Fastify({ logger: true })

  app.register(sensible)
  app.register(helmet, { global: true })
  app.register(cookie, { secret: env.COOKIE_SECRET })
  app.register(cors, {
    origin(origin, callback) {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error("Origin not allowed"), false)
    },
    credentials: true,
  })
  app.register(rateLimit, { max: 120, timeWindow: "1 minute" })
  app.register(jwt, { secret: env.JWT_ACCESS_SECRET })
  app.register(authPlugin)
  app.addHook("preHandler", csrfProtection)
  app.addHook("onResponse", async (request, reply) => {
    httpRequestCounter.inc({ method: request.method, route: request.routeOptions.url ?? request.url, status: String(reply.statusCode) })
  })

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error)

    if (error instanceof ZodError) {
      reply.status(400).send({ error: { code: "VALIDATION_ERROR", issues: error.issues } })
      return
    }

    const statusCode = typeof error === "object" && error !== null && "statusCode" in error && typeof error.statusCode === "number" ? error.statusCode : 500
    const message = error instanceof Error ? error.message : "Unexpected server error"
    reply.status(statusCode).send({
      error: {
        code: statusCode >= 500 ? "INTERNAL_SERVER_ERROR" : "REQUEST_ERROR",
        message: statusCode >= 500 ? "Unexpected server error" : message,
      },
    })
  })

  app.register(healthRoutes)
  app.register(metricsRoutes)
  app.register(authRoutes)
  app.register(resourceRoutes)
  app.register(incidentRoutes)
  app.register(commandRoutes)
  app.register(eventRoutes)
  app.register(operationsRoutes)
  app.register(aiRoutes)

  return app
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const app = buildServer()
  app.listen({ host: "0.0.0.0", port: env.PORT }).catch((error) => {
    app.log.error(error)
    process.exit(1)
  })
}
