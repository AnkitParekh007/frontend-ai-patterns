const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const docsUrl = process.env.CAPTURE_DOCS_URL || 'https://ankitparekh007.github.io/frontend-ai-patterns/';
const playgroundUrl = process.env.CAPTURE_PLAYGROUND_URL || new URL('playground/', docsUrl).toString();
const outputDir = process.env.CAPTURE_OUTPUT_DIR || path.join(process.cwd(), 'public-proof-captures');
const viewport = { width: 1440, height: 900 };

fs.mkdirSync(outputDir, { recursive: true });
const manifest = [];
let browser;

(async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();

  async function open(target, expectPlayground = true) {
    const response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 45000 });
    if (expectPlayground) {
      await page.getByRole('heading', { name: /run the full lifecycle without provider credentials/i }).waitFor({ state: 'visible', timeout: 30000 });
    }
    return response;
  }

  async function shot(name, response) {
    const file = path.join(outputDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: false });
    manifest.push({ name, file: path.basename(file), url: page.url(), status: response ? response.status() : null, viewport });
  }

  async function select(label) {
    const button = page.getByRole('button', { name: label }).first();
    if (!(await button.count())) throw new Error(`No scenario button matched ${label}`);
    await button.click();
    await page.waitForTimeout(200);
  }

  async function runToBoundary() {
    const button = page.getByRole('button', { name: /run to boundary/i }).first();
    if (!(await button.count())) throw new Error('Run to boundary control missing');
    await button.click();
    await page.waitForTimeout(300);
  }

  if (process.env.CAPTURE_SKIP_DOCS !== 'true') {
    const docsResponse = await open(docsUrl, false);
    await shot('docs-home', docsResponse);
  }

  let response = await open(playgroundUrl);
  await select(/^Grounded flow/i);
  await runToBoundary();
  await shot('playground-grounded', response);

  response = await open(playgroundUrl);
  await select(/^No evidence/i);
  await runToBoundary();
  await shot('playground-no-evidence', response);

  response = await open(playgroundUrl);
  await select(/^Tool failure/i);
  await runToBoundary();
  const approve = page.getByRole('button', { name: /approve deterministic tool/i }).first();
  if (!(await approve.count())) throw new Error('Approval control missing for tool-failure scenario');
  await approve.click();
  await page.waitForTimeout(300);
  await shot('playground-failed-tool', response);

  response = await open(playgroundUrl);
  await select(/^Stalled stream/i);
  await runToBoundary();
  const retry = page.getByRole('button', { name: /retry stalled stream/i }).first();
  if (!(await retry.count())) throw new Error('Retry control missing for stalled-stream scenario');
  await retry.click();
  await page.waitForTimeout(300);
  await shot('playground-stalled-stream', response);

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify({ docsUrl, playgroundUrl, captures: manifest }, null, 2)}\n`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  if (browser) await browser.close();
});
