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
          <a class="button-primary" href="#docs/quickstart.md">Start with one pattern</a>
          <a class="button-secondary" href="#docs/pattern-library.md">Browse the library</a>
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
        <strong>Quickstart</strong>
        <span>Copy one contract, one fixture, or one starter pack in minutes.</span>
        <ul class="inline-list"><li><a href="#docs/quickstart.md">open quickstart</a></li></ul>
      </article>
      <article class="path-card">
        <strong>Pattern Library</strong>
        <span>Browse patterns grouped by workflow instead of a flat numbered list.</span>
        <ul class="inline-list"><li><a href="#docs/pattern-library.md">see patterns</a></li></ul>
      </article>
      <article class="path-card">
        <strong>Examples</strong>
        <span>Choose between minimal reuse and production-shaped adoption paths.</span>
        <ul class="inline-list"><li><a href="#docs/examples.md">open examples</a></li></ul>
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

  if (rerender && currentItem) {
    loadPage();
  }
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
  document.body.dataset.navKey = item.navKey;
  document.body.classList.toggle("is-landing", isLanding);
  markdownBody.classList.toggle("landing-page", isLanding);
  if (isLanding) {
    pager.innerHTML = "";
  }
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
  } else {
    const markdown = await response.text();
    markdownBody.innerHTML = marked.parse(markdown);
    rewriteLinksAndImages(item);
  }

  applyHeadingAnchors();
  wrapTables();
  await renderMermaidBlocks();
  addCodeCopyButtons();
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
  });
});

colorSchemeQuery.addEventListener("change", () => {
  if (getStoredThemePreference() === "system") {
    applyTheme("system", { persist: false });
  }
});

window.addEventListener("hashchange", loadPage);

init();
