# Examples

The examples are split by reuse surface so teams can lift only the part they need.

## Start With The Right Surface

- Want the complete runnable lifecycle: start with the [Trustworthy AI Pattern Playground](ui-aware-agent/README.md)
- Want shared frontend contracts: start with [TypeScript Models](typescript-models/README.md)
- Want realistic UI states: start with [Mock Fixtures](mock-data/README.md)
- Want shell and store boundaries: start with [Angular Example](angular/README.md)
- Want a forkable bundle for one pattern: start with [Starter Packs](../starter-packs/README.md)

## Trustworthy AI Pattern Playground

- [Run the Angular playground](ui-aware-agent/README.md)
- [Scenario + accessibility documentation](ui-aware-agent/docs/pattern-playground.md)
- [What this proves](ui-aware-agent/WHAT_THIS_PROVES.md)

The runnable Angular app composes the repository's trust patterns into deterministic scenarios covering:

`streaming → retrieval → citations → tool plan → approval → execution → grounded result → failure/retry/recovery`

It includes a grounded success path, missing-evidence suppression, failed-tool recovery, and a stalled-stream retry that retains the same safe context snapshot. No model or tool credentials are required.

## Angular Composition Example

- [Angular composition notes](angular/README.md)
- [Signal-based shell example](angular/agent-shell.example.ts)
- [Tool and approval shell example](angular/tool-approval-shell.example.ts)

Use these smaller examples when you need help deciding component, store, and service boundaries without adopting the complete playground.

## TypeScript Models

- [Canonical model pack](typescript-models/README.md)
- [Shared contracts file](typescript-models/pattern-models.ts)

Use this when you want strong frontend state contracts before committing to implementation details.

## Mock Fixtures

- [Fixture index](mock-data/README.md)

Use this when you need realistic demo data, UI state previews, tests, or Storybook stories.

## Starter Packs

- [Starter pack index](../starter-packs/README.md)

Each starter pack includes a contract, fixture, diagram, implementation checklist, and testing checklist for one pattern.

## Reuse Paths

### Minimal Integration Path

1. Copy one TypeScript contract from `examples/typescript-models/`.
2. Copy the matching fixture from `examples/mock-data/`.
3. Use the related starter-pack checklist to wire the feature into your app.

### Production-Shaped Integration Path

1. Run the deterministic Angular playground and inspect the state transitions.
2. Start from the matching starter pack in `starter-packs/`.
3. Use `examples/typescript-models/pattern-models.ts` as the shared frontend contract layer.
4. Use the Angular examples to define stores, facades, and presentational components.
5. Validate the behavior against the enterprise checklists under `docs/`.

## See It Before You Fork It

- [Demo Gallery](../docs/demo-gallery.md)
- [Use Cases](../docs/use-cases.md)
