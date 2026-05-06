# Context Serializer

## Problem

AI features need page context without leaking sensitive data.

## Why It Matters

A serializer creates a deliberate contract between Angular UI and backend orchestration.

## UX Behavior

Send route, selected record id, role, visible fields, and safe metadata only.

## TypeScript Model

```ts
export interface UiContext { route: string; selectedRecordId?: string; role?: string; visibleFields: string[]; }
```

## Angular Implementation Idea

Build a ContextSerializerService that whitelists fields and strips secrets before requests.

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
