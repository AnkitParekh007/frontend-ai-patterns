# Use Cases

## Why this page exists

Most developers do not adopt a pattern library because it is theoretically complete. They adopt it when they can map it to a real product surface quickly. These use cases show where this repo is strongest.

## Internal copilot

Use this repo when an internal assistant needs to explain what it is doing, cite internal knowledge, and stop for human review before risky actions.

### Best-fit patterns

- [Streaming Message UX](../patterns/01-streaming-message-ux.md)
- [RAG Source Cards](../patterns/02-rag-source-cards.md)
- [Action Approval Flow](../patterns/04-action-approval-flow.md)
- [Enterprise Guardrails](../patterns/10-enterprise-guardrails.md)

### What to copy first

- `examples/typescript-models/pattern-models.ts` for shared state contracts
- `examples/mock-data/rag-citations.json` for retrieval previews
- `starter-packs/04-action-approval-flow/` for human review states

## Support agent workspace

Use this repo when a support or operations UI needs visible tools, clear waiting states, recoverable failures, and audit-friendly approvals.

### Best-fit patterns

- [Tool-Call Timeline](../patterns/03-tool-call-timeline.md)
- [Human In The Loop](../patterns/08-human-in-the-loop.md)
- [Error Recovery And Retry](../patterns/09-error-recovery-and-retry.md)

### What to copy first

- `examples/mock-data/tool-timeline.json`
- `starter-packs/03-tool-call-timeline/`
- `examples/angular/tool-approval-shell.example.ts`

## Enterprise search

Use this repo when search results and generated answers must show evidence quality, retrieval context, and fallback or retry behavior.

### Best-fit patterns

- [RAG Source Cards](../patterns/02-rag-source-cards.md)
- [Context Serializer](../patterns/06-context-serializer.md)
- [Error Recovery And Retry](../patterns/09-error-recovery-and-retry.md)

### What to copy first

- `examples/mock-data/rag-citations.json`
- `starter-packs/02-rag-source-cards/`
- `docs/decision-guides.md`

## Approval-heavy operations console

Use this repo when operators can trigger sensitive actions and the frontend must surface risk, permissions, review checkpoints, and visible tool execution.

### Best-fit patterns

- [Action Approval Flow](../patterns/04-action-approval-flow.md)
- [MCP Tool UI](../patterns/07-mcp-tool-ui.md)
- [Enterprise Guardrails](../patterns/10-enterprise-guardrails.md)

### What to copy first

- `examples/mock-data/approval-request.json`
- `starter-packs/07-mcp-tool-ui/`
- `starter-packs/10-enterprise-guardrails/`

## Team adoption shortcut

If your team is asking different questions, use this shortcut:

| Team question | Open first |
|---|---|
| How should the UI stream and recover? | [Demo Gallery](demo-gallery.md) and [Streaming Message UX](../patterns/01-streaming-message-ux.md) |
| How do we show tools without hiding orchestration? | [Tool-Call Timeline](../patterns/03-tool-call-timeline.md) |
| How do we stop destructive actions for review? | [Action Approval Flow](../patterns/04-action-approval-flow.md) |
| How do we keep citations inspectable? | [RAG Source Cards](../patterns/02-rag-source-cards.md) |
| How do we adopt only one slice of the repo? | [Adoption Guide](adoption-guide.md) |
