import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  PlaygroundScenario,
  PlaygroundScenarioId,
} from '../models/playground-scenario.model';
import { PlaygroundScenarioService } from '../services/playground-scenario.service';

@Component({
  selector: 'app-pattern-playground',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="surface playground" aria-labelledby="pattern-playground-title">
      <div class="surface-header playground-header">
        <div>
          <p class="section-kicker">Trustworthy AI pattern playground</p>
          <h2 id="pattern-playground-title">Run the full lifecycle without provider credentials</h2>
          <p class="playground-intro">
            Streaming → retrieval → citations → tool plan → approval → execution → grounded result → recovery.
            Every scenario is fixture-driven and deterministic.
          </p>
        </div>
        <span class="chip">Angular reference</span>
      </div>

      <div class="scenario-picker" aria-label="Playground scenarios">
        <button
          *ngFor="let option of scenarioOptions"
          type="button"
          class="scenario-button"
          [class.active]="scenario().id === option.id"
          [attr.aria-pressed]="scenario().id === option.id"
          (click)="selectScenario(option.id)">
          <strong>{{ option.label }}</strong>
          <span>{{ option.detail }}</span>
        </button>
      </div>

      <div class="playground-grid">
        <div class="playground-main">
          <article class="playground-card">
            <div class="playground-card-header">
              <div>
                <span class="section-kicker">Prompt</span>
                <h3>{{ scenario().label }}</h3>
              </div>
              <span class="chip muted">{{ progressLabel() }}</span>
            </div>
            <p class="prompt-copy">“{{ scenario().prompt }}”</p>
            <p>{{ scenario().description }}</p>
          </article>

          <article class="playground-card">
            <div class="playground-card-header">
              <div>
                <span class="section-kicker">Runtime trace</span>
                <h3>Visible state machine</h3>
              </div>
              <button type="button" class="text-button" (click)="reset()">Reset</button>
            </div>

            <ol class="pattern-trace">
              <li *ngFor="let runtimeEvent of visibleEvents()">
                <span
                  class="trace-status"
                  [attr.data-state]="runtimeEvent.status"
                  [attr.aria-label]="runtimeEvent.status">
                  {{ runtimeEvent.status }}
                </span>
                <div>
                  <strong>{{ runtimeEvent.label }}</strong>
                  <small>{{ runtimeEvent.phase }}</small>
                  <p>{{ runtimeEvent.detail }}</p>
                </div>
              </li>
            </ol>

            <div class="playground-actions">
              <button type="button" (click)="next()" [disabled]="visibleEvents().length >= scenario().events.length">
                Next state
              </button>
              <button type="button" class="secondary" (click)="runToBoundary()">
                Run to boundary
              </button>
              <button
                *ngIf="scenario().retryable && !scenario().retried && hasFailedStream()"
                type="button"
                class="secondary"
                (click)="retry()">
                Retry stalled stream
              </button>
            </div>

            <p class="sr-announcement" aria-live="polite" aria-atomic="true">{{ announcement() }}</p>
          </article>

          <article class="approval-panel playground-approval" *ngIf="approvalVisible()">
            <div class="approval-header">
              <div>
                <p class="section-kicker">Human-in-the-loop boundary</p>
                <h3>Approval required before execution</h3>
              </div>
              <span class="risk-badge">explicit gate</span>
            </div>
            <p>
              The UI can propose and explain an action, but execution remains blocked until the operator decides.
            </p>
            <div class="approval-actions">
              <button type="button" (click)="approve()">Approve deterministic tool</button>
              <button type="button" class="secondary" (click)="reject()">Reject</button>
            </div>
          </article>

          <article class="playground-card result-card">
            <span class="section-kicker">Grounded result</span>
            <h3>What the UI is allowed to claim</h3>
            <p>{{ scenario().answer }}</p>
          </article>
        </div>

        <aside class="playground-side">
          <article class="playground-card">
            <span class="section-kicker">Safe context</span>
            <h3>Serialized UI snapshot</h3>
            <ul class="compact-list">
              <li *ngFor="let item of scenario().safeContext"><code>{{ item }}</code></li>
            </ul>
          </article>

          <article class="playground-card">
            <span class="section-kicker">Citations</span>
            <h3>Inspectable evidence</h3>
            <div *ngIf="scenario().citations.length; else noCitations" class="citation-stack">
              <article *ngFor="let citation of scenario().citations" class="citation-card">
                <strong>{{ citation.title }}</strong>
                <code>{{ citation.source }}</code>
                <p>{{ citation.excerpt }}</p>
              </article>
            </div>
            <ng-template #noCitations>
              <p class="muted-copy">No citations are rendered for this scenario. The UI does not fabricate evidence.</p>
            </ng-template>
          </article>

          <article class="playground-card">
            <span class="section-kicker">Tool visibility</span>
            <h3>Typed execution plan</h3>
            <div *ngIf="scenario().toolCalls.length; else noTools" class="tool-stack">
              <article *ngFor="let tool of scenario().toolCalls" class="tool-card">
                <div class="tool-card-head">
                  <code>{{ tool.name }}</code>
                  <span class="trace-status" [attr.data-state]="tool.status">{{ tool.status }}</span>
                </div>
                <p>{{ tool.summary }}</p>
              </article>
            </div>
            <ng-template #noTools>
              <p class="muted-copy">No tool is planned when the scenario does not meet grounding requirements.</p>
            </ng-template>
          </article>

          <article class="playground-card boundary-card">
            <span class="section-kicker">Backend enforcement boundary</span>
            <h3>Frontend visibility is not authorization</h3>
            <p>{{ scenario().backendBoundary }}</p>
          </article>
        </aside>
      </div>
    </section>
  `,
})
export class PatternPlaygroundComponent {
  private readonly scenarioService = inject(PlaygroundScenarioService);

  readonly scenarioOptions: ReadonlyArray<{
    id: PlaygroundScenarioId;
    label: string;
    detail: string;
  }> = [
    { id: 'happy-path', label: 'Grounded flow', detail: 'Evidence + approval + success' },
    { id: 'retrieval-empty', label: 'No evidence', detail: 'Suppress citations and execution' },
    { id: 'tool-failure', label: 'Tool failure', detail: 'Fail visibly and recover' },
    { id: 'stalled-stream', label: 'Stalled stream', detail: 'Retry without losing context' },
  ];

  readonly scenario = signal<PlaygroundScenario>(this.scenarioService.build('happy-path'));
  readonly visibleCount = signal(1);
  readonly approvalDecision = signal<'approved' | 'rejected' | null>(null);
  readonly announcement = signal('Grounded flow loaded. Use Next state or Run to boundary to inspect the lifecycle.');

  readonly visibleEvents = computed(() => this.scenario().events.slice(0, this.visibleCount()));
  readonly approvalVisible = computed(() => {
    if (!this.scenario().requiresApproval || this.approvalDecision()) {
      return false;
    }
    return this.visibleEvents().some(runtimeEvent => runtimeEvent.phase === 'approval');
  });

  selectScenario(id: PlaygroundScenarioId): void {
    this.scenario.set(this.scenarioService.build(id));
    this.visibleCount.set(1);
    this.approvalDecision.set(null);
    this.announcement.set(`${this.scenario().label} loaded. The deterministic trace is reset.`);
  }

  next(): void {
    const current = this.scenario();
    const nextEvent = current.events[this.visibleCount()];
    if (!nextEvent) {
      this.announcement.set('The scenario trace is complete.');
      return;
    }

    if (nextEvent.phase === 'execution' && current.requiresApproval && !this.approvalDecision()) {
      this.runToBoundary();
      this.announcement.set('Execution is blocked until the approval decision is explicit.');
      return;
    }

    this.visibleCount.update(count => Math.min(count + 1, current.events.length));
    this.announcement.set(`${nextEvent.label}: ${nextEvent.status}.`);
  }

  runToBoundary(): void {
    const current = this.scenario();
    if (current.requiresApproval && !this.approvalDecision()) {
      const approvalIndex = current.events.findIndex(runtimeEvent => runtimeEvent.phase === 'approval');
      this.visibleCount.set(approvalIndex >= 0 ? approvalIndex + 1 : current.events.length);
      this.announcement.set('Paused at the human approval boundary. No execution has occurred.');
      return;
    }

    this.visibleCount.set(current.events.length);
    this.announcement.set('The deterministic scenario trace is fully visible.');
  }

  approve(): void {
    this.approvalDecision.set('approved');
    this.scenario.update(current => this.scenarioService.decide(current, 'approved'));
    this.visibleCount.set(this.scenario().events.length);
    this.announcement.set(
      this.scenario().id === 'tool-failure'
        ? 'The approved deterministic tool failed safely. Recovery evidence is visible.'
        : 'The operator approved the deterministic tool. Execution and grounded result are visible.',
    );
  }

  reject(): void {
    this.approvalDecision.set('rejected');
    this.scenario.update(current => this.scenarioService.decide(current, 'rejected'));
    this.visibleCount.set(this.scenario().events.length);
    this.announcement.set('The operator rejected the action. Tool execution remained blocked.');
  }

  retry(): void {
    const current = this.scenario();
    if (current.id !== 'stalled-stream') {
      return;
    }

    this.scenario.set(this.scenarioService.build('stalled-stream', true));
    this.visibleCount.set(1);
    this.approvalDecision.set(null);
    this.announcement.set('The stalled stream was retried with the same safe context snapshot.');
  }

  reset(): void {
    const current = this.scenario();
    this.scenario.set(this.scenarioService.build(current.id));
    this.visibleCount.set(1);
    this.approvalDecision.set(null);
    this.announcement.set(`${this.scenario().label} reset.`);
  }

  hasFailedStream(): boolean {
    return this.visibleEvents().some(
      runtimeEvent => runtimeEvent.phase === 'streaming' && runtimeEvent.status === 'failed',
    );
  }

  progressLabel(): string {
    return `${this.visibleEvents().length}/${this.scenario().events.length} states`;
  }
}
