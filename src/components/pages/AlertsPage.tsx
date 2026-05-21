import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Alert } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

interface AlertsPageProps {
  alerts: Alert[]
}

export function AlertsPage({ alerts: initialAlerts }: AlertsPageProps) {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [severityFilter, setSeverityFilter] = useState<string>("all")

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

  const handleAcknowledge = (alertId: string) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    )
    toast.success("Alert acknowledged")
  }

  const filteredAlerts = alerts.filter((alert) =>
    severityFilter === "all" || alert.severity === severityFilter
  )

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Alerts</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Monitor and respond to security alerts • {unacknowledgedCount} unacknowledged
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-base md:text-lg font-semibold">Active Alerts</CardTitle>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-secondary">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.acknowledged
                  ? "border-l-border bg-secondary/30"
                  : "border-l-primary bg-card"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={getSeverityColor(alert.severity)} variant="secondary">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                      </span>
                      {alert.acknowledged && (
                        <Badge variant="outline" className="text-xs">
                          Acknowledged
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Device:</span>{" "}
                        <span className="font-mono">{alert.deviceName}</span>
                      </div>
                      <div>
                        <span className="font-medium">Site:</span> {alert.siteName}
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col flex-row gap-2 w-full sm:w-auto">
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcknowledge(alert.id)}
                        className="flex-1 sm:flex-initial"
                      >
                        Acknowledge
                      </Button>
                    )}
                    <Button size="sm" variant="default" className="flex-1 sm:flex-initial">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No alerts found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}