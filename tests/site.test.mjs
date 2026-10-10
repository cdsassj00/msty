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
