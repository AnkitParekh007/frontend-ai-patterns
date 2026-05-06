# Human In The Loop

## Problem

Enterprise workflows often require human judgment.

## Why It Matters

The UI should make checkpoints explicit and auditable.

## UI Behavior

Pause execution at review points and capture approval decision metadata.

## TypeScript Model

```ts
interface HumanCheckpoint { reason: string; decidedBy?: string; }
```

## Angular Implementation Idea

Use standalone components for rendering and Angular services for state orchestration. Keep provider and tool execution behind backend APIs.

## Enterprise Concerns

Avoid secrets in the frontend, scope by tenant and role, and log sensitive tool actions.

## Example Code Snippet

```ts
const state$ = service.events$.pipe(scan((state, event) => reduceAgentState(state, event), initialState));
```

## Interview Talking Points

- Explain the user risk this pattern reduces.
- Explain the Angular services/components involved.
- Explain how the backend boundary keeps the implementation safe.
