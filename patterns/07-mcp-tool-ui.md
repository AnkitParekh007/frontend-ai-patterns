# MCP Tool UI

## Problem

MCP-style tools need frontend affordances.

## Why It Matters

Users should understand available tools and action boundaries.

## UI Behavior

Display tool name, input summary, permission need, and result state.

## TypeScript Model

```ts
interface McpToolView { name: string; requiresApproval: boolean; }
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
