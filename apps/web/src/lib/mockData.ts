import type { Device, Site, Alert, Incident, DashboardMetrics, SystemHealth, LicenseInfo, ActivityLog, Integration } from "./types"

export const mockDevices: Device[] = [
  {
    id: "dev-001",
    name: "CAM-HQ-LOBBY-01",
    type: "camera",
    status: "online",
    siteId: "site-001",
    siteName: "Headquarters",
    location: "Main Lobby",
    lastSeen: "2024-01-15T10:45:00Z",
    uptime: 99.8,
    firmware: "v2.4.1",
    ipAddress: "10.10.1.45",
    model: "Axis P3245-LVE"
  },
  {
    id: "dev-002",
    name: "SENSOR-WH-DOCK-03",
    type: "sensor",
    status: "offline",
    siteId: "site-002",
    siteName: "Warehouse Alpha",
    location: "Loading Dock 3",
    lastSeen: "2024-01-14T22:10:00Z",
    uptime: 95.2,
    firmware: "v1.8.3",
    ipAddress: "10.20.3.12",
    model: "Honeywell PIR-50"
  },
  {
    id: "dev-003",
    name: "ACCESS-DC-FLOOR2-A",
    type: "access_control",
    status: "online",
    siteId: "site-003",
    siteName: "Data Center West",
    location: "Floor 2 - Server Room A",
    lastSeen: "2024-01-15T10:44:30Z",
    uptime: 99.9,
    firmware: "v3.1.0",
    ipAddress: "10.30.2.88",
    model: "HID VertX V100"
  },
  {
    id: "dev-004",
    name: "ALARM-HQ-PERIMET-01",
    type: "alarm",
    status: "online",
    siteId: "site-001",
    siteName: "Headquarters",
    location: "Perimeter North",
    lastSeen: "2024-01-15T10:45:15Z",
    uptime: 98.5,
    firmware: "v2.2.5",
    ipAddress: "10.10.5.23",
    model: "DSC PowerSeries Pro"
  },
  {
    id: "dev-005",
    name: "CAM-WH-GATE-EAST",
    type: "camera",
    status: "warning",
    siteId: "site-002",
    siteName: "Warehouse Alpha",
    location: "East Gate",
    lastSeen: "2024-01-15T10:42:00Z",
    uptime: 87.3,
    firmware: "v2.3.8",
    ipAddress: "10.20.1.67",
    model: "Hikvision DS-2CD2385"
  },
  {
    id: "dev-006",
    name: "SENSOR-DC-HVAC-01",
    type: "sensor",
    status: "online",
    siteId: "site-003",
    siteName: "Data Center West",
    location: "HVAC System",
    lastSeen: "2024-01-15T10:45:10Z",
    uptime: 99.7,
    firmware: "v1.9.2",
    ipAddress: "10.30.8.14",
    model: "Nest Protect"
  },
  {
    id: "dev-007",
    name: "ACCESS-HQ-EXEC-SUITE",
    type: "access_control",
    status: "online",
    siteId: "site-001",
    siteName: "Headquarters",
    location: "Executive Suite",
    lastSeen: "2024-01-15T10:45:05Z",
    uptime: 99.6,
    firmware: "v3.0.9",
    ipAddress: "10.10.2.91",
    model: "Avigilon ACM"
  },
  {
    id: "dev-008",
    name: "CAM-RETAIL-CASHIER-02",
    type: "camera",
    status: "online",
    siteId: "site-004",
    siteName: "Retail Store 14",
    location: "Cashier Station 2",
    lastSeen: "2024-01-15T10:44:55Z",
    uptime: 96.8,
    firmware: "v2.4.1",
    ipAddress: "10.40.3.24",
    model: "Axis M3046-V"
  },
  {
    id: "dev-009",
    name: "NVR-HQ-CENTRAL-01",
    type: "nvr",
    status: "online",
    siteId: "site-001",
    siteName: "Headquarters",
    location: "Server Room",
    lastSeen: "2024-01-15T10:45:20Z",
    uptime: 99.9,
    firmware: "v5.2.1",
    ipAddress: "10.10.0.10",
    model: "Genetec Omnicast"
  },
  {
    id: "dev-010",
    name: "NETWORK-DC-CORE-SW01",
    type: "network",
    status: "online",
    siteId: "site-003",
    siteName: "Data Center West",
    location: "Core Network",
    lastSeen: "2024-01-15T10:45:18Z",
    uptime: 99.99,
    firmware: "v12.4.25",
    ipAddress: "10.30.0.1",
    model: "Cisco Catalyst 9500"
  },
  {
    id: "dev-011",
    name: "CAM-HQ-PARKING-04",
    type: "camera",
    status: "online",
    siteId: "site-001",
    siteName: "Headquarters",
    location: "Parking Level 2",
    lastSeen: "2024-01-15T10:45:12Z",
    uptime: 98.2,
    firmware: "v2.4.1",
    ipAddress: "10.10.1.78",
    model: "Axis P1455-LE"
  },
  {
    id: "dev-012",
    name: "NVR-WH-BACKUP-01",
    type: "nvr",
    status: "online",
    siteId: "site-002",
    siteName: "Warehouse Alpha",
    location: "Security Office",
    lastSeen: "2024-01-15T10:44:45Z",
    uptime: 97.5,
    firmware: "v5.1.8",
    ipAddress: "10.20.0.5",
    model: "Milestone XProtect"
  }
]

export const mockSites: Site[] = [
  {
    id: "site-001",
    name: "Headquarters",
    address: "1200 Enterprise Blvd, San Francisco, CA 94105",
    status: "operational",
    devicesOnline: 142,
    devicesTotal: 145,
    securityScore: 94,
    lastIncident: "2024-01-10T15:30:00Z"
  },
  {
    id: "site-002",
    name: "Warehouse Alpha",
    address: "8500 Industrial Pkwy, Oakland, CA 94621",
    status: "warning",
    devicesOnline: 67,
    devicesTotal: 72,
    securityScore: 78,
    lastIncident: "2024-01-15T08:45:00Z"
  },
  {
    id: "site-003",
    name: "Data Center West",
    address: "2400 Server Farm Rd, Santa Clara, CA 95054",
    status: "operational",
    devicesOnline: 98,
    devicesTotal: 98,
    securityScore: 98,
    lastIncident: null
  },
  {
    id: "site-004",
    name: "Retail Store 14",
    address: "750 Market St, San Francisco, CA 94102",
    status: "operational",
    devicesOnline: 28,
    devicesTotal: 30,
    securityScore: 89,
    lastIncident: "2024-01-12T19:20:00Z"
  },
  {
    id: "site-005",
    name: "Manufacturing Plant B",
    address: "4200 Factory Dr, Fremont, CA 94538",
    status: "critical",
    devicesOnline: 156,
    devicesTotal: 185,
    securityScore: 62,
    lastIncident: "2024-01-15T09:15:00Z"
  }
]

export const mockAlerts: Alert[] = [
  {
    id: "alert-001",
    severity: "critical",
    title: "Motion Detected After Hours",
    message: "Unauthorized motion detected in restricted zone during off-hours",
    deviceId: "dev-006",
    deviceName: "SENSOR-DC-HVAC-01",
    siteId: "site-003",
    siteName: "Data Center West",
    timestamp: "2024-01-15T10:42:30Z",
    acknowledged: false
  },
  {
    id: "alert-002",
    severity: "high",
    title: "Device Offline > 12 Hours",
    message: "Critical sensor has been offline for extended period",
    deviceId: "dev-002",
    deviceName: "SENSOR-WH-DOCK-03",
    siteId: "site-002",
    siteName: "Warehouse Alpha",
    timestamp: "2024-01-15T10:10:00Z",
    acknowledged: false
  },
  {
    id: "alert-003",
    severity: "medium",
    title: "Camera Performance Degraded",
    message: "Video quality below acceptable threshold, possible lens obstruction",
    deviceId: "dev-005",
    deviceName: "CAM-WH-GATE-EAST",
    siteId: "site-002",
    siteName: "Warehouse Alpha",
    timestamp: "2024-01-15T09:55:00Z",
    acknowledged: true
  },
  {
    id: "alert-004",
    severity: "critical",
    title: "Multiple Failed Access Attempts",
    message: "5 consecutive failed access attempts detected on executive floor",
    deviceId: "dev-007",
    deviceName: "ACCESS-HQ-EXEC-SUITE",
    siteId: "site-001",
    siteName: "Headquarters",
    timestamp: "2024-01-15T10:38:15Z",
    acknowledged: false
  },
  {
    id: "alert-005",
    severity: "low",
    title: "Firmware Update Available",
    message: "Security patch v2.4.2 available for installation",
    deviceId: "dev-001",
    deviceName: "CAM-HQ-LOBBY-01",
    siteId: "site-001",
    siteName: "Headquarters",
    timestamp: "2024-01-15T08:00:00Z",
    acknowledged: true
  },
  {
    id: "alert-006",
    severity: "high",
    title: "Unknown Device Detected",
    message: "Unregistered device attempting to connect to secure network",
    deviceId: "dev-unknown",
    deviceName: "Unknown Device",
    siteId: "site-005",
    siteName: "Manufacturing Plant B",
    timestamp: "2024-01-15T10:30:00Z",
    acknowledged: false
  }
]

export const mockIncidents: Incident[] = [
  {
    id: "inc-001",
    title: "Unauthorized Access Attempt - Executive Floor",
    description: "Multiple failed badge scans followed by forced door alarm. Security team dispatched, subject fled scene before arrival.",
    priority: "critical",
    status: "investigating",
    siteId: "site-001",
    siteName: "Headquarters",
    assignedTo: "Security Team Alpha",
    createdAt: "2024-01-15T10:38:15Z",
    updatedAt: "2024-01-15T10:42:00Z",
    resolvedAt: null
  },
  {
    id: "inc-002",
    title: "Network Intrusion - Manufacturing Plant",
    description: "Suspicious network activity detected from unknown device. Device isolated and forensics in progress.",
    priority: "high",
    status: "investigating",
    siteId: "site-005",
    siteName: "Manufacturing Plant B",
    assignedTo: "IT Security - Marcus Chen",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:35:00Z",
    resolvedAt: null
  },
  {
    id: "inc-003",
    title: "Sensor Network Failure - Warehouse",
    description: "Multiple sensors offline in loading dock area. Hardware failure confirmed, replacement units ordered.",
    priority: "medium",
    status: "open",
    siteId: "site-002",
    siteName: "Warehouse Alpha",
    assignedTo: "Field Tech - Sarah Johnson",
    createdAt: "2024-01-15T09:15:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
    resolvedAt: null
  },
  {
    id: "inc-004",
    title: "False Alarm - Perimeter Breach",
    description: "Motion sensor triggered by wildlife. Sensor sensitivity adjusted, no security threat identified.",
    priority: "low",
    status: "resolved",
    siteId: "site-001",
    siteName: "Headquarters",
    assignedTo: "Security Team Bravo",
    createdAt: "2024-01-14T23:45:00Z",
    updatedAt: "2024-01-15T00:15:00Z",
    resolvedAt: "2024-01-15T00:15:00Z"
  }
]

export const mockDashboardMetrics: DashboardMetrics = {
  securityScore: 87,
  totalSites: 5,
  devicesOnline: 491,
  devicesTotal: 530,
  criticalAlerts: 3,
  unknownDevices: 2,
  openIncidents: 3,
  systemHealth: "healthy",
  licenseStatus: "active",
  updateAvailable: true
}

export const mockSystemHealth: SystemHealth = {
  cpuUsage: 42,
  memoryUsage: 68,
  diskUsage: 54,
  networkLatency: 12,
  servicesStatus: [
    { name: "Web Server", status: "running", uptime: "15d 4h 23m" },
    { name: "Database", status: "running", uptime: "15d 4h 23m" },
    { name: "Event Processor", status: "running", uptime: "15d 4h 23m" },
    { name: "Alert Engine", status: "running", uptime: "15d 4h 23m" },
    { name: "API Gateway", status: "running", uptime: "15d 4h 23m" },
    { name: "Device Monitor", status: "running", uptime: "15d 4h 23m" }
  ],
  databaseStatus: "connected",
  lastBackup: "2024-01-15T02:00:00Z"
}

export const mockLicenseInfo: LicenseInfo = {
  tier: "enterprise",
  status: "active",
  expirationDate: "2025-03-15T00:00:00Z",
  organizationName: "Acme Corporation",
  licensedSites: 10,
  licensedDevices: 1000,
  currentSites: 5,
  currentDevices: 530,
  cloudServicesEnabled: true,
  supportLevel: "enterprise"
}

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "log-001",
    type: "login",
    user: "admin@acme.com",
    action: "User logged in",
    timestamp: "2024-01-15T10:45:00Z",
    ipAddress: "192.168.1.100",
    success: true
  },
  {
    id: "log-002",
    type: "api",
    user: "integration-service",
    action: "Device status updated",
    timestamp: "2024-01-15T10:44:30Z",
    ipAddress: "10.10.1.50",
    success: true
  },
  {
    id: "log-003",
    type: "web",
    user: "operator@acme.com",
    action: "Viewed alert details",
    timestamp: "2024-01-15T10:43:15Z",
    ipAddress: "192.168.1.105",
    success: true
  },
  {
    id: "log-004",
    type: "system",
    user: "system",
    action: "Automated backup completed",
    timestamp: "2024-01-15T02:00:00Z",
    success: true
  },
  {
    id: "log-005",
    type: "login",
    user: "security@acme.com",
    action: "Failed login attempt",
    timestamp: "2024-01-15T10:40:22Z",
    ipAddress: "203.0.113.45",
    success: false
  },
  {
    id: "log-006",
    type: "api",
    user: "mobile-app",
    action: "Device configuration changed",
    timestamp: "2024-01-15T10:38:10Z",
    ipAddress: "10.10.2.75",
    success: true
  }
]

export const mockIntegrations: Integration[] = [
  {
    id: "int-001",
    name: "Axis Camera Station",
    type: "Camera Management",
    vendor: "Axis Communications",
    status: "connected",
    lastSync: "2024-01-15T10:45:00Z",
    devicesCount: 124
  },
  {
    id: "int-002",
    name: "Genetec Security Center",
    type: "Unified Security Platform",
    vendor: "Genetec",
    status: "connected",
    lastSync: "2024-01-15T10:44:45Z",
    devicesCount: 87
  },
  {
    id: "int-003",
    name: "Honeywell Pro-Watch",
    type: "Access Control",
    vendor: "Honeywell",
    status: "connected",
    lastSync: "2024-01-15T10:44:30Z",
    devicesCount: 156
  },
  {
    id: "int-004",
    name: "DSC PowerSeries",
    type: "Alarm System",
    vendor: "Johnson Controls",
    status: "connected",
    lastSync: "2024-01-15T10:44:15Z",
    devicesCount: 42
  },
  {
    id: "int-005",
    name: "Milestone XProtect",
    type: "VMS",
    vendor: "Milestone Systems",
    status: "error",
    lastSync: "2024-01-15T09:30:00Z",
    devicesCount: 0
  },
  {
    id: "int-006",
    name: "Cisco Meraki",
    type: "Network Management",
    vendor: "Cisco",
    status: "connected",
    lastSync: "2024-01-15T10:45:05Z",
    devicesCount: 98
  }
]