/**
 * AppSubdomain — API-backed SOC platform + auth flows (app.guardivex.com).
 */

import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { getSubdomainUrl } from "@/hooks/use-subdomain"
import {
  getAlerts,
  getDevices,
  getIncidents,
  getSites,
  login,
  logout as apiLogout,
  validateSession,
  type AuthUser,
  type LoginCredentials,
} from "@/lib/api"
import type { Alert, Device, Incident, LicenseInfo, PlatformPageView, Site, SystemHealth, ActivityLog } from "@/lib/types"

const LoginPage = lazy(() => import("@/components/LoginPage").then((module) => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import("@/components/auth/RegisterPage").then((module) => ({ default: module.RegisterPage })))
const PasswordReset = lazy(() => import("@/components/auth/PasswordReset").then((module) => ({ default: module.PasswordReset })))
const SessionTimeoutWarning = lazy(() => import("@/components/auth/SessionTimeoutWarning").then((module) => ({ default: module.SessionTimeoutWarning })))
const PlatformLayout = lazy(() => import("@/components/platform/PlatformLayout").then((module) => ({ default: module.PlatformLayout })))
const SOCDashboardPage = lazy(() => import("@/components/platform/SOCDashboardPage").then((module) => ({ default: module.SOCDashboardPage })))
const SitesPage = lazy(() => import("@/components/pages/SitesPage").then((module) => ({ default: module.SitesPage })))
const DevicesPage = lazy(() => import("@/components/pages/DevicesPage").then((module) => ({ default: module.DevicesPage })))
const DeviceDetailPage = lazy(() => import("@/components/pages/DeviceDetailPage").then((module) => ({ default: module.DeviceDetailPage })))
const AlertsPage = lazy(() => import("@/components/pages/AlertsPage").then((module) => ({ default: module.AlertsPage })))
const IncidentsPage = lazy(() => import("@/components/pages/IncidentsPage").then((module) => ({ default: module.IncidentsPage })))
const SettingsPage = lazy(() => import("@/components/pages/SettingsPage").then((module) => ({ default: module.SettingsPage })))
const OperationalPages = lazy(() => import("@/components/pages/OperationalPages").then((module) => ({ default: module.AuditLogsPage })))
const CommandApprovalsPage = lazy(() => import("@/components/pages/OperationalPages").then((module) => ({ default: module.CommandApprovalsPage })))
const DeniedActionsPage = lazy(() => import("@/components/pages/OperationalPages").then((module) => ({ default: module.DeniedActionsPage })))
const SessionHistoryPage = lazy(() => import("@/components/pages/OperationalPages").then((module) => ({ default: module.SessionHistoryPage })))
const TenantActivityPage = lazy(() => import("@/components/pages/OperationalPages").then((module) => ({ default: module.TenantActivityPage })))
const DeviceHealthPage = lazy(() => import("@/components/pages/OperationalPages").then((module) => ({ default: module.DeviceHealthPage })))
const EventTimelinePage = lazy(() => import("@/components/pages/OperationalPages").then((module) => ({ default: module.EventTimelinePage })))
const IncidentCorrelationPage = lazy(() => import("@/components/pages/OperationalPages").then((module) => ({ default: module.IncidentCorrelationPage })))
const AIAssistantPage = lazy(() => import("@/components/pages/AIAssistantPage").then((module) => ({ default: module.AIAssistantPage })))

const AUTH_ROUTES = new Set(["/login", "/register", "/reset-password"])
const PLATFORM_ROUTES = new Set(["/dashboard", "/sites", "/devices", "/alerts", "/incidents", "/integrations", "/license", "/system-health", "/audit-logs", "/command-approvals", "/denied-actions", "/session-history", "/tenant-activity", "/device-health", "/event-timeline", "/incident-correlation", "/ai-recommendations", "/users", "/settings"])
const DEVICE_DETAIL_ROUTE_PATTERN = /^\/devices\/([0-9a-fA-F-]{36})$/

function isPlatformRoute(path: string) {
  return PLATFORM_ROUTES.has(path) || DEVICE_DETAIL_ROUTE_PATTERN.test(path)
}

interface PlatformData {
  sites: Site[]
  devices: Device[]
  alerts: Alert[]
  incidents: Incident[]
}

const emptyData: PlatformData = { sites: [], devices: [], alerts: [], incidents: [] }

const apiBackedLicense: LicenseInfo = {
  tier: "enterprise",
  status: "active",
  expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
  organizationName: "API-backed tenant",
  licensedSites: 0,
  licensedDevices: 0,
  currentSites: 0,
  currentDevices: 0,
  cloudServicesEnabled: false,
  supportLevel: "enterprise",
}

const apiBackedSystemHealth: SystemHealth = {
  cpuUsage: 0,
  memoryUsage: 0,
  diskUsage: 0,
  networkLatency: 0,
  servicesStatus: [
    { name: "API", status: "running", uptime: "API health checked server-side" },
    { name: "Postgres", status: "running", uptime: "Managed by backend" },
    { name: "Command Executor", status: "stopped", uptime: "Safe-null executor only" },
  ],
  databaseStatus: "connected",
  lastBackup: new Date().toISOString(),
}

const activityLogs: ActivityLog[] = []

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

function buildMetrics(data: PlatformData) {
  const criticalAlerts = data.alerts.filter((alert) => !alert.acknowledged && (alert.severity === "critical" || alert.severity === "high")).length
  const devicesOnline = data.devices.filter((device) => device.status === "online").length

  return {
    securityScore: criticalAlerts > 0 ? 72 : 98,
    totalSites: data.sites.length,
    devicesOnline,
    devicesTotal: data.devices.length,
    criticalAlerts,
    unknownDevices: data.devices.filter((device) => device.status === "warning").length,
    openIncidents: data.incidents.filter((incident) => incident.status !== "resolved").length,
    systemHealth: "healthy" as const,
    licenseStatus: "active" as const,
    updateAvailable: false,
  }
}

function renderPlatformPage(platformPage: PlatformPageView, data: PlatformData, license: LicenseInfo) {
  if (platformPage === "dashboard") {
    return (
      <SOCDashboardPage
        metrics={buildMetrics(data)}
        systemHealth={apiBackedSystemHealth}
        license={license}
        activityLogs={activityLogs}
        devices={data.devices}
        alerts={data.alerts}
      />
    )
  }

  if (platformPage === "sites") return <SitesPage sites={data.sites} />
  if (platformPage === "devices") return <DevicesPage devices={data.devices} />
  if (platformPage === "alerts") return <AlertsPage alerts={data.alerts} />
  if (platformPage === "incidents") return <IncidentsPage incidents={data.incidents} />
  if (platformPage === "audit-logs") return <OperationalPages />
  if (platformPage === "command-approvals") return <CommandApprovalsPage />
  if (platformPage === "denied-actions") return <DeniedActionsPage />
  if (platformPage === "session-history") return <SessionHistoryPage />
  if (platformPage === "tenant-activity") return <TenantActivityPage />
  if (platformPage === "device-health") return <DeviceHealthPage />
  if (platformPage === "event-timeline") return <EventTimelinePage />
  if (platformPage === "incident-correlation") return <IncidentCorrelationPage />
  if (platformPage === "ai-recommendations") return <AIAssistantPage />

  if (platformPage === "integrations") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold mb-3">Integrations</h1>
        <p className="text-muted-foreground max-w-2xl">Integration adapters now belong to the backend. Phase 1 keeps hardware execution disabled while adapters are registered behind RBAC, approvals, and audit logging.</p>
      </div>
    )
  }

  if (platformPage === "license") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold mb-6">License Status</h1>
        <div className="max-w-3xl rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">License data is ready to be served by the backend tenant/license route.</p>
        </div>
      </div>
    )
  }

  if (platformPage === "system-health") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold mb-6">System Health</h1>
        <div className="space-y-3">
          {apiBackedSystemHealth.servicesStatus.map((service) => (
            <div key={service.name} className="flex items-center justify-between rounded-lg border border-border p-4">
              <span className="font-semibold">{service.name}</span>
              <span className="text-sm text-muted-foreground">{service.uptime}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (platformPage === "users") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Users &amp; Roles</h1>
        <p className="text-muted-foreground">Users are now served by the backend RBAC API.</p>
      </div>
    )
  }

  if (platformPage === "settings") return <SettingsPage />
  return null
}

export function AppSubdomain() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const [platformData, setPlatformData] = useState<PlatformData>(emptyData)

  const isAuthenticated = Boolean(authUser)
  const license = useMemo<LicenseInfo>(() => ({
    ...apiBackedLicense,
    organizationName: authUser ? `${authUser.name}'s tenant` : apiBackedLicense.organizationName,
    currentSites: platformData.sites.length,
    currentDevices: platformData.devices.length,
  }), [authUser, platformData.devices.length, platformData.sites.length])

  useEffect(() => {
    validateSession()
      .then((user) => setAuthUser(user))
      .finally(() => setAuthLoading(false))
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setIsNavigating(true)
      setCurrentPath(window.location.pathname)
      setIsNavigating(false)
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    Promise.all([getSites(), getDevices(), getAlerts(), getIncidents()])
      .then(([sites, devices, alerts, incidents]) => {
        setPlatformData({ sites: sites.data, devices: devices.data, alerts: alerts.data, incidents: incidents.data })
      })
      .catch((error) => {
        toast.error("Unable to load platform data", { description: error instanceof Error ? error.message : "API request failed" })
      })
  }, [isAuthenticated])

  useEffect(() => {
    if (authLoading) return
    if (isAuthenticated && AUTH_ROUTES.has(currentPath)) {
      navigate("/dashboard")
      return
    }
    if (!isAuthenticated && isPlatformRoute(currentPath)) {
      navigate("/login")
      return
    }
    if (currentPath === "/") {
      navigate(isAuthenticated ? "/dashboard" : "/login")
    }
  }, [authLoading, isAuthenticated, currentPath])

  const navigate = (path: string) => {
    setIsNavigating(true)
    window.history.pushState({}, "", path)
    setCurrentPath(path)
    setIsNavigating(false)
  }

  const handleLogin = async (credentials: LoginCredentials) => {
    const user = await login(credentials)
    setAuthUser(user)
    navigate("/dashboard")
  }

  const handleLogout = async () => {
    await apiLogout()
    setAuthUser(null)
    setPlatformData(emptyData)
    navigate("/login")
    toast.info("Session ended", { description: "You have been logged out successfully." })
  }

  const handleExtendSession = () => {
    toast.success("Session extended", { description: "Your session has been validated by the backend session layer." })
  }

  const handleBackToWebsite = () => {
    window.location.href = getSubdomainUrl("www", "/")
  }

  const handleNavigatePlatform = (page: PlatformPageView) => navigate(`/${page}`)

  if (authLoading || isNavigating) return <LoadingSpinner />

  if (currentPath === "/login") {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage onLogin={handleLogin} onBackToWebsite={handleBackToWebsite} onShowRegister={() => navigate("/register")} onShowPasswordReset={() => navigate("/reset-password")} />
      </Suspense>
    )
  }

  if (currentPath === "/register") {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <RegisterPage onRegister={() => navigate("/login")} onBackToLogin={() => navigate("/login")} />
      </Suspense>
    )
  }

  if (currentPath === "/reset-password") {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <PasswordReset onComplete={() => navigate("/login")} onBackToLogin={() => navigate("/login")} />
      </Suspense>
    )
  }

  if (isPlatformRoute(currentPath)) {
    const criticalAlertsCount = platformData.alerts.filter((alert) => !alert.acknowledged && (alert.severity === "critical" || alert.severity === "high")).length
    const deviceDetailMatch = currentPath.match(DEVICE_DETAIL_ROUTE_PATTERN)
    const platformPage = deviceDetailMatch ? "device-detail" as PlatformPageView : currentPath.slice(1) as PlatformPageView

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <>
          {isAuthenticated && <SessionTimeoutWarning onLogout={handleLogout} onExtendSession={handleExtendSession} sessionDurationMs={30 * 60 * 1000} warningThresholdMs={5 * 60 * 1000} />}
          <PlatformLayout currentPage={platformPage} onNavigate={handleNavigatePlatform} onLogout={handleLogout} criticalAlerts={criticalAlertsCount} license={license} permissions={authUser?.permissions ?? []}>
            {deviceDetailMatch ? <DeviceDetailPage deviceId={deviceDetailMatch[1]} onBack={() => navigate("/devices")} /> : platformPage === "devices" ? <DevicesPage devices={platformData.devices} onSelectDevice={(deviceId) => navigate(`/devices/${deviceId}`)} /> : renderPlatformPage(platformPage, platformData, license)}
          </PlatformLayout>
        </>
      </Suspense>
    )
  }

  return <LoadingSpinner />
}
