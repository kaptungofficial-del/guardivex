import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-border/85 bg-white/88 text-foreground backdrop-blur-xl shadow-[inset_0_-1px_0_0_rgba(8,17,31,0.04)] dark:border-cyan-300/12 dark:bg-[linear-gradient(90deg,rgba(8,15,31,0.85),rgba(10,23,45,0.78),rgba(8,15,31,0.85))] dark:shadow-[inset_0_-1px_0_0_rgba(125,211,252,0.14)]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "glass-panel border border-border/90 bg-white/90 text-foreground shadow-[0_14px_30px_-22px_rgba(8,17,31,0.28)] dark:border-cyan-300/16 dark:bg-[linear-gradient(120deg,rgba(11,20,38,0.88),rgba(10,25,48,0.78),rgba(8,17,34,0.88))] dark:shadow-[0_22px_36px_-26px_rgba(14,165,233,0.85)]"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-8.5 items-center gap-1.5 px-2.5 sm:px-3 rounded-lg border border-border/90 bg-white/75 text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-primary/35 hover:bg-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-cyan-300/18 dark:bg-background/35 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-500/10"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-8.5 px-3 rounded-lg border border-border/90 bg-white/78 text-sm text-muted-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.84)] dark:border-cyan-300/18 dark:bg-background/35 dark:shadow-[inset_0_1px_0_0_rgba(125,211,252,0.14)]"

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
