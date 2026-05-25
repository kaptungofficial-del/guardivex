import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-surface)] text-[var(--gvx-hero-muted)] shadow-[0_1px_0_rgba(255,255,255,0.22)_inset] backdrop-blur-2xl"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "border-b border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-surface)] text-[var(--gvx-hero-text)] shadow-[0_18px_42px_-38px_rgba(7,17,31,0.42),0_1px_0_rgba(255,255,255,0.18)_inset] backdrop-blur-2xl"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-6 items-center gap-1.5 px-2 sm:px-2.5 rounded-sm border border-[#D9E7F2]/72 bg-[rgba(255,255,255,0.68)] text-[#334155] font-medium transition-all duration-150 hover:text-[#0A6F95] hover:border-primary/14 hover:bg-[rgba(255,255,255,0.82)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-[rgba(0,194,255,0.08)] dark:bg-[rgba(11,18,32,0.58)] dark:text-[#94A3B8] dark:hover:text-[#E2E8F0] dark:hover:border-[rgba(0,194,255,0.14)] dark:hover:bg-[rgba(11,18,32,0.72)]"

export const ENTERPRISE_ICON_CONTROL_CLASS =
  "inline-flex h-6.5 w-6.5 items-center justify-center rounded-md border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] text-[var(--gvx-hero-muted)] font-medium shadow-[0_10px_24px_-22px_rgba(7,17,31,0.38)] transition-all duration-200 hover:-translate-y-px hover:text-[var(--gvx-hero-accent)] hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-6.5 px-2.5 rounded-sm border border-[#D9E7F2]/80 bg-[rgba(255,255,255,0.72)] text-sm text-[#07111F] shadow-none backdrop-blur-xl dark:border-[rgba(0,194,255,0.10)] dark:bg-[rgba(11,18,32,0.62)] dark:text-muted-foreground"

export const ENTERPRISE_NAV_ITEM_CLASS =
  "relative inline-flex items-center gap-1.5 rounded-md border whitespace-nowrap px-3 py-1.5 text-[13px] font-medium transition-all duration-200"

export const ENTERPRISE_NAV_ITEM_ACTIVE_CLASS =
  "text-[var(--gvx-hero-text)] border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] shadow-[0_12px_26px_-24px_rgba(7,17,31,0.38)]"

export const ENTERPRISE_NAV_ITEM_INACTIVE_CLASS =
  "text-[var(--gvx-hero-muted)] border-transparent hover:-translate-y-px hover:text-[var(--gvx-hero-text)] hover:border-[var(--gvx-hero-border)] hover:bg-[var(--gvx-hero-card)]"

export const ENTERPRISE_DROPDOWN_PANEL_CLASS =
  "w-[min(720px,calc(100vw-32px))] max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-xl border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-surface-strong)] p-2.5 opacity-100 shadow-[0_24px_70px_-50px_rgba(7,17,31,0.45)] backdrop-blur-2xl"

export const ENTERPRISE_DROPDOWN_ITEM_CLASS =
  "flex items-start gap-2.5 p-2 rounded-lg border border-transparent text-left transition-all duration-150 group hover:border-[var(--gvx-hero-border)] hover:bg-[var(--gvx-hero-card)]"

export const ENTERPRISE_DROPDOWN_ICON_CLASS =
  "w-8 h-8 rounded-md bg-secondary border border-border flex items-center justify-center flex-shrink-0 dark:bg-[rgba(11,18,32,0.88)] dark:border-[rgba(0,194,255,0.14)]"

export const ENTERPRISE_DROPDOWN_ACTION_CLASS =
  "w-full flex items-center justify-center gap-2 h-7.5 px-3 rounded-sm border border-[#D9E7F2]/80 bg-[rgba(255,255,255,0.74)] text-[#07111F] shadow-none backdrop-blur-xl transition-all duration-150 group hover:border-primary/18 hover:bg-[rgba(255,255,255,0.86)] dark:border-[rgba(0,194,255,0.10)] dark:bg-[rgba(11,18,32,0.72)] dark:text-[#E2E8F0] dark:hover:border-primary/18 dark:hover:bg-[rgba(0,194,255,0.055)] dark:hover:shadow-none"

interface HeaderStatusBadgeProps {
  label: string
  className?: string
}

export function HeaderStatusBadge({ label, className }: HeaderStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-success/30 text-success bg-success/10 text-[10px] uppercase tracking-[0.09em]",
        "font-medium",
        className,
      )}
    >
      <Circle size={8} weight="fill" className="text-success status-pulse" />
      {label}
    </Badge>
  )
}
