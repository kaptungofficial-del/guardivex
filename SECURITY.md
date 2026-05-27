# Guardivex Security Policy

Guardivex is designed for physical security operations. Vulnerabilities may affect people, facilities, doors, alarm states, network ports, or incident response workflows.

## Safety Boundary

AI components must never directly control hardware. AI may only recommend actions or draft command requests. Physical or network-control commands must pass through authentication, tenant isolation, RBAC, rules evaluation, approval workflow, command execution service, and audit logging.

Phase 1 intentionally ships a safe-null command executor. It records approved execution attempts but does not send live unlock, lockdown, alarm, relay, or switch-port commands.

## Reporting Vulnerabilities

Do not disclose vulnerabilities publicly before coordinated remediation. Send reports to security@guardivex.com with:

- affected component and file path
- reproduction steps
- impact assessment
- whether physical control, tenant isolation, auth, RBAC, audit integrity, or secrets are affected

## Secret Handling

Never commit `.env`, production JWT secrets, database credentials, device credentials, hardware panel keys, Cloudflare tokens, GitHub tokens, or private certificates.

## Required Production Controls

- Postgres-backed users, roles, permissions, sessions, and audit logs
- hashed passwords with Argon2 or better
- short-lived access tokens and revocable refresh sessions
- tenant-scoped database queries
- validation on every API input
- immutable audit logs for security-sensitive actions
- human approval before any physical control command
- emergency/manual override procedures outside the AI path
