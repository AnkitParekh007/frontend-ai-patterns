# Tool-Call Timeline

## Problem

Tool execution can feel invisible or risky.

## Why It Matters

A timeline shows what the agent planned, ran, skipped, or failed.

## UI Behavior

Render queued, running, awaiting approval, succeeded, failed, and skipped states.

## TypeScript Model

```ts
type ToolStatus = "queued" | "running" | "succeeded" | "failed";
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
