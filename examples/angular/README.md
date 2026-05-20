# Angular Examples

These examples show how the pattern library maps into an Angular app without pretending this repo is already a full product.

## Recommended Feature Shape

```text
src/app/ai-shell/
  components/
    message-thread/
    source-cards/
    tool-timeline/
    approval-card/
  services/
  state/
  models/
```

## Recommended Responsibilities

- `services/agent-session.service.ts`: transport, session, and orchestration events
- `state/agent-session.store.ts`: reduce backend events into user-visible state
- `components/message-thread/*`: render streaming messages and retry controls
- `components/source-cards/*`: render evidence and provenance
- `components/tool-timeline/*`: show tool intent, execution, and outcomes
- `components/approval-card/*`: render high-risk action review and decisions

## Included Examples

- [agent-shell.example.ts](agent-shell.example.ts): signal-based conversation shell
- [tool-approval-shell.example.ts](tool-approval-shell.example.ts): tool timeline plus approval routing

## How To Adopt One Pattern Without Adopting Everything

- For streaming chat, start with the session store and message-thread rendering contract.
- For RAG, keep citations in a separate feature slice from the message list.
- For tools and approvals, compose a shared timeline model plus a dedicated approval surface.
- For enterprise rollout, keep policy outcomes visible in presentational components instead of hiding them in services.

## What This Folder Is For

- mapping the docs to Angular responsibilities
- accelerating architecture decisions for real frontend teams
- providing realistic examples for portfolios, interviews, and internal prototypes
