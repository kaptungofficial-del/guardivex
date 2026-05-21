import { useState } from "react"
import { 
  Buildings, Devices, Bell, ShieldWarning, Gear, 
  SquaresFour, Plugs, Key, Users, Monitor, List, X
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { BrandLogo } from "@/components/BrandLogo"
import type { PlatformPageView, LicenseInfo } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PlatformLayoutProps {
  children: React.ReactNode
  currentPage: PlatformPageView
  onNavigate: (page: PlatformPageView) => void
  onLogout: () => void
  criticalAlerts: number
  license: LicenseInfo
}

export function PlatformLayout({ children, currentPage, onNavigate, onLogout, criticalAlerts, license }: PlatformLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navSections = [
    {
      title: "COMMAND CENTER",
      items: [
        { id: "dashboard" as PlatformPageView, label: "SOC Dashboard", icon: SquaresFour },
      ]
    },
    {
      title: "INFRASTRUCTURE",
      items: [
        { id: "sites" as PlatformPageView, label: "Sites", icon: Buildings },
        { id: "devices" as PlatformPageView, label: "Devices", icon: Devices },
      ]
    },
    {
      title: "SECURITY",
      items: [
        { id: "alerts" as PlatformPageView, label: "Alerts", icon: Bell, badge: criticalAlerts },
        { id: "incidents" as PlatformPageView, label: "Incidents", icon: ShieldWarning },
      ]
    },
    {
      title: "PLATFORM",
      items: [
        { id: "integrations" as PlatformPageView, label: "Integrations", icon: Plugs },
        { id: "license" as PlatformPageView, label: "License Status", icon: Key, badge: license.status === "expiring" ? "!" : undefined },
        { id: "system-health" as PlatformPageView, label: "System Health", icon: Monitor },
        { id: "users" as PlatformPageView, label: "Users & Roles", icon: Users },
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { id: "settings" as PlatformPageView, label: "Settings", icon: Gear },
      ]
    }
  ]

  const handleNavigate = (page: PlatformPageView) => {
    onNavigate(page)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 w-64 sm:w-72 border-r border-border bg-card flex flex-col transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <BrandLogo
              subtitle="Security Platform"
              className="gap-2 sm:gap-2.5"
              markClassName="w-11 h-11 sm:w-12 sm:h-12"
              titleClassName="text-base sm:text-lg"
              subtitleClassName="text-[10px] sm:text-xs tracking-normal mt-0.5"
            />
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-secondary rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X size={18} weight="bold" className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground mb-2 px-2 sm:px-3 tracking-wider">
                {section.title}
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = currentPage === item.id
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={cn(
                        "w-full flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm transition-all active:scale-98",
                        isActive 
                          ? "bg-primary/10 text-primary border-l-2 border-l-primary font-semibold" 
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      )}
                    >
                      <Icon size={16} weight={isActive ? "fill" : "regular"} className="shrink-0 sm:w-[18px] sm:h-[18px]" />
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <Badge variant={item.badge === "!" ? "destructive" : "default"} className="text-[10px] sm:text-xs shrink-0">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 sm:p-4 border-t border-border">
          <div className="p-2.5 sm:p-3 bg-secondary/30 rounded-md">
            <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">License</div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-semibold capitalize truncate">{license.tier}</span>
              <Badge 
                variant={license.status === "active" ? "default" : "destructive"} 
                className="text-[10px] sm:text-xs uppercase shrink-0"
              >
                {license.status}
              </Badge>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <header className="h-14 sm:h-16 border-b border-border bg-card flex items-center justify-between px-3 sm:px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-secondary rounded-md transition-colors shrink-0"
              aria-label="Open menu"
            >
              <List size={20} weight="bold" className="sm:w-[22px] sm:h-[22px]" />
            </button>
            <h2 className="font-heading font-bold text-sm sm:text-base lg:text-lg truncate">
              guardivex Platform
            </h2>
          </div>
          <button
            onClick={onLogout}
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-secondary/50 rounded-md"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

