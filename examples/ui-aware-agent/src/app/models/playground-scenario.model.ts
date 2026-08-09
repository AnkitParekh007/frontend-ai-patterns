export type PlaygroundScenarioId =
  | 'happy-path'
  | 'retrieval-empty'
  | 'tool-failure'
  | 'stalled-stream';

export type PlaygroundPhase =
  | 'context'
  | 'streaming'
  | 'retrieval'
  | 'citation'
  | 'tool-plan'
  | 'approval'
  | 'execution'
  | 'result'
  | 'recovery';

export type PlaygroundEventStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'blocked'
  | 'recovering';

export interface PlaygroundEvent {
  id: string;
  phase: PlaygroundPhase;
  label: string;
  detail: string;
  status: PlaygroundEventStatus;
}

export interface PlaygroundCitation {
  id: string;
  title: string;
  source: string;
  excerpt: string;
}

export interface PlaygroundToolCall {
  id: string;
  name: string;
  summary: string;
  status: 'planned' | 'awaiting-approval' | 'approved' | 'completed' | 'failed' | 'blocked';
}

export interface PlaygroundScenario {
  id: PlaygroundScenarioId;
  label: string;
  description: string;
  prompt: string;
  safeContext: string[];
  events: PlaygroundEvent[];
  citations: PlaygroundCitation[];
  toolCalls: PlaygroundToolCall[];
  answer: string;
  requiresApproval: boolean;
  retryable: boolean;
  retried: boolean;
  backendBoundary: string;
}
