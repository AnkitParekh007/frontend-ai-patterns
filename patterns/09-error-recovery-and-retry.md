# Error Recovery And Retry

## Problem

Agent flows fail due to providers, tools, validation, or network issues.

## Why It Matters

Recovery UX helps users keep trust and continue safely.

## UX Behavior

Show failure cause, retry option, fallback plan, and recovered state.

## TypeScript Model

```ts
export interface RecoveryPlan { cause: string; retryable: boolean; nextStep: string; }
```

## Angular Implementation Idea

Use typed error events and show a RecoveryPanelComponent when state moves to failed or recovering.

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
