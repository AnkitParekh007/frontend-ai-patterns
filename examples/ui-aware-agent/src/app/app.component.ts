import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AgentAction } from './models/agent-action.model';
import { ApprovalRequest } from './models/approval-request.model';
import { ExecutionLog } from './models/execution-log.model';
import { UiContext } from './models/ui-context.model';
import { WorkflowStep } from './models/workflow-step.model';
import { ActionApprovalService } from './services/action-approval.service';
import { ContextSerializerService, SerializableRecord } from './services/context-serializer.service';
import { MockAgentService } from './services/mock-agent.service';
import { WorkflowRunnerService } from './services/workflow-runner.service';

interface CustomerRecord {
  id: string;
  customer: string;
  product: string;
  status: string;
  owner: string;
  nextStep: string;
  risk: 'low' | 'medium' | 'high';
  lastTouchpoint: string;
  visibleFields: string[];
  notes: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="app-shell">
      <section class="workspace">
        <header class="hero">
          <div>
            <p class="eyebrow">UI-aware agent demo</p>
            <h1>Enterprise customer operations dashboard</h1>
            <p class="subtitle">
              Safe page context stays visible while a mocked agent proposes workflow actions,
              asks for approval, executes mock steps, and surfaces recovery states.
            </p>
          </div>

          <div class="hero-metrics">
            <article>
              <span>Selected record</span>
              <strong>{{ selectedRecord().customer }}</strong>
            </article>
            <article>
              <span>Current mode</span>
              <strong>Approval-first</strong>
            </article>
            <article>
              <span>Mock safety</span>
              <strong>No real automation</strong>
            </article>
          </div>
        </header>

        <div class="workspace-grid">
          <section class="surface">
            <div class="surface-header">
              <div>
                <p class="section-kicker">Queue</p>
                <h2>Products and customers</h2>
              </div>
              <span class="chip">{{ records.length }} records</span>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Next step</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    *ngFor="let record of records"
                    [class.selected]="record.id === selectedRecord().id"
                    tabindex="0"
                    (click)="selectRecord(record)"
                    (keydown.enter)="selectRecord(record)"
                    (keydown.space)="selectRecord(record); $event.preventDefault()">
                    <td>{{ record.customer }}</td>
                    <td>{{ record.product }}</td>
                    <td><span class="status-pill" [attr.data-risk]="record.risk">{{ record.status }}</span></td>
                    <td>{{ record.owner }}</td>
                    <td>{{ record.nextStep }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="detail-column">
            <article class="surface detail-panel">
              <div class="surface-header">
                <div>
                  <p class="section-kicker">Record detail</p>
                  <h2>{{ selectedRecord().customer }}</h2>
                </div>
                <span class="chip muted">{{ selectedRecord().product }}</span>
              </div>

              <dl class="detail-grid">
                <div><dt>Status</dt><dd>{{ selectedRecord().status }}</dd></div>
                <div><dt>Owner</dt><dd>{{ selectedRecord().owner }}</dd></div>
                <div><dt>Next step</dt><dd>{{ selectedRecord().nextStep }}</dd></div>
                <div><dt>Last touchpoint</dt><dd>{{ selectedRecord().lastTouchpoint }}</dd></div>
              </dl>

              <section class="field-list">
                <h3>Visible fields</h3>
                <div class="tags">
                  <span class="tag" *ngFor="let field of selectedRecord().visibleFields">{{ field }}</span>
                </div>
              </section>

              <section class="notes-panel">
                <h3>Operator notes</h3>
                <p>{{ selectedRecord().notes }}</p>
              </section>
            </article>

            <article class="surface timeline-panel">
              <div class="surface-header">
                <div>
                  <p class="section-kicker">Execution</p>
                  <h2>Action execution timeline</h2>
                </div>
                <span class="chip muted">{{ timelineLabel() }}</span>
              </div>

              <ol class="timeline">
                <li *ngFor="let step of steps()">
                  <span class="timeline-state" [attr.data-state]="step.status">{{ step.status }}</span>
                  <div>
                    <strong>{{ step.label }}</strong>
                  </div>
                </li>
              </ol>
            </article>
          </section>
        </div>
      </section>

      <aside class="agent-rail">
        <section class="panel">
          <p class="eyebrow">Agent side panel</p>
          <h2>Context inspector</h2>
          <dl class="context-grid">
            <div><dt>Route</dt><dd>{{ context().route }}</dd></div>
            <div><dt>Role</dt><dd>{{ context().userRole }}</dd></div>
            <div><dt>Record</dt><dd>{{ context().selectedRecordId }}</dd></div>
            <div><dt>Status</dt><dd>{{ context().selectedRecordStatus }}</dd></div>
            <div><dt>Owner</dt><dd>{{ context().selectedRecordOwner }}</dd></div>
            <div><dt>Visible fields</dt><dd>{{ context().visibleFields.join(', ') }}</dd></div>
          </dl>
        </section>

        <section class="panel">
          <h2>Suggested actions</h2>
          <button
            type="button"
            class="action-card"
            *ngFor="let action of actions()"
            [class.active]="selectedAction()?.id === action.id"
            [class.risky]="action.requiresApproval"
            (click)="pickAction(action)">
            <div class="action-head">
              <strong>{{ action.label }}</strong>
              <span class="risk-badge">{{ action.riskLevel }}</span>
            </div>
            <span>{{ action.description }}</span>
          </button>
        </section>

        <section class="approval-panel" *ngIf="approvalRequest() as approval">
          <div class="approval-header">
            <div>
              <p class="section-kicker">Approval card</p>
              <h2>{{ approval.title }}</h2>
            </div>
            <span class="risk-badge">{{ approval.riskLevel }}</span>
          </div>
          <p>{{ approval.summary }}</p>
          <p class="muted-copy">{{ approval.reason }}</p>
          <div class="approval-actions">
            <button type="button" (click)="approve()">Approve mock action</button>
            <button type="button" class="secondary" (click)="reject()">Reject</button>
          </div>
        </section>

        <section class="panel recovery-panel" [class.visible]="recoveryState()">
          <h2>Recovery and error panel</h2>
          <p *ngIf="recoveryState(); else healthyState">{{ recoveryState() }}</p>
          <ng-template #healthyState>
            <p>No active recovery. The current mocked workflow is healthy.</p>
          </ng-template>
        </section>

        <section class="panel">
          <h2>Action log</h2>
          <ul class="log-list">
            <li *ngFor="let log of logs()">
              <span class="log-level" [attr.data-level]="log.level">{{ log.level }}</span>
              <div>
                <strong>{{ log.message }}</strong>
                <small>{{ log.createdAt }}</small>
              </div>
            </li>
          </ul>
        </section>
      </aside>
    </main>
  `,
})
export class AppComponent {
  readonly records: CustomerRecord[] = [
    {
      id: 'customer-42',
      customer: 'Acme Manufacturing',
      product: 'Ops Copilot',
      status: 'Pending onboarding review',
      owner: 'Priya Singh',
      nextStep: 'Submit onboarding workflow',
      risk: 'medium',
      lastTouchpoint: '15 minutes ago',
      visibleFields: ['status', 'owner', 'nextReviewDate', 'escalationTier'],
      notes: 'Implementation blocked on procurement approval and two missing setup tasks.',
    },
    {
      id: 'customer-77',
      customer: 'Northwind Retail',
      product: 'Support Assist',
      status: 'Docs missing',
      owner: 'Marco Stein',
      nextStep: 'Request updated documents',
      risk: 'low',
      lastTouchpoint: '2 hours ago',
      visibleFields: ['status', 'owner', 'documentChecklist'],
      notes: 'The record is safe to review, but no workflow mutation is needed yet.',
    },
    {
      id: 'customer-91',
      customer: 'Helios Health',
      product: 'Workflow Agent',
      status: 'Sync failed',
      owner: 'Amina Yusuf',
      nextStep: 'Run recovery playbook',
      risk: 'high',
      lastTouchpoint: '4 minutes ago',
      visibleFields: ['status', 'owner', 'syncErrorCode', 'retryWindow'],
      notes: 'A previous sync timed out. Use the recovery path instead of retrying blindly.',
    },
  ];

  readonly selectedRecord = signal<CustomerRecord>(this.records[0]);
  readonly context = signal<UiContext>(this.serializeRecord(this.records[0]));
  readonly actions = signal<AgentAction[]>([]);
  readonly selectedAction = signal<AgentAction | null>(null);
  readonly approvalRequest = signal<ApprovalRequest | null>(null);
  readonly steps = signal<WorkflowStep[]>([
    { id: 'boot-1', label: 'Inspect selected record', status: 'completed' },
    { id: 'boot-2', label: 'Generate suggested action plan', status: 'running' },
  ]);
  readonly logs = signal<ExecutionLog[]>([
    {
      id: 'boot-log',
      actionId: 'boot',
      message: 'Initialized safe UI context and loaded the first record.',
      level: 'info',
      createdAt: new Date().toISOString(),
    },
  ]);
  readonly recoveryState = signal<string | null>(null);

  constructor(
    private readonly contextSerializer: ContextSerializerService,
    private readonly mockAgent: MockAgentService,
    private readonly approvalService: ActionApprovalService,
    private readonly workflowRunner: WorkflowRunnerService,
  ) {
    this.refreshActions();
  }

  selectRecord(record: CustomerRecord): void {
    this.selectedRecord.set(record);
    this.context.set(this.serializeRecord(record));
    this.selectedAction.set(null);
    this.approvalRequest.set(null);
    this.recoveryState.set(null);
    this.steps.set([
      { id: 'refresh-1', label: 'Serialize safe page context', status: 'completed' },
      { id: 'refresh-2', label: 'Refresh agent suggestions', status: 'running' },
    ]);
    this.logs.update(existing => [
      {
        id: `select-${record.id}`,
        actionId: 'selection',
        message: `Selected ${record.customer} and refreshed visible context.`,
        level: 'info',
        createdAt: new Date().toISOString(),
      },
      ...existing,
    ]);
    this.refreshActions();
  }

  pickAction(action: AgentAction): void {
    this.selectedAction.set(action);

    if (this.approvalService.requiresApproval(action)) {
      this.approvalRequest.set(this.approvalService.createRequest(action, this.context()));
      this.steps.set([
        { id: 'approval-1', label: 'Inspect selected record', status: 'completed' },
        { id: 'approval-2', label: 'Request approval for suggested action', status: 'running' },
        { id: 'approval-3', label: 'Execute mock action only after approval', status: 'pending' },
      ]);
      return;
    }

    this.approvalRequest.set(null);
    this.runSelectedAction(action);
  }

  approve(): void {
    const action = this.selectedAction();
    if (!action) {
      return;
    }

    const request = this.approvalRequest();
    this.approvalRequest.set(request ? { ...request, approved: true } : null);
    this.runSelectedAction(action);
  }

  reject(): void {
    const action = this.selectedAction();
    const request = this.approvalRequest();
    this.approvalRequest.set(request ? { ...request, approved: false } : null);
    this.recoveryState.set('The mocked workflow was not executed because approval was rejected. The operator can inspect context and choose a safer action.');
    this.steps.set([
      { id: 'reject-1', label: 'Request approval for suggested action', status: 'approved' },
      { id: 'reject-2', label: 'Reject risky workflow action', status: 'completed' },
      { id: 'reject-3', label: 'Offer safer recovery or review path', status: 'recovering' },
    ]);
    this.logs.update(existing => [
      {
        id: `reject-${action?.id ?? 'none'}`,
        actionId: action?.id ?? 'none',
        message: `Rejected ${action?.label ?? 'the selected action'} before execution.`,
        level: 'warning',
        createdAt: new Date().toISOString(),
      },
      ...existing,
    ]);
  }

  timelineLabel(): string {
    const failure = this.steps().some(step => step.status === 'failed');
    if (failure) {
      return 'Recovery path';
    }
    return this.selectedAction() ? 'Mock execution' : 'Planning';
  }

  private refreshActions(): void {
    const actions = this.mockAgent.suggestActions(this.context());
    this.actions.set(actions);
    this.steps.update(existing => existing.map((step, index) => index === existing.length - 1 ? { ...step, status: 'completed' } : step));
  }

  private runSelectedAction(action: AgentAction): void {
    this.recoveryState.set(null);
    const steps = this.workflowRunner.run(action);
    this.steps.set(steps);
    this.logs.update(existing => [...this.workflowRunner.createLogs(action), ...existing]);

    if (action.outcome === 'failure') {
      this.recoveryState.set('Mock execution failed safely. Validate the visible fields, inspect the context panel, and retry only after the recovery plan is reviewed.');
    }
  }

  private serializeRecord(record: CustomerRecord): UiContext {
    const serializable: SerializableRecord = {
      id: record.id,
      route: `/customers/${record.id}/workspace`,
      pageTitle: 'Customer Operations Workspace',
      status: record.status,
      owner: record.owner,
      visibleFields: record.visibleFields,
      role: 'operations-lead',
    };

    return this.contextSerializer.serialize(serializable);
  }
}
