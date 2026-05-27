# Guardivex

Guardivex is an enterprise physical security operations platform foundation for monitoring sites, devices, doors, events, alerts, incidents, and controlled command workflows.

## Current Architecture

```text
apps/web                 Vite React TypeScript frontend for Cloudflare Pages
apps/api                 Node.js TypeScript Fastify API for Hetzner VPS
packages/shared          Zod schemas and shared TypeScript contracts
packages/database        Prisma schema/client for Postgres
packages/adapters        Read-only adapter interfaces, named safe adapter contracts, and mock adapters
packages/policy          Deterministic IF/THEN policy engine
packages/queues          Redis/BullMQ queue topology and worker helpers
workers/api              Legacy Cloudflare Worker API stub
```

## Safety Model

AI must never directly unlock doors, disable switch ports, bypass alarms, or control physical hardware. AI may only recommend actions or draft command requests.

All physical commands must pass through:

1. RBAC
2. Rules engine
3. Approval workflow
4. Audit logging
5. Command execution service

Phase 1 uses a safe-null command executor. Phase 2 adds read-only hardware adapters, normalized events, Redis/BullMQ infrastructure, deterministic policy evaluation, audit hash chaining, advisory AI recommendations, and operational review UI. It still does not send live hardware commands.

The repo is now deeply Node-based, so backend work continues in Fastify, Prisma, and TypeScript rather than adding a parallel Python/FastAPI service.

## Platform Surface

The backend includes tenant-scoped API routes and database models for:

- Tenants, users, roles, permissions, sessions, and login attempts
- Sites, buildings, doors, device type catalog entries, devices, events, alerts, and incidents
- Integrations, API keys, adapter heartbeats, and normalized vendor data
- Audit logs with hash chaining
- Command requests, command approvals, policy evaluations, and command executions
- Advisory AI recommendations that cannot directly control hardware

The frontend consumes the API through `apps/web/src/lib/api.ts` and includes authenticated platform pages for dashboard, sites, devices, device detail, alerts, incidents, audit review, command approval review, device health, event timelines, incident correlation, integrations, users, settings, and the AI Assistant.

## Development

```bash
npm install
npm run db:generate
npm run dev:api
npm run dev:web
```

For local Postgres and Redis, start Docker Desktop first, then run:

```bash
docker compose up -d postgres redis
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev:api
npm run dev:web
```

Copy `.env.example` to `.env` before running the API. The default local web API URL is `http://127.0.0.1:4000` unless `VITE_API_URL` is set.

## Build

```bash
npm run build
```

## Deployment

- Frontend: Cloudflare Pages from `apps/web/dist`
- Backend: Dockerized Fastify API on Hetzner VPS
- Database: Postgres via Docker Compose or managed Postgres
- Queue/runtime cache: Redis via Docker Compose or managed Redis
- Required Cloudflare Pages secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `VITE_API_URL`

See [docs/architecture/phase-1-platform-foundation.md](docs/architecture/phase-1-platform-foundation.md) for the Phase 1 migration and architecture plan.
See [docs/architecture/phase-2-operational-infrastructure.md](docs/architecture/phase-2-operational-infrastructure.md) for Phase 2 queues, adapters, policy engine, UI, and production risks.
