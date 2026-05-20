import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname, normalize } from "node:path";

const root = process.cwd();
const skipDirs = new Set([".git", "_site", "node_modules"]);
const markdownFiles = [];
const failures = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) {
        await walk(resolve(dir, entry.name));
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      markdownFiles.push(resolve(dir, entry.name));
    }
  }
}

function isExternal(target) {
  return /^(https?:|mailto:|tel:|#)/i.test(target);
}

function cleanTarget(target) {
  return target.split("#")[0].split("?")[0];
}

async function validateMarkdownLinks(file) {
  const content = await readFile(file, "utf8");
  const regex = /!?\[[^\]]*]\(([^)]+)\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const rawTarget = match[1].trim();
    if (!rawTarget || isExternal(rawTarget)) {
      continue;
    }

    const target = cleanTarget(rawTarget);
    if (!target) {
      continue;
    }

    const absolute = normalize(resolve(dirname(file), target));
    try {
      await stat(absolute);
    } catch {
      failures.push(`${file.replace(`${root}\\`, "")} -> ${rawTarget}`);
    }
  }
}

async function validateManifest() {
  const manifestPath = resolve(root, "site", "content-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  for (const group of manifest.groups) {
    for (const item of group.items) {
      const absolute = resolve(root, item.path);
      try {
        await stat(absolute);
      } catch {
        failures.push(`site/content-manifest.json -> ${item.path}`);
      }
    }
  }
}

await walk(root);
await Promise.all(markdownFiles.map(validateMarkdownLinks));
await validateManifest();

if (failures.length > 0) {
  console.error("Broken internal links found:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Validated ${markdownFiles.length} markdown files and site manifest.`);
