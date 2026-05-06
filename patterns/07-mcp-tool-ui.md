# MCP Tool UI

## Problem

MCP-style tools need frontend affordances for intent and result.

## Why It Matters

Users need to know which tools exist, what they do, and whether approval is required.

## UX Behavior

Render tool name, purpose, input summary, permission need, status, and result.

## TypeScript Model

```ts
export interface McpToolView { name: string; description: string; requiresApproval: boolean; status: string; }
```

## Angular Implementation Idea

Create a ToolCallTimelineComponent backed by backend tool event messages.

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
