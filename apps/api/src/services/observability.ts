import client from "prom-client"
import { trace } from "@opentelemetry/api"
import { NodeSDK } from "@opentelemetry/sdk-node"
import { env } from "../config/env.js"

export const register = new client.Registry()
client.collectDefaultMetrics({ register, prefix: "guardivex_" })

export const httpRequestCounter = new client.Counter({
  name: "guardivex_http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"] as const,
  registers: [register],
})

export const adapterHeartbeatGauge = new client.Gauge({
  name: "guardivex_adapter_heartbeat_status",
  help: "Adapter heartbeat status, 1 for online and 0 for non-online",
  labelNames: ["tenant_id", "vendor", "adapter"] as const,
  registers: [register],
})

let sdk: NodeSDK | undefined

export function startTracing() {
  if (sdk) return
  sdk = new NodeSDK()
  sdk.start()
}

export function getTracer() {
  return trace.getTracer(env.OTEL_SERVICE_NAME)
}
