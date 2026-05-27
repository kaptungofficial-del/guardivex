# Guardivex

Guardivex is an enterprise physical security operations platform foundation for monitoring sites, devices, doors, events, alerts, incidents, and controlled command workflows.

## Current Architecture

```text
apps/web                 Vite React TypeScript frontend for Cloudflare Pages
apps/api                 Node.js TypeScript Fastify API for Hetzner VPS
packages/shared          Zod schemas and shared TypeScript contracts
packages/database        Prisma schema/client for Postgres
packages/adapters        Read-only hardware adapter interfaces and vendor adapters
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

## Development

```bash
npm install
npm run db:generate
npm run dev:api
npm run dev:web
```

Copy `.env.example` to `.env` before running the API.

## Build

```bash
npm run build
```

## Deployment

- Frontend: Cloudflare Pages from `apps/web/dist`
- Backend: Dockerized Fastify API on Hetzner VPS
- Database: Postgres via Docker Compose or managed Postgres
- Queue/runtime cache: Redis via Docker Compose or managed Redis

See [docs/architecture/phase-1-platform-foundation.md](docs/architecture/phase-1-platform-foundation.md) for the Phase 1 migration and architecture plan.
See [docs/architecture/phase-2-operational-infrastructure.md](docs/architecture/phase-2-operational-infrastructure.md) for Phase 2 queues, adapters, policy engine, UI, and production risks.
