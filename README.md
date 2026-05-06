# Frontend AI Patterns

Angular and TypeScript patterns for AI frontend systems: streaming UX, RAG citations, MCP tools, approvals, state machines, retries, and guardrails.

## What This Repo Is

A practical AI frontend architecture cookbook for Angular engineers building copilots, agent interfaces, RAG workflows, and tool execution UX.

## Who It Is For

- Frontend engineers moving into AI product work.
- Angular architects designing reusable AI UI systems.
- Technical reviewers evaluating AI frontend depth beyond chat UI.
- Recruiters looking for public proof of AI frontend architecture thinking.

## Pattern Index

1. [Streaming Message UX](patterns/01-streaming-message-ux.md)
2. [RAG Source Cards](patterns/02-rag-source-cards.md)
3. [Tool-Call Timeline](patterns/03-tool-call-timeline.md)
4. [Action Approval Flow](patterns/04-action-approval-flow.md)
5. [Agent State Machine](patterns/05-agent-state-machine.md)
6. [Context Serializer](patterns/06-context-serializer.md)
7. [MCP Tool UI](patterns/07-mcp-tool-ui.md)
8. [Human In The Loop](patterns/08-human-in-the-loop.md)
9. [Error Recovery And Retry](patterns/09-error-recovery-and-retry.md)
10. [Enterprise Guardrails](patterns/10-enterprise-guardrails.md)

## Architecture Principles

- Make context visible.
- Make retrieved evidence inspectable.
- Make tool execution auditable.
- Require human approval for risky actions.
- Treat failure and recovery as first-class UI states.
- Keep secrets and tool execution behind backend APIs.

## How To Use These Patterns

Use each pattern as a design checklist before implementing AI features in Angular. Copy the models and adapt the Angular implementation notes to your app architecture.

## Recruiter Value

This repo proves AI frontend thought leadership, Angular/TypeScript architecture depth, and practical understanding of enterprise guardrails.

## Interview Topics

- Streaming UX and status states.
- RAG citation UI.
- Tool timelines and MCP-style actions.
- Human approval flows.
- Context serialization.
- Error recovery and retries.
- Enterprise AI guardrails.
