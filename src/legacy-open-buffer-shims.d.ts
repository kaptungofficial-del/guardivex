declare module "@/*" {
  import type { ComponentType, ReactNode } from "react"

  export type PlatformPageView = string

  export const usePersistentKV: <T = unknown>(key: string, initialValue: T) => [T, (value: T) => void]
  export const getSubdomainUrl: (subdomain: string, path?: string) => string

  export const mockDashboardMetrics: unknown
  export const mockSystemHealth: { servicesStatus?: unknown[] }
  export const mockLicense: unknown
  export const mockActivityLogs: unknown[]
  export const mockDevices: unknown[]
  export const mockAlerts: unknown[]
  export const mockSites: unknown[]
  export const mockIncidents: unknown[]
  export const mockIntegrations: unknown[]

  export const Button: ComponentType<Record<string, unknown>>
  export const Input: ComponentType<Record<string, unknown>>
  export const Label: ComponentType<Record<string, unknown>>
  export const Card: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const CardContent: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const CardDescription: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const CardHeader: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const CardTitle: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const Tabs: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const TabsContent: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const TabsList: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const TabsTrigger: ComponentType<{ children?: ReactNode } & Record<string, unknown>>

  export const TwoFactorAuth: ComponentType<Record<string, unknown>>
  export const SSOLogin: ComponentType<Record<string, unknown>>
  export const BiometricAuth: ComponentType<Record<string, unknown>>
  export const AuthShell: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const LoginPage: ComponentType<Record<string, unknown>>
  export const RegisterPage: ComponentType<Record<string, unknown>>
  export const PasswordReset: ComponentType<Record<string, unknown>>
  export const SessionTimeoutWarning: ComponentType<Record<string, unknown>>
  export const PlatformLayout: ComponentType<{ children?: ReactNode } & Record<string, unknown>>
  export const SOCDashboardPage: ComponentType<Record<string, unknown>>
  export const SitesPage: ComponentType<Record<string, unknown>>
  export const DevicesPage: ComponentType<Record<string, unknown>>
  export const AlertsPage: ComponentType<Record<string, unknown>>
  export const IncidentsPage: ComponentType<Record<string, unknown>>
  export const SettingsPage: ComponentType<Record<string, unknown>>

  const fallback: unknown
  export default fallback
}