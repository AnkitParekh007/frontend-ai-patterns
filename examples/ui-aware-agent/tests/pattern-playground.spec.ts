import '@angular/compiler';
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyApprovalDecision,
  buildPlaygroundScenario,
} from '../src/app/services/playground-scenario.service';

test('grounded scenario keeps tool execution behind explicit approval', () => {
  const scenario = buildPlaygroundScenario('happy-path');
  const approvalIndex = scenario.events.findIndex(event => event.phase === 'approval');
  const executionIndex = scenario.events.findIndex(event => event.phase === 'execution');

  assert.equal(scenario.requiresApproval, true);
  assert.equal(approvalIndex >= 0, true);
  assert.equal(executionIndex > approvalIndex, true);
  assert.equal(scenario.events[approvalIndex]?.status, 'running');
  assert.equal(scenario.events[executionIndex]?.status, 'pending');
  assert.equal(scenario.toolCalls[0]?.status, 'awaiting-approval');
});

test('approval completes deterministic execution without bypassing the gate', () => {
  const approved = applyApprovalDecision(buildPlaygroundScenario('happy-path'), 'approved');

  assert.equal(approved.events.find(event => event.phase === 'approval')?.status, 'completed');
  assert.equal(approved.events.find(event => event.phase === 'execution')?.status, 'completed');
  assert.equal(approved.toolCalls[0]?.status, 'completed');
  assert.match(approved.answer, /after approval/i);
});

test('rejection blocks tool execution and never claims success', () => {
  const rejected = applyApprovalDecision(buildPlaygroundScenario('happy-path'), 'rejected');

  assert.equal(rejected.events.find(event => event.phase === 'execution')?.status, 'blocked');
  assert.equal(rejected.toolCalls[0]?.status, 'blocked');
  assert.match(rejected.answer, /No tool executed/i);
});

test('retrieval failure suppresses citations and tool planning', () => {
  const scenario = buildPlaygroundScenario('retrieval-empty');

  assert.equal(scenario.citations.length, 0);
  assert.equal(scenario.toolCalls.length, 0);
  assert.equal(scenario.events.find(event => event.phase === 'retrieval')?.status, 'failed');
  assert.equal(scenario.events.find(event => event.phase === 'citation')?.status, 'blocked');
  assert.equal(scenario.events.find(event => event.phase === 'execution')?.status, 'blocked');
  assert.match(scenario.answer, /no trusted evidence/i);
});

test('failed tool call is visible and exposes recovery state', () => {
  const approvedFailure = applyApprovalDecision(buildPlaygroundScenario('tool-failure'), 'approved');

  assert.equal(approvedFailure.events.find(event => event.phase === 'execution')?.status, 'failed');
  assert.equal(approvedFailure.events.find(event => event.phase === 'recovery')?.status, 'recovering');
  assert.equal(approvedFailure.toolCalls[0]?.status, 'failed');
  assert.match(approvedFailure.answer, /failed safely/i);
});

test('stalled stream retry keeps the same safe context and reaches grounded flow', () => {
  const stalled = buildPlaygroundScenario('stalled-stream');
  const retried = buildPlaygroundScenario('stalled-stream', true);

  assert.equal(stalled.events.find(event => event.phase === 'streaming')?.status, 'failed');
  assert.equal(stalled.retryable, true);
  assert.deepEqual(retried.safeContext, stalled.safeContext);
  assert.equal(retried.retried, true);
  assert.equal(retried.events.find(event => event.phase === 'retrieval')?.status, 'completed');
  assert.equal(retried.citations.length > 0, true);
});

test('browser fixture documents backend enforcement boundary explicitly', () => {
  const scenario = buildPlaygroundScenario('happy-path');

  assert.match(scenario.backendBoundary, /production backend/i);
  assert.match(scenario.backendBoundary, /authorization/i);
  assert.match(scenario.backendBoundary, /provider secrets/i);
});
