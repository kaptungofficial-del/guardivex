import { useEffect, useState } from "react"
import { ArrowLeft, Bell, Camera, Circle, CircleDashed, Database, Network, ShieldCheck } from "@phosphor-icons/react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDevice, type DeviceDetail } from "@/lib/api"

interface DeviceDetailPageProps {
  deviceId: string
  onBack: () => void
}

function labelFor(value: unknown) {
  if (value === null || value === undefined || value === "") return "-"
  if (typeof value === "object") return JSON.stringify(value)
  return String(value)
}

function StatusBadge({ status }: { status: string }) {
  const Icon = status === "online" ? Circle : CircleDashed
  const tone = status === "online" ? "text-emerald-500" : status === "offline" ? "text-destructive" : "text-warning"

  return (
    <Badge variant="secondary" className="w-fit gap-1.5 capitalize">
      <Icon size={10} weight="fill" className={tone} />
      {status.replaceAll("_", " ")}
    </Badge>
  )
}

export function DeviceDetailPage({ deviceId, onBack }: DeviceDetailPageProps) {
  const [device, setDevice] = useState<DeviceDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getDevice(deviceId)
      .then((result) => setDevice(result.data))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Unable to load device"))
      .finally(() => setLoading(false))
  }, [deviceId])

  if (loading) {
    return <div className="p-5 text-sm text-muted-foreground">Loading device...</div>
  }

  if (error || !device) {
    return (
      <div className="space-y-4 p-5">
        <Button variant="outline" onClick={onBack} className="h-8 gap-2"><ArrowLeft size={15} />Back to devices</Button>
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error ?? "Device not found"}</div>
      </div>
    )
  }

  const lastSeen = device.lastSeenAt ? formatDistanceToNow(new Date(device.lastSeenAt), { addSuffix: true }) : "No heartbeat yet"

  return (
    <div className="space-y-5 p-4 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-3 h-8 gap-2"><ArrowLeft size={15} />Back to devices</Button>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight md:text-[2rem]">{device.name}</h1>
            <StatusBadge status={device.status} />
          </div>
          <p className="text-sm text-muted-foreground">Tenant-scoped detail view with recent events and alerts.</p>
        </div>
        <Badge variant="outline" className="w-fit border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          <ShieldCheck size={13} weight="fill" className="mr-1" />Read-only inventory
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Camera size={18} />Device Profile</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {[
              ["Type", device.type],
              ["Vendor", device.vendor],
              ["Model", device.model],
              ["Serial", device.serial],
              ["IP Address", device.ipAddress],
              ["Last Seen", lastSeen],
              ["Site", device.site?.name],
              ["Building", device.building?.name],
              ["Door", device.door?.name],
              ["Catalog", device.deviceTypeCatalog?.label],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-border bg-secondary/45 p-3">
                <div className="text-xs font-medium uppercase text-muted-foreground">{label}</div>
                <div className="mt-1 text-sm font-semibold">{labelFor(value)}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Network size={18} />Safety Boundary</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>This page is read-only. Any physical command must start as a command request.</p>
            <div className="rounded-md border border-border bg-secondary/45 p-3 text-xs">{"RBAC -> policy -> approval -> audit -> queue -> executor"}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Database size={18} />Recent Events</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {device.events.length === 0 ? <div className="py-6 text-center text-sm text-muted-foreground">No recent events.</div> : null}
            {device.events.map((event) => (
              <div key={event.id} className="rounded-md border border-border bg-secondary/45 p-3 text-sm">
                <div className="flex items-center justify-between gap-3"><span className="font-semibold">{event.type}</span><Badge variant="outline" className="capitalize">{event.severity}</Badge></div>
                <p className="mt-1 text-muted-foreground">{event.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Bell size={18} />Recent Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {device.alerts.length === 0 ? <div className="py-6 text-center text-sm text-muted-foreground">No recent alerts.</div> : null}
            {device.alerts.map((alert) => (
              <div key={alert.id} className="rounded-md border border-border bg-secondary/45 p-3 text-sm">
                <div className="flex items-center justify-between gap-3"><span className="font-semibold">{alert.title}</span><Badge variant="outline" className="capitalize">{alert.severity}</Badge></div>
                <p className="mt-1 text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
