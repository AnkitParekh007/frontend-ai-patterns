export interface ExecutionLog {
  id: string;
  actionId: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  createdAt: string;
}
