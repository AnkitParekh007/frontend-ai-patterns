# Portfolio Roadmap — Frontend AI Patterns

## Now — make patterns executable

- preserve the small copyable contract/fixture/starter-pack experience
- strengthen deterministic examples for streaming, citations, tools, approvals and recovery
- make failure and accessibility behavior part of each pattern's acceptance criteria
- keep backend enforcement boundaries explicit

## Next — runnable pattern playground

Target experience:

```text
Streaming
  -> Retrieval + citations
  -> Tool plan
  -> Approval
  -> Tool execution
  -> Grounded result
  -> Failure / retry / recovery
```

The playground should run locally without provider credentials using deterministic fixtures.

## Next — package boundaries

Evaluate extracting stable primitives only when reuse justifies it:

```text
packages/
  ai-ui-contracts/
  ai-streaming/
  ai-citations/
  ai-tool-ui/
  ai-approvals/
  ai-agent-state/
  ai-recovery/
```

Do not create packages solely to make the repository look larger.

## Later — portability proof

- Angular remains the primary production-shaped example
- add focused React and Vue examples for selected contracts
- keep documentation framework-neutral where the pattern is genuinely framework-independent

## Quality gates

- every pattern documents happy path, failure modes, accessibility and tests
- examples never imply frontend code enforces backend security policy
- contracts remain serializable and provider-neutral unless a pattern requires otherwise
