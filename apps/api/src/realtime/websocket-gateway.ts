import websocket from "@fastify/websocket"
import type { FastifyInstance } from "fastify"
import { EventEmitter } from "node:events"

type RealtimeEventType = "alert.created" | "device.heartbeat" | "incident.updated" | "command.updated"

export interface RealtimeEvent {
  type: RealtimeEventType
  tenantId: string
  payload: Record<string, unknown>
  occurredAt: string
}

const realtimeBus = new EventEmitter()
realtimeBus.setMaxListeners(500)

export function publishRealtimeEvent(event: Omit<RealtimeEvent, "occurredAt"> & { occurredAt?: string }) {
  realtimeBus.emit("event", { ...event, occurredAt: event.occurredAt ?? new Date().toISOString() })
}

export function publishLiveAlert(tenantId: string, payload: Record<string, unknown>) {
  publishRealtimeEvent({ type: "alert.created", tenantId, payload })
}

export function publishDeviceHeartbeat(tenantId: string, payload: Record<string, unknown>) {
  publishRealtimeEvent({ type: "device.heartbeat", tenantId, payload })
}

export function publishIncidentUpdate(tenantId: string, payload: Record<string, unknown>) {
  publishRealtimeEvent({ type: "incident.updated", tenantId, payload })
}

export async function registerRealtimeGateway(app: FastifyInstance) {
  await app.register(websocket)

  app.get("/realtime", {
    websocket: true,
    preHandler: [async (request) => {
      const query = request.query as { token?: string }
      if (query.token && !request.headers.authorization) {
        request.headers.authorization = `Bearer ${query.token}`
      }
      await app.authenticate(request)
    }],
  }, (socket, request) => {
    const tenantId = request.auth!.tenantId
    const listener = (event: RealtimeEvent) => {
      if (event.tenantId !== tenantId) return
      socket.send(JSON.stringify(event))
    }

    realtimeBus.on("event", listener)
    socket.send(JSON.stringify({ type: "connected", tenantId, occurredAt: new Date().toISOString() }))
    socket.on("close", () => realtimeBus.off("event", listener))
  })
}
