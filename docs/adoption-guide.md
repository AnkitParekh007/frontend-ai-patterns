# Adoption Guide

## Adopt one piece, not the whole repo

This project is designed for partial adoption. You do not need to copy every pattern, every example, or every checklist to get value.

## Recommended adoption order

1. shared contracts
2. one visible trust surface
3. one recovery path
4. enterprise readiness checklists

## Three safe adoption modes

### Mode 1: Contracts only

Use the TypeScript model pack when your team wants a shared language for AI UI state without taking docs, fixtures, or Angular examples wholesale.

### Mode 2: Contracts plus fixtures

Use a starter pack when your team wants a realistic payload, a diagram, and implementation guidance for one pattern.

### Mode 3: Contracts plus fixtures plus Angular composition

Use the Angular examples when your team is actively building a shell, source panel, approval surface, or state reducer.

## Match the repo to your product

| Product need | Open first |
|---|---|
| Internal copilot with citations and approvals | [Use Cases](use-cases.md) |
| Need to prove behavior before adopting docs | [Demo Gallery](demo-gallery.md) |
| Team needs one pattern pack to fork internally | [Starter Packs](../starter-packs/README.md) |
| Team needs architecture and rollout constraints | [Enterprise Readiness](enterprise-readiness.md) |

## When to fork

Fork if you want to:

- rename the contracts to your domain language
- extend fixtures to your own tools, tenants, or policies
- add company-specific rollout, audit, or design-review checklists
- maintain an internal pattern library derived from these starter packs

## When not to fork

Do not fork this repo if your team only needs a visual inspiration board. The strongest value here is the combination of contracts, fixtures, diagrams, and delivery checklists.
