# Action Approval Flow

## Problem

Agents should not mutate important data without user consent.

## Why It Matters

Approval gates create a clear safety boundary.

## UI Behavior

Show the action summary, risk level, affected record, and approve/reject controls.

## TypeScript Model

```ts
interface ApprovalRequest { riskLevel: "low" | "medium" | "high"; approved: boolean | null; }
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
