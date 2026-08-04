import { Injectable } from '@angular/core';
import { AgentAction } from '../models/agent-action.model';
import { ApprovalRequest } from '../models/approval-request.model';
import { UiContext } from '../models/ui-context.model';

export function buildApprovalRequest(action: AgentAction, context: UiContext): ApprovalRequest {
  return {
    id: `approval-${action.id}`,
    actionId: action.id,
    title: action.label,
    riskLevel: action.riskLevel,
    summary: action.description,
    approved: null,
    reason: `This action affects ${context.selectedRecordId} and should be reviewed before execution.`,
  };
}

@Injectable({ providedIn: 'root' })
export class ActionApprovalService {
  requiresApproval(action: AgentAction): boolean {
    return action.requiresApproval || action.riskLevel !== 'low';
  }

  createRequest(action: AgentAction, context: UiContext): ApprovalRequest {
    return buildApprovalRequest(action, context);
  }
}
