import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-[#D9E7F2] bg-[rgba(255,255,255,0.82)] text-[#334155] backdrop-blur-xl shadow-[0_8px_24px_-24px_rgba(15,23,42,0.12)] dark:border-[rgba(0,119,255,0.26)] dark:bg-[rgba(7,17,31,0.90)] dark:text-[#F8FAFC] dark:shadow-[inset_0_-1px_0_0_rgba(0,199,232,0.10)]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "border border-[#D9E7F2] bg-[rgba(255,255,255,0.82)] text-[#07111F] shadow-[0_8px_24px_-24px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-[rgba(0,119,255,0.26)] dark:bg-[rgba(7,17,31,0.90)] dark:text-[#F8FAFC] dark:shadow-[0_12px_22px_-22px_rgba(2,6,18,0.82)]"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-7 items-center gap-1.5 px-2.5 sm:px-3 rounded-full border border-[#D9E7F2] bg-[rgba(255,255,255,0.82)] text-[#334155] font-medium transition-all duration-150 hover:text-[#0EA5E9] hover:border-primary/35 hover:bg-[rgba(255,255,255,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-[rgba(0,119,255,0.26)] dark:bg-[rgba(11,22,40,0.72)] dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(11,22,40,0.86)]"

export const ENTERPRISE_ICON_CONTROL_CLASS =
  "inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#D9E7F2] bg-[rgba(255,255,255,0.82)] text-[#334155] font-medium transition-all duration-150 hover:text-[#0EA5E9] hover:border-primary/35 hover:bg-[rgba(255,255,255,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-[rgba(0,119,255,0.26)] dark:bg-[rgba(11,22,40,0.72)] dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:bg-[rgba(11,22,40,0.86)]"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-7 px-3 rounded-full border border-[#D9E7F2] bg-[rgba(255,255,255,0.82)] text-sm text-[#07111F] shadow-none backdrop-blur-xl dark:border-[rgba(0,119,255,0.26)] dark:bg-[rgba(11,22,40,0.72)] dark:text-muted-foreground"

export const ENTERPRISE_NAV_ITEM_CLASS =
  "relative inline-flex items-center gap-1 rounded-sm border whitespace-nowrap px-2.5 xl:px-3 py-1 text-[14px] xl:text-[15px] tracking-[0.01em] font-medium transition-all duration-150"

export const ENTERPRISE_NAV_ITEM_ACTIVE_CLASS =
  "text-[#07111F] border-primary/30 bg-secondary dark:text-[#F8FAFC] dark:bg-[rgba(0,199,232,0.10)]"

export const ENTERPRISE_NAV_ITEM_INACTIVE_CLASS =
  "text-[#334155] border-transparent hover:text-[#0EA5E9] hover:border-border hover:bg-secondary dark:text-muted-foreground dark:hover:text-[#F8FAFC] dark:hover:border-[rgba(0,119,255,0.26)] dark:hover:bg-[rgba(0,199,232,0.08)]"

export const ENTERPRISE_DROPDOWN_PANEL_CLASS =
  "w-[min(720px,calc(100vw-32px))] max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-2xl border border-[#D9E7F2] bg-[rgba(255,255,255,0.82)] p-3 opacity-100 shadow-[0_8px_24px_-24px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-[rgba(0,119,255,0.26)] dark:bg-[#07111F] dark:shadow-black/45"

export const ENTERPRISE_DROPDOWN_ITEM_CLASS =
  "flex items-start gap-2.5 p-2 rounded-xl border border-transparent text-left transition-all duration-150 group hover:border-border hover:bg-secondary dark:hover:bg-[rgba(0,199,232,0.10)]"

export const ENTERPRISE_DROPDOWN_ICON_CLASS =
  "w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0 dark:bg-[rgba(11,22,40,0.88)] dark:border-[rgba(0,119,255,0.26)]"

export const ENTERPRISE_DROPDOWN_ACTION_CLASS =
  "w-full flex items-center justify-center gap-2 h-8 px-3 rounded-xl border border-[#D9E7F2] bg-[rgba(255,255,255,0.82)] text-[#07111F] shadow-none backdrop-blur-xl transition-all duration-150 group hover:border-primary/30 hover:bg-[rgba(255,255,255,0.9)] dark:border-[rgba(0,119,255,0.26)] dark:bg-[rgba(11,22,40,0.88)] dark:text-[#F8FAFC] dark:shadow-[0_16px_26px_-18px_rgba(0,199,232,0.28)] dark:hover:border-primary/30 dark:hover:bg-[rgba(0,199,232,0.12)] dark:hover:shadow-[0_18px_30px_-18px_rgba(0,199,232,0.40)]"

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
