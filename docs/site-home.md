# Frontend AI Patterns

<section class="landing-hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <span class="hero-kicker">Angular + TypeScript + trustworthy AI UX</span>
      <h2>Design AI interfaces that feel inspectable, controlled, and enterprise-safe.</h2>
      <p>
        This repo is a fork-friendly frontend reference for streaming conversations, grounded
        citations, tool timelines, approval checkpoints, recovery states, and policy-aware UI.
        It is built for teams that want stronger interaction contracts than a generic chat demo.
      </p>

      <div class="hero-actions">
        <a class="button-primary" href="quickstart.md">Start with one pattern</a>
        <a class="button-secondary" href="pattern-library.md">Browse the library</a>
        <a class="button-secondary" href="examples.md">Open reusable assets</a>
      </div>

      <div class="hero-stat-grid">
        <article class="stat-card">
          <strong>10</strong>
          <span>pattern pages with starter-pack links, failure states, accessibility, and testing notes</span>
        </article>
        <article class="stat-card">
          <strong>5</strong>
          <span>assets per starter pack: contract, fixture, diagram, implementation, and testing checklist</span>
        </article>
        <article class="stat-card">
          <strong>1</strong>
          <span>goal: help teams adopt one trustworthy AI surface without swallowing a monolith</span>
        </article>
      </div>
    </div>

    <div class="hero-visual">
      <article class="stack-card">
        <h3>Trustworthy AI frontend architecture</h3>
        <p>Angular shell, typed state, retrieval evidence, visible tools, and enterprise checkpoints.</p>
        <div class="stack-grid">
          <div class="stack-node node-teal">
            <strong>Angular shell</strong>
            <span>messages, sources, approvals</span>
          </div>
          <div class="stack-node node-blue">
            <strong>View state</strong>
            <span>streaming, blocked, recovering</span>
          </div>
          <div class="stack-node node-gold">
            <strong>Tool timeline</strong>
            <span>intent, status, approval</span>
          </div>
          <div class="stack-node node-violet">
            <strong>Citations</strong>
            <span>grounding and evidence</span>
          </div>
          <div class="stack-node node-rose">
            <strong>Context serializer</strong>
            <span>only what the backend needs</span>
          </div>
          <div class="stack-node node-teal">
            <strong>Enterprise guardrails</strong>
            <span>approvals, audit, role, tenant</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>

## Three proof pillars

<section class="showcase-panel">
  <div class="signal-grid">
    <article class="signal-card tone-blue">
      <strong>Streaming UX</strong>
      <span>Users trust AI systems more when waiting, progress, stall, retry, and completion are explicit states.</span>
    </article>
    <article class="signal-card tone-gold">
      <strong>Tool and approval UX</strong>
      <span>Developers need visible tool execution, review checkpoints, and high-risk action control instead of hidden orchestration.</span>
    </article>
    <article class="signal-card tone-violet">
      <strong>Enterprise guardrails</strong>
      <span>Real product teams need policy visibility, accessibility, audit awareness, and safe frontend boundaries.</span>
    </article>
  </div>
</section>

## Start here

<section class="path-panel">
  <div class="path-grid">
    <article class="path-card">
      <strong>Quickstart</strong>
      <span>Copy one contract, one fixture, or one starter pack in minutes.</span>
      <ul class="inline-list">
        <li><a href="quickstart.md">open quickstart</a></li>
      </ul>
    </article>
    <article class="path-card">
      <strong>Pattern Library</strong>
      <span>Browse patterns grouped by workflow instead of a flat numbered list.</span>
      <ul class="inline-list">
        <li><a href="pattern-library.md">see patterns</a></li>
      </ul>
    </article>
    <article class="path-card">
      <strong>Examples</strong>
      <span>Choose between minimal reuse and production-shaped adoption paths.</span>
      <ul class="inline-list">
        <li><a href="examples.md">open examples</a></li>
      </ul>
    </article>
    <article class="path-card">
      <strong>Enterprise Readiness</strong>
      <span>Review frontend boundaries, observability, accessibility, and rollout expectations.</span>
      <ul class="inline-list">
        <li><a href="enterprise-readiness.md">read checklist</a></li>
      </ul>
    </article>
  </div>
</section>

## Who this helps

- frontend engineers building copilots, agent workflows, and retrieval-aware interfaces
- Angular teams that want typed, inspectable patterns instead of generic chat demos
- architects standardizing AI interaction contracts across products
- maintainers who want starter-pack style assets that can be forked and adapted safely

## Why fork this repo

<section class="surface-panel">
  <h3>Every pattern ships as a starter pack</h3>
  <p>Small enough to fork, structured enough to review, and safe enough to adapt to your own product surface.</p>

  <div class="asset-grid">
    <article class="asset-card tone-teal">
      <strong>contract.ts</strong>
      <span>typed interface starting point for messages, tools, approvals, or recovery</span>
    </article>
    <article class="asset-card tone-blue">
      <strong>fixture.json</strong>
      <span>demo and test payload you can drop into previews, reducers, or state stories</span>
    </article>
    <article class="asset-card tone-gold">
      <strong>diagram.mmd</strong>
      <span>state or event flow for architecture reviews, onboarding, and design critique</span>
    </article>
    <article class="asset-card tone-emerald">
      <strong>Implementation checklist</strong>
      <span>delivery guidance for UI state, visibility, and frontend boundaries</span>
    </article>
    <article class="asset-card tone-violet">
      <strong>Testing checklist</strong>
      <span>acceptance coverage for failure states, accessibility, and reliability</span>
    </article>
  </div>
</section>

- Every major pattern includes a repeatable bundle: `contract`, `fixture`, `diagram`, `implementation checklist`, and `testing checklist`
- The repo includes reusable TypeScript contracts, Angular composition notes, and mock fixtures without pretending to be a production SDK
- The public docs focus on frontend responsibilities: state, accessibility, trust, and orchestration boundaries

## What you can reuse in five minutes

<section class="showcase-panel">
  <h3>Pattern previews</h3>
  <p>Examples of the trust surfaces this repo helps teams design well.</p>

  <div class="surface-grid">
    <article class="surface-card tone-blue">
      <strong>Streaming states</strong>
      <span>thinking, streaming, stalled, complete, failed, and retry-ready</span>
    </article>
    <article class="surface-card tone-gold">
      <strong>Tool timeline</strong>
      <span>queued, running, awaiting approval, and audit-visible outcomes</span>
    </article>
    <article class="surface-card tone-teal">
      <strong>Citation cards</strong>
      <span>inspect evidence and source quality without losing context</span>
    </article>
    <article class="surface-card tone-violet">
      <strong>Approval gates</strong>
      <span>high-risk actions stay human-controlled instead of silently executed</span>
    </article>
    <article class="surface-card tone-emerald">
      <strong>Recovery UI</strong>
      <span>retry, fallback, and blocked-state clarity instead of generic error toasts</span>
    </article>
    <article class="surface-card tone-rose">
      <strong>Enterprise guardrails</strong>
      <span>policy-aware UI, tenant context, and visible permission outcomes</span>
    </article>
  </div>
</section>

- [`examples/typescript-models/pattern-models.ts`](../examples/typescript-models/pattern-models.ts) for canonical interface starting points
- [`examples/mock-data/`](../examples/mock-data/README.md) for JSON fixtures you can drop into demos or tests
- [`starter-packs/`](../starter-packs/README.md) for pattern-by-pattern bundles
- [`examples/angular/`](../examples/angular/README.md) for Angular shell and state composition examples

## What makes this repo different

- It focuses on **frontend architecture**, not backend orchestration frameworks
- It covers **operator trust surfaces** like approvals, tool timelines, and audit-visible state
- It treats **accessibility and failure handling** as design requirements, not cleanup tasks
- It is intentionally **documentation-first and fork-friendly**, so teams can adopt pieces without taking a monolith
