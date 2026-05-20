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

export interface AgentStateSnapshot {
  state: AgentViewState;
  reason?: string;
  changedAt: string;
}
