import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ShieldCheck, 
  Buildings, 
  Monitor, 
  Warning, 
  CircleDashed,
  CheckCircle,
  ChartLine,
  Key,
  ArrowUp,
  CaretRight
} from "@phosphor-icons/react"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import type { DashboardMetrics, SystemHealth, LicenseInfo, Alert } from "@/lib/types"

interface MobileDashboardCardsProps {
  metrics: DashboardMetrics
  systemHealth: SystemHealth
  license: LicenseInfo
  alerts: Alert[]
}

export function MobileDashboardCards({ metrics, systemHealth, license, alerts }: MobileDashboardCardsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'start',
    containScroll: 'trimSnaps'
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const criticalAlerts = alerts.filter(a => !a.acknowledged && (a.severity === 'critical' || a.severity === 'high'))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-heading font-semibold">Quick Overview</h2>
        <div className="flex gap-1">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === selectedIndex 
                  ? 'w-6 bg-primary' 
                  : 'w-1.5 bg-muted-foreground/30'
              }`}
              onClick={() => scrollTo(index)}
              title={`Go to slide ${index + 1}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          <div className="flex-[0_0_85%] min-w-0">
            <Card className="border-l-4 border-l-primary h-full bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Security Score</CardTitle>
                  <ShieldCheck size={24} className="text-primary" weight="duotone" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-bold font-heading">{metrics.securityScore}%</div>
                <Progress value={metrics.securityScore} className="h-2.5" />
                <p className="text-xs text-muted-foreground">Overall security posture</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex-[0_0_85%] min-w-0">
            <Card className={`h-full ${metrics.criticalAlerts > 0 ? 'border-l-4 border-l-destructive' : ''} bg-gradient-to-br from-card to-card/80`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Critical Alerts</CardTitle>
                  <Warning size={24} className={metrics.criticalAlerts > 0 ? "text-destructive" : "text-muted-foreground"} weight="duotone" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className={`text-4xl font-bold font-heading ${metrics.criticalAlerts > 0 ? 'text-destructive' : ''}`}>
                  {metrics.criticalAlerts}
                </div>
                {metrics.criticalAlerts > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    Requires immediate attention
                  </Badge>
                )}
                <p className="text-xs text-muted-foreground">Active critical alerts</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex-[0_0_85%] min-w-0">
            <Card className="h-full bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Devices Online</CardTitle>
                  <Monitor size={24} className="text-primary" weight="duotone" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-bold font-heading">
                  {metrics.devicesOnline}<span className="text-2xl text-muted-foreground">/{metrics.devicesTotal}</span>
                </div>
                <Progress value={(metrics.devicesOnline / metrics.devicesTotal) * 100} className="h-2.5" />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Device connectivity</p>
                  <Badge variant="outline" className="text-xs">
                    {((metrics.devicesOnline / metrics.devicesTotal) * 100).toFixed(0)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-[0_0_85%] min-w-0">
            <Card className="h-full bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Sites Monitored</CardTitle>
                  <Buildings size={24} className="text-accent" weight="duotone" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-bold font-heading">{metrics.totalSites}</div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-success" weight="fill" />
                  <p className="text-xs text-muted-foreground">All sites reporting</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-[0_0_85%] min-w-0">
            <Card className="h-full bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium uppercase text-muted-foreground">System Health</CardTitle>
                  <ChartLine size={24} className={metrics.systemHealth === "healthy" ? "text-success" : "text-warning"} weight="duotone" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge 
                  variant={metrics.systemHealth === "healthy" ? "default" : "destructive"}
                  className="text-lg uppercase px-4 py-1"
                >
                  {metrics.systemHealth}
                </Badge>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="text-center p-2 bg-secondary/20 rounded">
                    <div className="text-xs text-muted-foreground">CPU</div>
                    <div className="text-sm font-bold">{systemHealth.cpuUsage}%</div>
                  </div>
                  <div className="text-center p-2 bg-secondary/20 rounded">
                    <div className="text-xs text-muted-foreground">Memory</div>
                    <div className="text-sm font-bold">{systemHealth.memoryUsage}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-[0_0_85%] min-w-0">
            <Card className="h-full bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-medium uppercase text-muted-foreground">License Status</CardTitle>
                  <Key size={24} className={license.status === "active" ? "text-success" : "text-warning"} weight="duotone" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge 
                  variant={license.status === "active" ? "default" : "destructive"}
                  className="text-lg uppercase px-4 py-1"
                >
                  {license.status}
                </Badge>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tier</span>
                    <span className="font-semibold uppercase">{license.tier}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Expires</span>
                    <span className="font-semibold">{new Date(license.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Critical Alerts Feed</CardTitle>
              <Badge variant="destructive" className="text-xs">{criticalAlerts.length} Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-64 overflow-y-auto">
            {criticalAlerts.length === 0 ? (
              <div className="text-center py-6 text-sm text-muted-foreground">
                <CheckCircle size={32} className="text-success mx-auto mb-2" weight="duotone" />
                <p>No critical alerts</p>
              </div>
            ) : (
              criticalAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold mb-1">{alert.title}</div>
                      <div className="text-xs text-muted-foreground mb-2">{alert.message}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate">{alert.deviceName}</span>
                        <span>•</span>
                        <span>{new Date(alert.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <Badge variant="destructive" className="text-xs uppercase shrink-0">
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <CircleDashed size={20} className="text-warning" weight="duotone" />
                <CaretRight size={16} className="text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold font-heading mb-1">{metrics.unknownDevices}</div>
              <div className="text-xs text-muted-foreground">Unknown Devices</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Warning size={20} className="text-destructive" weight="duotone" />
                <CaretRight size={16} className="text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold font-heading mb-1">{metrics.openIncidents}</div>
              <div className="text-xs text-muted-foreground">Open Incidents</div>
            </CardContent>
          </Card>
        </div>

        {metrics.updateAvailable && (
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <ArrowUp size={24} className="text-primary shrink-0" weight="duotone" />
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">Update Available</div>
                  <div className="text-xs text-muted-foreground mb-2">Version 3.2.2 is ready to install</div>
                  <button className="text-xs font-semibold text-primary">
                    View Details →
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
