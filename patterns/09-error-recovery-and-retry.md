# Error Recovery And Retry

## Problem

Agent flows fail due to model, tool, network, or validation issues.

## Why It Matters

Recovery UX helps users trust and continue the workflow.

## UI Behavior

Show failure cause, retry action, fallback plan, and recovered state.

## TypeScript Model

```ts
interface RecoveryPlan { cause: string; retryable: boolean; nextStep: string; }
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
