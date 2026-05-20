# Release Strategy

This repo should version public artifacts like a maintained reference product, even though it is documentation-first.

## Release philosophy

- treat contracts, starter packs, and example structure as the public surface
- avoid churn that breaks forks without explanation
- prefer additive releases over silent rewrites

## Suggested milestone semantics

- `0.x` for rapid iteration while the starter-pack structure is still settling
- `1.0` when site IA, core pattern packs, and validation workflows are stable

## What should trigger a changelog entry

- new starter pack
- changed canonical contract shape
- new enterprise checklist or playbook
- site IA changes that affect page paths
- example additions that change recommended adoption flow
