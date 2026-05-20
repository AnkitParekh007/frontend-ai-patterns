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

  const markdown = await response.text();
  markdownBody.innerHTML = marked.parse(markdown);
  rewriteLinksAndImages(item);
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
