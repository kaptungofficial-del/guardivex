# Guardivex Phase 2 Operational Infrastructure

## Safety Boundary

AI remains advisory only. It can analyze, correlate, summarize, recommend, and draft command requests. It cannot execute hardware commands, bypass RBAC, bypass deterministic policies, bypass approvals, or override audit logging.

## Architecture

- `packages/shared/src/events`: normalized event contracts, vendor raw-event contracts, transformer utilities, and Mercury/Cisco/IQ4/2GIG normalization.
- `packages/adapters`: read-only hardware adapter abstraction and vendor adapters.
- `packages/policy`: deterministic IF/THEN policy engine for approval, MFA, notification, duplicate suppression, escalation, and denial actions.
- `packages/queues`: BullMQ/Redis queue topology, retry policy, dead-letter queues, and structured worker logging.
- `apps/api/src/routes/events.ts`: authenticated event ingestion through read-only adapters and normalized persistence.
- `apps/api/src/routes/operations.ts`: audit-first operational views for denied actions, sessions, tenant activity, device health, event timeline, incident correlation, and policy evaluations.
- `apps/api/src/routes/ai.ts`: advisory-only AI recommendation records and draft command suggestions.
- `apps/api/src/workers/phase2-workers.ts`: worker processors for event ingestion, processing, audit writes, notifications, AI analysis, and command review.

## Queue Topology

| Queue | Purpose | DLQ |
| --- | --- | --- |
| `event-ingestion` | Vendor raw events entering adapter normalization | `event-ingestion:dead-letter` |
| `event-processing` | Normalized event persistence/correlation | `event-processing:dead-letter` |
| `audit-writes` | Async audit write expansion | `audit-writes:dead-letter` |
| `notifications` | Operator notification fanout | `notifications:dead-letter` |
| `AI-analysis` | Advisory summaries/correlation/anomaly jobs | `AI-analysis:dead-letter` |
| `command-review` | Command request review workflow jobs | `command-review:dead-letter` |

All queues default to five attempts with exponential backoff and retain failed jobs for inspection.

## Adapter Interface

Adapters can only expose these capabilities:

- `ingest_events`
- `monitor_status`
- `sync_inventory`
- `collect_telemetry`
- `validate_connectivity`

Forbidden capabilities include unlocking doors, arming/disarming alarms, disabling ports, enabling ports, or executing hardware commands.

## Event Contract

`NormalizedEvent` includes:

- `tenantId`
- `siteId`
- `sourceVendor`
- `sourceDevice`
- `deviceId`
- `type`
- `severity`
- `timestamp`
- `rawPayload`
- `normalizedPayload`
- `correlationId`

## Policy Engine

Policies are deterministic. Conditions match fields such as command action, target type, requester permission, risk score, event severity, and environment. Actions can require approval, require MFA, notify operators, escalate severity, suppress duplicates, or deny.

## Operational UI

The platform shell now includes pages for:

- Audit Logs
- Command Approvals
- Denied Actions
- Session History
- Tenant Activity
- Device Health
- Event Timeline
- Incident Correlation
- AI Recommendations

## Deployment Updates

- Redis added to Docker Compose.
- Dev/staging/production env examples split under `config/environments`.
- API env validation now includes `APP_ENV`, `REDIS_URL`, cookie/CSRF settings, and OpenTelemetry service name.

## Remaining Production Risks

- Run real Postgres migrations and seed data in each environment.
- Replace placeholder secrets with managed secrets from the deployment environment.
- Add production-grade notification providers and SIEM export.
- Add real read-only vendor protocol clients after credentials and network paths are approved.
- Expand policy authoring UI and admin review controls.
- Add persisted queue dashboards and alerting for DLQs.
