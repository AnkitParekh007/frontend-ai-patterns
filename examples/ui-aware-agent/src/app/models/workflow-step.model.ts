export interface WorkflowStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'approved' | 'completed' | 'failed' | 'recovering';
}
