# Examples

The examples are split by reuse surface so teams can lift only the part they need.

## Angular Example

- [Angular composition notes](angular/README.md)
- [Signal-based shell example](angular/agent-shell.example.ts)
- [Tool and approval shell example](angular/tool-approval-shell.example.ts)

Use this when you need help deciding component, store, and service boundaries in an Angular app.

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

1. Start from the matching starter pack in `starter-packs/`.
2. Use `examples/typescript-models/pattern-models.ts` as the shared frontend contract layer.
3. Use the Angular examples to define stores, facades, and presentational components.
4. Validate the behavior against the enterprise checklists under `docs/`.
