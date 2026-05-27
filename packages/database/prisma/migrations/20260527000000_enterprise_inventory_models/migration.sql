-- Enterprise inventory, integrations, and API key models

-- AlterTable
ALTER TABLE "Door" ADD COLUMN "buildingId" UUID;

-- AlterTable
ALTER TABLE "Device" ADD COLUMN "buildingId" UUID;
ALTER TABLE "Device" ADD COLUMN "deviceTypeCatalogId" UUID;

-- CreateTable
CREATE TABLE "Building" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "siteId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "address" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceTypeCatalog" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "key" "DeviceType" NOT NULL,
    "label" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceTypeCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integration" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "DeviceStatus" NOT NULL DEFAULT 'unknown',
    "config" JSONB NOT NULL DEFAULT '{}',
    "lastSyncAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "scopes" JSONB NOT NULL DEFAULT '[]',
    "lastUsedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Building_tenantId_siteId_idx" ON "Building"("tenantId", "siteId");

-- CreateIndex
CREATE UNIQUE INDEX "Building_tenantId_siteId_name_key" ON "Building"("tenantId", "siteId", "name");

-- CreateIndex
CREATE INDEX "DeviceTypeCatalog_tenantId_category_idx" ON "DeviceTypeCatalog"("tenantId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceTypeCatalog_tenantId_key_key" ON "DeviceTypeCatalog"("tenantId", "key");

-- CreateIndex
CREATE INDEX "Device_tenantId_buildingId_idx" ON "Device"("tenantId", "buildingId");

-- CreateIndex
CREATE INDEX "Integration_tenantId_vendor_idx" ON "Integration"("tenantId", "vendor");

-- CreateIndex
CREATE INDEX "Integration_tenantId_status_idx" ON "Integration"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_tenantId_keyPrefix_key" ON "ApiKey"("tenantId", "keyPrefix");

-- CreateIndex
CREATE INDEX "ApiKey_tenantId_revokedAt_idx" ON "ApiKey"("tenantId", "revokedAt");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceTypeCatalog" ADD CONSTRAINT "DeviceTypeCatalog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Door" ADD CONSTRAINT "Door_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_deviceTypeCatalogId_fkey" FOREIGN KEY ("deviceTypeCatalogId") REFERENCES "DeviceTypeCatalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
