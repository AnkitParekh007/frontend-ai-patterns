# Recovery States

This demo treats failure as a first-class UI state.

When a mocked workflow fails:
- the timeline moves into `failed` and `recovering`
- the recovery panel explains the safe next step
- the action log records what happened

The point is not to simulate a complex backend. The point is to show how frontend UX should respond when automation does not succeed.
