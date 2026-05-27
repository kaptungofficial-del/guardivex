import { useEffect, useState, type ComponentType } from "react"
import { CheckCircle, ClockCounterClockwise, ClipboardText, Database, GitBranch, Heartbeat, Pulse, ShieldWarning } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { getAiRecommendations, getAuditLogs, getCommands, getDeniedActions, getDeviceHealth, getEventTimeline, getIncidentCorrelation, getSessionHistory, getTenantActivity, reviewCommand } from "@/lib/api"

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

interface CommandRecord {
  id: string
  action?: string
  reason?: string
  status?: string
  riskScore?: number
  targetDeviceId?: string | null
  targetDoorId?: string | null
  createdAt?: string
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
  const [commands, setCommands] = useState<CommandRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCommand, setSelectedCommand] = useState<CommandRecord | null>(null)
  const [comment, setComment] = useState("Reviewed RBAC, deterministic policy, target scope, and operational risk.")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState<"approved" | "rejected" | null>(null)

  useEffect(() => {
    getCommands()
      .then((result) => setCommands(result.data as CommandRecord[]))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Failed to load commands"))
      .finally(() => setLoading(false))
  }, [])

  const submitReview = async (decision: "approved" | "rejected") => {
    if (!selectedCommand) return
    setSubmitting(decision)
    setError(null)
    try {
      await reviewCommand(selectedCommand.id, { decision, comment })
      setCommands((current) => current.map((command) => command.id === selectedCommand.id ? { ...command, status: decision === "approved" ? "approved" : "rejected" } : command))
      setSelectedCommand(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to review command")
    } finally {
      setSubmitting(null)
    }
  }

  return (
    <div className="space-y-5 p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-[2rem]">Command Approvals</h1>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">Human approval queue for command requests after RBAC and deterministic policy review.</p>
        </div>
        <div className="hidden h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary sm:flex"><CheckCircle size={20} weight="bold" /></div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold md:text-lg">Pending Review</CardTitle>
          <Badge variant={error ? "destructive" : "secondary"}>{loading ? "Loading" : `${commands.length} records`}</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {error ? <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div> : null}
          {!loading && commands.length === 0 ? <div className="py-8 text-center text-sm text-muted-foreground">No command requests are waiting for review.</div> : null}
          {commands.map((command) => (
            <div key={command.id} className="grid gap-3 rounded-md border border-border bg-secondary/45 p-3 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{command.action ?? "Unknown action"}</span>
                  <Badge variant="outline" className="capitalize">{command.status?.replaceAll("_", " ") ?? "requested"}</Badge>
                  <Badge variant="secondary">Risk {command.riskScore ?? 0}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{command.reason ?? "No reason supplied"}</p>
                <p className="mt-1 text-xs text-muted-foreground">Target: {command.targetDoorId ?? command.targetDeviceId ?? "unknown"}</p>
              </div>
              <Button variant="outline" onClick={() => setSelectedCommand(command)} className="h-8">Review</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={Boolean(selectedCommand)} onOpenChange={(open) => !open && setSelectedCommand(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Command Request</DialogTitle>
            <DialogDescription>Approving does not execute hardware. It only advances the request to the audited execution service.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-md border border-border bg-secondary/45 p-3 text-sm">
              <div className="font-semibold">{selectedCommand?.action}</div>
              <div className="text-muted-foreground">{selectedCommand?.reason}</div>
            </div>
            <Textarea value={comment} onChange={(event) => setComment(event.target.value)} className="min-h-[110px]" />
          </div>
          <DialogFooter>
            <Button variant="destructive" disabled={submitting !== null || comment.trim().length < 4} onClick={() => submitReview("rejected")}>{submitting === "rejected" ? "Rejecting..." : "Reject"}</Button>
            <Button disabled={submitting !== null || comment.trim().length < 4} onClick={() => submitReview("approved")}>{submitting === "approved" ? "Approving..." : "Approve"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
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
