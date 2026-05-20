import { signal, computed } from "@angular/core";

type TimelineStatus =
  | "queued"
  | "running"
  | "awaiting_approval"
  | "succeeded"
  | "failed";

interface ToolRun {
  id: string;
  toolName: string;
  status: TimelineStatus;
  summary: string;
}

interface ApprovalCard {
  id: string;
  title: string;
  riskLevel: "medium" | "high";
  decision?: "approved" | "rejected";
}

export class ToolApprovalShellExample {
  readonly timeline = signal<ToolRun[]>([]);
  readonly approvals = signal<ApprovalCard[]>([]);

  readonly pendingApprovals = computed(() =>
    this.approvals().filter((approval) => !approval.decision)
  );

  appendToolEvent(event: ToolRun): void {
    this.timeline.update((items) => [...items, event]);
  }

  queueApproval(approval: ApprovalCard): void {
    this.approvals.update((items) => [...items, approval]);
  }

  decideApproval(id: string, decision: "approved" | "rejected"): void {
    this.approvals.update((items) =>
      items.map((item) => (item.id === id ? { ...item, decision } : item))
    );
  }
}
