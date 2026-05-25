import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-[#D9E7F2]/55 bg-[rgba(255,255,255,0.64)] text-[#334155] backdrop-blur-md shadow-none dark:border-[rgba(0,194,255,0.10)] dark:bg-[rgba(2,8,23,0.92)] dark:text-[#E2E8F0]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "border-y border-[#D9E7F2]/56 bg-[rgba(255,255,255,0.66)] text-[#07111F] shadow-none backdrop-blur-md dark:border-[rgba(0,194,255,0.12)] dark:bg-[rgba(3,10,24,0.94)] dark:text-[#E2E8F0] dark:shadow-none"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-6 items-center gap-1.5 px-2 sm:px-2.5 rounded-sm border border-[#D9E7F2]/72 bg-[rgba(255,255,255,0.68)] text-[#334155] font-medium transition-all duration-150 hover:text-[#0A6F95] hover:border-primary/14 hover:bg-[rgba(255,255,255,0.82)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-[rgba(0,194,255,0.08)] dark:bg-[rgba(11,18,32,0.58)] dark:text-[#94A3B8] dark:hover:text-[#E2E8F0] dark:hover:border-[rgba(0,194,255,0.14)] dark:hover:bg-[rgba(11,18,32,0.72)]"

export const ENTERPRISE_ICON_CONTROL_CLASS =
  "inline-flex h-6.5 w-6.5 items-center justify-center rounded-sm border border-[#D9E7F2]/80 bg-[rgba(255,255,255,0.72)] text-[#334155] font-medium transition-all duration-150 hover:text-[#0A6F95] hover:border-primary/18 hover:bg-[rgba(255,255,255,0.86)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-[rgba(0,194,255,0.10)] dark:bg-[rgba(11,18,32,0.62)] dark:text-[#94A3B8] dark:hover:text-[#E2E8F0] dark:hover:border-[rgba(0,194,255,0.18)] dark:hover:bg-[rgba(11,18,32,0.78)]"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-6.5 px-2.5 rounded-sm border border-[#D9E7F2]/80 bg-[rgba(255,255,255,0.72)] text-sm text-[#07111F] shadow-none backdrop-blur-xl dark:border-[rgba(0,194,255,0.10)] dark:bg-[rgba(11,18,32,0.62)] dark:text-muted-foreground"

export const ENTERPRISE_NAV_ITEM_CLASS =
  "relative inline-flex items-center gap-1.5 rounded-sm border whitespace-nowrap px-0.5 py-1 text-[13px] xl:text-[14px] tracking-[0.01em] font-medium transition-all duration-150"

export const ENTERPRISE_NAV_ITEM_ACTIVE_CLASS =
  "text-[#07111F] border-primary/14 bg-secondary/65 dark:text-[#E2E8F0] dark:border-[rgba(0,194,255,0.10)] dark:bg-[rgba(0,194,255,0.04)]"

export const ENTERPRISE_NAV_ITEM_INACTIVE_CLASS =
  "text-[#334155] border-transparent hover:text-[#0A6F95] hover:border-border/60 hover:bg-secondary/55 dark:text-[#94A3B8] dark:hover:text-[#E2E8F0] dark:hover:border-[rgba(0,194,255,0.10)] dark:hover:bg-[rgba(0,194,255,0.032)]"

export const ENTERPRISE_DROPDOWN_PANEL_CLASS =
  "w-[min(720px,calc(100vw-32px))] max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-lg border border-[#D9E7F2]/80 bg-[rgba(255,255,255,0.78)] p-2.5 opacity-100 shadow-none backdrop-blur-xl dark:border-[rgba(0,194,255,0.10)] dark:bg-[#07111F] dark:shadow-none"

export const ENTERPRISE_DROPDOWN_ITEM_CLASS =
  "flex items-start gap-2.5 p-2 rounded-lg border border-transparent text-left transition-all duration-150 group hover:border-border hover:bg-secondary dark:hover:border-[rgba(0,194,255,0.14)] dark:hover:bg-[rgba(0,194,255,0.055)]"

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
