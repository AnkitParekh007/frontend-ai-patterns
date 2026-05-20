export interface Guardrail {
  policy: string;
  enforced: boolean;
  reason?: string;
  severity?: "info" | "warning" | "block";
}
