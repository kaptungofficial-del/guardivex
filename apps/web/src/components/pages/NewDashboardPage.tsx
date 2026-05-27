import {
  ShieldCheck, Buildings, Devices, Bell, Question, FolderOpen, Camera, Lock, Siren, 
  Network, HardDrives, EyeSlash, TrendUp, Circle, Clock
} from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { DashboardMetrics, Device, Alert } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface DashboardPageProps {
  metrics: DashboardMetrics
  devices: Device[]
  alerts: Alert[]
}

export function NewDashboardPage({ metrics, devices, alerts }: DashboardPageProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success"
    if (score >= 75) return "text-warning"
    return "text-destructive"
  }

  const getScoreStatus = (score: number) => {
    if (score >= 90) return "EXCELLENT"
    if (score >= 75) return "GOOD"
    if (score >= 60) return "FAIR"
    return "CRITICAL"
  }

  const devicesByType = devices.reduce((acc, device) => {
    acc[device.type] = (acc[device.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const alertsBySeverity = alerts.reduce((acc, alert) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const recentEvents = alerts.slice(0, 5).map(alert => ({
    id: alert.id,
    type: alert.severity,
    message: alert.title,
    site: alert.siteName,
    time: alert.timestamp,
  }))

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-destructive"
      case "high":
        return "text-warning"
      case "medium":
        return "text-info"
      default:
        return "text-muted-foreground"
    }
  }

  const uptimePercentage = (metrics.devicesOnline / metrics.devicesTotal) * 100

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-background to-card/30 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground mt-1">Real-time security operations overview</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/50">
          <Clock size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-mono">{new Date().toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Security Score</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <ShieldCheck size={20} weight="bold" className="text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2">
              <div className={cn("text-4xl font-bold", getScoreColor(metrics.securityScore))}>
                {metrics.securityScore}
              </div>
              <span className="text-sm font-medium text-muted-foreground">/100</span>
            </div>
            <Badge variant="outline" className={cn("mt-2", getScoreColor(metrics.securityScore))}>
              {getScoreStatus(metrics.securityScore)}
            </Badge>
            <Progress value={metrics.securityScore} className="mt-3 h-1.5" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-destructive/5 transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent" />
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Critical Alerts</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center border border-destructive/20">
              <Bell size={20} weight="bold" className="text-destructive" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-destructive">
                {metrics.criticalAlerts}
              </div>
              <TrendUp size={20} className="text-destructive" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-success/5 transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent" />
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Devices Online</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center border border-success/20">
              <Devices size={20} weight="bold" className="text-success" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-success">
                {metrics.devicesOnline}
              </div>
              <span className="text-xl text-muted-foreground">/</span>
              <span className="text-2xl text-muted-foreground">{metrics.devicesTotal}</span>
            </div>
            <Progress value={uptimePercentage} className="mt-3 h-1.5" />
            <p className="text-sm text-muted-foreground mt-2">{uptimePercentage.toFixed(1)}% uptime</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-warning/5 transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent" />
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Open Incidents</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center border border-warning/20">
              <FolderOpen size={20} weight="bold" className="text-warning" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-warning">
                {metrics.openIncidents}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Under investigation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sites Monitored</CardTitle>
            <Buildings size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalSites}</div>
            <p className="text-sm text-muted-foreground mt-1">Active locations</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Unknown Devices</CardTitle>
            <Question size={18} className="text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{metrics.unknownDevices}</div>
            <p className="text-sm text-muted-foreground mt-1">Unregistered on network</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Devices Offline</CardTitle>
            <EyeSlash size={18} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.devicesTotal - metrics.devicesOnline}</div>
            <p className="text-sm text-muted-foreground mt-1">Connectivity lost</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Device Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Camera size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold">{devicesByType.camera || 0}</div>
                <div className="text-sm text-muted-foreground">Cameras</div>
              </div>

              <div className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <HardDrives size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold">{devicesByType.nvr || 0}</div>
                <div className="text-sm text-muted-foreground">NVRs</div>
              </div>

              <div className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Lock size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold">{devicesByType.access_control || 0}</div>
                <div className="text-sm text-muted-foreground">Access Control</div>
              </div>

              <div className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Siren size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold">{devicesByType.alarm || 0}</div>
                <div className="text-sm text-muted-foreground">Alarm Panels</div>
              </div>

              <div className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Network size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold">{devicesByType.network || 0}</div>
                <div className="text-sm text-muted-foreground">Network</div>
              </div>

              <div className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Devices size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold">{devicesByType.sensor || 0}</div>
                <div className="text-sm text-muted-foreground">Sensors</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Alert Severity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-2">
                <Circle weight="fill" size={12} className="text-destructive" />
                <span className="text-sm font-medium">Critical</span>
              </div>
              <span className="text-xl font-bold text-destructive">{alertsBySeverity.critical || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-2">
                <Circle weight="fill" size={12} className="text-warning" />
                <span className="text-sm font-medium">High</span>
              </div>
              <span className="text-xl font-bold text-warning">{alertsBySeverity.high || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-info/10 border border-info/20">
              <div className="flex items-center gap-2">
                <Circle weight="fill" size={12} className="text-info" />
                <span className="text-sm font-medium">Medium</span>
              </div>
              <span className="text-xl font-bold text-info">{alertsBySeverity.medium || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/50">
              <div className="flex items-center gap-2">
                <Circle weight="fill" size={12} className="text-muted-foreground" />
                <span className="text-sm font-medium">Low</span>
              </div>
              <span className="text-xl font-bold text-muted-foreground">{alertsBySeverity.low || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Live Event Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <Circle weight="fill" size={10} className={cn(getSeverityColor(event.type), "animate-pulse")} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.site}</p>
                </div>
                <div className="flex-shrink-0 text-xs text-muted-foreground font-mono">
                  {formatDistanceToNow(new Date(event.time), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
