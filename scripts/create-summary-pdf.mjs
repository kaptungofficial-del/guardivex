import fs from "node:fs"
import path from "node:path"

const output = path.resolve("docs/architecture/guardivex-phase-1-summary.pdf")
const lines = [
  "Guardivex Phase 1 Architecture Summary",
  "",
  "Safety rule: AI must never directly control doors, panels, alarms, relays, or switch ports.",
  "AI may only recommend actions or draft command requests. Commands must pass RBAC, rules",
  "evaluation, approval workflow, audit logging, and the command execution service.",
  "",
  "Implemented structure:",
  "- apps/web: Vite React TypeScript frontend for Cloudflare Pages.",
  "- apps/api: Fastify TypeScript API for Hetzner VPS.",
  "- packages/shared: Zod schemas and shared security contracts.",
  "- packages/database: Prisma schema/client for Postgres.",
  "",
  "Backend foundation:",
  "- Fastify with Helmet, CORS, rate limiting, JWT auth, Zod validation, and central errors.",
  "- Argon2 password verification and opaque refresh session storage.",
  "- RBAC middleware rehydrates permissions from Postgres after JWT verification.",
  "- Tenant-scoped users, sites, devices, events, alerts, incidents, commands, and audit routes.",
  "",
  "Database foundation:",
  "- Postgres + Prisma for tenants, users, roles, permissions, sessions, sites, doors, devices,",
  "  events, alerts, incidents, audit logs, command requests, approvals, and executions.",
  "- Seed script creates the first tenant, owner role, full permissions, and hashed admin password.",
  "",
  "Command safety:",
  "- Command requests are policy-reviewed and require approval.",
  "- Approvals are recorded separately from requests.",
  "- Phase 1 uses a safe-null executor and does not send live hardware commands.",
  "",
  "Infrastructure:",
  "- docker-compose.yml for Postgres and API.",
  "- Dockerfiles for API and optional web image.",
  "- .env.example for local/staging/production environment structure.",
  "- GitHub Actions CI plus Cloudflare Pages/API image workflows.",
  "",
  "Validation:",
  "- npm install completed.",
  "- npm run build completed for shared, database, API, and web.",
  "- Frontend runs from apps/web at http://127.0.0.1:5000/.",
  "",
  "Next critical steps:",
  "- Run migrations and seed the first tenant/admin.",
  "- Move refresh tokens to HttpOnly secure cookies before production.",
  "- Add tests for auth, tenant isolation, RBAC denial, audit creation, and command approvals.",
  "- Build command request and audit log UI screens.",
  "- Add read-only hardware adapters before any live control adapters.",
]

function escapePdf(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
}

const pages = []
for (let index = 0; index < lines.length; index += 38) {
  pages.push(lines.slice(index, index + 38))
}

const objects = []
function addObject(body) {
  objects.push(body)
  return objects.length
}

const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
const pageIds = []

for (const pageLines of pages) {
  const text = pageLines.map((line, index) => {
    const y = 760 - index * 18
    const size = index === 0 && pageIds.length === 0 ? 18 : 10
    return `BT /F1 ${size} Tf 50 ${y} Td (${escapePdf(line)}) Tj ET`
  }).join("\n")
  const contentId = addObject(`<< /Length ${Buffer.byteLength(text)} >>\nstream\n${text}\nendstream`)
  const pageId = addObject(`<< /Type /Page /Parent 0 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`)
  pageIds.push(pageId)
}

const pagesBody = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`
const pagesId = addObject(pagesBody)
for (const pageId of pageIds) {
  objects[pageId - 1] = objects[pageId - 1].replace("/Parent 0 0 R", `/Parent ${pagesId} 0 R`)
}
const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`)

let pdf = "%PDF-1.4\n"
const offsets = [0]
objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf))
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
})
const xrefOffset = Buffer.byteLength(pdf)
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (let index = 1; index < offsets.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

fs.mkdirSync(path.dirname(output), { recursive: true })
fs.writeFileSync(output, pdf, "binary")
console.log(output)
