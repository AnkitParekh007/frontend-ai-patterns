import '@angular/compiler';
import test from 'node:test';
import assert from 'node:assert/strict';

import { buildApprovalRequest } from '../src/app/services/action-approval.service';
import { buildUiContext } from '../src/app/services/context-serializer.service';
import { createSuggestedActions } from '../src/app/services/mock-agent.service';
import { buildExecutionLogs, buildWorkflowSteps } from '../src/app/services/workflow-runner.service';

test('context serializer builds safe selected-record context', () => {
  const context = buildUiContext({
    id: 'customer-42',
    route: '/customers/customer-42/workspace',
    pageTitle: 'Customer Operations Workspace',
    status: 'Pending review',
    owner: 'Priya Singh',
    visibleFields: ['status', 'owner', 'nextReviewDate'],
    role: 'operations-lead',
  });

  assert.deepEqual(context, {
    route: '/customers/customer-42/workspace',
    pageTitle: 'Customer Operations Workspace',
    selectedRecordId: 'customer-42',
    visibleFields: ['status', 'owner', 'nextReviewDate'],
    userRole: 'operations-lead',
    selectedRecordStatus: 'Pending review',
    selectedRecordOwner: 'Priya Singh',
  });
});

test('suggested action rendering data includes review, approval, and recovery actions', () => {
  const actions = createSuggestedActions({
    route: '/customers/customer-42/workspace',
    pageTitle: 'Customer Operations Workspace',
    selectedRecordId: 'customer-42',
    visibleFields: ['status'],
    userRole: 'operations-lead',
    selectedRecordStatus: 'Pending review',
    selectedRecordOwner: 'Priya Singh',
  });

  assert.equal(actions.length, 3);
  assert.equal(actions[0]?.requiresApproval, false);
  assert.equal(actions[1]?.requiresApproval, true);
  assert.equal(actions[2]?.outcome, 'failure');
});

test('approval flow builds a request with action and context details', () => {
  const request = buildApprovalRequest(
    {
      id: 'action-workflow',
      label: 'Submit onboarding workflow',
      description: 'Queue a workflow update.',
      riskLevel: 'medium',
      requiresApproval: true,
      outcome: 'success',
    },
    {
      route: '/customers/customer-42/workspace',
      pageTitle: 'Customer Operations Workspace',
      selectedRecordId: 'customer-42',
      visibleFields: ['status'],
      userRole: 'operations-lead',
      selectedRecordStatus: 'Pending review',
      selectedRecordOwner: 'Priya Singh',
    },
  );

  assert.equal(request.actionId, 'action-workflow');
  assert.equal(request.approved, null);
  assert.match(request.reason, /customer-42/);
});

test('action log builder records successful execution', () => {
  const logs = buildExecutionLogs({
    id: 'action-workflow',
    label: 'Submit onboarding workflow',
    description: 'Queue a workflow update.',
    riskLevel: 'medium',
    requiresApproval: true,
    outcome: 'success',
  });

  assert.equal(logs.length, 2);
  assert.equal(logs[1]?.level, 'info');
});

test('recovery state builder marks failure and recovery steps', () => {
  const steps = buildWorkflowSteps({
    id: 'action-recovery',
    label: 'Retry failed sync with recovery plan',
    description: 'Run mocked recovery path.',
    riskLevel: 'high',
    requiresApproval: true,
    outcome: 'failure',
  });

  assert.equal(steps.some(step => step.status === 'failed'), true);
  assert.equal(steps.at(-1)?.status, 'recovering');
});
