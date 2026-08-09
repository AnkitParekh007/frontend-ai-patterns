const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = process.env.CAPTURE_BASE_URL || 'https://ankitparekh007.github.io/frontend-ai-patterns/';
const outputDir = process.env.CAPTURE_OUTPUT_DIR || path.join(process.cwd(), 'public-proof-captures');
const viewport = { width: 1440, height: 900 };

fs.mkdirSync(outputDir, { recursive: true });

const manifest = [];

function url(relative) {
  return new URL(relative, baseUrl).toString();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();

  async function open(target) {
    const response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1200);
    return response;
  }

  async function capture(name, target) {
    const response = await open(target);
    const file = path.join(outputDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    manifest.push({ name, file: path.basename(file), url: page.url(), status: response ? response.status() : null });
  }

  async function captureScenario(name, matcher) {
    const target = url('playground/');
    const response = await open(target);
    const button = page.getByRole('button', { name: matcher }).first();
    const found = await button.count();
    if (!found) {
      manifest.push({ name, skipped: true, reason: `No button matched ${matcher}` });
      return;
    }
    await button.click();
    await page.waitForTimeout(900);
    const file = path.join(outputDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    manifest.push({ name, file: path.basename(file), url: page.url(), status: response ? response.status() : null });
  }

  await capture('docs-home', baseUrl);
  await capture('playground-default', url('playground/'));
  await captureScenario('playground-grounded', /grounded/i);
  await captureScenario('playground-no-evidence', /(no grounded|missing evidence|retrieval empty|empty retrieval)/i);
  await captureScenario('playground-failed-tool', /failed tool/i);
  await captureScenario('playground-stalled-stream', /(stalled|stream.*stall)/i);

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
