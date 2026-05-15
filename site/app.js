const sections = [
  {
    title: "Start",
    items: [
      {
        label: "README",
        path: "README.md",
        subtitle: "Project overview, architecture map, and contribution entry points.",
      },
      {
        label: "Architecture Overview",
        path: "docs/architecture.md",
        subtitle: "High-level system boundaries for AI frontend work.",
      },
      {
        label: "Angular Checklist",
        path: "docs/angular-ai-frontend-checklist.md",
        subtitle: "Practical Angular review checklist for AI product UIs.",
      },
    ],
  },
  {
    title: "Patterns",
    items: [
      {
        label: "Streaming Message UX",
        path: "patterns/01-streaming-message-ux.md",
        subtitle: "Token-by-token rendering, status changes, and streaming polish.",
      },
      {
        label: "RAG Source Cards",
        path: "patterns/02-rag-source-cards.md",
        subtitle: "Grounded evidence display and citation trust.",
      },
      {
        label: "Tool-Call Timeline",
        path: "patterns/03-tool-call-timeline.md",
        subtitle: "Visible tool execution state and operator clarity.",
      },
      {
        label: "Action Approval Flow",
        path: "patterns/04-action-approval-flow.md",
        subtitle: "Human approval before risky actions.",
      },
      {
        label: "Agent State Machine",
        path: "patterns/05-agent-state-machine.md",
        subtitle: "Understandable UI states for agent workflows.",
      },
      {
        label: "Context Serializer",
        path: "patterns/06-context-serializer.md",
        subtitle: "Safe UI context boundaries for agent input.",
      },
      {
        label: "MCP Tool UI",
        path: "patterns/07-mcp-tool-ui.md",
        subtitle: "Frontend contracts for tool and MCP interaction.",
      },
      {
        label: "Human In The Loop",
        path: "patterns/08-human-in-the-loop.md",
        subtitle: "Pause, approve, revise, and operator review states.",
      },
      {
        label: "Error Recovery And Retry",
        path: "patterns/09-error-recovery-and-retry.md",
        subtitle: "Retry semantics and user-visible recovery states.",
      },
      {
        label: "Enterprise Guardrails",
        path: "patterns/10-enterprise-guardrails.md",
        subtitle: "Policy, role, and audit-aware interaction design.",
      },
    ],
  },
  {
    title: "Examples",
    items: [
      {
        label: "Angular Examples",
        path: "examples/angular/README.md",
        subtitle: "Angular-oriented composition notes and examples.",
      },
      {
        label: "TypeScript Models",
        path: "examples/typescript-models/README.md",
        subtitle: "Reusable model pack for AI UI contracts.",
      },
      {
        label: "Mock Data",
        path: "examples/mock-data/README.md",
        subtitle: "Fixtures for streaming, citations, tools, and approvals.",
      },
    ],
  },
];

const nav = document.getElementById("nav");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");
const markdownBody = document.getElementById("markdown-body");

marked.setOptions({
  gfm: true,
  breaks: false,
});

function buildNav() {
  sections.forEach((section) => {
    const group = document.createElement("div");
    group.className = "nav-group";
    const heading = document.createElement("h3");
    heading.textContent = section.title;
    group.appendChild(heading);

    section.items.forEach((item) => {
      const link = document.createElement("a");
      link.className = "nav-link";
      link.href = `#${encodeURIComponent(item.path)}`;
      link.dataset.path = item.path;
      link.textContent = item.label;
      group.appendChild(link);
    });

    nav.appendChild(group);
  });
}

function findItem(path) {
  for (const section of sections) {
    const hit = section.items.find((item) => item.path === path);
    if (hit) {
      return hit;
    }
  }
  return sections[0].items[0];
}

async function loadPage() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, "")) || "README.md";
  const item = findItem(hash);

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.path === item.path);
  });

  pageTitle.textContent = item.label;
  pageSubtitle.textContent = item.subtitle;

  const response = await fetch(item.path);
  if (!response.ok) {
    markdownBody.innerHTML = `<p>Could not load <code>${item.path}</code>.</p>`;
    return;
  }

  const markdown = await response.text();
  markdownBody.innerHTML = marked.parse(markdown);
}

window.addEventListener("hashchange", loadPage);
buildNav();
loadPage();
