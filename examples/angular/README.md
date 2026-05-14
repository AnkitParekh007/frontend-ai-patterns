# Angular Examples

These examples are intentionally lightweight. The goal is to show how the cookbook maps into Angular structure without pretending the repo already contains a full demo app.

## Suggested Folder Shape

```text
src/app/ai-shell/
  components/
  services/
  state/
  models/
```

## Recommended Angular Responsibilities

- `services/agent-session.service.ts`: consumes backend events and exposes a typed stream
- `state/agent-session.store.ts`: reduces events into user-visible view state
- `components/message-thread/*`: renders streaming assistant and user messages
- `components/source-cards/*`: renders citation evidence
- `components/tool-timeline/*`: renders tool events, statuses, and approvals
- `components/approval-card/*`: handles high-risk action review

## Example Composition

See [agent-shell.example.ts](agent-shell.example.ts) for a small signal-based shell pattern.
