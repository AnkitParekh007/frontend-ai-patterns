# Comparisons

## Generic chat UI vs production AI UI

Generic chat UI focuses on prompt in, answer out.

Production AI UI needs:

- streaming and stalled states
- citations and evidence surfaces
- visible tool execution
- approvals for risky actions
- explicit recovery paths

## Hidden tool execution vs tool timeline

Hidden tool execution creates mystery and weakens trust.

A tool timeline:

- shows intent before action
- clarifies whether the system is searching, planning, waiting, or executing
- creates a place to attach approvals and policy outcomes

## Silent destructive actions vs approvals

Silent destructive behavior teaches users to distrust the system.

Approvals work best when they:

- summarize the action clearly
- explain why it is risky
- preserve operator control without blocking low-risk flows

## Uninspectable grounded answers vs RAG citation cards

Grounded answers are not trustworthy unless the user can inspect the grounding.

Citation cards should expose:

- source label
- snippet
- confidence or relevance context
- route to the original source when appropriate
