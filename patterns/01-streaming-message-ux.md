# Streaming Message UX

## Problem

Users need progress visibility while model output arrives token by token.

## Why It Matters

Streaming reduces perceived latency and gives the interface space to show state transitions.

## UI Behavior

Render assistant content incrementally with pause, retry, and completed states.

## TypeScript Model

```ts
interface StreamChunk { text: string; done: boolean; }
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
