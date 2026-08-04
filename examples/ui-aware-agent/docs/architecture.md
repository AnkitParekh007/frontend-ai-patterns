# Architecture

The demo is built around one idea: keep the agent’s understanding of the page explicit and safe.

## Flow

```mermaid
flowchart TD
    Page["Selected record in dashboard"] --> Context["Context serializer"]
    Context --> Agent["Mock agent planner"]
    Agent --> Actions["Suggested actions list"]
    Actions --> Approval["Approval-first gating"]
    Approval --> Runner["Mock workflow runner"]
    Runner --> Timeline["Timeline"]
    Runner --> Logs["Action log"]
    Runner --> Recovery["Recovery panel"]
```

## Boundaries

- `ContextSerializerService`: turns selected UI state into safe context
- `MockAgentService`: generates mocked actions from that context
- `ActionApprovalService`: decides whether approval is required and shapes approval requests
- `WorkflowRunnerService`: emits mock timeline state and log entries

## Non-Goals

- real browser automation
- real backend side effects
- invisible action execution
