# Examples

## What is in the example pack

The repo separates examples by **what a developer wants to reuse**, not by folder trivia.

### Angular example

- [`examples/angular/README.md`](../examples/angular/README.md)
- Focus: composition boundaries, stores, services, and shell-level integration
- Best when you already know the interaction you want and need a frontend structure

### TypeScript models

- [`examples/typescript-models/README.md`](../examples/typescript-models/README.md)
- Focus: canonical interfaces for streaming, citations, tool timelines, approvals, context, and retries
- Best when you want to standardize contracts before building views

### Mock fixtures

- [`examples/mock-data/README.md`](../examples/mock-data/README.md)
- Focus: JSON payloads that can drive tests, docs previews, demos, and screenshots
- Best when you need realistic sample state quickly

### Starter packs

- [`starter-packs/README.md`](../starter-packs/README.md)
- Focus: one pattern at a time with contract, fixture, diagram, implementation checklist, and testing checklist
- Best when you want the smallest forkable unit

## Minimal integration path

For a fast prototype:

1. choose one starter pack
2. copy the contract and fixture
3. adapt the fixture into component state or a reducer test
4. follow the implementation and testing checklists

## Production-shaped integration path

For a more durable internal reference:

1. start with the shared model pack
2. add the Angular composition examples
3. keep fixtures under test or Storybook-style preview data
4. apply enterprise readiness checklists before rollout

## Exactly what is reusable

| Asset type | Reuse value |
|---|---|
| TypeScript interfaces | Define team-wide AI UI contracts |
| JSON fixtures | Drive demos, reducer tests, and screenshots |
| Mermaid diagrams | Explain state and event flow in design or PR reviews |
| Angular examples | Map contracts into shell, store, and component boundaries |
| Checklists | Prevent missing accessibility, recovery, and trust details |
