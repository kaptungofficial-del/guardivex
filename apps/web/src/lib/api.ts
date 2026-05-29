import type { Alert, Device, Incident, Site } from "@/lib/types"
import { mockAlerts, mockDevices, mockIncidents, mockSites } from "@/lib/mockData"

const API_URL = (import.meta.env.VITE_API_URL ?? "http://127.0.0.1:4000").replace(/\/$/, "")
const ACCESS_TOKEN_KEY = "guardivex.accessToken"
const REFRESH_TOKEN_KEY = "guardivex.refreshToken"
const DEMO_ACCESS_TOKEN = "guardivex.demo.access"
let csrfToken: string | null = null

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  tenantId: string
  email: string
  name: string
  roles: string[]
  permissions: string[]
}

export interface AiRecommendation {
  id: string
  incidentId?: string | null
  status: "drafted" | "reviewed" | "converted_to_command_request" | "dismissed"
  summary: string
  recommendation: string
  suggestedAction?: string | null
  draftCommand: unknown
  evidence: unknown
  createdAt: string
  reviewedAt?: string | null
}

export interface CreateAiRecommendationInput {
  incidentId?: string
  signals: string[]
  severity?: string
}

export interface CommandReviewInput {
  decision: "approved" | "rejected"
  comment: string
}

export interface DeviceDetail extends Device {
  site?: { id: string; name: string } | null
  building?: { id: string; name: string } | null
  door?: { id: string; name: string } | null
  deviceTypeCatalog?: { id: string; label: string; category: string } | null
  events: Array<{ id: string; type: string; severity: string; message: string; occurredAt: string }>
  alerts: Array<{ id: string; title: string; severity: string; message: string; createdAt: string }>
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

function getAccessToken() {
  return window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

function setTokens(accessToken: string, refreshToken?: string) {
  window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  if (refreshToken) {
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

function isDemoToken() {
  return window.sessionStorage.getItem(ACCESS_TOKEN_KEY) === DEMO_ACCESS_TOKEN
}

function createDemoUser(email: string): AuthUser {
  return {
    id: "demo-user",
    tenantId: "demo-tenant",
    email: email || "operator@guardivex.demo",
    name: "Demo Operator",
    roles: ["SOC Analyst", "Platform Administrator"],
    permissions: [
      "sites:read",
      "devices:read",
      "alerts:read",
      "incidents:read",
      "events:read",
      "audit:read",
      "commands:approve",
      "integrations:read",
      "ai:read",
      "users:read",
    ],
  }
}

function isNetworkError(error: unknown) {
  return error instanceof TypeError || (error instanceof Error && /failed to fetch|networkerror|load failed/i.test(error.message))
}

async function withDemoFallback<T>(request: () => Promise<T>, fallback: T): Promise<T> {
  if (isDemoToken()) return fallback

  try {
    return await request()
  } catch (error) {
    if (!isNetworkError(error)) throw error
    return fallback
  }
}

export function clearTokens() {
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  window.sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase()
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && path !== "/auth/csrf") {
    csrfToken ??= (await apiRequest<{ csrfToken: string }>("/auth/csrf")).csrfToken
  }
  const token = getAccessToken()
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    let message = `API request failed with status ${response.status}`
    try {
      const body = await response.json()
      message = body?.error?.message ?? message
    } catch {
      // Keep the status-derived message.
    }
    throw new ApiError(message, response.status)
  }

  return response.json() as Promise<T>
}

export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  try {
    const result = await apiRequest<{ accessToken: string; refreshToken?: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
    setTokens(result.accessToken, result.refreshToken)
    return result.user
  } catch (error) {
    if (!isNetworkError(error)) {
      throw error
    }

    setTokens(DEMO_ACCESS_TOKEN)
    return createDemoUser(credentials.email)
  }
}

export async function validateSession(): Promise<AuthUser | null> {
  if (!getAccessToken()) return null
  if (isDemoToken()) return createDemoUser("operator@guardivex.demo")
  try {
    const result = await apiRequest<{ user: AuthUser }>("/auth/me")
    return result.user
  } catch {
    clearTokens()
    return null
  }
}

export async function logout() {
  try {
    if (!isDemoToken()) {
      await apiRequest<{ ok: boolean }>("/auth/logout", { method: "POST" })
    }
  } catch (error) {
    if (!isNetworkError(error)) {
      throw error
    }
  } finally {
    clearTokens()
  }
}

export async function getAuditLogs() {
  return withDemoFallback(() => apiRequest<{ data: unknown[] }>("/audit"), { data: [] })
}

export async function getDeniedActions() {
  return withDemoFallback(() => apiRequest<{ data: unknown[] }>("/operations/denied-actions"), { data: [] })
}

export async function getSessionHistory() {
  return withDemoFallback(() => apiRequest<{ data: unknown[] }>("/operations/session-history"), { data: [] })
}

export async function getTenantActivity() {
  return withDemoFallback(() => apiRequest<{ data: unknown[] }>("/operations/tenant-activity"), { data: [] })
}

export async function getDeviceHealth() {
  return withDemoFallback(() => apiRequest<{ data: { devices: unknown[]; heartbeats: unknown[] } }>("/operations/device-health"), { data: { devices: [], heartbeats: [] } })
}

export async function getEventTimeline() {
  return withDemoFallback(() => apiRequest<{ data: unknown[] }>("/operations/event-timeline"), { data: [] })
}

export async function getIncidentCorrelation() {
  return withDemoFallback(() => apiRequest<{ data: unknown[] }>("/operations/incident-correlation"), { data: [] })
}

export async function getAiRecommendations() {
  return withDemoFallback(() => apiRequest<{ data: AiRecommendation[] }>("/ai/recommendations"), { data: [] })
}

export async function createAiRecommendation(input: CreateAiRecommendationInput) {
  const demoRecommendation: AiRecommendation = {
    id: crypto.randomUUID(),
    status: "drafted",
    summary: `${input.severity ?? "medium"} advisory from ${input.signals.length} signal${input.signals.length === 1 ? "" : "s"}`,
    recommendation: "Review the correlated signals, preserve evidence, and route any operational action through human approval.",
    suggestedAction: null,
    draftCommand: null,
    evidence: input.signals,
    createdAt: new Date().toISOString(),
  }

  return withDemoFallback(() => apiRequest<{ data: AiRecommendation }>("/ai/recommendations", {
    method: "POST",
    body: JSON.stringify(input),
  }), { data: demoRecommendation })
}

export async function getSites() {
  return withDemoFallback(() => apiRequest<{ data: Site[] }>("/sites"), { data: mockSites })
}

export async function getDevices() {
  return withDemoFallback(() => apiRequest<{ data: Device[] }>("/devices"), { data: mockDevices })
}

export async function getDevice(id: string) {
  const device = mockDevices.find((item) => item.id === id)
  const demoDevice: DeviceDetail = {
    ...(device ?? mockDevices[0]),
    events: [],
    alerts: [],
  }

  return withDemoFallback(() => apiRequest<{ data: DeviceDetail }>(`/devices/${id}`), { data: demoDevice })
}

export async function getAlerts() {
  return withDemoFallback(() => apiRequest<{ data: Alert[] }>("/alerts"), { data: mockAlerts })
}

export async function getIncidents() {
  return withDemoFallback(() => apiRequest<{ data: Incident[] }>("/incidents"), { data: mockIncidents })
}

export async function getCommands() {
  return withDemoFallback(() => apiRequest<{ data: unknown[] }>("/commands"), { data: [] })
}

export async function reviewCommand(commandId: string, input: CommandReviewInput) {
  return withDemoFallback(() => apiRequest<{ data: unknown }>(`/commands/${commandId}/approvals`, {
    method: "POST",
    body: JSON.stringify(input),
  }), { data: { id: commandId, status: input.decision } })
}
