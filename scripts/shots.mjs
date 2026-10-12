// 화면 확인용 캡처. 사용: node scripts/shots.mjs [기준주소]
// 홈의 각 구역과 주요 화면을 .superpowers/shots/ 에 저장한다.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4321';
const out = '.superpowers/shots';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1360, height: 860 }, deviceScaleFactor: 0.6 });

async function shot(name) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}/${name}.jpg`, type: 'jpeg', quality: 72 });
}

await page.goto(`${base}/`);
await shot('home-0-top');
for (const id of ['why', 'promise', 'products', 'features', 'start', 'learn', 'lab', 'tools', 'faq']) {
  await page.evaluate((sel) => document.querySelector(sel).scrollIntoView(), `#${id}`);
  await shot(`home-${id}`);
}
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await shot('home-z-footer');

for (const [name, path] of [['guide-list', '/guide/'], ['article', '/guide/ks-overview/'], ['learn-list', '/learn/'], ['glossary', '/glossary/'], ['download', '/download/']]) {
  await page.goto(base + path);
  await shot(name);
}

await page.setViewportSize({ width: 390, height: 844 });
for (const [name, path] of [['m-home', '/'], ['m-article', '/guide/ks-overview/']]) {
  await page.goto(base + path);
  await shot(name);
}
await browser.close();
console.log('saved to', out);
