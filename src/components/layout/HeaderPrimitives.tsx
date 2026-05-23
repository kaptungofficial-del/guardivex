import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-[#D8E8F5] bg-[rgba(255,255,255,0.90)] text-[#07111F] backdrop-blur-xl shadow-[inset_0_-1px_0_0_rgba(0,199,232,0.08)] dark:border-cyan-500/20 dark:bg-[rgba(7,17,31,0.90)] dark:text-[#F8FAFC] dark:shadow-[inset_0_-1px_0_0_rgba(0,199,232,0.12)]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "border border-[#D8E8F5] bg-[rgba(255,255,255,0.90)] text-[#07111F] shadow-[0_14px_28px_-22px_rgba(15,23,42,0.18)] dark:border-cyan-500/20 dark:bg-[rgba(7,17,31,0.90)] dark:text-[#F8FAFC] dark:shadow-[0_14px_28px_-22px_rgba(2,6,18,0.82)]"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-8 items-center gap-1.5 px-2.5 sm:px-3 rounded-full border border-[#D8E8F5] bg-[rgba(255,255,255,0.85)] text-[#07111F] transition-all duration-150 hover:text-[#07111F] hover:border-primary/40 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-cyan-500/20 dark:bg-[rgba(11,22,40,0.72)] dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(11,22,40,0.86)]"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-8 px-3 rounded-full border border-[#D8E8F5] bg-[rgba(255,255,255,0.85)] text-sm text-[#07111F] shadow-none dark:border-cyan-500/20 dark:bg-[rgba(11,22,40,0.72)] dark:text-muted-foreground"

interface HeaderStatusBadgeProps {
  label: string
  className?: string
}

export function HeaderStatusBadge({ label, className }: HeaderStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-success/30 text-success bg-success/10 text-[10px] uppercase tracking-[0.1em]",
        className,
      )}
    >
      <Circle size={8} weight="fill" className="text-success status-pulse" />
      {label}
    </Badge>
  )
}
