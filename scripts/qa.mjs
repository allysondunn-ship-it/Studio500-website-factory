/**
 * Quality checks against the built site (run `npm run build` first):
 *  - automated accessibility scan (axe-core, WCAG 2.1 A/AA) on every page
 *  - contact form: validation errors, and the honest "not connected" state
 *  - mobile navigation opens and closes
 *  - full-page screenshots (desktop + mobile) saved to qa-report/
 *
 * Usage: npm run qa
 */
import { createServer } from 'node:http';
import { mkdir, readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const pages = ['/', '/privacy', '/samples/harbor-plumbing', '/samples/juniper-skin-studio', '/samples/osteria-verde', '/samples/northline-bookkeeping', '/does-not-exist'];
const screenshots = process.argv.includes('--screenshots');

// Minimal static file server for dist/ (behaves like Cloudflare Pages for our purposes).
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, BASE).pathname)).replace(/^(\.\.[/\\])+/, '');
  for (const candidate of [path, join(path, 'index.html'), `${path}.html`]) {
    const file = join('dist', candidate);
    if ((await stat(file).catch(() => null))?.isFile()) {
      res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
      return res.end(await readFile(file));
    }
  }
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(await readFile('dist/404.html').catch(() => 'Not found'));
});
await new Promise((r) => server.listen(PORT, r));
const stop = () => server.close();

let failures = 0;
const fail = (msg) => {
  failures++;
  console.log(`  ✗ ${msg}`);
};
const pass = (msg) => console.log(`  ✓ ${msg}`);

const launchOptions = process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {};
const browser = await chromium.launch(launchOptions);
const newPage = async (opts) => (await browser.newContext(opts)).newPage();
if (screenshots) await mkdir('qa-report', { recursive: true });

console.log('\nAccessibility (axe, WCAG 2.1 AA)');
for (const path of pages) {
  const page = await newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  // Reveal animated content so it is scanned in its final state.
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')));
  await page.waitForTimeout(800);
  // Decorative text (aria-hidden, e.g. the oversized footer wordmark) is exempt from contrast rules.
  const results = await new AxeBuilder({ page }).exclude('[data-decorative]').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  if (results.violations.length === 0) pass(`${path} — no violations`);
  for (const v of results.violations) {
    fail(`${path} — ${v.id}: ${v.help} (${v.nodes.length} element(s))`);
    for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(' ')} ${n.failureSummary?.split('\n')[1] ?? ''}`);
  }
  if (screenshots) {
    const name = path === '/' ? 'home' : path.replace(/\//g, '_').replace(/^_/, '');
    await page.screenshot({ path: `qa-report/${name}-desktop.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `qa-report/${name}-mobile.png`, fullPage: true });
  }
  await page.close();
}

console.log('\nContact form');
{
  const page = await newPage();
  await page.goto(BASE + '/#contact');
  const form = page.locator('#form-preview-request');
  await form.locator('button[type=submit]').click();
  const invalid = await form.locator('[aria-invalid=true]').count();
  invalid === 3 ? pass('empty submit flags 3 required fields') : fail(`expected 3 invalid fields, got ${invalid}`);
  const focused = await page.evaluate(() => document.activeElement?.id);
  focused === 'form-preview-request-name' ? pass('focus moves to first invalid field') : fail(`focus on ${focused}`);

  await form.locator('[name=name]').fill('Test Person');
  await form.locator('[name=email]').fill('not-an-email');
  await form.locator('[name=business]').fill('Test Co');
  await form.locator('button[type=submit]').click();
  (await form.locator('[data-error-for=email]').textContent())?.includes('valid email')
    ? pass('invalid email shows a helpful message')
    : fail('invalid email message missing');

  await form.locator('[name=email]').fill('test@example.com');
  await form.locator('[name=website]').fill('example.com');
  await form.locator('button[type=submit]').click();
  const status = (await form.locator('[data-status]').textContent()) ?? '';
  const endpoint = await form.getAttribute('data-endpoint');
  if (!endpoint) {
    status.includes("isn't connected yet") ? pass('unconfigured endpoint shows honest "not connected" message') : fail(`status: ${status}`);
  } else {
    pass(`endpoint configured (${endpoint}) — not submitting a test message`);
  }
  await page.close();
}

console.log('\nMobile navigation');
{
  const page = await newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + '/');
  const toggle = page.locator('[data-menu-toggle]');
  await toggle.click();
  (await page.locator('#mobile-menu').isVisible()) ? pass('menu opens') : fail('menu did not open');
  (await toggle.getAttribute('aria-expanded')) === 'true' ? pass('aria-expanded updates') : fail('aria-expanded not updated');
  await page.keyboard.press('Escape');
  (await page.locator('#mobile-menu').isHidden()) ? pass('Escape closes menu') : fail('menu did not close');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  overflow ? fail('page scrolls horizontally on mobile') : pass('no horizontal scrolling on mobile');
  await page.close();
}

await browser.close();
stop();
console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);
