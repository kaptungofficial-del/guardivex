import { useState, useEffect } from "react"
import { Toaster, toast } from "sonner"
import { useTheme } from "@/hooks/use-theme"
import { usePersistentKV } from "@/hooks/use-persistent-kv"
import { WebsiteLayout } from "@/components/website/WebsiteLayout"
import { LoginPage } from "@/components/LoginPage"
import { RegisterPage } from "@/components/auth/RegisterPage"
import { PasswordReset } from "@/components/auth/PasswordReset"
import { SessionTimeoutWarning } from "@/components/auth/SessionTimeoutWarning"
import { PlatformLayout } from "@/components/platform/PlatformLayout"
import { SOCDashboardPage } from "@/components/platform/SOCDashboardPage"
import { SitesPage } from "@/components/pages/SitesPage"
import { DevicesPage } from "@/components/pages/DevicesPage"
import { AlertsPage } from "@/components/pages/AlertsPage"
import { IncidentsPage } from "@/components/pages/IncidentsPage"
import { SettingsPage } from "@/components/pages/SettingsPage"
import { 
  mockDashboardMetrics, 
  mockSystemHealth,
  mockLicenseInfo,
  mockActivityLogs,
  mockSites, 
  mockDevices, 
  mockAlerts, 
  mockIncidents,
  mockIntegrations
} from "@/lib/mockData"
import type { PlatformPageView } from "@/lib/types"

function App() {
  useTheme()
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [authStatus, setAuthStatus] = usePersistentKV("sentinelgrid-auth", "logged-out")
  const [isNavigating, setIsNavigating] = useState(false)

  const isAuthenticated = authStatus === "logged-in"

  useEffect(() => {
    const handlePopState = () => {
      setIsNavigating(true)
      setTimeout(() => {
        setCurrentPath(window.location.pathname)
        setIsNavigating(false)
      }, 150)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    if (isAuthenticated && (currentPath === "/login" || currentPath === "/register" || currentPath === "/reset-password")) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, currentPath])

  const navigate = (path: string) => {
    setIsNavigating(true)
    window.history.pushState({}, "", path)
    setTimeout(() => {
      setCurrentPath(path)
      setIsNavigating(false)
    }, 150)
  }

  const handleNavigateWebsite = (page: string) => {
    const path = page === "home" ? "/" : `/${page}`
    navigate(path)
  }

  const handleShowLogin = () => {
    navigate("/login")
  }

  const handleLogin = () => {
    setAuthStatus("logged-in")
    navigate("/dashboard")
  }

  const handleLogout = () => {
    setAuthStatus("logged-out")
    navigate("/")
    toast.info("Session ended", {
      description: "You have been logged out successfully."
    })
  }

  const handleExtendSession = () => {
    toast.success("Session extended", {
      description: "Your session has been extended for another 30 minutes."
    })
  }

  const handleBackToWebsite = () => {
    navigate("/")
  }

  const handleNavigatePlatform = (page: PlatformPageView) => {
    navigate(`/${page}`)
  }

  const isPlatformRoute = [
    "/dashboard",
    "/sites",
    "/devices",
    "/alerts",
    "/incidents",
    "/integrations",
    "/license",
    "/system-health",
    "/users",
    "/settings"
  ].includes(currentPath)

  if (isNavigating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (currentPath === "/login") {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onBackToWebsite={handleBackToWebsite}
        onShowRegister={() => navigate("/register")}
        onShowPasswordReset={() => navigate("/reset-password")}
      />
    )
  }

  if (currentPath === "/register") {
    return (
      <RegisterPage
        onRegister={handleLogin}
        onBackToLogin={() => navigate("/login")}
      />
    )
  }

  if (currentPath === "/reset-password") {
    return (
      <PasswordReset
        onComplete={() => navigate("/login")}
        onBackToLogin={() => navigate("/login")}
      />
    )
  }

  if (isPlatformRoute) {
    const criticalAlertsCount = mockAlerts.filter((a) => !a.acknowledged && (a.severity === "critical" || a.severity === "high")).length
    const platformPage = currentPath.slice(1) as PlatformPageView

    return (
      <>
        {isAuthenticated && (
          <SessionTimeoutWarning
            onLogout={handleLogout}
            onExtendSession={handleExtendSession}
            sessionDurationMs={30 * 60 * 1000}
            warningThresholdMs={5 * 60 * 1000}
          />
        )}
        <PlatformLayout
          currentPage={platformPage}
          onNavigate={handleNavigatePlatform}
          onLogout={handleLogout}
          criticalAlerts={criticalAlertsCount}
          license={mockLicenseInfo}
        >
          {platformPage === "dashboard" && (
            <SOCDashboardPage
              metrics={mockDashboardMetrics}
              systemHealth={mockSystemHealth}
              license={mockLicenseInfo}
              activityLogs={mockActivityLogs}
              devices={mockDevices}
              alerts={mockAlerts}
            />
          )}
          {platformPage === "sites" && <SitesPage sites={mockSites} />}
          {platformPage === "devices" && <DevicesPage devices={mockDevices} />}
          {platformPage === "alerts" && <AlertsPage alerts={mockAlerts} />}
          {platformPage === "incidents" && <IncidentsPage incidents={mockIncidents} />}
          {platformPage === "integrations" && (
            <div className="p-8">
              <h1 className="text-3xl font-heading font-bold mb-6">Integrations</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockIntegrations.map((integration) => (
                  <div key={integration.id} className="p-6 border border-border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{integration.type} - {integration.vendor}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${integration.status === "connected" ? "text-success" : "text-destructive"}`}>
                        {integration.status}
                      </span>
                      <span className="text-sm text-muted-foreground">{integration.devicesCount} devices</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {platformPage === "license" && (
            <div className="p-8">
              <h1 className="text-3xl font-heading font-bold mb-6">License Status</h1>
              <div className="max-w-3xl">
                <div className="p-6 border border-border rounded-lg space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Organization</span>
                    <span>{mockLicenseInfo.organizationName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Tier</span>
                    <span className="uppercase">{mockLicenseInfo.tier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Status</span>
                    <span className="uppercase">{mockLicenseInfo.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Expiration</span>
                    <span>{new Date(mockLicenseInfo.expirationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sites</span>
                    <span>{mockLicenseInfo.currentSites} / {mockLicenseInfo.licensedSites}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Devices</span>
                    <span>{mockLicenseInfo.currentDevices} / {mockLicenseInfo.licensedDevices}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Cloud Services</span>
                    <span>{mockLicenseInfo.cloudServicesEnabled ? "Enabled" : "Disabled"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Support Level</span>
                    <span className="capitalize">{mockLicenseInfo.supportLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {platformPage === "system-health" && (
            <div className="p-8">
              <h1 className="text-3xl font-heading font-bold mb-6">System Health</h1>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-6 border border-border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">CPU Usage</div>
                    <div className="text-3xl font-bold">{mockSystemHealth.cpuUsage}%</div>
                  </div>
                  <div className="p-6 border border-border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">Memory Usage</div>
                    <div className="text-3xl font-bold">{mockSystemHealth.memoryUsage}%</div>
                  </div>
                  <div className="p-6 border border-border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">Disk Usage</div>
                    <div className="text-3xl font-bold">{mockSystemHealth.diskUsage}%</div>
                  </div>
                  <div className="p-6 border border-border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">Network Latency</div>
                    <div className="text-3xl font-bold">{mockSystemHealth.networkLatency}ms</div>
                  </div>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Services</h2>
                  <div className="space-y-3">
                    {mockSystemHealth.servicesStatus.map((service) => (
                      <div key={service.name} className="flex items-center justify-between p-3 bg-secondary/20 rounded">
                        <span>{service.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{service.uptime}</span>
                          <span className={`text-sm ${service.status === "running" ? "text-success" : "text-destructive"}`}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {platformPage === "users" && (
            <div className="p-8">
              <h1 className="text-3xl font-heading font-bold mb-6">Users & Roles</h1>
              <p className="text-muted-foreground">User management functionality coming soon...</p>
            </div>
          )}
          {platformPage === "settings" && <SettingsPage />}
        </PlatformLayout>
        <Toaster position="top-right" />
      </>
    )
  }

  const websitePage = currentPath === "/" ? "home" : currentPath.slice(1)
  return <WebsiteLayout currentPage={websitePage} onNavigate={handleNavigateWebsite} onLogin={handleShowLogin} />
}

export default App
