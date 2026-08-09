# Deterministic Pattern Playground

The Angular demo now includes a deterministic playground for the complete trustworthy AI frontend lifecycle:

`streaming → retrieval → citations → tool plan → approval → execution → grounded result → recovery`

No provider credentials or live tools are required. Every outcome comes from typed local fixtures so the same scenario can be reviewed, tested, captured, and discussed repeatedly.

## Scenarios

### Grounded flow

- serializes only visible UI context
- renders trusted fixture citations
- shows a typed tool proposal
- stops at an explicit human approval boundary
- executes only after approval
- keeps the final result linked to evidence and execution outcome

### No grounded evidence

- retrieval fails deterministically
- citations are suppressed instead of fabricated
- tool planning, approval, and execution are blocked
- the final answer explains that trusted evidence is missing

### Failed tool

- retrieval and citations succeed
- approval is still required
- the deterministic tool fails after approval
- the UI reports failure without claiming success
- recovery remains visible as a separate state

### Stalled stream

- the stream stalls after safe context serialization
- retry is offered as an explicit recovery action
- the exact same visible-context snapshot is retained
- the retried scenario continues into retrieval, citations, planning, and approval

## Keyboard behavior

All scenario selectors and runtime actions use native `button` elements. They are reachable with `Tab` / `Shift+Tab` and activate with `Enter` or `Space` using the browser's native button behavior.

The scenario selector exposes `aria-pressed` so assistive technology can identify the active deterministic fixture.

The runtime controls use a minimum 44px target height in the playground stylesheet.

## Screen-reader behavior

The runtime trace uses an ordered list so state order remains meaningful without visual styling.

A polite `aria-live` status region announces:

- scenario changes
- runtime-state progression
- pauses at the human approval boundary
- approval or rejection decisions
- stalled-stream retry
- failed tool recovery

Status text is always rendered as text; color is supplemental and not the only indicator.

## Backend boundary

The playground intentionally demonstrates frontend behavior only. A production backend remains authoritative for:

- model and retrieval credentials
- retrieval authorization
- server-side policy checks
- approval enforcement
- real tool execution
- idempotency and audit logging
- provider secrets and token exchange

A visible approval card in the browser is not an authorization mechanism by itself.

## Run locally

```bash
npm install
npm start
```

Then use the scenario selector and **Run to boundary** to reach the most important state in each fixture quickly.

## Validate

```bash
npm test
npm run build -- --configuration production
```

The Node test suite verifies grounding suppression, approval ordering, rejection behavior, failed-tool recovery, stalled-stream retry, context retention, and the explicit backend enforcement statement.
