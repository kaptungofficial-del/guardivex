import { MapPin, ShieldCheck, Devices, Circle } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Site } from "@/lib/types"

interface SitesPageProps {
  sites: Site[]
}

export function SitesPage({ sites }: SitesPageProps) {
  const getStatusVariant = (status: Site["status"]) => {
    switch (status) {
      case "operational":
        return "default"
      case "warning":
        return "secondary"
      case "critical":
        return "destructive"
    }
  }

  const getStatusColor = (status: Site["status"]) => {
    switch (status) {
      case "operational":
        return "text-success"
      case "warning":
        return "text-warning"
      case "critical":
        return "text-destructive"
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Sites</h1>
        <p className="text-sm md:text-base text-muted-foreground">Manage security infrastructure across all locations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {sites.map((site) => {
          const devicesOnlinePercent = Math.round((site.devicesOnline / site.devicesTotal) * 100)
          return (
            <Card key={site.id} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-1">{site.name}</CardTitle>
                    <p className="text-xs text-muted-foreground flex items-start gap-1">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      {site.address}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(site.status)} className="capitalize">
                    {site.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Security Score</span>
                  </div>
                  <span className={`text-lg font-bold ${getStatusColor(site.status)}`}>
                    {site.securityScore}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Devices size={20} className="text-info" />
                      <span className="text-sm text-muted-foreground">Devices</span>
                    </div>
                    <span className="text-sm font-mono">
                      {site.devicesOnline} / {site.devicesTotal}
                    </span>
                  </div>
                  <Progress value={devicesOnlinePercent} className="h-2" />
                </div>

                {site.lastIncident && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Last incident: {new Date(site.lastIncident).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {!site.lastIncident && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-success flex items-center gap-1">
                      <Circle size={8} weight="fill" />
                      No incidents recorded
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}