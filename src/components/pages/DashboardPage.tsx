import { ShieldCheck, Buildings, Devices, Bell, Question, FolderOpen, TrendUp, Circle, CircleDashed, Camera, Lock, Siren } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import type { DashboardMetrics, Device, Alert } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface DashboardPageProps {
  metrics: DashboardMetrics
  devices: Device[]
  alerts: Alert[]
}

export function DashboardPage({ metrics, devices, alerts }: DashboardPageProps) {
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
        return Devices
    }
  }

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-warning text-warning-foreground"
      case "medium":
        return "bg-info text-info-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success"
    if (score >= 70) return "text-warning"
    return "text-destructive"
  }

  const recentDevices = devices.slice(0, 6)
  const recentAlerts = alerts.slice(0, 5)
  const devicesOnlinePercent = Math.round((metrics.devicesOnline / metrics.devicesTotal) * 100)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security Operations Center</h1>
        <p className="text-muted-foreground">Real-time monitoring and threat detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Score</CardTitle>
            <ShieldCheck size={20} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className={`text-3xl font-bold ${getScoreColor(metrics.securityScore)}`}>
                {metrics.securityScore}
              </div>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
            <Progress value={metrics.securityScore} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <TrendUp size={12} weight="bold" />
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sites</CardTitle>
            <Buildings size={20} className="text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalSites}</div>
            <p className="text-xs text-muted-foreground mt-2">
              All operational
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Devices Online</CardTitle>
            <Devices size={20} className="text-info" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{metrics.devicesOnline}</div>
              <span className="text-sm text-muted-foreground">/ {metrics.devicesTotal}</span>
            </div>
            <Progress value={devicesOnlinePercent} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {devicesOnlinePercent}% operational
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Alerts</CardTitle>
            <Bell size={20} className="text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{metrics.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border-border hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unknown Devices</CardTitle>
            <Question size={20} className="text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{metrics.unknownDevices}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Unregistered devices detected
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Incidents</CardTitle>
            <FolderOpen size={20} className="text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{metrics.openIncidents}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Active investigations
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Device Health Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uptime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDevices.map((device) => {
                  const StatusIcon = getStatusIcon(device.status)
                  const DeviceIcon = getDeviceIcon(device.type)
                  return (
                    <TableRow key={device.id} className="hover:bg-secondary/50">
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <DeviceIcon size={16} className="text-muted-foreground" />
                          {device.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{device.siteName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon size={12} weight="fill" className={getStatusColor(device.status)} />
                          <span className="text-sm capitalize">{device.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-mono">{device.uptime}%</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getSeverityColor(alert.severity)} variant="secondary">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium mb-1">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="font-mono">{alert.deviceName}</span>
                      <span>•</span>
                      <span>{alert.siteName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}