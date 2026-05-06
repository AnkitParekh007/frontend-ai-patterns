# Tool-Call Timeline

## Problem

Tool execution is risky when users cannot see what happened.

## Why It Matters

A timeline makes planning, execution, failure, and recovery reviewable.

## UX Behavior

Show queued, running, awaiting approval, succeeded, failed, skipped, and retried states.

## TypeScript Model

```ts
export type ToolStatus = "queued" | "running" | "awaiting_approval" | "succeeded" | "failed";
```

## Angular Implementation Idea

Represent tool calls as immutable events and render them through a timeline component.

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
