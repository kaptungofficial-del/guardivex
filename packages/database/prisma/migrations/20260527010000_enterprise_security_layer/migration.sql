CREATE TYPE "PolicyEffect" AS ENUM ('allow', 'deny', 'approval_required');
CREATE TYPE "TimelineEventType" AS ENUM ('event', 'alert', 'incident', 'command', 'note', 'system');

ALTER TABLE "Site" ADD COLUMN "createdById" UUID, ADD COLUMN "updatedById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "Building" ADD COLUMN "createdById" UUID, ADD COLUMN "updatedById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "Door" ADD COLUMN "createdById" UUID, ADD COLUMN "updatedById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "Device" ADD COLUMN "createdById" UUID, ADD COLUMN "updatedById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "Integration" ADD COLUMN "createdById" UUID, ADD COLUMN "updatedById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "ApiKey" ADD COLUMN "createdById" UUID, ADD COLUMN "updatedById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "Event" ADD COLUMN "createdById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "Alert" ADD COLUMN "createdById" UUID, ADD COLUMN "updatedById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "Incident" ADD COLUMN "createdById" UUID, ADD COLUMN "updatedById" UUID, ADD COLUMN "deletedAt" TIMESTAMP(3);

CREATE TABLE "RefreshToken" (
  "id" UUID NOT NULL,
  "tenantId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "sessionId" UUID,
  "tokenHash" TEXT NOT NULL,
  "familyId" UUID NOT NULL,
  "replacedById" UUID,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Policy" (
  "id" UUID NOT NULL,
  "tenantId" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "action" TEXT,
  "effect" "PolicyEffect" NOT NULL DEFAULT 'approval_required',
  "conditions" JSONB NOT NULL DEFAULT '{}',
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "priority" INTEGER NOT NULL DEFAULT 100,
  "createdById" UUID,
  "updatedById" UUID,
  "deletedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ApprovalPolicy" (
  "id" UUID NOT NULL,
  "tenantId" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "minRiskScore" INTEGER NOT NULL DEFAULT 35,
  "requiredApprovals" INTEGER NOT NULL DEFAULT 1,
  "requireSecondReviewer" BOOLEAN NOT NULL DEFAULT false,
  "appliesToActions" JSONB NOT NULL DEFAULT '[]',
  "createdById" UUID,
  "updatedById" UUID,
  "deletedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ApprovalPolicy_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Investigation" (
  "id" UUID NOT NULL,
  "tenantId" UUID NOT NULL,
  "incidentId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT,
  "status" "IncidentStatus" NOT NULL DEFAULT 'investigating',
  "leadUserId" UUID,
  "createdById" UUID,
  "updatedById" UUID,
  "deletedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Investigation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TimelineEvent" (
  "id" UUID NOT NULL,
  "tenantId" UUID NOT NULL,
  "incidentId" UUID,
  "investigationId" UUID,
  "type" "TimelineEventType" NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "payload" JSONB NOT NULL DEFAULT '{}',
  "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdById" UUID,
  "deletedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "TimelineEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DeviceHeartbeat" (
  "id" UUID NOT NULL,
  "tenantId" UUID NOT NULL,
  "deviceId" UUID NOT NULL,
  "status" "DeviceStatus" NOT NULL,
  "telemetry" JSONB NOT NULL DEFAULT '{}',
  "checkedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DeviceHeartbeat_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");
CREATE INDEX "RefreshToken_tenantId_userId_idx" ON "RefreshToken"("tenantId", "userId");
CREATE INDEX "RefreshToken_tenantId_revokedAt_idx" ON "RefreshToken"("tenantId", "revokedAt");
CREATE INDEX "Policy_tenantId_enabled_idx" ON "Policy"("tenantId", "enabled");
CREATE INDEX "Policy_tenantId_action_idx" ON "Policy"("tenantId", "action");
CREATE INDEX "ApprovalPolicy_tenantId_minRiskScore_idx" ON "ApprovalPolicy"("tenantId", "minRiskScore");
CREATE INDEX "Investigation_tenantId_incidentId_idx" ON "Investigation"("tenantId", "incidentId");
CREATE INDEX "Investigation_tenantId_status_idx" ON "Investigation"("tenantId", "status");
CREATE INDEX "TimelineEvent_tenantId_occurredAt_idx" ON "TimelineEvent"("tenantId", "occurredAt");
CREATE INDEX "TimelineEvent_tenantId_incidentId_idx" ON "TimelineEvent"("tenantId", "incidentId");
CREATE INDEX "DeviceHeartbeat_tenantId_deviceId_checkedAt_idx" ON "DeviceHeartbeat"("tenantId", "deviceId", "checkedAt");
CREATE INDEX "DeviceHeartbeat_tenantId_status_idx" ON "DeviceHeartbeat"("tenantId", "status");

ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ApprovalPolicy" ADD CONSTRAINT "ApprovalPolicy_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Investigation" ADD CONSTRAINT "Investigation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Investigation" ADD CONSTRAINT "Investigation_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TimelineEvent" ADD CONSTRAINT "TimelineEvent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TimelineEvent" ADD CONSTRAINT "TimelineEvent_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TimelineEvent" ADD CONSTRAINT "TimelineEvent_investigationId_fkey" FOREIGN KEY ("investigationId") REFERENCES "Investigation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DeviceHeartbeat" ADD CONSTRAINT "DeviceHeartbeat_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DeviceHeartbeat" ADD CONSTRAINT "DeviceHeartbeat_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
