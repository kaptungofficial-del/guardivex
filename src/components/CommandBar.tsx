import { MagnifyingGlass, Buildings, Bell, User, CircleNotch } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import type { Site } from "@/lib/types"

interface CommandBarProps {
  sites: Site[]
  selectedSite: string
  onSiteChange: (siteId: string) => void
  criticalAlerts: number
  onLogout: () => void
}

export function CommandBar({ sites, selectedSite, onSiteChange, criticalAlerts, onLogout }: CommandBarProps) {
  return (
    <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center gap-4 px-6">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-96">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search devices, alerts, sites..."
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>

        <Select value={selectedSite} onValueChange={onSiteChange}>
          <SelectTrigger className="w-64 bg-background/50 border-border/50">
            <Buildings size={18} className="mr-2 text-muted-foreground" />
            <SelectValue placeholder="All Sites" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sites</SelectItem>
            {sites.map((site) => (
              <SelectItem key={site.id} value={site.id}>
                {site.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
          <div className="relative">
            <CircleNotch size={16} className="text-success animate-spin" />
            <div className="absolute inset-0 bg-success/30 rounded-full blur-sm" />
          </div>
          <span className="text-xs font-medium text-success">LIVE</span>
        </div>

        <ThemeSwitcher />

        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {criticalAlerts > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
              {criticalAlerts}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
