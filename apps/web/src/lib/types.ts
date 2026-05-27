export interface Device {
  id: string
  name: string
  type: "camera" | "nvr" | "access_control" | "alarm" | "network" | "sensor"
  status: "online" | "offline" | "warning"
  siteId: string
  siteName: string
  location: string
  lastSeen: string
  uptime: number
  firmware: string
  ipAddress?: string
  model?: string
}

export interface Site {
  id: string
  name: string
  address: string
  status: "operational" | "warning" | "critical"
  devicesOnline: number
  devicesTotal: number
  securityScore: number
  lastIncident: string | null
}

export interface Alert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  message: string
  deviceId: string
  deviceName: string
  siteId: string
  siteName: string
  timestamp: string
  acknowledged: boolean
}

export interface Incident {
  id: string
  title: string
  description: string
  priority: "critical" | "high" | "medium" | "low"
  status: "open" | "investigating" | "resolved"
  siteId: string
  siteName: string
  assignedTo: string | null
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
}

export interface SystemHealth {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkLatency: number
  servicesStatus: {
    name: string
    status: "running" | "stopped" | "error"
    uptime: string
  }[]
  databaseStatus: "connected" | "disconnected" | "degraded"
  lastBackup: string
}

export interface LicenseInfo {
  tier: "starter" | "professional" | "enterprise"
  status: "active" | "expiring" | "expired"
  expirationDate: string
  organizationName: string
  licensedSites: number
  licensedDevices: number
  currentSites: number
  currentDevices: number
  cloudServicesEnabled: boolean
  supportLevel: "community" | "business" | "enterprise"
}

export interface ActivityLog {
  id: string
  type: "login" | "api" | "web" | "system"
  user: string
  action: string
  timestamp: string
  ipAddress?: string
  success: boolean
}

export interface DashboardMetrics {
  securityScore: number
  totalSites: number
  devicesOnline: number
  devicesTotal: number
  criticalAlerts: number
  unknownDevices: number
  openIncidents: number
  systemHealth: "healthy" | "degraded" | "critical"
  licenseStatus: "active" | "expiring" | "expired"
  updateAvailable: boolean
}

export interface Integration {
  id: string
  name: string
  type: string
  vendor: string
  status: "connected" | "disconnected" | "error"
  lastSync: string
  devicesCount: number
}

export type WebsitePageView = "home" | "product" | "enterprise" | "download" | "licensing" | "documentation" | "support"

export type PlatformPageView = 
  | "dashboard" 
  | "sites" 
  | "devices" 
  | "alerts" 
  | "incidents" 
  | "integrations"
  | "license"
  | "system-health"
  | "audit-logs"
  | "command-approvals"
  | "denied-actions"
  | "session-history"
  | "tenant-activity"
  | "device-health"
  | "event-timeline"
  | "incident-correlation"
  | "ai-recommendations"
  | "users"
  | "settings"