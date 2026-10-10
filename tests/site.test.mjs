import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const DISCLOSURE = '이 사이트는 한국데이터사이언티스트협회가 운영하는 비공식 한국어 가이드이며 Msty 본사와 제휴 관계가 아닙니다.';

export function htmlFiles(dir = DIST) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}
const read = (p) => readFileSync(join(DIST, p), 'utf8');

test('홈이 빌드된다', () => {
  assert.ok(existsSync(join(DIST, 'index.html')));
  assert.match(read('index.html'), /보안 걱정 없이/);
});

test('모든 페이지에 비공식 표기가 있다', () => {
  for (const f of htmlFiles()) assert.ok(readFileSync(f, 'utf8').includes(DISCLOSURE), f);
});

test('전화번호가 없다', () => {
  for (const f of htmlFiles()) assert.doesNotMatch(readFileSync(f, 'utf8'), /01[016789][-\s.]?\d{3,4}[-\s.]?\d{4}/, f);
});

test('자바스크립트 없이도 리빌 요소가 보인다', () => {
  const html = read('index.html');
  assert.match(html, /document\.documentElement\.classList\.add\(['"]js['"]\)/);
  const css = readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(DIST, '_astro', f), 'utf8')).join('');
  assert.match(css, /\.js \[data-reveal\]/);
  assert.doesNotMatch(css, /(^|[},])\[data-reveal\]\{opacity:0/);
});

test('글 목록과 상세가 빌드된다', () => {
  for (const c of ['guide', 'learn', 'news']) assert.ok(existsSync(join(DIST, c, 'index.html')), c);
  assert.ok(existsSync(join(DIST, 'news', 'site-renewal', 'index.html')));
  assert.match(read('news/index.html'), /href="\/news\/site-renewal\/"/);
  assert.match(read('index.html'), /href="\/news\/site-renewal\/"/);
});

test('다운로드 페이지는 공식 사이트로만 보낸다', () => {
  const html = read('download/index.html');
  assert.match(html, /href="https:\/\/msty\.ai\/products\/studio\/"/);
  assert.doesNotMatch(html, /\.(exe|dmg|AppImage|deb)"/);
});

test('책·소개·404 페이지가 있다', () => {
  assert.match(read('book/index.html'), /5,000원/);
  assert.match(read('book/index.html'), /2024-12-06/);
  assert.match(read('about/index.html'), /제휴 관계가 아닙니다/);
  assert.ok(existsSync(join(DIST, '404.html')));
});

test('외부 링크는 새 탭과 noopener로 연다', () => {
  for (const f of htmlFiles()) {
    const html = readFileSync(f, 'utf8');
    for (const [tag] of html.matchAll(/<a\b[^>]*href="https?:\/\/(?!msty\.kr)[^"]*"[^>]*>/g)) {
      assert.match(tag, /target="_blank"/, `${f}: ${tag}`);
      assert.match(tag, /rel="noopener"/, `${f}: ${tag}`);
    }
  }
});

test('모델 찾기 페이지에 링크 50개 이상과 9개 묶음이 있다', () => {
  const html = read('models/index.html');
  const links = new Set([...html.matchAll(/<a\b[^>]*class="[^"]*model-link[^"]*"[^>]*href="(https:\/\/[^"]+)"/g)].map((m) => m[1]));
  assert.ok(links.size >= 50, `links: ${links.size}`);
  assert.equal([...html.matchAll(/<h2 [^>]*id="g\d+"/g)].length, 9);
  for (const u of ['https://lifearchitect.ai/models-table/', 'https://llm-explorer.com/list/?small', 'https://www.hume.ai/benchmark']) assert.ok(links.has(u), u);
});

test('실습 페이지에 데모 카드 8개가 있다', () => {
  const html = read('lab/index.html');
  assert.equal([...html.matchAll(/href="https:\/\/ag-firebase-board-2026\.web\.app\/browser\/\d\d-[a-z-]+"/g)].length, 8);
});

test('피드가 유효하다', () => {
  const feed = JSON.parse(read('feed.json'));
  assert.ok(feed.items.length >= 1);
  for (const it of feed.items) {
    assert.deepEqual(Object.keys(it).sort(), ['collection', 'date', 'description', 'tags', 'title', 'url']);
    assert.match(it.url, /^https:\/\/msty\.kr\/(guide|learn|news)\/[a-z0-9-]+\/$/);
    assert.match(it.date, /^\d{4}-\d{2}-\d{2}$/);
  }
  const rss = read('rss.xml');
  assert.match(rss, /<rss[^>]*version="2\.0"/);
  assert.equal([...rss.matchAll(/<item>/g)].length, feed.items.length);
  assert.ok(existsSync(join(DIST, 'sitemap-index.xml')));
});
