export interface StreamChunk {
  messageId: string;
  sequence: number;
  text: string;
  done: boolean;
  emittedAt?: string;
}

export interface AssistantMessage {
  id: string;
  role: "assistant";
  content: string;
  status: "thinking" | "streaming" | "complete" | "failed";
  retryToken?: string;
}
