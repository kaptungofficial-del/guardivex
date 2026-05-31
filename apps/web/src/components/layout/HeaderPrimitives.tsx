import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-[var(--gvx-hero-border)] bg-[var(--gvx-menu-bg)] text-[var(--gvx-hero-muted)] shadow-[0_1px_0_rgba(248,250,252,0.18)_inset]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "border-b border-[var(--gvx-hero-border)] bg-[var(--gvx-menu-bg)] text-[var(--gvx-hero-text)] shadow-[0_14px_34px_-32px_rgba(7,29,51,0.34),0_1px_0_rgba(248,250,252,0.16)_inset]"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-6 items-center gap-1.5 px-2 sm:px-2.5 rounded-sm border border-border bg-card/70 text-muted-foreground font-medium transition-all duration-150 hover:text-primary hover:border-primary/20 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-[rgba(0,212,255,0.12)] dark:bg-[rgba(7,29,51,0.58)] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] dark:hover:border-[rgba(0,212,255,0.20)] dark:hover:bg-[rgba(7,29,51,0.72)]"

export const ENTERPRISE_ICON_CONTROL_CLASS =
  "inline-flex h-[1.625rem] w-[1.625rem] items-center justify-center rounded-md border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] text-[var(--gvx-hero-muted)] font-medium shadow-[0_10px_24px_-22px_rgba(7,17,31,0.38)] transition-all duration-200 hover:-translate-y-px hover:text-[var(--gvx-hero-accent)] hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-[1.625rem] px-2.5 rounded-sm border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] text-sm text-[var(--gvx-hero-text)] shadow-none backdrop-blur-xl"

export const ENTERPRISE_NAV_ITEM_CLASS =
  "relative inline-flex items-center gap-1 rounded-md border whitespace-nowrap px-2.5 py-1.5 text-[12.5px] font-medium transition-all duration-200"

export const ENTERPRISE_NAV_ITEM_ACTIVE_CLASS =
  "text-[var(--gvx-hero-accent-2)] border-[var(--gvx-hero-border-strong)] bg-[var(--gvx-hero-accent-soft)] shadow-[0_12px_26px_-24px_rgba(0,212,255,0.38)]"

export const ENTERPRISE_NAV_ITEM_INACTIVE_CLASS =
  "text-[var(--gvx-hero-muted)] border-transparent hover:-translate-y-px hover:text-[var(--gvx-hero-accent-2)] hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-accent-soft)]"

export const ENTERPRISE_DROPDOWN_PANEL_CLASS =
  "w-[min(720px,calc(100vw-32px))] max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-xl border border-[var(--gvx-menu-border)] bg-[var(--gvx-menu-bg)] p-2.5 opacity-100 shadow-[0_24px_70px_-50px_rgba(7,17,31,0.45)] dark:shadow-[0_24px_70px_-50px_rgba(0,0,0,0.74)]"

export const ENTERPRISE_DROPDOWN_ITEM_CLASS =
  "flex items-start gap-2.5 p-2 rounded-lg border border-transparent text-left transition-all duration-150 group hover:border-[var(--gvx-menu-border)] hover:bg-[var(--gvx-menu-hover)]"

export const ENTERPRISE_DROPDOWN_ICON_CLASS =
  "w-8 h-8 rounded-md bg-secondary border border-border flex items-center justify-center flex-shrink-0 dark:bg-[rgba(7,29,51,0.88)] dark:border-[rgba(0,212,255,0.14)]"

export const ENTERPRISE_DROPDOWN_ACTION_CLASS =
  "w-full flex items-center justify-center gap-2 h-[1.875rem] px-3 rounded-sm border border-[var(--gvx-hero-border)] bg-[var(--gvx-hero-card)] text-[var(--gvx-hero-text)] shadow-none backdrop-blur-xl transition-all duration-150 group hover:border-[var(--gvx-hero-border-strong)] hover:bg-[var(--gvx-hero-surface-strong)]"

interface HeaderStatusBadgeProps {
  label: string
  className?: string
}

export function HeaderStatusBadge({ label, className }: HeaderStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-[var(--gvx-hero-border-strong)] bg-[var(--gvx-hero-accent-soft)] text-[var(--gvx-hero-accent)] text-[10px] uppercase tracking-[0.09em]",
        "font-medium",
        className,
      )}
    >
      <Circle size={8} weight="fill" className="text-[var(--gvx-hero-accent-2)] status-pulse" />
      {label}
    </Badge>
  )
}
