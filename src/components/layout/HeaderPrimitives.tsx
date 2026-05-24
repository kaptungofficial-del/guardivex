import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-[#D8E8F5] bg-[rgba(255,255,255,0.90)] text-[#07111F] backdrop-blur-xl shadow-[inset_0_-1px_0_0_rgba(0,199,232,0.06)] dark:border-cyan-500/20 dark:bg-[rgba(7,17,31,0.90)] dark:text-[#F8FAFC] dark:shadow-[inset_0_-1px_0_0_rgba(0,199,232,0.10)]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "border border-[#D8E8F5] bg-[rgba(255,255,255,0.90)] text-[#07111F] shadow-[0_12px_22px_-22px_rgba(15,23,42,0.18)] dark:border-cyan-500/20 dark:bg-[rgba(7,17,31,0.90)] dark:text-[#F8FAFC] dark:shadow-[0_12px_22px_-22px_rgba(2,6,18,0.82)]"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-7 items-center gap-1.5 px-2.5 sm:px-3 rounded-full border border-[#D8E8F5] bg-[rgba(255,255,255,0.85)] text-[#07111F] transition-all duration-150 hover:text-[#07111F] hover:border-primary/40 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-cyan-500/20 dark:bg-[rgba(11,22,40,0.72)] dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(11,22,40,0.86)]"

export const ENTERPRISE_ICON_CONTROL_CLASS =
  "inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#D8E8F5] bg-[rgba(255,255,255,0.85)] text-[#07111F] transition-all duration-150 hover:text-[#07111F] hover:border-primary/40 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-cyan-500/20 dark:bg-[rgba(11,22,40,0.72)] dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(11,22,40,0.86)]"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-7 px-3 rounded-full border border-[#D8E8F5] bg-[rgba(255,255,255,0.85)] text-sm text-[#07111F] shadow-none dark:border-cyan-500/20 dark:bg-[rgba(11,22,40,0.72)] dark:text-muted-foreground"

export const ENTERPRISE_NAV_ITEM_CLASS =
  "relative inline-flex items-center gap-1.25 rounded-sm border whitespace-nowrap px-3 xl:px-3.5 py-1 text-[12px] xl:text-[13px] tracking-[0.01em] font-medium transition-all duration-150"

export const ENTERPRISE_NAV_ITEM_ACTIVE_CLASS =
  "text-[#07111F] border-primary/30 bg-cyan-50 dark:text-[#F8FAFC] dark:bg-[rgba(0,199,232,0.10)]"

export const ENTERPRISE_NAV_ITEM_INACTIVE_CLASS =
  "text-[#5B677A] border-transparent hover:text-[#07111F] hover:border-[#D8E3EE] hover:bg-[#F6F9FC] dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:border-[rgba(0,199,232,0.18)] dark:hover:bg-[rgba(0,199,232,0.08)]"

export const ENTERPRISE_DROPDOWN_PANEL_CLASS =
  "w-[min(680px,calc(100vw-2rem))] max-w-[680px] rounded-2xl border border-[#D8E3EE] bg-[rgba(255,255,255,0.94)] p-4 opacity-100 shadow-2xl shadow-black/18 backdrop-blur-md dark:border-cyan-500/20 dark:bg-[rgba(7,17,31,0.96)] dark:shadow-black/45"

export const ENTERPRISE_DROPDOWN_ITEM_CLASS =
  "flex items-start gap-3 p-2.5 rounded-xl border border-transparent text-left transition-all duration-150 group hover:border-[rgba(0,199,232,0.16)] hover:bg-[rgba(0,199,232,0.08)] dark:hover:bg-[rgba(0,199,232,0.08)]"

export const ENTERPRISE_DROPDOWN_ICON_CLASS =
  "w-10 h-10 rounded-xl bg-[linear-gradient(135deg,rgba(0,199,232,0.14),rgba(0,143,199,0.08))] border border-[rgba(0,199,232,0.14)] flex items-center justify-center flex-shrink-0"

export const ENTERPRISE_DROPDOWN_ACTION_CLASS =
  "w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-[rgba(0,199,232,0.18)] bg-[linear-gradient(135deg,#00C7E8_0%,#008FC7_55%,#00E5C3_100%)] text-[#07111F] shadow-[0_16px_26px_-18px_rgba(0,199,232,0.55)] transition-all duration-150 group hover:shadow-[0_18px_30px_-18px_rgba(0,199,232,0.68)]"

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
