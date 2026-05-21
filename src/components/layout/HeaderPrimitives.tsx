import { Circle } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ENTERPRISE_COMMAND_STRIP_CLASS =
  "border-b border-border/50 bg-gradient-to-r from-card/75 via-card to-card/85 backdrop-blur-xl shadow-[inset_0_-1px_0_0_hsl(var(--border)/0.35)]"

export const ENTERPRISE_HEADER_SURFACE_CLASS =
  "border-b border-border/50 bg-gradient-to-r from-card/85 via-card to-card/75 backdrop-blur-xl shadow-sm"

export const ENTERPRISE_CONTROL_CLASS =
  "inline-flex h-9 items-center gap-1.5 px-2.5 sm:px-3 rounded-md border border-border/65 bg-background/35 text-muted-foreground transition-colors duration-150 hover:text-foreground hover:border-border hover:bg-secondary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export const ENTERPRISE_SEARCH_SHELL_CLASS =
  "hidden sm:flex items-center gap-2 h-9 px-3 rounded-md border border-border/70 bg-muted/30 text-sm text-muted-foreground shadow-[inset_0_1px_0_0_hsl(var(--background)/0.25)]"

interface HeaderStatusBadgeProps {
  label: string
  className?: string
}

export function HeaderStatusBadge({ label, className }: HeaderStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] border-success/35 text-success bg-success/10",
        className,
      )}
    >
      <Circle size={8} weight="fill" className="text-success" />
      {label}
    </Badge>
  )
}
