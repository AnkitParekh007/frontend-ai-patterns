# Agent State Machine

## Problem

AI UI becomes confusing when loading and execution states are implicit.

## Why It Matters

Explicit states make the interface testable and easier to reason about.

## UX Behavior

Model idle, thinking, retrieving_context, planning, awaiting_approval, executing_tool, completed, failed, and recovering.

## TypeScript Model

```ts
export type AgentState = "idle" | "thinking" | "retrieving_context" | "planning" | "awaiting_approval" | "executing_tool" | "completed" | "failed" | "recovering";
```

## Angular Implementation Idea

Use a reducer or state machine service and bind the current state to UI pills and panels.

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
