export interface ApprovalRequest {
  id: string;
  title: string;
  riskLevel: "low" | "medium" | "high";
  reason: string;
  actionSummary: string;
  decision?: "approved" | "rejected";
  decidedAt?: string;
}
