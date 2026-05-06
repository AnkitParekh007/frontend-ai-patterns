# Context Serializer

## Problem

AI features need page context without leaking private data.

## Why It Matters

Serialization creates a controlled contract between UI and backend.

## UI Behavior

Send route, selected record id, role, and safe metadata only.

## TypeScript Model

```ts
interface UiContext { route: string; selectedRecordId?: string; role?: string; }
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
