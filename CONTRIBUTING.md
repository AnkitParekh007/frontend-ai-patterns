# Contributing

Thanks for considering a contribution. This project is a public proof repo for Angular AI frontend architecture, so contributions should stay practical, readable, and interview-safe.

## How To Set Up Locally

`ash
git clone https://github.com/AnkitParekh007/frontend-ai-patterns.git
cd frontend-ai-patterns
npm install
`

Run the available checks documented in the README. If this repo is documentation-only, review Markdown links and examples before opening a PR.

## How To Choose An Issue

Start with [GOOD_FIRST_ISSUES.md](GOOD_FIRST_ISSUES.md) or the GitHub issue templates. Good contributions improve clarity, screenshots, accessibility, examples, tests, or mock AI frontend flows.

## Branch Naming

Use a short descriptive branch name:

- docs/add-rag-diagram
- eat/add-approval-state
- 	est/add-streaming-service-spec
- 11y/improve-keyboard-navigation

## Commit Message Style

Use clear conventional prefixes:

- docs: improve screenshot checklist
- eat: add mock tool timeline state
- 	est: cover context serializer
- ix: correct README command

## Code Style Expectations

- Keep TypeScript strict and readable.
- Prefer typed models over loose objects.
- Keep mock data realistic but fictional.
- Do not add real API keys, provider tokens, private customer data, or .env files.
- Avoid fake production claims, user counts, stars, testimonials, or benchmarks.

## Docs Contributions

Docs should help a reader understand the architecture in under 30 seconds. Prefer diagrams, screenshots, small code snippets, and explicit mocked-vs-real boundaries.

## UI Contributions

For UI changes, include a screenshot or GIF when possible. Keep enterprise UX states visible: loading, streaming, retrieving context, awaiting approval, executing, completed, failed, and recovering.

## Pull Request Checklist

- [ ] Change is focused and reviewable
- [ ] No secrets or private data
- [ ] No fake metrics or production claims
- [ ] README/docs updated if needed
- [ ] Screenshot/GIF included for UI changes
- [ ] Tests or manual verification notes included where practical
