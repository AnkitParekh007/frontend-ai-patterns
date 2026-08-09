import { Injectable } from '@angular/core';
import {
  PlaygroundEvent,
  PlaygroundScenario,
  PlaygroundScenarioId,
  PlaygroundToolCall,
} from '../models/playground-scenario.model';

const SAFE_CONTEXT = [
  'route=/customers/customer-42/workspace',
  'role=operations-lead',
  'record=customer-42',
  'visibleFields=status,owner,nextReviewDate,escalationTier',
];

const CITATIONS = [
  {
    id: 'citation-1',
    title: 'Onboarding escalation policy',
    source: 'kb://customer-ops/onboarding-escalation',
    excerpt: 'Escalate onboarding only after procurement status and missing setup tasks are verified.',
  },
  {
    id: 'citation-2',
    title: 'Customer 42 implementation note',
    source: 'record://customer-42/implementation-note',
    excerpt: 'Implementation is blocked on procurement approval and two missing setup tasks.',
  },
];

const BACKEND_BOUNDARY =
  'The browser only renders deterministic fixtures. A production backend must own retrieval credentials, authorization, approval enforcement, tool execution, audit logging, and provider secrets.';

function event(
  id: string,
  phase: PlaygroundEvent['phase'],
  label: string,
  detail: string,
  status: PlaygroundEvent['status'],
): PlaygroundEvent {
  return { id, phase, label, detail, status };
}

export function buildPlaygroundScenario(
  id: PlaygroundScenarioId,
  retried = false,
): PlaygroundScenario {
  if (id === 'retrieval-empty') {
    return {
      id,
      label: 'No grounded evidence',
      description: 'Retrieval returns no trusted sources, so citations and tool execution are suppressed.',
      prompt: 'Can we submit the onboarding workflow for Acme Manufacturing?',
      safeContext: SAFE_CONTEXT,
      events: [
        event('context', 'context', 'Serialize visible page context', 'Only route, role, selected record, and visible fields are shared.', 'completed'),
        event('streaming', 'streaming', 'Open assistant stream', 'The UI enters a visible streaming state.', 'completed'),
        event('retrieval', 'retrieval', 'Retrieve trusted evidence', 'No trusted evidence matched the request.', 'failed'),
        event('citation', 'citation', 'Render citations', 'Citation rendering is blocked because retrieval produced no grounded sources.', 'blocked'),
        event('tool-plan', 'tool-plan', 'Plan workflow tool', 'Tool planning is blocked because the answer is not grounded.', 'blocked'),
        event('approval', 'approval', 'Request approval', 'No approval is requested because there is no executable plan.', 'blocked'),
        event('execution', 'execution', 'Execute tool', 'No tool execution occurs.', 'blocked'),
        event('result', 'result', 'Return grounded result', 'The UI explains that evidence is missing instead of inventing an answer.', 'completed'),
      ],
      citations: [],
      toolCalls: [],
      answer: 'I cannot recommend submitting the workflow because no trusted evidence was retrieved. Review the record or retry retrieval before taking action.',
      requiresApproval: false,
      retryable: false,
      retried: false,
      backendBoundary: BACKEND_BOUNDARY,
    };
  }

  if (id === 'stalled-stream' && !retried) {
    return {
      id,
      label: 'Stalled stream → retry',
      description: 'The stream stalls after context serialization and exposes a retry path without losing context.',
      prompt: 'Summarize the onboarding blockers and propose the safest next action.',
      safeContext: SAFE_CONTEXT,
      events: [
        event('context', 'context', 'Serialize visible page context', 'The safe context snapshot is retained for retry.', 'completed'),
        event('streaming', 'streaming', 'Open assistant stream', 'The deterministic fixture simulates a stalled stream.', 'failed'),
        event('recovery', 'recovery', 'Offer retry', 'Retry is available and the previous context remains inspectable.', 'recovering'),
      ],
      citations: [],
      toolCalls: [],
      answer: 'The response stream stalled before retrieval completed. Retry without discarding the visible page context.',
      requiresApproval: false,
      retryable: true,
      retried: false,
      backendBoundary: BACKEND_BOUNDARY,
    };
  }

  const isToolFailure = id === 'tool-failure';
  const recoveredStream = id === 'stalled-stream' && retried;

  return {
    id,
    label: recoveredStream ? 'Recovered stream' : isToolFailure ? 'Failed tool → recovery' : 'Grounded happy path',
    description: recoveredStream
      ? 'The retry keeps the same safe context and completes the grounded, approval-first lifecycle.'
      : isToolFailure
        ? 'Retrieval and approval succeed, but the tool fails and the UI surfaces a recovery plan.'
        : 'A deterministic grounded flow from streaming through human approval and visible execution.',
    prompt: isToolFailure
      ? 'Retry the failed customer sync using the approved recovery playbook.'
      : 'Can we submit the onboarding workflow for Acme Manufacturing?',
    safeContext: SAFE_CONTEXT,
    events: [
      event('context', 'context', 'Serialize visible page context', recoveredStream ? 'The exact safe context from the stalled attempt is reused.' : 'Hidden application state is excluded.', 'completed'),
      event('streaming', 'streaming', recoveredStream ? 'Resume assistant stream' : 'Open assistant stream', recoveredStream ? 'The retry resumes from a deterministic clean boundary.' : 'Streaming state is explicit and inspectable.', 'completed'),
      event('retrieval', 'retrieval', 'Retrieve trusted evidence', 'Two trusted fixture sources match the selected record.', 'completed'),
      event('citation', 'citation', 'Render citations', 'Grounded sources remain attached to the response.', 'completed'),
      event('tool-plan', 'tool-plan', 'Plan workflow tool', 'A typed tool proposal is shown before execution.', 'completed'),
      event('approval', 'approval', 'Request human approval', 'Execution pauses until the operator explicitly approves or rejects.', 'running'),
      event('execution', 'execution', 'Execute mock tool', isToolFailure ? 'The deterministic tool fixture fails safely.' : 'Execution remains blocked until approval.', 'pending'),
      event('result', 'result', 'Return grounded result', isToolFailure ? 'Failure is reported without claiming success.' : 'The final answer will include evidence and execution outcome.', 'pending'),
      ...(isToolFailure
        ? [event('recovery', 'recovery', 'Prepare recovery plan', 'The UI preserves failure evidence and offers a safe retry path.', 'pending')]
        : []),
    ],
    citations: CITATIONS,
    toolCalls: [
      {
        id: isToolFailure ? 'tool-recovery-sync' : 'tool-submit-onboarding',
        name: isToolFailure ? 'retry_customer_sync' : 'submit_onboarding_workflow',
        summary: isToolFailure
          ? 'Retry the selected record sync with a bounded recovery plan.'
          : 'Submit the selected onboarding workflow after human approval.',
        status: 'awaiting-approval',
      },
    ],
    answer: isToolFailure
      ? 'The recovery tool has not run yet. Approval is required before the deterministic failure fixture executes.'
      : 'The evidence supports the proposed onboarding workflow, but no action will run until you approve it.',
    requiresApproval: true,
    retryable: isToolFailure,
    retried: recoveredStream,
    backendBoundary: BACKEND_BOUNDARY,
  };
}

export function applyApprovalDecision(
  scenario: PlaygroundScenario,
  decision: 'approved' | 'rejected',
): PlaygroundScenario {
  const toolFailure = scenario.id === 'tool-failure';

  if (decision === 'rejected') {
    return {
      ...scenario,
      events: scenario.events.map((current): PlaygroundEvent => {
        if (current.phase === 'approval') {
          return { ...current, status: 'completed', detail: 'The operator rejected the proposed action.' };
        }
        if (current.phase === 'execution') {
          return { ...current, status: 'blocked', detail: 'Execution is blocked after rejection.' };
        }
        if (current.phase === 'result') {
          return { ...current, status: 'completed', detail: 'The result records that no action was executed.' };
        }
        if (current.phase === 'recovery') {
          return { ...current, status: 'completed', detail: 'No recovery is required because execution never started.' };
        }
        return current;
      }),
      toolCalls: scenario.toolCalls.map((tool): PlaygroundToolCall => ({ ...tool, status: 'blocked' })),
      answer: 'The proposed action was rejected. No tool executed, and the grounded evidence remains available for review.',
    };
  }

  return {
    ...scenario,
    events: scenario.events.map((current): PlaygroundEvent => {
      if (current.phase === 'approval') {
        return { ...current, status: 'completed', detail: 'The operator approved the typed tool proposal.' };
      }
      if (current.phase === 'execution') {
        return toolFailure
          ? { ...current, status: 'failed', detail: 'The deterministic tool fixture failed safely after approval.' }
          : { ...current, status: 'completed', detail: 'The deterministic mock tool completed after approval.' };
      }
      if (current.phase === 'result') {
        return toolFailure
          ? { ...current, status: 'completed', detail: 'The answer reports the failed execution accurately.' }
          : { ...current, status: 'completed', detail: 'The answer includes evidence and the completed mock execution outcome.' };
      }
      if (current.phase === 'recovery') {
        return { ...current, status: 'recovering', detail: 'A bounded recovery plan is available after the failed tool call.' };
      }
      return current;
    }),
    toolCalls: scenario.toolCalls.map((tool): PlaygroundToolCall => ({
      ...tool,
      status: toolFailure ? 'failed' : 'completed',
    })),
    answer: toolFailure
      ? 'The approved recovery tool failed safely. No success is claimed; inspect the failure evidence before retrying.'
      : 'The onboarding workflow completed in deterministic mock mode after approval. The result remains linked to the trusted evidence above.',
  };
}

@Injectable({ providedIn: 'root' })
export class PlaygroundScenarioService {
  build(id: PlaygroundScenarioId, retried = false): PlaygroundScenario {
    return buildPlaygroundScenario(id, retried);
  }

  decide(scenario: PlaygroundScenario, decision: 'approved' | 'rejected'): PlaygroundScenario {
    return applyApprovalDecision(scenario, decision);
  }
}
