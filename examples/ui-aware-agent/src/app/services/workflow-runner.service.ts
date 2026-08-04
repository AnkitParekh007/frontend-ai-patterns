import { Injectable } from '@angular/core';
import { AgentAction } from '../models/agent-action.model';
import { ExecutionLog } from '../models/execution-log.model';
import { WorkflowStep } from '../models/workflow-step.model';

export function buildWorkflowSteps(action: AgentAction): WorkflowStep[] {
  if (action.outcome === 'failure') {
    return [
      { id: 'step-1', label: 'Validate safe page context', status: 'completed' },
      { id: 'step-2', label: 'Wait for approval', status: 'approved' },
      { id: 'step-3', label: 'Execute mock action', status: 'failed' },
      { id: 'step-4', label: 'Prepare recovery plan', status: 'recovering' },
    ];
  }

  return [
    { id: 'step-1', label: 'Validate safe page context', status: 'completed' },
    { id: 'step-2', label: 'Wait for approval', status: 'approved' },
    { id: 'step-3', label: 'Execute mock action', status: 'running' },
    { id: 'step-4', label: 'Log workflow completion', status: 'completed' },
  ];
}

export function buildExecutionLogs(action: AgentAction): ExecutionLog[] {
  const timestamp = new Date().toISOString();
  const base: ExecutionLog[] = [
    {
      id: `log-${action.id}-1`,
      actionId: action.id,
      message: `Serialized safe page context for ${action.label}.`,
      level: 'info',
      createdAt: timestamp,
    },
  ];

  if (action.outcome === 'failure') {
    return [
      ...base,
      {
        id: `log-${action.id}-2`,
        actionId: action.id,
        message: `Mock execution failed. Recovery guidance prepared for ${action.label}.`,
        level: 'error',
        createdAt: timestamp,
      },
    ];
  }

  return [
    ...base,
    {
      id: `log-${action.id}-2`,
      actionId: action.id,
      message: `Mock execution completed successfully for ${action.label}.`,
      level: 'info',
      createdAt: timestamp,
    },
  ];
}

@Injectable({ providedIn: 'root' })
export class WorkflowRunnerService {
  run(action: AgentAction): WorkflowStep[] {
    return buildWorkflowSteps(action);
  }

  createLogs(action: AgentAction): ExecutionLog[] {
    return buildExecutionLogs(action);
  }
}
