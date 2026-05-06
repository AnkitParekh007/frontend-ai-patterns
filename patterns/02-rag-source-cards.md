# RAG Source Cards

## Problem

Answers can look unsupported when retrieved context is hidden.

## Why It Matters

RAG UI should let users inspect the evidence behind an answer.

## UX Behavior

Show source title, type, snippet, confidence, and link near the answer.

## TypeScript Model

```ts
export interface RagSource { title: string; snippet: string; confidence: number; sourceType: string; url?: string; }
```

## Angular Implementation Idea

Create a RagSourceCardComponent and render cards beside or below the assistant response.

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
