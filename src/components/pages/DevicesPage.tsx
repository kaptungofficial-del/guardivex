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
}

export function DevicesPage({ devices }: DevicesPageProps) {
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
        return Lock
      case "alarm":
        return Siren
      default:
        return Circle
    }
  }

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.siteName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || device.status === statusFilter
    const matchesType = typeFilter === "all" || device.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Devices</h1>
        <p className="text-sm md:text-base text-muted-foreground">Monitor and manage all security devices</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base md:text-lg font-semibold">Device Inventory</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <div className="relative flex-1">
              <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search devices or sites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-secondary">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-secondary">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="camera">Camera</SelectItem>
                <SelectItem value="sensor">Sensor</SelectItem>
                <SelectItem value="access_control">Access Control</SelectItem>
                <SelectItem value="alarm">Alarm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 md:mx-0">
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
                          <div className="flex items-center gap-2">
                            <DeviceIcon size={16} className="text-muted-foreground" />
                            {device.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm capitalize">
                          {device.type.replace("_", " ")}
                        </TableCell>
                        <TableCell className="text-sm">{device.siteName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{device.location}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="flex items-center gap-1.5 w-fit">
                            <StatusIcon size={10} weight="fill" className={getStatusColor(device.status)} />
                            <span className="capitalize">{device.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden xl:table-cell">
                          {formatDistanceToNow(new Date(device.lastSeen), { addSuffix: true })}
                        </TableCell>
                        <TableCell className="text-sm font-mono hidden lg:table-cell">{device.uptime}%</TableCell>
                        <TableCell className="text-sm font-mono text-muted-foreground hidden xl:table-cell">{device.firmware}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          {filteredDevices.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No devices found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}