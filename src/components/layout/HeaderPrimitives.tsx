import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-border/85 bg-white/92 text-foreground backdrop-blur-md shadow-[inset_0_-1px_0_0_rgba(8,17,31,0.04)] dark:border-slate-700/70 dark:bg-[linear-gradient(90deg,rgba(7,12,24,0.9),rgba(8,14,27,0.88),rgba(7,12,24,0.9))] dark:shadow-[inset_0_-1px_0_0_rgba(71,85,105,0.28)]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "glass-panel border border-border/90 bg-white/92 text-foreground shadow-[0_12px_24px_-20px_rgba(8,17,31,0.26)] dark:border-slate-700/70 dark:bg-[linear-gradient(120deg,rgba(10,16,30,0.92),rgba(9,15,28,0.9),rgba(8,14,26,0.92))] dark:shadow-[0_14px_26px_-22px_rgba(2,6,18,0.8)]"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-8 items-center gap-1.5 px-2.5 sm:px-3 rounded-md border border-border/90 bg-white/82 text-muted-foreground transition-all duration-150 hover:text-foreground hover:border-slate-400/60 hover:bg-slate-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-slate-700/70 dark:bg-slate-900/55 dark:hover:border-slate-600 dark:hover:bg-slate-800/70"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-8 px-3 rounded-md border border-border/90 bg-white/82 text-sm text-muted-foreground shadow-none dark:border-slate-700/70 dark:bg-slate-900/55"

interface HeaderStatusBadgeProps {
  label: string
  className?: string
}

export function HeaderStatusBadge({ label, className }: HeaderStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] border-success/35 text-success bg-success/12",
        className,
      )}
    >
      <Circle size={8} weight="fill" className="text-success status-pulse" />
      {label}
    </Badge>
  )
}
