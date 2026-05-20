export interface McpToolCard {
  id: string;
  title: string;
  capability: string;
  status: "available" | "running" | "blocked" | "failed";
  reason?: string;
}
