/**
 * AppSubdomain — authenticated SOC platform + auth flows (app.guardivex.com)
 *
 * Owns all auth routes (/login, /register, /reset-password) and every
 * platform route (/dashboard, /sites, /devices, …).
 * Unauthenticated visitors are hard-redirected to /login.
 */

import { lazy, Suspense, useEffect, useState } from "react"
import { toast } from "sonner"
import { usePersistentKV } from "@/hooks/use-persistent-kv"
import { getSubdomainUrl } from "@/hooks/use-subdomain"
import {
  mockDashboardMetrics,
  mockSystemHealth,
  mockLicenseInfo,
  mockActivityLogs,
  mockSites,
  mockDevices,
  mockAlerts,
  mockIncidents,
  mockIntegrations,
} from "@/lib/mockData"
import type { PlatformPageView } from "@/lib/types"

const LoginPage = lazy(() => import("@/components/LoginPage").then((module) => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import("@/components/auth/RegisterPage").then((module) => ({ default: module.RegisterPage })))
const PasswordReset = lazy(() => import("@/components/auth/PasswordReset").then((module) => ({ default: module.PasswordReset })))
const SessionTimeoutWarning = lazy(() => import("@/components/auth/SessionTimeoutWarning").then((module) => ({ default: module.SessionTimeoutWarning })))
const PlatformLayout = lazy(() => import("@/components/platform/PlatformLayout").then((module) => ({ default: module.PlatformLayout })))
const SOCDashboardPage = lazy(() => import("@/components/platform/SOCDashboardPage").then((module) => ({ default: module.SOCDashboardPage })))
const SitesPage = lazy(() => import("@/components/pages/SitesPage").then((module) => ({ default: module.SitesPage })))
const DevicesPage = lazy(() => import("@/components/pages/DevicesPage").then((module) => ({ default: module.DevicesPage })))
const AlertsPage = lazy(() => import("@/components/pages/AlertsPage").then((module) => ({ default: module.AlertsPage })))
const IncidentsPage = lazy(() => import("@/components/pages/IncidentsPage").then((module) => ({ default: module.IncidentsPage })))
const SettingsPage = lazy(() => import("@/components/pages/SettingsPage").then((module) => ({ default: module.SettingsPage })))

const AUTH_ROUTES = new Set(["/login", "/register", "/reset-password"])

const PLATFORM_ROUTES = new Set([
  "/dashboard",
  "/sites",
  "/devices",
  "/alerts",
  "/incidents",
  "/integrations",
  "/license",
  "/system-health",
  "/users",
  "/settings",
])

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  )
}

function renderPlatformPage(platformPage: PlatformPageView) {
  if (platformPage === "dashboard") {
    return (
      <SOCDashboardPage
        metrics={mockDashboardMetrics}
        systemHealth={mockSystemHealth}
        license={mockLicenseInfo}
        activityLogs={mockActivityLogs}
        devices={mockDevices}
        alerts={mockAlerts}
      />
    )
  }

  if (platformPage === "sites") return <SitesPage sites={mockSites} />
  if (platformPage === "devices") return <DevicesPage devices={mockDevices} />
  if (platformPage === "alerts") return <AlertsPage alerts={mockAlerts} />
  if (platformPage === "incidents") return <IncidentsPage incidents={mockIncidents} />

  if (platformPage === "integrations") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Integrations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockIntegrations.map((integration) => (
            <div key={integration.id} className="p-6 border border-border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {integration.type} — {integration.vendor}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm ${
                    integration.status === "connected" ? "text-success" : "text-destructive"
                  }`}
                >
                  {integration.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  {integration.devicesCount} devices
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (platformPage === "license") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold mb-6">License Status</h1>
        <div className="max-w-3xl">
          <div className="p-6 border border-border rounded-lg space-y-4">
            {[
              ["Organization", mockLicenseInfo.organizationName],
              ["Tier", mockLicenseInfo.tier.toUpperCase()],
              ["Status", mockLicenseInfo.status.toUpperCase()],
              ["Expiration", new Date(mockLicenseInfo.expirationDate).toLocaleDateString()],
              ["Sites", `${mockLicenseInfo.currentSites} / ${mockLicenseInfo.licensedSites}`],
              ["Devices", `${mockLicenseInfo.currentDevices} / ${mockLicenseInfo.licensedDevices}`],
              ["Cloud Services", mockLicenseInfo.cloudServicesEnabled ? "Enabled" : "Disabled"],
              ["Support Level", mockLicenseInfo.supportLevel],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="font-semibold">{label}</span>
                <span className="capitalize">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (platformPage === "system-health") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold mb-6">System Health</h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              ["CPU Usage", `${mockSystemHealth.cpuUsage}%`],
              ["Memory Usage", `${mockSystemHealth.memoryUsage}%`],
              ["Disk Usage", `${mockSystemHealth.diskUsage}%`],
              ["Network Latency", `${mockSystemHealth.networkLatency}ms`],
            ].map(([label, value]) => (
              <div key={label} className="p-6 border border-border rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">{label}</div>
                <div className="text-3xl font-bold">{value}</div>
              </div>
            ))}
          </div>
          <div className="p-6 border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <div className="space-y-3">
              {mockSystemHealth.servicesStatus.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-3 bg-secondary/20 rounded"
                >
                  <span>{service.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{service.uptime}</span>
                    <span
                      className={`text-sm ${
                        service.status === "running" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (platformPage === "users") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Users &amp; Roles</h1>
        <p className="text-muted-foreground">User management functionality coming soon…</p>
      </div>
    )
  }

  if (platformPage === "settings") return <SettingsPage />

  return null
}

export function AppSubdomain() {
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

  // Auth guards
  useEffect(() => {
    // Already authenticated → skip auth pages
    if (isAuthenticated && AUTH_ROUTES.has(currentPath)) {
      navigate("/dashboard")
      return
    }
    // Not authenticated + on a platform page → force login
    if (!isAuthenticated && PLATFORM_ROUTES.has(currentPath)) {
      navigate("/login")
      return
    }
    // Root of app subdomain → bounce to appropriate entry point
    if (currentPath === "/") {
      navigate(isAuthenticated ? "/dashboard" : "/login")
    }
  }, [isAuthenticated, currentPath]) // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = (path: string) => {
    setIsNavigating(true)
    window.history.pushState({}, "", path)
    setTimeout(() => {
      setCurrentPath(path)
      setIsNavigating(false)
    }, 150)
  }

  const handleLogin = () => {
    setAuthStatus("logged-in")
    navigate("/dashboard")
  }

  const handleLogout = () => {
    setAuthStatus("logged-out")
    navigate("/login")
    toast.info("Session ended", {
      description: "You have been logged out successfully.",
    })
  }

  const handleExtendSession = () => {
    toast.success("Session extended", {
      description: "Your session has been extended for another 30 minutes.",
    })
  }

  /** Cross-subdomain: go back to the marketing site */
  const handleBackToWebsite = () => {
    window.location.href = getSubdomainUrl("www", "/")
  }

  const handleNavigatePlatform = (page: PlatformPageView) => navigate(`/${page}`)

  if (isNavigating) return <LoadingSpinner />

  // ── Auth routes ──────────────────────────────────────────────────────────
  if (currentPath === "/login") {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage
          onLogin={handleLogin}
          onBackToWebsite={handleBackToWebsite}
          onShowRegister={() => navigate("/register")}
          onShowPasswordReset={() => navigate("/reset-password")}
        />
      </Suspense>
    )
  }

  if (currentPath === "/register") {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <RegisterPage
          onRegister={handleLogin}
          onBackToLogin={() => navigate("/login")}
        />
      </Suspense>
    )
  }

  if (currentPath === "/reset-password") {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <PasswordReset
          onComplete={() => navigate("/login")}
          onBackToLogin={() => navigate("/login")}
        />
      </Suspense>
    )
  }

  // ── Platform routes ───────────────────────────────────────────────────────
  if (PLATFORM_ROUTES.has(currentPath)) {
    const criticalAlertsCount = mockAlerts.filter(
      (a) => !a.acknowledged && (a.severity === "critical" || a.severity === "high"),
    ).length
    const platformPage = currentPath.slice(1) as PlatformPageView

    return (
      <Suspense fallback={<LoadingSpinner />}>
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
            {renderPlatformPage(platformPage)}
          </PlatformLayout>
        </>
      </Suspense>
    )
  }

  return <LoadingSpinner />
}
