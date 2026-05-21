import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Incident } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

interface IncidentsPageProps {
  incidents: Incident[]
}

export function IncidentsPage({ incidents: initialIncidents }: IncidentsPageProps) {
  const [incidents, setIncidents] = useState(initialIncidents)

  const getPriorityColor = (priority: Incident["priority"]) => {
    switch (priority) {
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

  const getStatusColor = (status: Incident["status"]) => {
    switch (status) {
      case "open":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "investigating":
        return "bg-warning/20 text-warning border-warning/30"
      case "resolved":
        return "bg-success/20 text-success border-success/30"
    }
  }

  const handleStatusChange = (incidentId: string, newStatus: Incident["status"]) => {
    setIncidents((current) =>
      current.map((incident) =>
        incident.id === incidentId
          ? {
              ...incident,
              status: newStatus,
              updatedAt: new Date().toISOString(),
              resolvedAt: newStatus === "resolved" ? new Date().toISOString() : incident.resolvedAt,
            }
          : incident
      )
    )
    toast.success(`Incident status updated to ${newStatus}`)
  }

  const openIncidents = incidents.filter((i) => i.status === "open")
  const investigatingIncidents = incidents.filter((i) => i.status === "investigating")
  const resolvedIncidents = incidents.filter((i) => i.status === "resolved")

  const renderIncident = (incident: Incident) => (
    <Card key={incident.id} className="bg-card border-border mb-3">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={getPriorityColor(incident.priority)}>
                {incident.priority.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={getStatusColor(incident.status)}>
                {incident.status.replace("_", " ").toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true })}
              </span>
            </div>
            <h3 className="text-base font-semibold mb-2">{incident.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Site:</span> {incident.siteName}
              </div>
              {incident.assignedTo && (
                <div>
                  <span className="font-medium">Assigned:</span> {incident.assignedTo}
                </div>
              )}
              <div>
                <span className="font-medium">Updated:</span>{" "}
                {formatDistanceToNow(new Date(incident.updatedAt), { addSuffix: true })}
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col flex-row gap-2 w-full sm:w-auto">
            {incident.status === "open" && (
              <Button
                size="sm"
                variant="default"
                onClick={() => handleStatusChange(incident.id, "investigating")}
                className="flex-1 sm:flex-initial"
              >
                Investigate
              </Button>
            )}
            {incident.status === "investigating" && (
              <Button
                size="sm"
                variant="default"
                onClick={() => handleStatusChange(incident.id, "resolved")}
                className="flex-1 sm:flex-initial"
              >
                Resolve
              </Button>
            )}
            <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Incidents</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Track and manage security incidents • {openIncidents.length + investigatingIncidents.length} active
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <TabsList className="grid w-full min-w-[400px] md:min-w-0 md:max-w-md grid-cols-4">
          <TabsTrigger value="all">
            All <Badge variant="secondary" className="ml-1.5">{incidents.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="open">
            Open <Badge variant="secondary" className="ml-1.5">{openIncidents.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="investigating">
            Active <Badge variant="secondary" className="ml-1.5">{investigatingIncidents.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved <Badge variant="secondary" className="ml-1.5">{resolvedIncidents.length}</Badge>
          </TabsTrigger>
        </TabsList>
        </div>

        <TabsContent value="all" className="space-y-4 mt-6">
          {incidents.map(renderIncident)}
        </TabsContent>

        <TabsContent value="open" className="space-y-4 mt-6">
          {openIncidents.length > 0 ? (
            openIncidents.map(renderIncident)
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No open incidents</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="investigating" className="space-y-4 mt-6">
          {investigatingIncidents.length > 0 ? (
            investigatingIncidents.map(renderIncident)
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No incidents under investigation</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4 mt-6">
          {resolvedIncidents.length > 0 ? (
            resolvedIncidents.map(renderIncident)
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No resolved incidents</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}