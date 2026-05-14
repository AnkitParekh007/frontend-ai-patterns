import { computed, signal } from "@angular/core";
import type {
  AgentViewState,
  AssistantMessage,
  RagCitation,
  ToolTimelineItem,
} from "../typescript-models/pattern-models";

export class AgentShellExample {
  readonly messages = signal<AssistantMessage[]>([]);
  readonly citations = signal<RagCitation[]>([]);
  readonly timeline = signal<ToolTimelineItem[]>([]);
  readonly state = signal<AgentViewState>("idle");

  readonly isBusy = computed(() =>
    ["thinking", "retrieving_context", "planning", "executing_tool", "recovering"].includes(
      this.state(),
    ),
  );

  appendAssistantText(chunk: string) {
    const current = this.messages();
    const last = current.at(-1);

    if (last?.role === "assistant" && last.status === "streaming") {
      const updated = { ...last, content: `${last.content}${chunk}` };
      this.messages.set([...current.slice(0, -1), updated]);
      return;
    }

    this.messages.set([
      ...current,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: chunk,
        status: "streaming",
      },
    ]);
  }
}
