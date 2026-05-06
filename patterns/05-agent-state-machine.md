# Agent State Machine

## Problem

Complex AI UI needs explicit states.

## Why It Matters

State machines reduce ambiguous loading and failure behavior.

## UI Behavior

Model idle, thinking, retrieving_context, planning, awaiting_approval, executing_tool, completed, failed, and recovering.

## TypeScript Model

```ts
type AgentState = "idle" | "thinking" | "recovering" | "completed";
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
