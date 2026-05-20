export interface RagCitation {
  id: string;
  title: string;
  sourceType: "policy" | "knowledge_base" | "document" | "ticket";
  snippet: string;
  confidence: number;
  url?: string;
  lastUpdatedAt?: string;
}
