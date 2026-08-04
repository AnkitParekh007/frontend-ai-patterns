export interface ApprovalRequest {
  id: string;
  actionId: string;
  title: string;
  riskLevel: 'low' | 'medium' | 'high';
  summary: string;
  approved: boolean | null;
  reason: string;
}
