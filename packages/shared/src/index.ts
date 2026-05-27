import { z } from "zod"

export const idSchema = z.string().uuid()
export const tenantIdSchema = idSchema

export const roleNameSchema = z.enum(["owner", "admin", "supervisor", "operator", "viewer", "auditor", "service"])

export const permissionSchema = z.enum([
  "users:read",
  "users:write",
  "roles:read",
  "roles:write",
  "sites:read",
  "sites:write",
  "devices:read",
  "devices:write",
  "events:read",
  "events:write",
  "alerts:read",
  "alerts:write",
  "incidents:read",
  "incidents:write",
  "commands:request",
  "commands:approve",
  "commands:execute",
  "audit:read",
  "sessions:read",
  "policies:read",
  "ai:read",
])

export const deviceTypeSchema = z.enum([
  "camera",
  "nvr",
  "access_control_panel",
  "door_contact",
  "alarm_panel",
  "network_switch",
  "sensor",
  "server",
])

export const deviceStatusSchema = z.enum(["online", "offline", "degraded", "maintenance", "unknown"])
export const eventSeveritySchema = z.enum(["info", "low", "medium", "high", "critical"])
export const alertStatusSchema = z.enum(["open", "acknowledged", "suppressed", "resolved"])
export const incidentStatusSchema = z.enum(["open", "investigating", "contained", "resolved", "closed"])

export const commandActionSchema = z.enum([
  "door.unlock.momentary",
  "door.lockdown",
  "alarm.arm",
  "alarm.disarm",
  "switch.port.disable",
  "switch.port.enable",
  "device.sync",
  "device.test_connection",
])

export const commandStatusSchema = z.enum([
  "requested",
  "policy_review",
  "approval_required",
  "approved",
  "rejected",
  "expired",
  "queued",
  "executing",
  "succeeded",
  "failed",
  "cancelled",
])

export const auditActionSchema = z.enum([
  "auth.login",
  "auth.logout",
  "auth.refresh",
  "user.create",
  "user.update",
  "device.create",
  "device.update",
  "event.ingest",
  "alert.acknowledge",
  "incident.update",
  "command.request",
  "command.approve",
  "command.reject",
  "command.execute",
  "command.fail",
  "ai.recommendation.create",
])

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(20),
})

export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number().int().positive(),
})

export const userSummarySchema = z.object({
  id: idSchema,
  tenantId: tenantIdSchema,
  email: z.string().email(),
  name: z.string(),
  roles: z.array(roleNameSchema),
  permissions: z.array(permissionSchema),
})

export const siteSchema = z.object({
  id: idSchema,
  tenantId: tenantIdSchema,
  name: z.string().min(1),
  address: z.string().nullable(),
  status: z.enum(["operational", "warning", "critical", "maintenance"]),
})

export const deviceSchema = z.object({
  id: idSchema,
  tenantId: tenantIdSchema,
  siteId: idSchema.nullable(),
  name: z.string().min(1),
  type: deviceTypeSchema,
  vendor: z.string().nullable(),
  model: z.string().nullable(),
  ipAddress: z.string().nullable(),
  status: deviceStatusSchema,
})

export const commandRequestCreateSchema = z.object({
  targetDeviceId: idSchema.optional(),
  targetDoorId: idSchema.optional(),
  action: commandActionSchema,
  reason: z.string().min(12).max(1000),
  requestedFor: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).default({}),
}).refine((value) => value.targetDeviceId || value.targetDoorId, {
  message: "A command must target a device or door",
})

export const commandApprovalSchema = z.object({
  commandRequestId: idSchema,
  decision: z.enum(["approved", "rejected"]),
  comment: z.string().min(4).max(1000),
})

export type RoleName = z.infer<typeof roleNameSchema>
export type Permission = z.infer<typeof permissionSchema>
export type DeviceType = z.infer<typeof deviceTypeSchema>
export type DeviceStatus = z.infer<typeof deviceStatusSchema>
export type EventSeverity = z.infer<typeof eventSeveritySchema>
export type AlertStatus = z.infer<typeof alertStatusSchema>
export type IncidentStatus = z.infer<typeof incidentStatusSchema>
export type CommandAction = z.infer<typeof commandActionSchema>
export type CommandStatus = z.infer<typeof commandStatusSchema>
export type AuditAction = z.infer<typeof auditActionSchema>
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type AuthTokens = z.infer<typeof authTokensSchema>
export type UserSummary = z.infer<typeof userSummarySchema>
export type CommandRequestCreate = z.infer<typeof commandRequestCreateSchema>

export * from "./events/index.js"
export * from "./events/transformers.js"
export * from "./events/vendors.js"
