import type { CommandAction } from "@guardivex/shared"

export interface AdvisoryContext {
  incidentTitle?: string
  severity?: string
  signals: string[]
}

export function createAdvisoryRecommendation(context: AdvisoryContext) {
  const severity = context.severity ?? "medium"
  const suggestedAction: CommandAction | undefined = severity === "critical" ? "door.lockdown" : undefined

  return {
    summary: `AI advisory summary based on ${context.signals.length} signal${context.signals.length === 1 ? "" : "s"}.`,
    recommendation: suggestedAction
      ? "Review the incident, validate the site context, and consider drafting a lockdown command request for human approval."
      : "Review correlated signals and continue operator-led investigation before drafting any command request.",
    suggestedAction,
    draftCommand: suggestedAction ? { action: suggestedAction, reason: "AI drafted recommendation only; requires RBAC, policy, approval, audit, and execution service review." } : {},
    evidence: context.signals,
  }
}
