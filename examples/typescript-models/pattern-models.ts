export type AgentViewState =
  | "idle"
  | "thinking"
  | "retrieving_context"
  | "planning"
  | "awaiting_approval"
  | "executing_tool"
  | "completed"
  | "failed"
  | "recovering";

export interface StreamChunk {
  messageId: string;
  sequence: number;
  text: string;
  done: boolean;
  emittedAt?: string;
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  status?: "draft" | "streaming" | "complete" | "failed";
  retryToken?: string;
}

export interface RagCitation {
  id: string;
  title: string;
  sourceType: "policy" | "knowledge_base" | "document" | "ticket";
  snippet: string;
  confidence: number;
  url?: string;
  lastUpdatedAt?: string;
}

export interface ToolTimelineItem {
  id: string;
  toolName: string;
  status:
    | "queued"
    | "running"
    | "awaiting_approval"
    | "succeeded"
    | "failed"
    | "skipped"
    | "retried";
  summary: string;
  startedAt?: string;
  finishedAt?: string;
  auditLabel?: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  riskLevel: "low" | "medium" | "high";
  reason: string;
  actionSummary: string;
  decision?: "approved" | "rejected";
  decidedAt?: string;
}

export interface UiContextSnapshot {
  route: string;
  selectedRecordId?: string;
  actorRole?: string;
  visibleFields: string[];
  tenantId?: string;
  redactions?: string[];
}

export interface RecoveryPlan {
  id: string;
  cause: string;
  retryable: boolean;
  nextStep: string;
  fallbackLabel?: string;
  escalationPath?: string;
}
