import { useEffect, useMemo, useState } from "react"

const ACCESS_TOKEN_KEY = "guardivex.accessToken"
const API_URL = (import.meta.env.VITE_API_URL ?? "http://127.0.0.1:4000").replace(/\/$/, "")

export type DashboardRealtimeEventType = "alert.created" | "device.heartbeat" | "incident.updated" | "command.updated"

export interface DashboardRealtimeEvent {
  type: DashboardRealtimeEventType
  tenantId: string
  payload: Record<string, unknown>
  occurredAt: string
}

function websocketUrl() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) return null
  const base = new URL(API_URL)
  base.protocol = base.protocol === "https:" ? "wss:" : "ws:"
  base.pathname = "/realtime"
  base.searchParams.set("token", token)
  return base.toString()
}

export function useRealtimeDashboard() {
  const [connected, setConnected] = useState(false)
  const [events, setEvents] = useState<DashboardRealtimeEvent[]>([])

  useEffect(() => {
    const url = websocketUrl()
    if (!url) return

    const socket = new WebSocket(url)
    socket.addEventListener("open", () => setConnected(true))
    socket.addEventListener("close", () => setConnected(false))
    socket.addEventListener("message", (message) => {
      try {
        const parsed = JSON.parse(message.data) as DashboardRealtimeEvent | { type: string }
        if (parsed.type === "connected") return
        setEvents((current) => [parsed as DashboardRealtimeEvent, ...current].slice(0, 25))
      } catch {
        // Ignore malformed realtime frames from older gateways.
      }
    })

    return () => socket.close()
  }, [])

  return useMemo(() => ({
    connected,
    events,
    liveAlerts: events.filter((event) => event.type === "alert.created"),
    heartbeatUpdates: events.filter((event) => event.type === "device.heartbeat"),
    incidentUpdates: events.filter((event) => event.type === "incident.updated"),
  }), [connected, events])
}
