# RAG Source Cards

## Problem

Users need to inspect why an AI answer is grounded.

## Why It Matters

Visible citations improve trust and make review easier.

## UI Behavior

Show title, snippet, confidence, and source type beside the answer.

## TypeScript Model

```ts
interface RagSource { title: string; snippet: string; confidence: number; }
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
