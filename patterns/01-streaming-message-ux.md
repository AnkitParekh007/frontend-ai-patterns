# Streaming Message UX

## Problem

Model responses can take time and users need progress visibility.

## Why It Matters

Streaming makes the interface feel responsive and gives users evidence that the system is working.

## UX Behavior

Render partial assistant content, show a status pill, support retry/cancel, and mark completion explicitly.

## TypeScript Model

```ts
export interface StreamChunk { text: string; sequence: number; done: boolean; }
```

## Angular Implementation Idea

Use an Angular service that exposes an Observable<StreamChunk> and a standalone message component that appends chunks to a buffer.

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
