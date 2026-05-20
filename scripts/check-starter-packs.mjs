import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const patternsDir = resolve(root, "patterns");
const packsDir = resolve(root, "starter-packs");
const requiredFiles = [
  "contract.ts",
  "fixture.json",
  "diagram.mmd",
  "implementation-checklist.md",
  "testing-checklist.md",
];

const patternFiles = (await readdir(patternsDir))
  .filter((file) => file.endsWith(".md"))
  .sort();

const failures = [];

for (const file of patternFiles) {
  const slug = file.replace(/\.md$/, "");
  const packPath = resolve(packsDir, slug);
  let files;

  try {
    files = await readdir(packPath);
  } catch {
    failures.push(`Missing starter pack directory for ${slug}`);
    continue;
  }

  for (const requiredFile of requiredFiles) {
    if (!files.includes(requiredFile)) {
      failures.push(`starter-packs/${slug}/${requiredFile} is missing`);
    }
  }
}

if (failures.length > 0) {
  console.error("Starter pack validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Validated ${patternFiles.length} starter packs.`);
