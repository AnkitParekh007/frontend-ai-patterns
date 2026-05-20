# TypeScript Models

This folder holds the canonical frontend contracts for the docs site, examples, and starter packs.

## Included Contracts

- `StreamChunk` and `AssistantMessage` for streaming conversation state
- `RagCitation` for evidence presentation
- `ToolTimelineItem` for tool execution visibility
- `ApprovalRequest` for approval routing and human decisions
- `UiContextSnapshot` for context serialization
- `RecoveryPlan` for retry and fallback state

## Recommended Use

- Copy these contracts as a starting point, not a frozen product standard.
- Keep them JSON-serializable so they work for tests, fixtures, and transport boundaries.
- Normalize backend payloads into these contracts before rendering UI components.

## Related Assets

- [Mock fixtures](../mock-data/README.md)
- [Starter packs](../../starter-packs/README.md)
- [Pattern library](../../docs/pattern-library.md)
