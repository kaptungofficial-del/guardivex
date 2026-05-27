import argon2 from "argon2"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const permissions = [
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
]

async function main() {
  const tenantName = process.env.SEED_TENANT_NAME ?? "Guardivex Demo Tenant"
  const tenantSlug = process.env.SEED_TENANT_SLUG ?? "guardivex-demo"
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? "admin@guardivex.local").toLowerCase()
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!"

  const tenant = await prisma.tenant.upsert({
    where: { slug: tenantSlug },
    update: { name: tenantName },
    create: { name: tenantName, slug: tenantSlug },
  })

  const ownerRole = await prisma.role.upsert({
    where: { tenantId_name: { tenantId: tenant.id, name: "owner" } },
    update: {},
    create: { tenantId: tenant.id, name: "owner", description: "Full tenant administrator" },
  })

  for (const key of permissions) {
    const permission = await prisma.permission.upsert({
      where: { tenantId_key: { tenantId: tenant.id, key } },
      update: {},
      create: { tenantId: tenant.id, key, description: key },
    })

    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: ownerRole.id, permissionId: permission.id } },
      update: {},
      create: { roleId: ownerRole.id, permissionId: permission.id },
    })
  }

  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: adminEmail } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: adminEmail,
      name: "Guardivex Owner",
      passwordHash: await argon2.hash(adminPassword),
      status: "active",
    },
  })

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: ownerRole.id } },
    update: {},
    create: { userId: admin.id, roleId: ownerRole.id },
  })

  console.log(`Seeded tenant ${tenant.slug} with owner ${admin.email}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
