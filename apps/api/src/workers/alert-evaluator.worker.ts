import { Prisma, prisma } from "@guardivex/database"
import { publishDeviceHeartbeat, publishLiveAlert } from "../realtime/websocket-gateway.js"

export async function processAlertFanout(job: { data: { tenantId: string; alertId: string; severity: "info" | "low" | "medium" | "high" | "critical"; channels?: string[] } }) {
  const alert = await prisma.alert.findFirst({ where: { id: job.data.alertId, tenantId: job.data.tenantId } })
  if (!alert) throw new Error("Alert not found")

  publishLiveAlert(job.data.tenantId, { alertId: alert.id, title: alert.title, severity: alert.severity, status: alert.status })
  return { fanout: true, channels: job.data.channels ?? ["push"], alertId: alert.id }
}

export async function processDeviceHeartbeat(job: { data: { tenantId: string; deviceId: string; status: "online" | "offline" | "degraded" | "maintenance" | "unknown"; checkedAt: string; telemetry?: Record<string, unknown> } }) {
  const heartbeat = await prisma.deviceHeartbeat.create({
    data: {
      tenantId: job.data.tenantId,
      deviceId: job.data.deviceId,
      status: job.data.status,
      checkedAt: new Date(job.data.checkedAt),
      telemetry: (job.data.telemetry ?? {}) as Prisma.InputJsonValue,
    },
  })

  await prisma.device.updateMany({ where: { id: job.data.deviceId, tenantId: job.data.tenantId }, data: { status: job.data.status, lastSeenAt: heartbeat.checkedAt } })
  publishDeviceHeartbeat(job.data.tenantId, { deviceId: job.data.deviceId, status: job.data.status, checkedAt: heartbeat.checkedAt.toISOString() })
  return heartbeat
}
