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

  async function shot(name, response) {
    const file = path.join(outputDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    manifest.push({ name, file: path.basename(file), url: page.url(), status: response ? response.status() : null });
  }

  async function select(label) {
    const button = page.getByRole('button', { name: label }).first();
    if (!(await button.count())) throw new Error(`No scenario button matched ${label}`);
    await button.click();
    await page.waitForTimeout(250);
  }

  async function runToBoundary() {
    const button = page.getByRole('button', { name: /run to boundary/i }).first();
    if (!(await button.count())) throw new Error('Run to boundary control missing');
    await button.click();
    await page.waitForTimeout(350);
  }

  const docsResponse = await open(baseUrl);
  await shot('docs-home', docsResponse);

  // 1) Grounded plan pauses at the explicit approval boundary.
  let response = await open(url('playground/'));
  await select(/^Grounded flow/i);
  await runToBoundary();
  await page.getByRole('heading', { name: /approval required before execution/i }).waitFor();
  await shot('playground-grounded', response);

  // 2) Missing evidence completes without citations or a tool plan.
  response = await open(url('playground/'));
  await select(/^No evidence/i);
  await runToBoundary();
  await page.getByText(/does not fabricate evidence/i).waitFor();
  await shot('playground-no-evidence', response);

  // 3) Approved deterministic tool fails visibly rather than becoming success.
  response = await open(url('playground/'));
  await select(/^Tool failure/i);
  await runToBoundary();
  const approve = page.getByRole('button', { name: /approve deterministic tool/i }).first();
  if (!(await approve.count())) throw new Error('Approval control missing for tool-failure scenario');
  await approve.click();
  await page.waitForTimeout(350);
  await page.getByText(/failed safely/i).waitFor();
  await shot('playground-failed-tool', response);

  // 4) Stalled stream exposes retry, then preserves the safe context snapshot.
  response = await open(url('playground/'));
  await select(/^Stalled stream/i);
  await runToBoundary();
  const retry = page.getByRole('button', { name: /retry stalled stream/i }).first();
  if (!(await retry.count())) throw new Error('Retry control missing for stalled-stream scenario');
  await retry.click();
  await page.waitForTimeout(350);
  await page.getByText(/retried with the same safe context snapshot/i).waitFor();
  await shot('playground-stalled-stream', response);

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
