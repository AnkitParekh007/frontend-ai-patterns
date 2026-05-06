# Human In The Loop

## Problem

Enterprise workflows often require judgment before action.

## Why It Matters

Human checkpoints reduce risk and create accountability.

## UX Behavior

Pause at checkpoints, show why approval is needed, and capture decision metadata.

## TypeScript Model

```ts
export interface HumanCheckpoint { id: string; reason: string; decidedBy?: string; decision?: "approved" | "rejected"; }
```

## Angular Implementation Idea

Use route-level or modal approval components that block execution until a decision exists.

## Code Snippet

```ts
const events$ = service.events$;
const state$ = events$.pipe(scan((state, event) => reduceAgentState(state, event), initialState));
```

## Enterprise Concerns

- Keep provider secrets on the backend.
- Scope data by role and tenant.
- Log sensitive tool actions and approvals.
- Avoid sending hidden or private UI fields to the model.

## Accessibility Considerations

- Announce streaming and status changes with polite live regions.
- Do not rely on color alone for status.
- Keep approval controls keyboard accessible.
- Use readable labels for source cards and tool states.

## Testing Notes

- Unit test state transitions.
- Test empty, loading, failed, retry, and completed states.
- Verify sensitive actions require approval.
- Add screenshot tests after UI is stable.

## Interview Talking Points

- Explain the user risk this pattern reduces.
- Explain the Angular services/components involved.
- Explain how the backend boundary keeps implementation safe.
- Explain how the pattern improves trust in AI output.
