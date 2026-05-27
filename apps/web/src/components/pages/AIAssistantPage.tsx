import { useEffect, useMemo, useState } from "react"
import { Brain, CheckCircle, Robot, ShieldCheck, Sparkle, WarningCircle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { createAiRecommendation, getAiRecommendations, type AiRecommendation } from "@/lib/api"

const severityOptions = ["low", "medium", "high", "critical"]

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function formatEvidence(value: unknown) {
  if (Array.isArray(value)) return value.map(String).join(", ")
  if (value && typeof value === "object") return JSON.stringify(value)
  return String(value ?? "No evidence attached")
}

export function AIAssistantPage() {
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([])
  const [signals, setSignals] = useState("Failed badge attempts at west entry\nCamera motion after-hours\nDoor held open alarm")
  const [severity, setSeverity] = useState("medium")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signalList = useMemo(
    () => signals.split(/\r?\n|,/).map((signal) => signal.trim()).filter(Boolean),
    [signals],
  )

  useEffect(() => {
    getAiRecommendations()
      .then((result) => setRecommendations(result.data))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Failed to load AI recommendations"))
      .finally(() => setLoading(false))
  }, [])

  const handleCreateRecommendation = async () => {
    if (signalList.length === 0) {
      setError("Add at least one signal before requesting an advisory recommendation.")
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      const result = await createAiRecommendation({ severity, signals: signalList })
      setRecommendations((current) => [result.data, ...current])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create AI recommendation")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 p-4 md:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            <Robot size={14} weight="bold" />
            Advisory-only assistant
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-[2rem]">AI Assistant</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Draft summaries and recommendations from operator-provided signals. AI never executes hardware commands; every command still requires RBAC, policy review, approval, audit, and the command execution service.
          </p>
        </div>
        <Badge variant="outline" className="w-fit border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          <ShieldCheck size={13} weight="fill" className="mr-1" />
          Safe by design
        </Badge>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-border bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkle size={18} weight="bold" />
              Draft recommendation
            </CardTitle>
            <CardDescription>Enter one signal per line. The backend returns an advisory record only.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="ai-severity" className="text-sm font-medium">Severity</label>
              <select
                id="ai-severity"
                value={severity}
                onChange={(event) => setSeverity(event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm capitalize text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                {severityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="ai-signals" className="text-sm font-medium">Signals</label>
              <Textarea
                id="ai-signals"
                value={signals}
                onChange={(event) => setSignals(event.target.value)}
                className="min-h-[150px] resize-y"
                placeholder="Failed access attempts, camera motion, door alarm..."
              />
              <p className="text-xs text-muted-foreground">{signalList.length} signal{signalList.length === 1 ? "" : "s"} ready for advisory analysis.</p>
            </div>

            {error ? (
              <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                <WarningCircle size={16} weight="bold" className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            <Button onClick={handleCreateRecommendation} disabled={submitting || signalList.length === 0} className="w-full sm:w-auto">
              <Brain size={16} weight="bold" className="mr-2" />
              {submitting ? "Drafting..." : "Draft advisory recommendation"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-lg">Recommendation history</CardTitle>
              <CardDescription>Stored advisory records for the current tenant.</CardDescription>
            </div>
            <Badge variant="secondary">{loading ? "Loading" : `${recommendations.length} records`}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {!loading && recommendations.length === 0 ? (
              <div className="rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No AI recommendations found.</div>
            ) : null}

            {recommendations.map((item) => (
              <div key={item.id} className="rounded-md border border-border bg-secondary/45 p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="outline" className="capitalize">{item.status.replaceAll("_", " ")}</Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.summary}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.recommendation}</p>
                {item.suggestedAction ? (
                  <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/10 p-2 text-xs text-amber-700 dark:text-amber-300">
                    Suggested action: <span className="font-semibold">{item.suggestedAction}</span>. This is a draft only and cannot bypass approval controls.
                  </div>
                ) : null}
                <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-emerald-500" />
                  <span className="line-clamp-2">Evidence: {formatEvidence(item.evidence)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
