# Quickstart

## What developers can copy today

<section class="showcase-panel">
  <div class="surface-grid">
    <article class="surface-card tone-blue">
      <strong>One interface</strong>
      <span>Start with <a href="../examples/typescript-models/pattern-models.ts"><code>pattern-models.ts</code></a> if your team wants a contract before UI work.</span>
    </article>
    <article class="surface-card tone-teal">
      <strong>One fixture</strong>
      <span>Start with <a href="../examples/mock-data/README.md">mock data</a> for demos, screenshots, reducer tests, and Storybook-style states.</span>
    </article>
    <article class="surface-card tone-gold">
      <strong>One starter pack</strong>
      <span>Start with <a href="../starter-packs/README.md">starter packs</a> for contract, diagram, fixture, and implementation checklists in one place.</span>
    </article>
    <article class="surface-card tone-violet">
      <strong>One Angular example</strong>
      <span>Start with <a href="../examples/angular/README.md">Angular examples</a> for shell, store, component, and service boundaries.</span>
    </article>
  </div>
</section>

## Minimal integration path

1. Pick a pattern from the [Pattern Library](pattern-library.md)
2. Copy the matching `starter-packs/<pattern>/contract.ts`
3. Use the matching `fixture.json` in your demo, reducer tests, or component previews
4. Follow the `implementation-checklist.md`
5. Add the `testing-checklist.md` items before shipping

## Production-shaped integration path

1. Start with [docs/architecture.md](architecture.md)
2. Adopt the shared interfaces in [`examples/typescript-models/pattern-models.ts`](../examples/typescript-models/pattern-models.ts)
3. Map pattern responsibilities using [`examples/angular/README.md`](../examples/angular/README.md)
4. Add enterprise constraints from [`enterprise-readiness.md`](enterprise-readiness.md)
5. Use [`decision-guides.md`](decision-guides.md) to decide where to show approvals, citations, tools, and persisted context

## Which files to start from

| Use case | Start here |
|---|---|
| Streaming assistant responses | [`starter-packs/01-streaming-message-ux/`](../starter-packs/01-streaming-message-ux/) |
| Retrieval citations | [`starter-packs/02-rag-source-cards/`](../starter-packs/02-rag-source-cards/) |
| Tool execution visibility | [`starter-packs/03-tool-call-timeline/`](../starter-packs/03-tool-call-timeline/) |
| Approval checkpoints | [`starter-packs/04-action-approval-flow/`](../starter-packs/04-action-approval-flow/) |
| Agent state coordination | [`starter-packs/05-agent-state-machine/`](../starter-packs/05-agent-state-machine/) |
| Safe context snapshots | [`starter-packs/06-context-serializer/`](../starter-packs/06-context-serializer/) |
| MCP-style tool surfaces | [`starter-packs/07-mcp-tool-ui/`](../starter-packs/07-mcp-tool-ui/) |
| Human review workflows | [`starter-packs/08-human-in-the-loop/`](../starter-packs/08-human-in-the-loop/) |
| Retry and recovery | [`starter-packs/09-error-recovery-and-retry/`](../starter-packs/09-error-recovery-and-retry/) |
| Policy-aware enterprise UX | [`starter-packs/10-enterprise-guardrails/`](../starter-packs/10-enterprise-guardrails/) |

## Compatibility and support

- Angular-first examples assume modern standalone Angular application structure
- TypeScript contracts are intentionally framework-light and can be adapted to other frontends
- Mock data is fictional and safe for public demos
- This repo is a reference and starter-pack project, not a production component library
