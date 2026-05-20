# Pattern Library

This library groups patterns by workflow so frontend teams can start from the behavior they need, not from an arbitrary numbered list.

## Conversation UX

| Pattern | Problem solved | Reuse entry |
|---|---|---|
| [Streaming Message UX](../patterns/01-streaming-message-ux.md) | Makes long-running generation feel responsive without hiding failure | [`starter pack`](../starter-packs/01-streaming-message-ux/) |
| [Human In The Loop](../patterns/08-human-in-the-loop.md) | Adds pause, revise, and operator checkpoint states to AI flows | [`starter pack`](../starter-packs/08-human-in-the-loop/) |

## Retrieval UX

| Pattern | Problem solved | Reuse entry |
|---|---|---|
| [RAG Source Cards](../patterns/02-rag-source-cards.md) | Makes retrieved evidence inspectable and trustworthy | [`starter pack`](../starter-packs/02-rag-source-cards/) |
| [Context Serializer](../patterns/06-context-serializer.md) | Controls what UI context is sent into orchestration layers | [`starter pack`](../starter-packs/06-context-serializer/) |

## Tooling UX

| Pattern | Problem solved | Reuse entry |
|---|---|---|
| [Tool-Call Timeline](../patterns/03-tool-call-timeline.md) | Makes tool execution intent, status, and results visible | [`starter pack`](../starter-packs/03-tool-call-timeline/) |
| [MCP Tool UI](../patterns/07-mcp-tool-ui.md) | Standardizes frontend shape for MCP and tool registry workflows | [`starter pack`](../starter-packs/07-mcp-tool-ui/) |

## Safety and Control

| Pattern | Problem solved | Reuse entry |
|---|---|---|
| [Action Approval Flow](../patterns/04-action-approval-flow.md) | Routes risky actions through explicit human approval | [`starter pack`](../starter-packs/04-action-approval-flow/) |
| [Enterprise Guardrails](../patterns/10-enterprise-guardrails.md) | Makes policy, permissions, and audit expectations visible | [`starter pack`](../starter-packs/10-enterprise-guardrails/) |

## State and Reliability

| Pattern | Problem solved | Reuse entry |
|---|---|---|
| [Agent State Machine](../patterns/05-agent-state-machine.md) | Keeps complex AI UI state transitions understandable | [`starter pack`](../starter-packs/05-agent-state-machine/) |
| [Error Recovery And Retry](../patterns/09-error-recovery-and-retry.md) | Defines retry semantics and user-visible recovery states | [`starter pack`](../starter-packs/09-error-recovery-and-retry/) |

## Pattern page template

Each pattern page should be usable as a review checklist and as an implementation handoff. The standard template is:

- problem
- when to use
- anti-patterns
- UI contract
- Angular notes
- failure modes
- accessibility notes
- testing checklist
- copy-paste starter assets

## Anti-patterns this repo tries to avoid

- generic chat UI with no differentiated states for tools, retrieval, or approvals
- hidden backend or policy decisions that look like random UI breakage
- AI demos that ship prose but no contracts, fixtures, or reusable bundles
- frontend examples that ignore accessibility, auditability, and trust surfaces
