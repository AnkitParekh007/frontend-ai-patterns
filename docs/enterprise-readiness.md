# Enterprise Readiness

## Frontend security boundaries

- keep provider credentials, policy engines, and orchestration decisions off the browser
- treat backend policy decisions as authoritative, but render them visibly in the UI
- serialize only the context required for the current interaction
- make tenant, role, and record scope visible where operator risk is high

## Approval and audit expectations

- risky actions should surface an approval state, not a silent disabled button or hidden failure
- approval requests need explicit action summary, risk level, and reason
- audit-relevant state changes should appear in UI timelines or session history
- operator-visible surfaces should distinguish `blocked by policy` from `failed technically`

## Accessibility expectations

- streamed state transitions should be announced in a polite live region
- approvals, retries, and tool details must be keyboard reachable
- blocked or warning states cannot rely on color alone
- citations should remain readable and inspectable in assistive technology

## Observability expectations

- log frontend-visible states, not only backend calls
- measure retries, approval abandonments, citation opens, and tool-detail expands
- correlate user-visible failures with transport or orchestration identifiers when possible

## Rollout checklist for AI UI features

1. define the contract for visible states
2. define failure and recovery behavior
3. define which actions require human approval
4. define what evidence or citation UI is needed
5. validate accessibility before polishing motion or styling
6. validate enterprise boundaries before broader rollout

## What this repo does not solve

- backend orchestration architecture
- provider selection or evaluation
- legal or policy governance decisions
- production hosting, auth, or secret storage setup

This repo is intentionally about **frontend trust surfaces** and **developer-ready starting assets**.
