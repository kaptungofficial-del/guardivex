import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useMemo, useState } from "react"
import { 
  ShieldCheck, 
  Buildings, 
  Monitor, 
  Warning, 
  CircleDashed,
  Bell,
  CheckCircle,
  XCircle,
  Database,
  ChartLine,
  Key,
  ArrowUp
} from "@phosphor-icons/react"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileDashboardCards } from "./MobileDashboardCards"
import type { DashboardMetrics, SystemHealth, LicenseInfo, ActivityLog, Device, Alert } from "@/lib/types"

interface SOCDashboardPageProps {
  metrics: DashboardMetrics
  systemHealth: SystemHealth
  license: LicenseInfo
  activityLogs: ActivityLog[]
  devices: Device[]
  alerts: Alert[]
}

export function SOCDashboardPage({ metrics, systemHealth, license, activityLogs, alerts }: SOCDashboardPageProps) {
  const isMobile = useIsMobile()
  const [activityFilter, setActivityFilter] = useState<"all" | "failed" | "login">("all")
  const [alertFilter, setAlertFilter] = useState<"all" | "actionable" | "unacknowledged">("all")

  const safePercent = (value: number, total: number) => {
    if (total <= 0) return 0
    return (value / total) * 100
  }

  const onlinePercent = safePercent(metrics.devicesOnline, metrics.devicesTotal)
  const sitesUsagePercent = safePercent(license.currentSites, license.licensedSites)
  const devicesUsagePercent = safePercent(license.currentDevices, license.licensedDevices)
  const latencyProgress = Math.min((systemHealth.networkLatency / 200) * 100, 100)

  const degradedServicesCount = systemHealth.servicesStatus.filter((service) => service.status !== "running").length
  const failedEventsCount = activityLogs.filter((log) => !log.success).length
  const actionableAlertsCount = alerts.filter(
    (alert) => !alert.acknowledged && (alert.severity === "critical" || alert.severity === "high")
  ).length

  const sortedActivity = useMemo(
    () => [...activityLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [activityLogs]
  )

  const filteredActivity = useMemo(
    () =>
      sortedActivity
        .filter((log) => {
          if (activityFilter === "failed") return !log.success
          if (activityFilter === "login") return log.type === "login"
          return true
        })
        .slice(0, 6),
    [activityFilter, sortedActivity]
  )

  const sortedAlerts = useMemo(
    () =>
      [...alerts]
        .sort((a, b) => {
          const severityRank: Record<Alert["severity"], number> = {
            critical: 4,
            high: 3,
            medium: 2,
            low: 1,
          }

          if (a.acknowledged !== b.acknowledged) {
            return Number(a.acknowledged) - Number(b.acknowledged)
          }

          const severityDiff = severityRank[b.severity] - severityRank[a.severity]
          if (severityDiff !== 0) return severityDiff

          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        }),
    [alerts]
  )

  const filteredAlerts = useMemo(
    () =>
      sortedAlerts
        .filter((alert) => {
          if (alertFilter === "actionable") return !alert.acknowledged && (alert.severity === "critical" || alert.severity === "high")
          if (alertFilter === "unacknowledged") return !alert.acknowledged
          return true
        })
        .slice(0, 6),
    [alertFilter, sortedAlerts]
  )

  return (
    <div className="p-4 md:p-5 lg:p-6 space-y-5">
      <div>
        <h1 className="text-2xl md:text-[2rem] font-heading font-semibold mb-1.5">SOC Command Center</h1>
        <p className="text-sm md:text-base text-muted-foreground">Real-time security monitoring and platform health overview</p>
        {!isMobile && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="uppercase text-[10px]">Live View</Badge>
            <Badge variant={actionableAlertsCount > 0 ? "destructive" : "outline"} className="text-[10px]">
              {actionableAlertsCount} actionable alerts
            </Badge>
            <Badge variant={degradedServicesCount > 0 ? "destructive" : "outline"} className="text-[10px]">
              {degradedServicesCount} degraded services
            </Badge>
            <Badge variant={failedEventsCount > 0 ? "destructive" : "outline"} className="text-[10px]">
              {failedEventsCount} failed events
            </Badge>
          </div>
        )}
      </div>

      {isMobile && (
        <MobileDashboardCards 
          metrics={metrics}
          systemHealth={systemHealth}
          license={license}
          alerts={alerts}
        />
      )}

      {!isMobile && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Security Score</CardTitle>
                <ShieldCheck size={20} className="text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading mb-2">{metrics.securityScore}%</div>
              <Progress value={metrics.securityScore} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Sites</CardTitle>
                <Buildings size={20} className="text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading">{metrics.totalSites}</div>
              <p className="text-xs text-muted-foreground mt-1">Monitored locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Devices</CardTitle>
                <Monitor size={20} className="text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading">
                {metrics.devicesOnline}/{metrics.devicesTotal}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {onlinePercent.toFixed(1)}% Online
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className={metrics.criticalAlerts > 0 ? "border-l-4 border-l-destructive" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Critical Alerts</CardTitle>
                <Warning size={20} className={metrics.criticalAlerts > 0 ? "text-destructive" : "text-muted-foreground"} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading text-destructive">{metrics.criticalAlerts}</div>
              <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>
      )}

      {!isMobile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
          </CardHeader>
            <CardContent className="space-y-3.5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div>
                <div className="text-xs text-muted-foreground mb-1">CPU</div>
                <div className="text-xl font-bold">{systemHealth.cpuUsage}%</div>
                <Progress value={systemHealth.cpuUsage} className="h-1 mt-2" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Memory</div>
                <div className="text-xl font-bold">{systemHealth.memoryUsage}%</div>
                <Progress value={systemHealth.memoryUsage} className="h-1 mt-2" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Disk</div>
                <div className="text-xl font-bold">{systemHealth.diskUsage}%</div>
                <Progress value={systemHealth.diskUsage} className="h-1 mt-2" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Latency</div>
                <div className="text-xl font-bold">{systemHealth.networkLatency}ms</div>
                <Progress value={latencyProgress} className="h-1 mt-2" />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-sm font-semibold mb-3">Services Status</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {systemHealth.servicesStatus.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-2 bg-secondary/30 rounded">
                    <div className="flex items-center gap-2">
                      {service.status === "running" ? (
                        <CheckCircle size={16} className="text-success" />
                      ) : (
                        <XCircle size={16} className="text-destructive" />
                      )}
                      <span className="text-sm">{service.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{service.uptime}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Database</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    systemHealth.databaseStatus === "connected" ? "bg-success" : "bg-destructive"
                  }`} />
                  <span className="text-xs text-muted-foreground capitalize">{systemHealth.databaseStatus}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">Last Backup</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(systemHealth.lastBackup).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>License Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Tier</span>
                <Badge className="uppercase">{license.tier}</Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={license.status === "active" ? "default" : "destructive"} className="uppercase">
                  {license.status}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-sm font-semibold mb-3">Usage</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Sites</span>
                    <span>{license.currentSites} / {license.licensedSites}</span>
                  </div>
                  <Progress value={sitesUsagePercent} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Devices</span>
                    <span>{license.currentDevices} / {license.licensedDevices}</span>
                  </div>
                  <Progress value={devicesUsagePercent} className="h-2" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Expires</span>
                <span className="text-sm font-medium">{new Date(license.expirationDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Cloud Services</span>
                {license.cloudServicesEnabled ? (
                  <CheckCircle size={16} className="text-success" />
                ) : (
                  <XCircle size={16} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Support</span>
                <Badge variant="outline" className="capitalize">{license.supportLevel}</Badge>
              </div>
            </div>

            {metrics.updateAvailable && (
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded border border-primary/20">
                  <ArrowUp size={16} className="text-primary" />
                  <div className="text-sm">
                    <div className="font-semibold text-primary">Update Available</div>
                    <div className="text-xs text-muted-foreground">Version 3.2.2 ready</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      )}

      {!isMobile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>Recent Activity</CardTitle>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActivityFilter("all")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    activityFilter === "all"
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-background text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setActivityFilter("failed")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    activityFilter === "failed"
                      ? "bg-destructive/10 text-destructive border-destructive/30"
                      : "bg-background text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  Failed
                </button>
                <button
                  type="button"
                  onClick={() => setActivityFilter("login")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    activityFilter === "login"
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-background text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  Login
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredActivity.length === 0 && (
                <div className="text-sm text-muted-foreground">No activity logs available.</div>
              )}
              {filteredActivity.map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div className="mt-1">
                    {log.type === "login" && <ChartLine size={16} className="text-primary" />}
                    {log.type === "api" && <Database size={16} className="text-accent" />}
                    {log.type === "web" && <Monitor size={16} className="text-muted-foreground" />}
                    {log.type === "system" && <CheckCircle size={16} className="text-success" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate">{log.action}</span>
                      <Badge variant="outline" className="text-xs uppercase shrink-0">{log.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{log.user}</span>
                      {log.ipAddress && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground font-mono">{log.ipAddress}</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {log.success ? (
                      <CheckCircle size={14} className="text-success" />
                    ) : (
                      <XCircle size={14} className="text-destructive" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>Recent Alerts</CardTitle>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setAlertFilter("all")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    alertFilter === "all"
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-background text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setAlertFilter("actionable")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    alertFilter === "actionable"
                      ? "bg-destructive/10 text-destructive border-destructive/30"
                      : "bg-background text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  Actionable
                </button>
                <button
                  type="button"
                  onClick={() => setAlertFilter("unacknowledged")}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    alertFilter === "unacknowledged"
                      ? "bg-warning/10 text-warning border-warning/30"
                      : "bg-background text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  Unacked
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAlerts.length === 0 && (
                <div className="text-sm text-muted-foreground">No alerts available.</div>
              )}
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <Badge 
                    variant={alert.severity === "critical" || alert.severity === "high" ? "destructive" : "outline"}
                    className="text-xs uppercase mt-1"
                  >
                    {alert.severity}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium mb-1">{alert.title}</div>
                    <div className="text-xs text-muted-foreground mb-2">{alert.message}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{alert.deviceName}</span>
                      <span>•</span>
                      <span>{alert.siteName}</span>
                      <span>•</span>
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  {alert.acknowledged ? (
                    <CheckCircle size={16} className="text-success mt-1" />
                  ) : (
                    <Bell size={16} className="text-destructive mt-1" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      )}

      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Unknown Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.unknownDevices}</div>
              <CircleDashed size={24} className="text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Open Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.openIncidents}</div>
              <Warning size={24} className="text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge 
                variant={metrics.systemHealth === "healthy" ? "default" : "destructive"}
                className="uppercase"
              >
                {metrics.systemHealth}
              </Badge>
              <ChartLine size={24} className={metrics.systemHealth === "healthy" ? "text-success" : "text-destructive"} />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">License Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge 
                variant={metrics.licenseStatus === "active" ? "default" : "destructive"}
                className="uppercase"
              >
                {metrics.licenseStatus}
              </Badge>
              <Key size={24} className={metrics.licenseStatus === "active" ? "text-success" : "text-warning"} />
            </div>
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  )
}
