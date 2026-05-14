# MCP Tool UI

## Problem

MCP-style tool ecosystems are powerful, but the frontend can become opaque if users only see final answers and never the tool capabilities or constraints behind them.

## Why It Matters

Tool UI shapes trust. Users need to understand what kinds of tools exist, what each one can do, and when approval or policy constraints apply.

## When To Use

- products consuming MCP-like tool metadata
- AI workbenches that expose tool catalogs
- debugging interfaces for agent operators
- environments where tool permissions vary by role

## UX Anatomy

- a visible tool catalog or tool timeline
- concise tool description and capability summary
- approval or permission requirement indicator
- result or refusal summary after execution
- optional drill-down for input and output details

## TypeScript Model

```ts
export interface McpToolView {
  name: string;
  description: string;
  requiresApproval: boolean;
  status: "available" | "running" | "blocked" | "succeeded" | "failed";
  permissionScope?: string;
}
```

## Angular Implementation Notes

- Normalize raw tool metadata before display; MCP payloads are not a UI model by themselves.
- Keep catalog views and execution timeline views separate even if they share underlying data.
- Use badges for approval and permission scopes, but pair them with text.
- Decide early whether tools are user-invokable, agent-invokable, or both.

## Failure States

- a tool looks available but policy blocks it at execution time
- tool descriptions are too technical for end users
- result views expose internal payloads without summarization
- permission scope is hidden until after failure
- UI treats all tools as equivalent despite different risk levels

## Accessibility Checklist

- Use descriptive names and summaries for tool entries.
- Ensure badges have accessible text alternatives.
- Keep expanded details readable and collapsible from the keyboard.
- Avoid dense tables when a list or cards read better on mobile.

## Testing Checklist

- metadata normalization tests
- permission badge rendering tests
- blocked-state tests
- catalog versus timeline rendering tests
- keyboard disclosure tests

## Recruiter Talking Points

- Shows practical thinking about tool ecosystems instead of generic “agent can use tools” claims.
- Demonstrates how protocol-level capabilities must be translated into usable UI.
- Relevant for MCP adoption and agent workbench design.
