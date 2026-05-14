# Human In The Loop

## Problem

Some workflows require human judgment even when the agent is technically capable of continuing automatically.

## Why It Matters

Human-in-the-loop design keeps accountability where it belongs. It turns AI from an opaque automation engine into a collaborator that pauses when risk, ambiguity, or policy requires review.

## When To Use

- customer-facing or financial workflows
- approvals that need business judgment, not just permission
- ambiguous recommendations with multiple valid actions
- operational flows where a human must confirm context before execution

## UX Anatomy

- workflow reaches a checkpoint
- agent explains why it is waiting
- user gets enough context to decide
- the system captures who decided and what happened next

## TypeScript Model

```ts
export interface HumanCheckpoint {
  id: string;
  reason: string;
  decidedBy?: string;
  decision?: "approved" | "rejected";
  notes?: string;
}
```

## Angular Implementation Notes

- Distinguish between hard approval gates and soft review checkpoints.
- Capture decision metadata in the same state graph as the rest of the workflow.
- Prefer inline explanation plus action controls over unexplained modal interruptions.
- Let parent workflow state decide whether execution can continue.

## Failure States

- the checkpoint explains too little for a real decision
- users cannot tell whether the workflow is paused or broken
- decision metadata is lost after refresh
- a rejected step still appears as completed in the timeline
- checkpoints appear too often and train users to click through

## Accessibility Checklist

- Make the checkpoint reason explicit and concise.
- Ensure decision controls and optional notes are keyboard accessible.
- Use headings and grouping so review context is easy to scan.
- Keep pause states visible to screen readers and sighted users alike.

## Testing Checklist

- checkpoint pause-state tests
- approval versus review-path tests
- decision metadata persistence tests
- rejected-path rendering tests
- keyboard and focus flow tests

## Recruiter Talking Points

- Shows that the repo addresses governance and user judgment, not only automation.
- Useful for enterprise and regulated product conversations.
- Demonstrates understanding of the difference between approval UX and broader review workflows.
