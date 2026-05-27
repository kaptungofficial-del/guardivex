import { useEffect, useState, type ComponentType } from "react"
import { CheckCircle, ClockCounterClockwise, ClipboardText, Database, GitBranch, Heartbeat, Pulse, ShieldWarning } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAiRecommendations, getAuditLogs, getCommands, getDeniedActions, getDeviceHealth, getEventTimeline, getIncidentCorrelation, getSessionHistory, getTenantActivity } from "@/lib/api"

type Loader = () => Promise<{ data: unknown[] | { devices: unknown[]; heartbeats: unknown[] } }>

interface PageProps {
  title: string
  description: string
  icon: ComponentType<{ size?: number; className?: string; weight?: "regular" | "fill" | "bold" }>
  loader: Loader
  emptyLabel: string
}

function asRecords(value: unknown[] | { devices: unknown[]; heartbeats: unknown[] }) {
  if (Array.isArray(value)) return value as Record<string, unknown>[]
  return [...value.devices, ...value.heartbeats] as Record<string, unknown>[]
}

function labelFor(value: unknown) {
  if (value === null || value === undefined) return "-"
  if (typeof value === "object") return JSON.stringify(value).slice(0, 140)
  return String(value)
}

function OperationalRecordPage({ title, description, icon: Icon, loader, emptyLabel }: PageProps) {
  const [records, setRecords] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loader()
      .then((result) => setRecords(asRecords(result.data)))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Request failed"))
      .finally(() => setLoading(false))
  }, [loader])

  const keys = Array.from(new Set(records.flatMap((record) => Object.keys(record)))).slice(0, 6)

  return (
    <div className="p-4 md:p-5 space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-[2rem] font-semibold tracking-tight">{title}</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl">{description}</p>
        </div>
        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary">
          <Icon size={20} weight="bold" />
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle className="text-base md:text-lg font-semibold">Operational Records</CardTitle>
          <Badge variant={error ? "destructive" : "secondary"}>{loading ? "Loading" : `${records.length} records`}</Badge>
        </CardHeader>
        <CardContent>
          {error ? <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div> : null}
          {!error && records.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>{keys.map((key) => <TableHead key={key}>{key}</TableHead>)}</TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record, index) => (
                    <TableRow key={String(record.id ?? index)}>
                      {keys.map((key) => <TableCell key={key} className="max-w-[18rem] truncate text-xs md:text-sm">{labelFor(record[key])}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
          {!loading && !error && records.length === 0 ? <div className="py-8 text-center text-sm text-muted-foreground">{emptyLabel}</div> : null}
        </CardContent>
      </Card>
    </div>
  )
}

export function AuditLogsPage() {
  return <OperationalRecordPage title="Audit Logs" description="Immutable tenant audit chain for security-sensitive platform activity." icon={ClipboardText} loader={getAuditLogs} emptyLabel="No audit records found." />
}

export function CommandApprovalsPage() {
  return <OperationalRecordPage title="Command Approvals" description="Human approval queue for command requests after RBAC and deterministic policy review." icon={CheckCircle} loader={getCommands} emptyLabel="No command requests are waiting for review." />
}

export function DeniedActionsPage() {
  return <OperationalRecordPage title="Denied Actions" description="RBAC, policy, and safety denials captured for investigation." icon={ShieldWarning} loader={getDeniedActions} emptyLabel="No denied actions recorded." />
}

export function SessionHistoryPage() {
  return <OperationalRecordPage title="Session History" description="Tracked user sessions, device fingerprints, IPs, and revocation state." icon={ClockCounterClockwise} loader={getSessionHistory} emptyLabel="No session history found." />
}

export function TenantActivityPage() {
  return <OperationalRecordPage title="Tenant Activity" description="Tenant-scoped operational activity across authentication, resources, AI, and commands." icon={Pulse} loader={getTenantActivity} emptyLabel="No tenant activity found." />
}

export function DeviceHealthPage() {
  return <OperationalRecordPage title="Device Health" description="Read-only adapter heartbeat records and device health telemetry." icon={Heartbeat} loader={getDeviceHealth} emptyLabel="No device health records found." />
}

export function EventTimelinePage() {
  return <OperationalRecordPage title="Event Timeline" description="Normalized events from vendor adapters and manual ingestion paths." icon={Database} loader={getEventTimeline} emptyLabel="No normalized events found." />
}

export function IncidentCorrelationPage() {
  return <OperationalRecordPage title="Incident Correlation" description="Incident records with linked alert and source-event context for operator review." icon={GitBranch} loader={getIncidentCorrelation} emptyLabel="No correlated incidents found." />
}

export function AiRecommendationsPage() {
  return <OperationalRecordPage title="AI Recommendations" description="Advisory-only summaries, correlations, and draft recommendations. AI never executes hardware commands." icon={GitBranch} loader={getAiRecommendations} emptyLabel="No AI recommendations found." />
}
