# Contributing

This repo is a public developer reference for trustworthy AI frontend patterns. Contributions should make the repo easier to fork, easier to trust, and easier to adopt without internal context.

## Local Setup

```bash
git clone https://github.com/AnkitParekh007/frontend-ai-patterns.git
cd frontend-ai-patterns
npm install
npm run verify
```

The project is intentionally static-site friendly. The main checks validate links, starter-pack completeness, and site assembly.

## What Good Contributions Look Like

- One focused pattern improvement with clearer contracts, diagrams, or checklists.
- A starter-pack enhancement that improves copy-paste value for developers.
- A realistic Angular or TypeScript example that reflects production-shaped UI state.
- A docs improvement that clarifies enterprise boundaries, accessibility, or failure handling.

## Contribution Standards

- Keep all examples honest. No fake usage claims, customer names, metrics, or testimonials.
- Prefer typed contracts over vague prose when the docs describe frontend state.
- Keep fixtures realistic but fictional.
- Preserve the distinction between frontend responsibility and backend policy responsibility.
- Make loading, failure, retry, approval, and blocked states explicit.
- Prefer small, reviewable pull requests over broad rewrites.

## Repo Structure

- `docs/`: site pages, decision guides, and enterprise checklists
- `patterns/`: pattern deep dives
- `examples/`: Angular examples, TypeScript models, and mock fixtures
- `starter-packs/`: copy-paste starter bundles for each pattern
- `site/`: static docs shell used for GitHub Pages

## Branch And Commit Conventions

Use short descriptive branch names:

- `docs/add-threat-modeling-example`
- `feat/add-tool-approval-fixture`
- `fix/correct-rag-citation-links`
- `test/add-starter-pack-validation`

Use clear commit prefixes:

- `docs: improve quickstart adoption path`
- `feat: add guardrail starter pack`
- `fix: correct pages manifest links`
- `test: validate starter pack bundles`

## Pull Request Expectations

- Explain what changed and why it improves developer reuse or trust.
- Link the affected docs page, pattern, example, or starter pack.
- Include screenshots when changing docs UX or rendered visuals.
- Include verification notes for `npm run verify`.
- Keep claims and positioning aligned with actual repo contents.

## Pattern Quality Bar

Pattern pages should answer:

- what problem this pattern solves
- when it should be used
- what anti-patterns to avoid
- what UI contract the frontend should expose
- what failure states must remain visible
- what accessibility expectations apply
- what to test before shipping

Starter packs should include:

- `contract.ts`
- `fixture.json`
- `diagram.mmd`
- `implementation-checklist.md`
- `testing-checklist.md`

## Open A Good Issue

Use the issue templates for:

- new pattern proposals
- example requests
- docs gaps
- bugs or broken links

If you are unsure where to start, open a docs gap or example request rather than a vague feature request.
