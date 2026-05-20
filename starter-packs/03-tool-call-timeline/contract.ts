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
