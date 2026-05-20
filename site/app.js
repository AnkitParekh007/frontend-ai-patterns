const sidebarNav = document.getElementById("sidebar-nav");
const primaryNav = document.getElementById("primary-nav");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const pageEyebrow = document.querySelector(".topbar-copy .eyebrow");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");
const pageUpdated = document.getElementById("page-updated");
const copyPathButton = document.getElementById("copy-path-button");
const editPageLink = document.getElementById("edit-page-link");
const markdownBody = document.getElementById("markdown-body");
const tocNav = document.getElementById("toc-nav");
const pager = document.getElementById("pager");
const themeButtons = Array.from(document.querySelectorAll("[data-theme-option]"));
const themeToggleButton = document.getElementById("theme-toggle-button");
const themeMenu = document.getElementById("theme-menu");
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

let manifest;
let flatItems = [];
let currentItem;

const LANDING_PAGE_HTML = `
  <section class="landing-hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <span class="hero-kicker">Angular + TypeScript + trustworthy AI UX</span>
        <h1>Design AI interfaces that feel inspectable, controlled, and enterprise-safe.</h1>
        <p>
          This repo is a fork-friendly frontend reference for streaming conversations, grounded
          citations, tool timelines, approval checkpoints, recovery states, and policy-aware UI.
          It is built for teams that want stronger interaction contracts than a generic chat demo.
        </p>
        <div class="hero-actions">
          <a class="button-primary" href="#docs/demo-gallery.md">Open demo gallery</a>
          <a class="button-primary" href="#docs/quickstart.md">Start with one pattern</a>
          <a class="button-secondary" href="#docs/use-cases.md">Match a real use case</a>
          <a class="button-secondary" href="#docs/examples.md">Open reusable assets</a>
        </div>
        <div class="hero-stat-grid">
          <article class="stat-card">
            <strong>10</strong>
            <span>pattern pages with starter-pack links, failure states, accessibility, and testing notes</span>
          </article>
          <article class="stat-card">
            <strong>5</strong>
            <span>assets per starter pack: contract, fixture, diagram, implementation, and testing checklist</span>
          </article>
          <article class="stat-card">
            <strong>1</strong>
            <span>goal: help teams adopt one trustworthy AI surface without swallowing a monolith</span>
          </article>
        </div>
      </div>
      <div class="hero-visual">
        <article class="stack-card">
          <h3>Trustworthy AI frontend architecture</h3>
          <p>Angular shell, typed state, retrieval evidence, visible tools, and enterprise checkpoints.</p>
          <div class="stack-grid">
            <div class="stack-node node-teal">
              <strong>Angular shell</strong>
              <span>messages, sources, approvals</span>
            </div>
            <div class="stack-node node-blue">
              <strong>View state</strong>
              <span>streaming, blocked, recovering</span>
            </div>
            <div class="stack-node node-gold">
              <strong>Tool timeline</strong>
              <span>intent, status, approval</span>
            </div>
            <div class="stack-node node-violet">
              <strong>Citations</strong>
              <span>grounding and evidence</span>
            </div>
            <div class="stack-node node-rose">
              <strong>Context serializer</strong>
              <span>only what the backend needs</span>
            </div>
            <div class="stack-node node-teal">
              <strong>Enterprise guardrails</strong>
              <span>approvals, audit, role, tenant</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <h2>Three proof pillars</h2>
  <section class="showcase-panel">
    <div class="signal-grid">
      <article class="signal-card tone-blue">
        <strong>Streaming UX</strong>
        <span>Users trust AI systems more when waiting, progress, stall, retry, and completion are explicit states.</span>
      </article>
      <article class="signal-card tone-gold">
        <strong>Tool and approval UX</strong>
        <span>Developers need visible tool execution, review checkpoints, and high-risk action control instead of hidden orchestration.</span>
      </article>
      <article class="signal-card tone-violet">
        <strong>Enterprise guardrails</strong>
        <span>Real product teams need policy visibility, accessibility, audit awareness, and safe frontend boundaries.</span>
      </article>
    </div>
  </section>

  <h2>Start here</h2>
  <section class="path-panel">
    <div class="path-grid">
      <article class="path-card">
        <strong>Demo Gallery</strong>
        <span>Inspect streaming, tool, and approval behavior before reading every pattern page.</span>
        <ul class="inline-list"><li><a href="#docs/demo-gallery.md">open demos</a></li></ul>
      </article>
      <article class="path-card">
        <strong>Quickstart</strong>
        <span>Copy one contract, one fixture, or one starter pack in minutes.</span>
        <ul class="inline-list"><li><a href="#docs/quickstart.md">open quickstart</a></li></ul>
      </article>
      <article class="path-card">
        <strong>Use Cases</strong>
        <span>Map the repo to internal copilots, support workspaces, enterprise search, and approval-heavy consoles.</span>
        <ul class="inline-list"><li><a href="#docs/use-cases.md">open use cases</a></li></ul>
      </article>
      <article class="path-card">
        <strong>Pattern Library</strong>
        <span>Browse patterns grouped by workflow instead of a flat numbered list.</span>
        <ul class="inline-list"><li><a href="#docs/pattern-library.md">see patterns</a></li></ul>
      </article>
      <article class="path-card">
        <strong>Enterprise Readiness</strong>
        <span>Review frontend boundaries, observability, accessibility, and rollout expectations.</span>
        <ul class="inline-list"><li><a href="#docs/enterprise-readiness.md">read checklist</a></li></ul>
      </article>
    </div>
  </section>

  <h2>Who this helps</h2>
  <ul>
    <li>frontend engineers building copilots, agent workflows, and retrieval-aware interfaces</li>
    <li>Angular teams that want typed, inspectable patterns instead of generic chat demos</li>
    <li>architects standardizing AI interaction contracts across products</li>
    <li>maintainers who want starter-pack style assets that can be forked and adapted safely</li>
  </ul>

  <h2>Why fork this repo</h2>
  <section class="surface-panel">
    <h3>Every pattern ships as a starter pack</h3>
    <p>Small enough to fork, structured enough to review, and safe enough to adapt to your own product surface.</p>
    <div class="asset-grid">
      <article class="asset-card tone-teal"><strong>contract.ts</strong><span>typed interface starting point for messages, tools, approvals, or recovery</span></article>
      <article class="asset-card tone-blue"><strong>fixture.json</strong><span>demo and test payload you can drop into previews, reducers, or state stories</span></article>
      <article class="asset-card tone-gold"><strong>diagram.mmd</strong><span>state or event flow for architecture reviews, onboarding, and design critique</span></article>
      <article class="asset-card tone-emerald"><strong>Implementation checklist</strong><span>delivery guidance for UI state, visibility, and frontend boundaries</span></article>
      <article class="asset-card tone-violet"><strong>Testing checklist</strong><span>acceptance coverage for failure states, accessibility, and reliability</span></article>
    </div>
  </section>
  <ul>
    <li>Every major pattern includes a repeatable bundle: <code>contract</code>, <code>fixture</code>, <code>diagram</code>, <code>implementation checklist</code>, and <code>testing checklist</code></li>
    <li>The repo includes reusable TypeScript contracts, Angular composition notes, and mock fixtures without pretending to be a production SDK</li>
    <li>The public docs focus on frontend responsibilities: state, accessibility, trust, and orchestration boundaries</li>
  </ul>

  <h2>Built for real product surfaces</h2>
  <section class="showcase-panel">
    <div class="surface-grid">
      <article class="surface-card tone-blue"><strong>Internal copilot</strong><span>citations, guardrails, and approval-aware tool actions for employee workflows</span></article>
      <article class="surface-card tone-gold"><strong>Support workspace</strong><span>visible tool steps, recoverable errors, and human checkpoints for operators</span></article>
      <article class="surface-card tone-teal"><strong>Enterprise search</strong><span>grounded answers with evidence cards and fallback guidance</span></article>
      <article class="surface-card tone-violet"><strong>Approval console</strong><span>policy-aware action gates, role signals, and audit-visible outcomes</span></article>
      <article class="surface-card tone-emerald"><strong>Design system seed</strong><span>starter packs teams can internalize as typed trust surfaces</span></article>
      <article class="surface-card tone-rose"><strong>Architecture review pack</strong><span>diagrams, fixtures, and checklists for PRs, demos, and onboarding</span></article>
    </div>
  </section>

  <h2>What you can reuse in five minutes</h2>
  <section class="showcase-panel">
    <h3>Pattern previews</h3>
    <p>Examples of the trust surfaces this repo helps teams design well.</p>
    <div class="surface-grid">
      <article class="surface-card tone-blue"><strong>Streaming states</strong><span>thinking, streaming, stalled, complete, failed, and retry ready</span></article>
      <article class="surface-card tone-gold"><strong>Tool timeline</strong><span>queued, running, awaiting approval, and audit-visible outcomes</span></article>
      <article class="surface-card tone-teal"><strong>Citation cards</strong><span>inspect evidence and source quality without losing context</span></article>
      <article class="surface-card tone-violet"><strong>Approval gates</strong><span>high-risk actions stay human-controlled instead of silently executed</span></article>
      <article class="surface-card tone-emerald"><strong>Recovery UI</strong><span>retry, fallback, and blocked-state clarity instead of generic error toasts</span></article>
      <article class="surface-card tone-rose"><strong>Enterprise guardrails</strong><span>policy-aware UI, tenant context, and visible permission outcomes</span></article>
    </div>
  </section>
  <ul>
    <li><a href="#examples/typescript-models/README.md"><code>examples/typescript-models/pattern-models.ts</code></a> for canonical interface starting points</li>
    <li><a href="#examples/mock-data/README.md"><code>examples/mock-data/</code></a> for JSON fixtures you can drop into demos or tests</li>
    <li><a href="#starter-packs/README.md"><code>starter-packs/</code></a> for pattern-by-pattern bundles</li>
    <li><a href="#examples/angular/README.md"><code>examples/angular/</code></a> for Angular shell and state composition examples</li>
  </ul>

  <h2>What makes this repo different</h2>
  <ul>
    <li>It focuses on <strong>frontend architecture</strong>, not backend orchestration frameworks</li>
    <li>It covers <strong>operator trust surfaces</strong> like approvals, tool timelines, and audit-visible state</li>
    <li>It treats <strong>accessibility and failure handling</strong> as design requirements, not cleanup tasks</li>
    <li>It is intentionally <strong>documentation-first and fork-friendly</strong>, so teams can adopt pieces without taking a monolith</li>
  </ul>
`;

const DEMO_GALLERY_HTML = `
  <section class="demo-shell">
    <div class="demo-copy">
      <span class="hero-kicker">Interactive proof surface</span>
      <h1>Inspect the trust surfaces before you fork the assets.</h1>
      <p>
        This mini gallery turns the repo’s strongest patterns into visible behavior. Use it to
        decide whether you need streaming state contracts, tool execution UX, or approval flows first.
      </p>
    </div>

    <div class="demo-tabs" role="tablist" aria-label="Demo gallery">
      <button class="demo-tab active" type="button" role="tab" aria-selected="true" data-demo-tab="streaming">Streaming states</button>
      <button class="demo-tab" type="button" role="tab" aria-selected="false" data-demo-tab="timeline">Tool timeline</button>
      <button class="demo-tab" type="button" role="tab" aria-selected="false" data-demo-tab="approval">Approval gate</button>
    </div>

    <section class="demo-panel active" data-demo-panel="streaming">
      <div class="demo-grid">
        <article class="demo-stage">
          <div class="chat-preview">
            <div class="chat-row is-user"><span>Summarize the change request and flag risky operations.</span></div>
            <div class="chat-row is-ai state-thinking"><span>Thinking: checking policy, retrieval, and prior actions</span></div>
            <div class="chat-row is-ai state-streaming"><span>Streaming: gathering evidence, outlining tool intent, and drafting the response</span></div>
            <div class="chat-row is-ai state-stalled"><span>Stalled: waiting on retrieval timeout, offer retry or fallback</span></div>
            <div class="chat-row is-ai state-complete"><span>Complete: answer ready with citations and next-step actions</span></div>
          </div>
        </article>
        <article class="demo-notes">
          <h3>What this demo proves</h3>
          <ul>
            <li>Waiting, streaming, stall, recovery, and completion are separate user-visible states.</li>
            <li>Retry guidance belongs in the UI contract, not only in logs.</li>
            <li>Developers can seed this surface with shared contracts and one fixture.</li>
          </ul>
          <div class="demo-meta-grid">
            <div class="demo-meta-card"><strong>Starter pack</strong><span><a href="#starter-packs/01-streaming-message-ux/implementation-checklist.md">01-streaming-message-ux</a></span></div>
            <div class="demo-meta-card"><strong>Fixture</strong><span><a href="#examples/mock-data/stream-events.json">stream-events.json</a></span></div>
            <div class="demo-meta-card"><strong>Pattern</strong><span><a href="#patterns/01-streaming-message-ux.md">Streaming Message UX</a></span></div>
          </div>
        </article>
      </div>
    </section>

    <section class="demo-panel" data-demo-panel="timeline" hidden>
      <div class="demo-grid">
        <article class="demo-stage">
          <div class="timeline-preview">
            <div class="timeline-item is-complete"><strong>Search CRM</strong><span>completed with 3 records</span></div>
            <div class="timeline-item is-running"><strong>Draft refund plan</strong><span>running model + pricing tool</span></div>
            <div class="timeline-item is-blocked"><strong>Apply refund</strong><span>awaiting human approval</span></div>
            <div class="timeline-item is-pending"><strong>Send follow-up email</strong><span>queued until approval resolves</span></div>
          </div>
        </article>
        <article class="demo-notes">
          <h3>What this demo proves</h3>
          <ul>
            <li>Tool steps should remain visible instead of collapsing into a spinner.</li>
            <li>Blocked actions need clear operator ownership and status language.</li>
            <li>This surface creates better demos, audits, and support debugging.</li>
          </ul>
          <div class="demo-meta-grid">
            <div class="demo-meta-card"><strong>Starter pack</strong><span><a href="#starter-packs/03-tool-call-timeline/implementation-checklist.md">03-tool-call-timeline</a></span></div>
            <div class="demo-meta-card"><strong>Fixture</strong><span><a href="#examples/mock-data/tool-timeline.json">tool-timeline.json</a></span></div>
            <div class="demo-meta-card"><strong>Pattern</strong><span><a href="#patterns/03-tool-call-timeline.md">Tool-Call Timeline</a></span></div>
          </div>
        </article>
      </div>
    </section>

    <section class="demo-panel" data-demo-panel="approval" hidden>
      <div class="demo-grid">
        <article class="demo-stage">
          <div class="approval-preview">
            <div class="approval-head">
              <strong>Approval required: reset account permissions</strong>
              <span>High-risk action with tenant and policy impact</span>
            </div>
            <div class="approval-body">
              <div class="approval-chip tone-gold">Risk: elevated</div>
              <div class="approval-chip tone-blue">Requested by tool orchestrator</div>
              <div class="approval-chip tone-violet">Policy: role escalation</div>
            </div>
            <div class="approval-actions">
              <button type="button" class="mini-button allow">Approve with note</button>
              <button type="button" class="mini-button deny">Reject and explain</button>
            </div>
          </div>
        </article>
        <article class="demo-notes">
          <h3>What this demo proves</h3>
          <ul>
            <li>Risky actions should stop for review instead of silently executing.</li>
            <li>Policy context, role context, and the requested action must stay visible together.</li>
            <li>A forkable approval surface is more reusable than a generic confirmation modal.</li>
          </ul>
          <div class="demo-meta-grid">
            <div class="demo-meta-card"><strong>Starter pack</strong><span><a href="#starter-packs/04-action-approval-flow/implementation-checklist.md">04-action-approval-flow</a></span></div>
            <div class="demo-meta-card"><strong>Fixture</strong><span><a href="#examples/mock-data/approval-request.json">approval-request.json</a></span></div>
            <div class="demo-meta-card"><strong>Pattern</strong><span><a href="#patterns/04-action-approval-flow.md">Action Approval Flow</a></span></div>
          </div>
        </article>
      </div>
    </section>
  </section>

  <h2>Where to copy from next</h2>
  <section class="showcase-panel">
    <div class="asset-grid">
      <article class="asset-card tone-blue"><strong>Contract first</strong><span>Open <a href="#examples/typescript-models/README.md">TypeScript models</a> if your team needs a stable frontend state language.</span></article>
      <article class="asset-card tone-teal"><strong>Fixture first</strong><span>Open <a href="#examples/mock-data/README.md">mock data</a> if you need demos, reducer tests, or screenshots fast.</span></article>
      <article class="asset-card tone-violet"><strong>Starter pack first</strong><span>Open <a href="#starter-packs/README.md">starter packs</a> if you want one safe pattern bundle to fork internally.</span></article>
    </div>
  </section>
`;

marked.setOptions({
  gfm: true,
  breaks: false,
});

function getStoredThemePreference() {
  return localStorage.getItem("frontend-ai-patterns-theme") || "system";
}

function getResolvedTheme(preference) {
  if (preference === "system") {
    return colorSchemeQuery.matches ? "dark" : "light";
  }

  return preference;
}

function applyTheme(preference, { persist = true, rerender = true } = {}) {
  const resolvedTheme = getResolvedTheme(preference);
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = resolvedTheme;

  if (persist) {
    localStorage.setItem("frontend-ai-patterns-theme", preference);
  }

  themeButtons.forEach((button) => {
    const active = button.dataset.themeOption === preference;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (themeToggleButton) {
    const label = preference.charAt(0).toUpperCase() + preference.slice(1);
    themeToggleButton.setAttribute("aria-label", `${label} theme selected`);
    themeToggleButton.title = `${label} theme selected`;
  }

  if (rerender && currentItem) {
    loadPage();
  }
}

function closeThemeMenu() {
  if (!themeMenu || !themeToggleButton) {
    return;
  }

  themeMenu.hidden = true;
  themeToggleButton.setAttribute("aria-expanded", "false");
}

function toggleThemeMenu() {
  if (!themeMenu || !themeToggleButton) {
    return;
  }

  const isOpen = !themeMenu.hidden;
  themeMenu.hidden = isOpen;
  themeToggleButton.setAttribute("aria-expanded", String(!isOpen));
}

function getMermaidTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "neutral";
}

function initializeMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: getMermaidTheme(),
    themeVariables: {
      fontFamily: "IBM Plex Sans, sans-serif",
      fontSize: "14px",
      primaryTextColor:
        document.documentElement.dataset.theme === "dark" ? "#e6eef8" : "#0f172a",
      lineColor:
        document.documentElement.dataset.theme === "dark" ? "#5eead4" : "#0f766e",
    },
    flowchart: {
      curve: "basis",
      useMaxWidth: true,
      htmlLabels: true,
    },
  });
}

function normalizeHashPath() {
  return decodeURIComponent(window.location.hash.replace(/^#/, "")) || "docs/site-home.md";
}

function flattenManifestItems(groups) {
  return groups.flatMap((group) => group.items);
}

function findItem(path) {
  return flatItems.find((item) => item.path === path) ?? flatItems[0];
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function resolveRelativePath(fromPath, target) {
  if (/^(https?:|mailto:|tel:|#)/i.test(target)) {
    return target;
  }

  const baseSegments = fromPath.split("/");
  baseSegments.pop();
  const targetSegments = target.split("/");
  const segments = [...baseSegments];

  for (const segment of targetSegments) {
    if (!segment || segment === ".") {
      continue;
    }
    if (segment === "..") {
      segments.pop();
      continue;
    }
    segments.push(segment);
  }

  return segments.join("/");
}

function buildSidebarNav() {
  sidebarNav.innerHTML = "";

  for (const group of manifest.groups) {
    const section = document.createElement("section");
    section.className = "nav-group";

    const title = document.createElement("h3");
    title.className = "nav-group-title";
    title.textContent = group.title;
    section.appendChild(title);

    for (const item of group.items) {
      const link = document.createElement("a");
      link.className = "nav-link";
      link.href = `#${encodeURIComponent(item.path)}`;
      link.dataset.path = item.path;
      link.innerHTML = `<strong>${item.label}</strong><span>${item.subtitle}</span>`;
      section.appendChild(link);
    }

    sidebarNav.appendChild(section);
  }
}

function buildPrimaryNav() {
  primaryNav.innerHTML = "";

  for (const group of manifest.primaryNav) {
    const item = findItem(group.path);
    const link = document.createElement("a");
    link.className = "primary-link";
    link.href = `#${encodeURIComponent(group.path)}`;
    link.dataset.navKey = group.navKey;
    link.textContent = item.label;
    primaryNav.appendChild(link);
  }
}

function updateActiveNav(item) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.path === item.path);
  });

  document.querySelectorAll(".primary-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.navKey === item.navKey);
  });
}

function buildTOC() {
  tocNav.innerHTML = "";
  const headings = markdownBody.querySelectorAll("h2, h3");

  if (headings.length === 0) {
    tocNav.innerHTML = `<p class="empty-state">No headings on this page.</p>`;
    return;
  }

  headings.forEach((heading) => {
    const text = heading.textContent.trim();
    if (!heading.id) {
      heading.id = slugify(text);
    }
    const link = document.createElement("a");
    link.className = `toc-link level-${heading.tagName === "H3" ? "3" : "2"}`;
    link.href = `#${encodeURIComponent(currentItem.path)}::${heading.id}`;
    link.dataset.headingId = heading.id;
    link.textContent = text;
    tocNav.appendChild(link);
  });
}

function buildPager() {
  pager.innerHTML = "";
  const index = flatItems.findIndex((item) => item.path === currentItem.path);
  const prev = flatItems[index - 1];
  const next = flatItems[index + 1];

  if (prev) {
    const prevLink = document.createElement("a");
    prevLink.className = "pager-link";
    prevLink.href = `#${encodeURIComponent(prev.path)}`;
    prevLink.innerHTML = `<small>Previous</small><strong>${prev.label}</strong>`;
    pager.appendChild(prevLink);
  } else {
    const spacer = document.createElement("div");
    pager.appendChild(spacer);
  }

  if (next) {
    const nextLink = document.createElement("a");
    nextLink.className = "pager-link next";
    nextLink.href = `#${encodeURIComponent(next.path)}`;
    nextLink.innerHTML = `<small>Next</small><strong>${next.label}</strong>`;
    pager.appendChild(nextLink);
  }
}

function addCodeCopyButtons() {
  markdownBody.querySelectorAll("pre").forEach((block) => {
    if (block.querySelector(".copy-code-button")) {
      return;
    }

    const code = block.querySelector("code");
    if (!code) {
      return;
    }

    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1200);
    });
    block.appendChild(button);
  });
}

function rewriteLinksAndImages(item) {
  markdownBody.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || /^(https?:|mailto:|tel:|#)/i.test(href)) {
      return;
    }

    const resolved = resolveRelativePath(item.path, href);
    if (resolved.endsWith(".md")) {
      link.href = `#${encodeURIComponent(resolved)}`;
    } else {
      link.href = resolved;
    }
  });

  markdownBody.querySelectorAll("img").forEach((image) => {
    const src = image.getAttribute("src");
    if (!src || /^(https?:|data:)/i.test(src)) {
      return;
    }

    image.src = resolveRelativePath(item.path, src);
  });
}

function wrapTables() {
  markdownBody.querySelectorAll("table").forEach((table) => {
    if (table.parentElement?.classList.contains("table-scroll")) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

async function renderMermaidBlocks() {
  initializeMermaid();
  const codeBlocks = markdownBody.querySelectorAll("pre > code");
  let counter = 0;

  for (const code of codeBlocks) {
    const parent = code.parentElement;
    const content = parent.textContent.trim();
    const isMermaid =
      code.className.includes("language-mermaid") ||
      content.startsWith("flowchart") ||
      content.startsWith("stateDiagram");

    if (!isMermaid) {
      continue;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "mermaid-card";
    const id = `mermaid-${counter++}`;
    const { svg } = await mermaid.render(id, code.textContent);
    wrapper.innerHTML = svg;
    parent.replaceWith(wrapper);
  }
}

function applyHeadingAnchors() {
  markdownBody.querySelectorAll("h1, h2, h3, h4").forEach((heading) => {
    if (!heading.id) {
      heading.id = slugify(heading.textContent.trim());
    }
  });
}

function setPageMeta(item) {
  pageEyebrow.textContent = item.headerEyebrow || "GitHub Pages";
  pageTitle.textContent = item.headerTitle || item.label;
  pageSubtitle.textContent = item.headerSubtitle || item.subtitle;
  pageUpdated.textContent = `Updated ${item.updated}`;
  editPageLink.href = `${manifest.editBase}${item.path}`;
  copyPathButton.onclick = async () => {
    await navigator.clipboard.writeText(item.path);
    copyPathButton.textContent = "Copied page path";
    setTimeout(() => {
      copyPathButton.textContent = "Copy page path";
    }, 1200);
  };
}

function applyPageState(item) {
  const isLanding = item.path === "docs/site-home.md";
  const isDemoGallery = item.path === "docs/demo-gallery.md";
  document.body.dataset.navKey = item.navKey;
  document.body.classList.toggle("is-landing", isLanding);
  document.body.classList.toggle("is-demo-gallery", isDemoGallery);
  markdownBody.classList.toggle("landing-page", isLanding);
  if (isLanding) {
    pager.innerHTML = "";
  }
}

function setupDemoGalleryInteractions() {
  const tabs = Array.from(markdownBody.querySelectorAll("[data-demo-tab]"));
  const panels = Array.from(markdownBody.querySelectorAll("[data-demo-panel]"));

  if (!tabs.length || !panels.length) {
    return;
  }

  const activateTab = (target) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.demoTab === target;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      const active = panel.dataset.demoPanel === target;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.demoTab);
    });
  });
}

async function loadPage() {
  const rawHash = normalizeHashPath();
  const [path, headingId] = rawHash.split("::");
  const item = findItem(path);
  currentItem = item;
  updateActiveNav(item);
  setPageMeta(item);
  buildPager();
  applyPageState(item);

  const response = await fetch(item.path);
  if (!response.ok) {
    markdownBody.innerHTML = `<p class="empty-state">Could not load <code>${item.path}</code>.</p>`;
    tocNav.innerHTML = "";
    return;
  }

  if (item.path === "docs/site-home.md") {
    markdownBody.innerHTML = LANDING_PAGE_HTML;
  } else if (item.path === "docs/demo-gallery.md") {
    markdownBody.innerHTML = DEMO_GALLERY_HTML;
  } else {
    const markdown = await response.text();
    markdownBody.innerHTML = marked.parse(markdown);
    rewriteLinksAndImages(item);
  }

  applyHeadingAnchors();
  wrapTables();
  await renderMermaidBlocks();
  addCodeCopyButtons();
  if (item.path === "docs/demo-gallery.md") {
    setupDemoGalleryInteractions();
  }
  buildTOC();

  if (headingId) {
    const target = document.getElementById(headingId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}

function runSearch(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    searchResults.hidden = true;
    searchResults.innerHTML = "";
    return;
  }

  const results = flatItems.filter((item) => {
    const haystack = [item.label, item.subtitle, item.navKey, ...(item.keywords ?? [])]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });

  searchResults.hidden = false;
  searchResults.innerHTML = results.length
    ? results
        .map(
          (item) => `
            <a class="search-result" href="#${encodeURIComponent(item.path)}">
              <strong>${item.label}</strong>
              <small>${item.subtitle}</small>
            </a>`,
        )
        .join("")
    : `<p class="empty-state">No matches for "${query}".</p>`;
}

async function init() {
  const response = await fetch("./content-manifest.json");
  manifest = await response.json();
  flatItems = flattenManifestItems(manifest.groups);
  buildSidebarNav();
  buildPrimaryNav();
  applyTheme(getStoredThemePreference(), { persist: false, rerender: false });
  await loadPage();
}

searchInput.addEventListener("input", (event) => {
  runSearch(event.target.value);
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.themeOption);
    closeThemeMenu();
  });
});

themeToggleButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleThemeMenu();
});

themeMenu?.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  closeThemeMenu();
});

colorSchemeQuery.addEventListener("change", () => {
  if (getStoredThemePreference() === "system") {
    applyTheme("system", { persist: false });
  }
});

window.addEventListener("hashchange", loadPage);

init();
