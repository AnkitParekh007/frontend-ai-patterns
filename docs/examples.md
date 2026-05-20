# Examples

## What is in the example pack

The repo separates examples by what a developer wants to lift into a real product, not by folder trivia.

<section class="showcase-panel">
  <div class="surface-grid">
    <article class="surface-card tone-blue">
      <strong>Angular example</strong>
      <span><a href="../examples/angular/README.md">Composition boundaries, stores, services, shells, and approval-aware integration.</a></span>
    </article>
    <article class="surface-card tone-teal">
      <strong>TypeScript models</strong>
      <span><a href="../examples/typescript-models/README.md">Canonical interfaces for streaming, citations, tool timelines, approvals, context, and retries.</a></span>
    </article>
    <article class="surface-card tone-violet">
      <strong>Mock fixtures</strong>
      <span><a href="../examples/mock-data/README.md">JSON payloads that can drive tests, docs previews, demos, and screenshots.</a></span>
    </article>
    <article class="surface-card tone-gold">
      <strong>Starter packs</strong>
      <span><a href="../starter-packs/README.md">One pattern at a time with contract, fixture, diagram, implementation checklist, and testing checklist.</a></span>
    </article>
  </div>
</section>

## Start from your goal

| If you want to... | Open this first |
|---|---|
| define stable frontend state contracts | `examples/typescript-models/pattern-models.ts` |
| build demos, screenshots, or reducer tests fast | `examples/mock-data/` |
| wire contracts into Angular shell boundaries | `examples/angular/` |
| fork one pattern into your product safely | `starter-packs/` |

## Minimal integration path

1. choose one starter pack
2. copy the contract and fixture
3. adapt the fixture into component state, a reducer test, or a Storybook-like preview
4. follow the implementation and testing checklists

## Production-shaped integration path

1. start with the shared model pack
2. add the Angular composition examples
3. keep fixtures under test or preview data
4. apply enterprise readiness checklists before rollout
5. use the related use-case page to align the pattern with a real product surface

## Exactly what is reusable

| Asset type | Reuse value |
|---|---|
| TypeScript interfaces | Define team-wide AI UI contracts |
| JSON fixtures | Drive demos, reducer tests, and screenshots |
| Mermaid diagrams | Explain state and event flow in design or PR reviews |
| Angular examples | Map contracts into shell, store, and component boundaries |
| Checklists | Prevent missing accessibility, recovery, and trust details |

## Move from examples to proof

- Open [Demo Gallery](demo-gallery.md) to see the most important trust surfaces first
- Open [Use Cases](use-cases.md) to match the assets to internal copilots, support workspaces, enterprise search, or approval-heavy consoles
