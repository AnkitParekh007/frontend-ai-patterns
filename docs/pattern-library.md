# Pattern Library

This library groups patterns by workflow so frontend teams can start from the behavior they need, not from an arbitrary numbered list.

## Conversation UX

<section class="showcase-panel">
  <div class="surface-grid">
    <article class="surface-card tone-blue">
      <strong><a href="../patterns/01-streaming-message-ux.md">Streaming Message UX</a></strong>
      <span>Makes long-running generation feel responsive without hiding failure.</span>
    </article>
    <article class="surface-card tone-violet">
      <strong><a href="../patterns/08-human-in-the-loop.md">Human In The Loop</a></strong>
      <span>Adds pause, revise, and operator checkpoint states to AI flows.</span>
    </article>
  </div>
</section>

## Retrieval UX

<section class="showcase-panel">
  <div class="surface-grid">
    <article class="surface-card tone-teal">
      <strong><a href="../patterns/02-rag-source-cards.md">RAG Source Cards</a></strong>
      <span>Makes retrieved evidence inspectable and trustworthy.</span>
    </article>
    <article class="surface-card tone-rose">
      <strong><a href="../patterns/06-context-serializer.md">Context Serializer</a></strong>
      <span>Controls what UI context is sent into orchestration layers.</span>
    </article>
  </div>
</section>

## Tooling UX

<section class="showcase-panel">
  <div class="surface-grid">
    <article class="surface-card tone-gold">
      <strong><a href="../patterns/03-tool-call-timeline.md">Tool-Call Timeline</a></strong>
      <span>Makes tool execution intent, status, and results visible.</span>
    </article>
    <article class="surface-card tone-blue">
      <strong><a href="../patterns/07-mcp-tool-ui.md">MCP Tool UI</a></strong>
      <span>Standardizes frontend shape for MCP and tool registry workflows.</span>
    </article>
  </div>
</section>

## Safety and control

<section class="showcase-panel">
  <div class="surface-grid">
    <article class="surface-card tone-violet">
      <strong><a href="../patterns/04-action-approval-flow.md">Action Approval Flow</a></strong>
      <span>Routes risky actions through explicit human approval.</span>
    </article>
    <article class="surface-card tone-emerald">
      <strong><a href="../patterns/10-enterprise-guardrails.md">Enterprise Guardrails</a></strong>
      <span>Makes policy, permissions, and audit expectations visible.</span>
    </article>
  </div>
</section>

## State and reliability

<section class="showcase-panel">
  <div class="surface-grid">
    <article class="surface-card tone-blue">
      <strong><a href="../patterns/05-agent-state-machine.md">Agent State Machine</a></strong>
      <span>Keeps complex AI UI state transitions understandable.</span>
    </article>
    <article class="surface-card tone-rose">
      <strong><a href="../patterns/09-error-recovery-and-retry.md">Error Recovery And Retry</a></strong>
      <span>Defines retry semantics and user-visible recovery states.</span>
    </article>
  </div>
</section>

## Starter-pack entry point

- [Streaming Message UX starter pack](../starter-packs/01-streaming-message-ux/)
- [RAG Source Cards starter pack](../starter-packs/02-rag-source-cards/)
- [Tool-Call Timeline starter pack](../starter-packs/03-tool-call-timeline/)
- [Action Approval Flow starter pack](../starter-packs/04-action-approval-flow/)
- [Agent State Machine starter pack](../starter-packs/05-agent-state-machine/)
- [Context Serializer starter pack](../starter-packs/06-context-serializer/)
- [MCP Tool UI starter pack](../starter-packs/07-mcp-tool-ui/)
- [Human In The Loop starter pack](../starter-packs/08-human-in-the-loop/)
- [Error Recovery And Retry starter pack](../starter-packs/09-error-recovery-and-retry/)
- [Enterprise Guardrails starter pack](../starter-packs/10-enterprise-guardrails/)

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
