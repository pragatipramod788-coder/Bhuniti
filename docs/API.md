# BhuNiti API

## `GET /api/health`
Returns `{ ok, service, time }` for deployment checks.

## `POST /api/ai`
Body: `{ "kind": "copilot" | "recommendations" | "search", "question": string }`. The server retrieves the top repository records using title/abstract/tag relevance scoring, then calls `MANUS_API_URL/v1/chat/completions` when available. Response contains `answer`, `mode` (`llm` or `deterministic-fallback`) and citation record IDs.

## Security model

Production adapters should enforce JWT authentication and RBAC at the route boundary. The demo makes the six roles visible in the shell and documents the permissions matrix in `/permissions`. Rate-limit status, consent and audit entries are represented as typed domain records.
