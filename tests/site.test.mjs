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
  // 설명용 가짜 번호(뒤가 전부 0)는 허용한다.
  for (const f of htmlFiles()) {
    for (const [num] of readFileSync(f, 'utf8').matchAll(/01[016789][-\s.]?\d{3,4}[-\s.]?\d{4}/g)) {
      assert.ok(/^01\d\D?0+\D?0+$/.test(num), `${f}: ${num}`);
    }
  }
});

test('자바스크립트 없이도 리빌 요소가 보인다', () => {
  const html = read('index.html');
  assert.match(html, /document\.documentElement\.classList\.add\(['"]js['"]\)/);
  const css = html; // 스타일은 HTML에 인라인된다
  assert.match(css, /\.js \[data-reveal\]/);
  assert.doesNotMatch(css, /(^|[},])\[data-reveal\]\{opacity:0/);
});

test('글 목록과 상세가 빌드된다', () => {
  for (const c of ['guide', 'learn', 'news']) assert.ok(existsSync(join(DIST, c, 'index.html')), c);
  assert.ok(existsSync(join(DIST, 'news', 'site-renewal', 'index.html')));
  assert.match(read('news/index.html'), /href="\/news\/site-renewal\/"/);
  assert.equal([...read('index.html').matchAll(/<a class="panel card" href="\/(guide|learn|news)\/[a-z0-9-]+\/"/g)].length, 6);
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

test('실습 페이지에 데모 카드가 20개 이상 있다', () => {
  const html = read('lab/index.html');
  const n = [...html.matchAll(/class="panel card demo-card" href="https:\/\/ag-firebase-board-2026\.web\.app\/browser\/[a-z0-9-]+"/g)].length;
  assert.ok(n >= 20, `demos: ${n}`);
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

test('MVP 글 7편이 있고 내부 링크가 깨지지 않는다', () => {
  const ids = ['guide/what-is-msty', 'guide/install-windows', 'guide/install-mac', 'guide/first-run-and-models', 'guide/connect-ollama', 'learn/ollama-first-steps', 'learn/choose-model-for-your-pc'];
  for (const id of ids) {
    const html = read(`${id}/index.html`);
    assert.match(html, /참고한 문서/, id);
  }
  for (const f of htmlFiles()) {
    for (const [, href] of readFileSync(f, 'utf8').matchAll(/href="(\/[^"#?]*)/g)) {
      if (/\.(css|js|svg|xml|json|png|jpg|webp)$/.test(href)) continue;
      const target = href.endsWith('/') ? join(DIST, href, 'index.html') : join(DIST, href);
      assert.ok(existsSync(target) || existsSync(join(DIST, href, 'index.html')), `${f} -> ${href}`);
    }
  }
});

test('연락처는 sjshin@cdsa.kr만 쓴다', () => {
  for (const f of htmlFiles()) {
    const html = readFileSync(f, 'utf8');
    assert.ok(html.includes('mailto:sjshin@cdsa.kr'), f);
    assert.ok(!html.includes('cdsa.or.kr'), f);
  }
});

test('라이트가 기본 테마이고 다크로 바꿀 수 있다', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /<html[^>]*data-theme=/);
  assert.match(html, /:root\{[^}]*--paper:#fff/);
  assert.match(html, /\[data-theme=dark\]\{[^}]*--paper:#000/);
  assert.match(html, /<button[^>]*id="theme-toggle"/);
});

test('홈과 가이드가 제품 상태를 같게 적는다', () => {
  assert.match(read('index.html'), /Go<\/h3>[\s\S]*?무료 베타/);
  assert.match(read('guide/what-is-msty/index.html'), /무료 베타/);
});

test('학습 글이 시리즈로 묶여 20편 이상 있다', () => {
  const html = read('learn/index.html');
  assert.ok([...html.matchAll(/<h2 class="h-judge series-title"/g)].length >= 4);
  const n = [...html.matchAll(/<a class="panel card" href="\/learn\/[a-z0-9-]+\/"/g)].length;
  assert.ok(n >= 20, `learn posts: ${n}`);
});

test('용어 풀이에 용어가 30개 이상 있다', () => {
  const n = [...read('glossary/index.html').matchAll(/<dt id="[a-z0-9-]+"/g)].length;
  assert.ok(n >= 30, `terms: ${n}`);
});

test('운영자 이메일 외의 이메일 주소가 없다', () => {
  for (const f of htmlFiles()) {
    for (const [mail] of readFileSync(f, 'utf8').matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?/g)) {
      if (/\.(png|jpg|svg|css|js)$/.test(mail) || /@v?\d/.test(mail)) continue; // 파일 이름·패키지 버전 표기
      if (mail.endsWith('@example.com')) continue; // 설명용 가짜 주소
      assert.equal(mail, 'sjshin@cdsa.kr', `${f}: ${mail}`);
    }
  }
});
