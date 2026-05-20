export interface HumanCheckpoint {
  id: string;
  kind: "review" | "clarification" | "approval";
  prompt: string;
  resolved: boolean;
  assignedTo?: string;
}
