import type { Alert, Device, Incident, Site } from "@/lib/types"

const API_URL = (import.meta.env.VITE_API_URL ?? "http://127.0.0.1:4000").replace(/\/$/, "")
const ACCESS_TOKEN_KEY = "guardivex.accessToken"
const REFRESH_TOKEN_KEY = "guardivex.refreshToken"
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
  const result = await apiRequest<{ accessToken: string; refreshToken?: string; user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
  setTokens(result.accessToken, result.refreshToken)
  return result.user
}

export async function validateSession(): Promise<AuthUser | null> {
  if (!getAccessToken()) return null
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
    await apiRequest<{ ok: boolean }>("/auth/logout", { method: "POST" })
  } finally {
    clearTokens()
  }
}

export async function getAuditLogs() {
  return apiRequest<{ data: unknown[] }>("/audit")
}

export async function getDeniedActions() {
  return apiRequest<{ data: unknown[] }>("/operations/denied-actions")
}

export async function getSessionHistory() {
  return apiRequest<{ data: unknown[] }>("/operations/session-history")
}

export async function getTenantActivity() {
  return apiRequest<{ data: unknown[] }>("/operations/tenant-activity")
}

export async function getDeviceHealth() {
  return apiRequest<{ data: { devices: unknown[]; heartbeats: unknown[] } }>("/operations/device-health")
}

export async function getEventTimeline() {
  return apiRequest<{ data: unknown[] }>("/operations/event-timeline")
}

export async function getIncidentCorrelation() {
  return apiRequest<{ data: unknown[] }>("/operations/incident-correlation")
}

export async function getAiRecommendations() {
  return apiRequest<{ data: AiRecommendation[] }>("/ai/recommendations")
}

export async function createAiRecommendation(input: CreateAiRecommendationInput) {
  return apiRequest<{ data: AiRecommendation }>("/ai/recommendations", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export async function getSites() {
  return apiRequest<{ data: Site[] }>("/sites")
}

export async function getDevices() {
  return apiRequest<{ data: Device[] }>("/devices")
}

export async function getDevice(id: string) {
  return apiRequest<{ data: DeviceDetail }>(`/devices/${id}`)
}

export async function getAlerts() {
  return apiRequest<{ data: Alert[] }>("/alerts")
}

export async function getIncidents() {
  return apiRequest<{ data: Incident[] }>("/incidents")
}

export async function getCommands() {
  return apiRequest<{ data: unknown[] }>("/commands")
}

export async function reviewCommand(commandId: string, input: CommandReviewInput) {
  return apiRequest<{ data: unknown }>(`/commands/${commandId}/approvals`, {
    method: "POST",
    body: JSON.stringify(input),
  })
}
