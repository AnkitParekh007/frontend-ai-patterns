export interface RecoveryPlan {
  id: string;
  cause: string;
  retryable: boolean;
  nextStep: string;
  fallbackLabel?: string;
  escalationPath?: string;
}
