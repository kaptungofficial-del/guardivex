import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-[rgba(0,199,232,0.18)] bg-[linear-gradient(90deg,rgba(7,17,31,0.96),rgba(11,22,40,0.92),rgba(7,17,31,0.96))] text-[#F8FAFC] backdrop-blur-xl shadow-[inset_0_-1px_0_0_rgba(0,199,232,0.12)]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "glass-panel border border-[rgba(0,199,232,0.20)] bg-[linear-gradient(120deg,rgba(11,22,40,0.92),rgba(7,17,31,0.88),rgba(11,22,40,0.92))] text-[#F8FAFC] shadow-[0_14px_28px_-22px_rgba(2,6,18,0.82)]"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-8 items-center gap-1.5 px-2.5 sm:px-3 rounded-md border border-[rgba(0,199,232,0.22)] bg-[rgba(11,22,40,0.72)] text-muted-foreground transition-all duration-150 hover:text-[#F8FAFC] hover:border-primary/40 hover:bg-[rgba(11,22,40,0.86)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-8 px-3 rounded-md border border-[rgba(0,199,232,0.22)] bg-[rgba(11,22,40,0.72)] text-sm text-muted-foreground shadow-none"

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
