import { Injectable } from '@angular/core';
import { AgentAction } from '../models/agent-action.model';
import { UiContext } from '../models/ui-context.model';

export function createSuggestedActions(context: UiContext): AgentAction[] {
  return [
    {
      id: 'action-review',
      label: 'Inspect onboarding blockers',
      description: `Review visible blockers and missing fields for ${context.selectedRecordId}.`,
      riskLevel: 'low',
      requiresApproval: false,
      outcome: 'success',
      category: 'review',
    },
    {
      id: 'action-workflow',
      label: 'Submit onboarding workflow',
      description: `Queue a workflow update for ${context.selectedRecordId} after human approval.`,
      riskLevel: 'medium',
      requiresApproval: true,
      outcome: 'success',
      category: 'workflow',
    },
    {
      id: 'action-recovery',
      label: 'Retry failed sync with recovery plan',
      description: `Run a mocked recovery path for ${context.selectedRecordId} after validating safe context.`,
      riskLevel: 'high',
      requiresApproval: true,
      outcome: 'failure',
      category: 'workflow',
    },
  ];
}

@Injectable({ providedIn: 'root' })
export class MockAgentService {
  suggestActions(context: UiContext): AgentAction[] {
    return createSuggestedActions(context);
  }
}
