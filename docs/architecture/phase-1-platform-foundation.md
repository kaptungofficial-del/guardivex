# Guardivex Phase 1 Platform Foundation

## Target Structure

```text
apps/web                 Vite React TypeScript frontend deployed to Cloudflare Pages
apps/api                 Fastify TypeScript backend for Hetzner VPS
packages/shared          Zod schemas and shared TypeScript contracts
packages/database        Prisma schema/client for Postgres
workers/api              Legacy Cloudflare Worker stub; do not use for hardware control
```

## API Architecture

The backend is the only authority for authentication, tenant isolation, RBAC, audit logging, and command workflows.

Routes created in Phase 1:

- `GET /health`
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /auth/me`
- `POST /auth/logout`
- `GET /users`
- `GET|POST /sites`
- `GET|POST /devices`
- `GET|POST /events`
- `GET /alerts`
- `GET|POST /incidents`
- `GET|POST /commands`
- `POST /commands/:id/approvals`
- `POST /commands/:id/execute`
- `GET /audit`

## Physical Safety Boundary

AI must never directly execute hardware actions. AI output may create recommendations or draft command requests only.

Every command must pass through:

1. Authentication
2. Tenant isolation
3. RBAC
4. Rules engine
5. Approval workflow
6. Audit log
7. Command execution service

Phase 1 intentionally uses a safe-null executor. Approved commands are recorded, but no live Mercury, Cisco, alarm, relay, or door action is sent.

## Migration Steps

1. Copy `.env.example` to `.env` and replace secrets.
2. Start Postgres with `docker compose up postgres`.
3. Run `npm install`.
4. Run `npm run db:generate`.
5. Run `npm run db:migrate`.
6. Seed the first tenant/user/role before logging into the app.
7. Run API with `npm run dev:api`.
8. Run web with `npm run dev:web`.
9. Set Cloudflare Pages `VITE_API_URL` to the Hetzner API URL.

## Priority Refactor Plan

Critical:

- Add seed script for first tenant, owner role, permissions, and admin user.
- Add HttpOnly refresh-token cookies for production web auth.
- Replace remaining placeholder license/system-health panels with backend routes.
- Add tests for RBAC, tenant isolation, and command approval denial paths.

Important:

- Add command request UI.
- Add audit log UI.
- Add API pagination/filtering standards.
- Add staging/prod Docker Compose overlays.

Later:

- Mercury/Cisco/alarm read-only adapters.
- AI recommendation service.
- WebAuthn and SSO provider integrations.
- Hardware execution adapters after safety review.
