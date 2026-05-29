import { useState } from "react"
import { Camera, Lock, Siren, Circle, CircleDashed, MagnifyingGlass } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Device } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface DevicesPageProps {
  devices: Device[]
  onSelectDevice?: (deviceId: string) => void
}

export function DevicesPage({ devices, onSelectDevice }: DevicesPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const getStatusColor = (status: Device["status"]) => {
    switch (status) {
      case "online":
        return "text-success"
      case "offline":
        return "text-destructive"
      case "warning":
      case "degraded":
      case "maintenance":
      case "unknown":
        return "text-warning"
    }
  }

  const getStatusIcon = (status: Device["status"]) => {
    return status === "online" ? Circle : CircleDashed
  }

  const getDeviceIcon = (type: Device["type"]) => {
    switch (type) {
      case "camera":
        return Camera
      case "access_control":
      case "access_control_panel":
      case "door_contact":
        return Lock
      case "alarm":
      case "alarm_panel":
        return Siren
      default:
        return Circle
    }
  }

  const filteredDevices = devices.filter((device) => {
    const siteName = device.siteName ?? ""
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               siteName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || device.status === statusFilter
    const matchesType = typeFilter === "all" || device.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="p-4 md:p-5 space-y-5">
      <div>
        <h1 className="text-2xl md:text-[2rem] font-semibold tracking-tight">Devices</h1>
        <p className="text-sm md:text-base text-muted-foreground">Monitor and manage all security devices</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base md:text-lg font-semibold">Device Inventory</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2.5">
            <div className="relative flex-1">
              <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search devices or sites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary h-8.5"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-secondary h-8.5">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="degraded">Degraded</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-secondary h-8.5">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="camera">Camera</SelectItem>
                <SelectItem value="sensor">Sensor</SelectItem>
                <SelectItem value="access_control">Access Control</SelectItem>
                <SelectItem value="access_control_panel">Access Control Panel</SelectItem>
                <SelectItem value="alarm">Alarm</SelectItem>
                <SelectItem value="alarm_panel">Alarm Panel</SelectItem>
                <SelectItem value="network_switch">Network Switch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:hidden">
            {filteredDevices.map((device) => {
              const StatusIcon = getStatusIcon(device.status)
              const DeviceIcon = getDeviceIcon(device.type)

              return (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => onSelectDevice?.(device.id)}
                  className="w-full rounded-lg border border-border bg-secondary/30 p-3 text-left transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground">
                      <DeviceIcon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
                        <div className="min-w-0">
                          <div className="truncate font-mono text-sm font-semibold">{device.name}</div>
                          <div className="mt-1 text-xs capitalize text-muted-foreground">{device.type.replace("_", " ")}</div>
                        </div>
                        <Badge variant="secondary" className="flex w-fit items-center gap-1.5">
                          <StatusIcon size={10} weight="fill" className={getStatusColor(device.status)} />
                          <span className="capitalize">{device.status}</span>
                        </Badge>
                      </div>
                      <div className="mt-3 grid gap-1.5 text-xs text-muted-foreground">
                        <div className="truncate"><span className="font-medium text-foreground">Site:</span> {device.siteName ?? "-"}</div>
                        <div className="truncate"><span className="font-medium text-foreground">Location:</span> {device.location ?? "-"}</div>
                        <div><span className="font-medium text-foreground">Last seen:</span> {device.lastSeen ?? device.lastSeenAt ? formatDistanceToNow(new Date(device.lastSeen ?? device.lastSeenAt!), { addSuffix: true }) : "-"}</div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="hidden overflow-x-auto -mx-6 md:mx-0 md:block">
            <div className="min-w-[800px] md:min-w-0 px-6 md:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead className="hidden lg:table-cell">Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden xl:table-cell">Last Seen</TableHead>
                    <TableHead className="hidden lg:table-cell">Uptime</TableHead>
                    <TableHead className="hidden xl:table-cell">Firmware</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.map((device) => {
                    const StatusIcon = getStatusIcon(device.status)
                    const DeviceIcon = getDeviceIcon(device.type)
                    return (
                      <TableRow key={device.id} className="hover:bg-secondary/50">
                        <TableCell className="font-mono text-sm font-medium">
                          <button type="button" onClick={() => onSelectDevice?.(device.id)} className="flex items-center gap-2 text-left hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                            <DeviceIcon size={16} className="text-muted-foreground" />
                            {device.name}
                          </button>
                        </TableCell>
                        <TableCell className="text-sm capitalize">
                          {device.type.replace("_", " ")}
                        </TableCell>
                        <TableCell className="text-sm">{device.siteName ?? "-"}</TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{device.location ?? "-"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="flex items-center gap-1.5 w-fit">
                            <StatusIcon size={10} weight="fill" className={getStatusColor(device.status)} />
                            <span className="capitalize">{device.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden xl:table-cell">
                          {device.lastSeen ?? device.lastSeenAt ? formatDistanceToNow(new Date(device.lastSeen ?? device.lastSeenAt!), { addSuffix: true }) : "-"}
                        </TableCell>
                        <TableCell className="text-sm font-mono hidden lg:table-cell">{device.uptime !== undefined ? `${device.uptime}%` : "-"}</TableCell>
                        <TableCell className="text-sm font-mono text-muted-foreground hidden xl:table-cell">{device.firmware ?? "-"}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          {filteredDevices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No devices found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}