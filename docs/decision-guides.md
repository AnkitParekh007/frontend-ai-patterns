# Decision Guides

## When to use approvals

Use approvals when the action is destructive, externally visible, expensive, or policy-bound.

## When to surface tool details

Surface tool details when:

- the user needs confidence in the result
- the agent can act on external systems
- the system may wait, block, or retry

## When to expose citations

Expose citations when:

- the answer depends on retrieval
- the user may need to inspect evidence
- policy or knowledge freshness matters

## When to persist session and context state

Persist when:

- operators may reload during a long-running interaction
- approvals or retries should survive navigation
- audit-visible checkpoints matter

Do not persist blindly when context could expose sensitive or tenant-specific data unnecessarily.
