import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "_site");

const copyTargets = [
  "site",
  "docs",
  "patterns",
  "examples",
  "starter-packs",
  ".github",
];

const rootFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "ROADMAP.md",
  "GOOD_FIRST_ISSUES.md",
  "SECURITY.md",
  "WHAT_THIS_PROVES.md",
  "RECRUITER_REVIEW_GUIDE.md",
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const dir of copyTargets) {
  await cp(resolve(root, dir), resolve(outDir, dir), { recursive: true });
}

for (const file of rootFiles) {
  await cp(resolve(root, file), resolve(outDir, file));
}

await cp(resolve(root, "site", "index.html"), resolve(outDir, "index.html"));
await cp(resolve(root, "site", "styles.css"), resolve(outDir, "styles.css"));
await cp(resolve(root, "site", "app.js"), resolve(outDir, "app.js"));
await cp(
  resolve(root, "site", "content-manifest.json"),
  resolve(outDir, "content-manifest.json"),
);

console.log(`Built static site into ${outDir}`);
