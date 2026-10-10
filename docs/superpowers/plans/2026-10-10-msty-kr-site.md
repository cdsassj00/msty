# msty.kr 사이트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `msty.kr`에 로컬 우선 AI 한국어 가이드 사이트(MVP)를 만들어 Cloudflare에 배포한다.

**Architecture:** Astro 정적 사이트. 글은 `src/content/{guide,learn,news}`의 마크다운, 링크 모음과 실습 카드는 `src/data/*.json`. 빌드 결과 `dist/`를 Cloudflare Workers 정적 자산으로 올린다. 테스트는 빌드된 `dist/`를 Node 내장 테스트 러너로 검사한다.

**Tech Stack:** Node 24, Astro 7, `@astrojs/rss`, `@astrojs/sitemap`, Wrangler 4, 순수 CSS(ssjsite 토큰), Pretendard.

**Spec:** `docs/superpowers/specs/2026-10-10-msty-kr-site-design.md`

## Global Constraints

- 사이트 주소는 `https://msty.kr`. 글 주소는 `/{collection}/{id}/`, `id`는 영문 소문자와 하이픈만 쓴다.
- 모든 페이지 푸터에 이 문장을 그대로 넣는다: `이 사이트는 한국데이터사이언티스트협회가 운영하는 비공식 한국어 가이드이며 Msty 본사와 제휴 관계가 아닙니다.`
- 전화번호를 어디에도 싣지 않는다. 연락처는 `sjshin@cdsa.kr`만 쓴다.
- 설치 파일과 책 PDF를 저장소에 넣지 않는다. Msty 다운로드는 `https://msty.ai/products/studio/`로만 링크한다.
- Msty 로고, 브랜드 색, 원문 문구, 이미지를 쓰지 않는다.
- 배경 `#000`, 표면 `#1c1c1e`, 액센트 `#0a84ff`. 모션은 스크롤 페이드업과 히어로 라인마스크만 쓰고 `prefers-reduced-motion`에서 끈다.
- 본문 문체는 합니다체. Msty 화면·요금 설명은 `https://docs.msty.ai/`와 현재 앱을 확인하고 쓰며, 확인하지 못한 기능은 쓰지 않는다.
- 외부 링크는 `target="_blank" rel="noopener"`로 연다.
- DNS 변경과 기존 빌더 해지는 운영자 확인 없이 하지 않는다.
- 커밋 메시지 끝에 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`를 붙인다.

## Review Focus

1. **자바스크립트가 꺼졌거나 실패한 브라우저** — 스크롤 리빌 요소가 투명한 채로 남으면 안 된다. 본문이 그대로 보여야 한다. (Task 1 테스트)
2. **`draft: true` 글** — 목록, 상세 페이지, RSS, JSON 피드 어디에도 나오면 안 된다. (Task 2 테스트)
3. **머리말이 틀린 글** (`date` 누락 등) — 빌드가 실패해 배포가 막혀야 한다. (Task 2 테스트)
4. **375px 폭에서 긴 URL·코드 줄** — 페이지가 가로로 밀리지 않고 코드 블록 안에서만 스크롤돼야 한다. (Task 2 CSS, Task 7 확인)
5. **죽은 외부 링크** — `/models`의 60개 주소와 실습 데모 주소가 응답하지 않으면 배포 전에 드러나야 한다. (Task 7 링크 검사)

## File Structure

```
package.json, astro.config.mjs, tsconfig.json, wrangler.jsonc
public/            favicon.svg, _redirects
src/
  content.config.ts        컬렉션 3개의 스키마
  content/guide|learn|news 마크다운 글
  data/site.ts             사이트 상수(이름, 문구, 주소)
  data/model-links.json    /models 링크 60개
  data/lab.json            실습 카드 8개
  lib/posts.ts             글 조회·정렬·주소 함수
  styles/tokens.css        ssjsite 토큰 사본
  styles/site.css          레이아웃·본문 스타일
  layouts/Base.astro       head, 헤더, 푸터, 리빌 스크립트
  layouts/Article.astro    글 상세
  components/PostCard.astro
  pages/index.astro, download.astro, book.astro, about.astro, models.astro, lab.astro, 404.astro
  pages/[collection]/index.astro, [collection]/[id].astro
  pages/rss.xml.js, feed.json.js
scripts/check-links.mjs    외부 링크 검사
tests/site.test.mjs        dist 검사
tests/fixtures.test.mjs    draft·잘못된 머리말 검사
```

---

### Task 1: 프로젝트 뼈대와 홈

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `public/favicon.svg`
- Create: `src/data/site.ts`, `src/styles/tokens.css`, `src/styles/site.css`, `src/layouts/Base.astro`, `src/pages/index.astro`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Produces: `SITE` 객체(`src/data/site.ts`), `Base.astro`의 props `{ title: string; description?: string }`, CSS 클래스 `.wrap`, `.section`, `.grid`, `.prose`.

- [ ] **Step 1: 설정 파일 작성**

`package.json`:

```json
{
  "name": "msty-kr",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "npm run build && node --test tests/site.test.mjs",
    "test:fixtures": "node --test tests/fixtures.test.mjs",
    "check:links": "node scripts/check-links.mjs"
  }
}
```

```bash
npm install astro@^7 @astrojs/rss@^4 @astrojs/sitemap@^3
npm install -D wrangler@^4
```

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://msty.kr',
  integrations: [sitemap()],
});
```

`tsconfig.json`:

```json
{ "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "**/*"], "exclude": ["dist"] }
```

`public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#000"/><circle cx="16" cy="16" r="7" fill="#0a84ff"/></svg>
```

- [ ] **Step 2: 실패하는 테스트 작성**

`tests/site.test.mjs`:

```js
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
```

- [ ] **Step 3: 테스트가 실패하는지 확인**

Run: `npm test`
Expected: 빌드 실패 또는 `홈이 빌드된다` FAIL (`src/pages`가 없음).

- [ ] **Step 4: 사이트 상수 작성**

`src/data/site.ts`:

```ts
export const SITE = {
  name: 'Msty Korea',
  tagline: '보안 걱정 없이 AI 쓰기',
  description: '내 PC에서 돌리는 로컬 우선 AI의 한국어 가이드. Msty, Ollama, Gemma, 임베딩을 다룹니다.',
  url: 'https://msty.kr',
  email: 'sjshin@cdsa.kr',
  operator: '한국데이터사이언티스트협회',
  disclosure: '이 사이트는 한국데이터사이언티스트협회가 운영하는 비공식 한국어 가이드이며 Msty 본사와 제휴 관계가 아닙니다.',
  mstyDownload: 'https://msty.ai/products/studio/',
  mstyDocs: 'https://docs.msty.ai/',
  links: { cdsa: 'https://cdsa.kr', author: 'https://shinsungjin.com', board: 'https://ag-firebase-board-2026.web.app/' },
  nav: [
    { href: '/guide/', label: 'Msty 가이드' },
    { href: '/learn/', label: '로컬 AI 학습' },
    { href: '/models/', label: '모델 찾기' },
    { href: '/lab/', label: '실습' },
    { href: '/news/', label: '소식' },
    { href: '/book/', label: '책' },
  ],
} as const;
```

- [ ] **Step 5: 스타일 작성**

`src/styles/tokens.css`: `C:\Users\value\.claude\skills\ssjsite\references\design-tokens.css`를 복사한 뒤 두 곳을 고친다.

1. 9~40행의 `@theme { ... }` 블록을 지운다 (Tailwind를 쓰지 않는다).
2. 리빌 규칙 네 줄의 선택자 앞에 `.js `를 붙인다.

```css
.js [data-reveal] {
  opacity: 0; transform: translateY(28px);
  transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
}
.js [data-reveal].show { opacity: 1; transform: none; }
.js [data-stagger] > * {
  opacity: 0; transform: translateY(22px);
  transition: opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1);
}
.js [data-stagger].show > * { opacity: 1; transform: none; }
```

`prefers-reduced-motion` 블록 안의 `[data-reveal], [data-stagger] > *` 선택자도 `.js [data-reveal], .js [data-stagger] > *`로 바꾼다.

`src/styles/site.css`:

```css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-size: 16px; line-height: 1.7; color: var(--body); }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; }
.wrap { width: 100%; max-width: 1040px; margin: 0 auto; padding: 0 20px; }
.narrow { max-width: 720px; }
.section { padding: 96px 0; }
.lead { font-size: 18px; color: var(--mut); max-width: 640px; }
.grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
.card { display: block; padding: 24px; }
.card:hover { background: var(--tint); }
.card h3 { margin: 0 0 8px; font-size: 18px; color: var(--ink); }
.card p { margin: 0; font-size: 14.5px; color: var(--mut); }
.meta { font-size: 13px; color: var(--faint); }
.chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
.chip-plain { background: var(--tint2); color: var(--body); }

.site-header { position: sticky; top: 0; z-index: 10; background: rgb(0 0 0 / .72); backdrop-filter: saturate(180%) blur(20px); border-bottom: 1px solid var(--hair); }
.site-header .wrap { display: flex; align-items: center; gap: 20px; height: 52px; }
.brand { font-weight: 650; color: var(--ink); white-space: nowrap; }
.site-nav { display: flex; gap: 18px; overflow-x: auto; font-size: 14px; color: var(--mut); white-space: nowrap; flex: 1; }
.site-nav a:hover, .site-nav a[aria-current="page"] { color: var(--ink); }

.hero { min-height: 72svh; display: flex; align-items: center; background: radial-gradient(ellipse at 50% 0%, #10203a 0%, #000 62%); }
.hero h1 { margin: 0 0 20px; font-size: clamp(38px, 7vw, 68px); line-height: 1.08; color: var(--ink); }
.hero .actions { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin-top: 32px; }

.site-footer { border-top: 1px solid var(--hair); padding: 40px 0 56px; font-size: 13px; color: var(--faint); }
.site-footer a { color: var(--mut); }
.site-footer a:hover { color: var(--ink); }
.site-footer p { margin: 0 0 8px; }

.prose { color: var(--body); }
.prose h2 { margin: 56px 0 12px; font-size: 26px; color: var(--ink); }
.prose h3 { margin: 36px 0 8px; font-size: 20px; color: var(--ink); }
.prose a { color: var(--accent-hi); overflow-wrap: anywhere; }
.prose a:hover { text-decoration: underline; }
.prose code { background: var(--tint); border-radius: 6px; padding: 2px 6px; font-size: .9em; overflow-wrap: anywhere; }
.prose pre { background: var(--surf); border-radius: 12px; padding: 16px; overflow-x: auto; }
.prose pre code { background: none; padding: 0; overflow-wrap: normal; }
.prose table { display: block; overflow-x: auto; border-collapse: collapse; font-size: 14.5px; }
.prose th, .prose td { border-bottom: 1px solid var(--hair); padding: 8px 12px; text-align: left; }
.prose blockquote { margin: 24px 0; padding: 4px 16px; border-left: 3px solid var(--accent); color: var(--mut); }

@media (max-width: 600px) { .section { padding: 64px 0; } .hero { min-height: 60svh; } }
```

- [ ] **Step 6: 기본 레이아웃 작성**

`src/layouts/Base.astro`:

```astro
---
import '../styles/tokens.css';
import '../styles/site.css';
import { SITE } from '../data/site';

interface Props { title: string; description?: string }
const { title, description = SITE.description } = Astro.props;
const pageTitle = title === SITE.name ? `${SITE.name} — ${SITE.tagline}` : `${title} | ${SITE.name}`;
const canonical = new URL(Astro.url.pathname, SITE.url).href;
const beacon = import.meta.env.PUBLIC_CF_BEACON_TOKEN;
---
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{pageTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="alternate" type="application/rss+xml" title={SITE.name} href="/rss.xml" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
    <script is:inline>document.documentElement.classList.add('js');</script>
  </head>
  <body>
    <header class="site-header">
      <div class="wrap">
        <a class="brand" href="/">{SITE.name}</a>
        <nav class="site-nav scroll-thin" aria-label="주 메뉴">
          {SITE.nav.map((n) => <a href={n.href} aria-current={Astro.url.pathname.startsWith(n.href) ? 'page' : undefined}>{n.label}</a>)}
        </nav>
        <a class="btn-link" href="/download/">다운로드</a>
      </div>
    </header>
    <main><slot /></main>
    <footer class="site-footer">
      <div class="wrap">
        <p>{SITE.disclosure}</p>
        <p>
          운영 <a href={SITE.links.cdsa} target="_blank" rel="noopener">{SITE.operator}</a> ·
          문의 <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ·
          <a href="/about/">소개</a> · <a href="/rss.xml">RSS</a>
        </p>
      </div>
    </footer>
    <script is:inline>
      (() => {
        const els = document.querySelectorAll('[data-reveal],[data-stagger]');
        if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('show')); return; }
        const io = new IntersectionObserver((entries) => {
          for (const e of entries) if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
        }, { rootMargin: '0px 0px -8% 0px' });
        els.forEach((el) => io.observe(el));
      })();
    </script>
    {beacon && <script is:inline defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token: beacon })}></script>}
  </body>
</html>
```

- [ ] **Step 7: 홈 작성**

`src/pages/index.astro` (최신 글과 책 카드는 Task 2, 3에서 덧붙인다):

```astro
---
import Base from '../layouts/Base.astro';
import { SITE } from '../data/site';

const products = [
  { name: 'Studio', desc: '모델과 대화하고 자료를 정리하는 데스크톱 작업 공간입니다.', status: '사용 가능' },
  { name: 'Go', desc: '범위를 정해 일을 맡기고 단계마다 확인하는 작업형 에이전트입니다.', status: '사용 가능' },
  { name: 'Nexus', desc: '모델 연결, 키, 사용량을 한곳에서 관리하는 로컬 게이트웨이입니다.', status: '사용 가능' },
  { name: 'Stack', desc: '승인된 자료를 묶어 여러 AI 앱이 함께 쓰게 하는 지식 묶음입니다.', status: '출시 예정' },
];
---
<Base title={SITE.name}>
  <section class="hero">
    <div class="wrap">
      <h1><span class="ln"><span>보안 걱정 없이</span></span><span class="ln"><span>AI를 쓰는 방법</span></span></h1>
      <p class="lead">내 문서를 밖으로 보내지 않고 내 PC에서 AI를 돌립니다. Msty와 Ollama로 시작하는 방법을 한국어로 정리합니다.</p>
      <div class="actions">
        <a class="btn-pill" href="/download/">Msty 다운로드 안내</a>
        <a class="btn-link" href="/guide/">가이드부터 읽기</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="overline-label">로컬 우선 AI</p>
      <h2 class="h-judge" data-reveal>모델을 내 컴퓨터에 받아서 씁니다</h2>
      <p class="lead" data-reveal>질문과 문서가 인터넷으로 나가지 않으므로 사내 자료와 개인정보를 다루기 쉽습니다. 인터넷이 끊겨도 동작하고, 필요할 때만 온라인 모델을 함께 씁니다.</p>
    </div>
  </section>

  <section class="section" id="products">
    <div class="wrap">
      <p class="overline-label">Msty 제품</p>
      <h2 class="h-judge" data-reveal>네 가지 제품으로 나뉩니다</h2>
      <div class="grid" data-stagger style="margin-top:32px">
        {products.map((p) => (
          <div class="panel card">
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <p class="meta" style="margin-top:12px">{p.status}</p>
          </div>
        ))}
      </div>
      <p class="meta" style="margin-top:20px">제품 구성은 2026-10-10에 msty.ai에서 확인했습니다.</p>
    </div>
  </section>
</Base>
```

- [ ] **Step 8: 테스트 통과 확인**

Run: `npm test`
Expected: 4개 테스트 PASS.

- [ ] **Step 9: 커밋**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json public src tests
git commit -m "feat: Astro 뼈대, ssjsite 토큰, 홈 추가"
```

---

### Task 2: 글 컬렉션, 목록, 상세

**Files:**
- Create: `src/content.config.ts`, `src/lib/posts.ts`, `src/components/PostCard.astro`, `src/layouts/Article.astro`
- Create: `src/pages/[collection]/index.astro`, `src/pages/[collection]/[id].astro`
- Create: `src/content/news/site-renewal.md` (실제 첫 소식 글)
- Modify: `src/pages/index.astro` (최신 글 섹션)
- Test: `tests/site.test.mjs`, `tests/fixtures.test.mjs`

**Interfaces:**
- Consumes: `Base.astro` props, `SITE`.
- Produces: `COLLECTIONS: readonly ['guide','learn','news']`, `LABELS: Record<CollectionName, { title: string; lead: string }>`, `getPosts(name: CollectionName): Promise<Entry[]>`, `getAllPosts(): Promise<Entry[]>`(발행일 내림차순), `postUrl(collection: string, id: string): string`. `PostCard.astro` props `{ entry: Entry }`.

- [ ] **Step 1: 실패하는 테스트 추가**

`tests/site.test.mjs` 끝에 붙인다:

```js
test('글 목록과 상세가 빌드된다', () => {
  for (const c of ['guide', 'learn', 'news']) assert.ok(existsSync(join(DIST, c, 'index.html')), c);
  assert.ok(existsSync(join(DIST, 'news', 'site-renewal', 'index.html')));
  assert.match(read('news/index.html'), /href="\/news\/site-renewal\/"/);
  assert.match(read('index.html'), /href="\/news\/site-renewal\/"/);
});
```

`tests/fixtures.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { writeFileSync, rmSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const build = () => spawnSync('npx', ['astro', 'build'], { shell: true, encoding: 'utf8' });
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));

test('draft 글은 어디에도 나오지 않는다', () => {
  const f = 'src/content/news/zz-draft-fixture.md';
  writeFileSync(f, '---\ntitle: DRAFT_FIXTURE_TITLE\ndescription: 초안\ndate: 2026-10-10\ndraft: true\n---\n본문\n');
  try {
    assert.equal(build().status, 0);
    for (const p of walk('dist').filter((p) => /\.(html|xml|json)$/.test(p))) {
      assert.ok(!readFileSync(p, 'utf8').includes('DRAFT_FIXTURE_TITLE'), p);
    }
  } finally { rmSync(f); }
});

test('머리말이 틀리면 빌드가 실패한다', () => {
  const f = 'src/content/news/zz-bad-fixture.md';
  writeFileSync(f, '---\ntitle: 날짜 없음\n---\n본문\n');
  try { assert.notEqual(build().status, 0); } finally { rmSync(f); }
});
```

- [ ] **Step 2: 실패 확인**

Run: `npm test`
Expected: `글 목록과 상세가 빌드된다` FAIL.

- [ ] **Step 3: 컬렉션 스키마 작성**

`src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const base = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});
const md = (dir: string) => glob({ base: `./src/content/${dir}`, pattern: '**/*.md' });

export const collections = {
  guide: defineCollection({ loader: md('guide'), schema: base.extend({ order: z.number(), verified: z.coerce.date() }) }),
  learn: defineCollection({ loader: md('learn'), schema: base }),
  news: defineCollection({ loader: md('news'), schema: base }),
};
```

- [ ] **Step 4: 글 조회 함수 작성**

`src/lib/posts.ts`:

```ts
import { getCollection } from 'astro:content';

export const COLLECTIONS = ['guide', 'learn', 'news'] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export const LABELS: Record<CollectionName, { title: string; lead: string }> = {
  guide: { title: 'Msty 가이드', lead: '설치부터 모델 연결까지 순서대로 따라 합니다.' },
  learn: { title: '로컬 AI 학습', lead: 'Ollama, 모델 고르기, 임베딩을 다룹니다.' },
  news: { title: '소식', lead: 'Msty와 로컬 모델의 새 소식을 정리합니다.' },
};

export const postUrl = (collection: string, id: string) => `/${collection}/${id}/`;

export async function getPosts(name: CollectionName) {
  const posts = await getCollection(name, (e) => !e.data.draft);
  if (name === 'guide') return posts.sort((a, b) => (a.data as { order: number }).order - (b.data as { order: number }).order);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getAllPosts() {
  const lists = await Promise.all(COLLECTIONS.map((c) => getPosts(c)));
  return lists.flat().sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (d: Date) => d.toISOString().slice(0, 10);
```

- [ ] **Step 5: 카드와 글 레이아웃 작성**

`src/components/PostCard.astro`:

```astro
---
import { LABELS, postUrl, formatDate, type CollectionName } from '../lib/posts';
const { entry } = Astro.props;
---
<a class="panel card" href={postUrl(entry.collection, entry.id)}>
  <p class="meta">{LABELS[entry.collection as CollectionName].title} · {formatDate(entry.data.date)}</p>
  <h3>{entry.data.title}</h3>
  <p>{entry.data.description}</p>
</a>
```

`src/layouts/Article.astro`:

```astro
---
import Base from './Base.astro';
import { LABELS, formatDate, type CollectionName } from '../lib/posts';
const { entry } = Astro.props;
const label = LABELS[entry.collection as CollectionName];
const { title, description, date, updated, tags, verified } = entry.data;
---
<Base title={title} description={description}>
  <article class="section">
    <div class="wrap narrow">
      <p class="overline-label"><a href={`/${entry.collection}/`}>{label.title}</a></p>
      <h1 class="h-judge">{title}</h1>
      <p class="meta">
        {formatDate(date)}
        {updated && ` · 수정 ${formatDate(updated)}`}
        {verified && ` · 앱 화면 확인 ${formatDate(verified)}`}
      </p>
      {tags.length > 0 && <div class="chip-row" style="margin-top:12px">{tags.map((t: string) => <span class="chip chip-plain">{t}</span>)}</div>}
      <div class="prose"><slot /></div>
    </div>
  </article>
</Base>
```

- [ ] **Step 6: 목록·상세 라우트 작성**

`src/pages/[collection]/index.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import PostCard from '../../components/PostCard.astro';
import { COLLECTIONS, LABELS, getPosts, type CollectionName } from '../../lib/posts';

export function getStaticPaths() {
  return COLLECTIONS.map((collection) => ({ params: { collection } }));
}
const collection = Astro.params.collection as CollectionName;
const posts = await getPosts(collection);
const label = LABELS[collection];
---
<Base title={label.title} description={label.lead}>
  <section class="section">
    <div class="wrap">
      <h1 class="h-judge">{label.title}</h1>
      <p class="lead">{label.lead}</p>
      {posts.length === 0
        ? <p class="meta" style="margin-top:32px">아직 올라온 글이 없습니다.</p>
        : <div class="grid" style="margin-top:32px">{posts.map((entry) => <PostCard entry={entry} />)}</div>}
    </div>
  </section>
</Base>
```

`src/pages/[collection]/[id].astro`:

```astro
---
import { render } from 'astro:content';
import Article from '../../layouts/Article.astro';
import { COLLECTIONS, getPosts } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = [];
  for (const collection of COLLECTIONS) {
    for (const entry of await getPosts(collection)) paths.push({ params: { collection, id: entry.id }, props: { entry } });
  }
  return paths;
}
const { entry } = Astro.props;
const { Content } = await render(entry);
---
<Article entry={entry}><Content /></Article>
```

- [ ] **Step 7: 첫 소식 글 작성**

`src/content/news/site-renewal.md`:

```markdown
---
title: msty.kr을 새로 엽니다
description: 사이트를 로컬 우선 AI 한국어 가이드로 다시 만들었습니다. Msty 제품 구성이 어떻게 바뀌었는지도 정리합니다.
date: 2026-10-10
tags: [공지, Msty]
---

msty.kr을 로컬 우선 AI를 다루는 한국어 가이드 사이트로 다시 만들었습니다. 내 PC에서 모델을 돌려 문서를 밖으로 보내지 않고 AI를 쓰는 방법을 정리합니다.

## 무엇을 다루나

- Msty 설치와 사용법
- Ollama, Gemma, 임베딩 같은 로컬 모델 학습 자료
- 모델을 찾고 비교하는 사이트 모음
- 브라우저에서 바로 해보는 로컬 AI 실습

## Msty 제품 구성이 바뀌었습니다

2024년에 나온 책은 Msty가 앱 하나이던 때를 기준으로 썼습니다. 지금은 Studio, Go, Nexus, Stack 네 가지로 나뉩니다. 책에서 설명한 채팅, 지식 스택, 모델 받기는 Studio에 해당합니다. 달라진 점은 [책 페이지](/book/)에 모아 두었습니다.

## 이 사이트의 성격

한국데이터사이언티스트협회가 운영하는 비공식 가이드입니다. 설치 파일은 올리지 않으며, 다운로드는 Msty 공식 사이트로 안내합니다.
```

- [ ] **Step 8: 홈에 최신 글 섹션 추가**

`src/pages/index.astro` 머리말에 추가:

```astro
import PostCard from '../components/PostCard.astro';
import { getAllPosts } from '../lib/posts';
const latest = (await getAllPosts()).slice(0, 6);
```

`#products` 섹션 뒤에 추가:

```astro
  {latest.length > 0 && (
    <section class="section">
      <div class="wrap">
        <p class="overline-label">최신 글</p>
        <h2 class="h-judge" data-reveal>새로 올라온 글</h2>
        <div class="grid" data-stagger style="margin-top:32px">{latest.map((entry) => <PostCard entry={entry} />)}</div>
      </div>
    </section>
  )}
```

- [ ] **Step 9: 테스트 통과 확인**

Run: `npm test` → 전부 PASS.
Run: `npm run test:fixtures` → 2개 PASS. 끝난 뒤 `git status`에 `zz-*-fixture.md`가 남아 있지 않은지 확인한다.

- [ ] **Step 10: 커밋**

```bash
git add src tests
git commit -m "feat: 글 컬렉션, 목록·상세 페이지, 첫 소식 글 추가"
```

---

### Task 3: 다운로드, 책, 소개, 404

**Files:**
- Create: `src/pages/download.astro`, `src/pages/book.astro`, `src/pages/about.astro`, `src/pages/404.astro`, `public/_redirects`
- Modify: `src/pages/index.astro` (책 카드)
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `Base.astro`, `SITE.mstyDownload`, `SITE.email`, `SITE.links`.

- [ ] **Step 1: 실패하는 테스트 추가**

```js
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
```

- [ ] **Step 2: 실패 확인**

Run: `npm test` → 새 테스트 FAIL.

- [ ] **Step 3: 다운로드 페이지**

`src/pages/download.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import { SITE } from '../data/site';
const platforms = [
  { os: 'Windows', req: 'Windows 10·11 (64비트)', guide: '/guide/install-windows/' },
  { os: 'macOS', req: 'macOS 11 이상, Apple Silicon 또는 Intel', guide: '/guide/install-mac/' },
  { os: 'Linux', req: '64비트, AppImage 또는 .deb', guide: '/guide/what-is-msty/' },
];
---
<Base title="Msty 다운로드" description="Msty Studio를 받는 곳과 운영체제별 설치 안내입니다.">
  <section class="section">
    <div class="wrap narrow">
      <h1 class="h-judge">Msty 다운로드</h1>
      <p class="lead">설치 파일은 Msty 공식 사이트에서 받습니다. 이 사이트는 파일을 따로 보관하지 않습니다.</p>
      <p style="margin:28px 0"><a class="btn-pill" href={SITE.mstyDownload} target="_blank" rel="noopener">Msty 공식 사이트에서 받기</a></p>
      <div class="grid">
        {platforms.map((p) => (
          <a class="panel card" href={p.guide}>
            <h3>{p.os}</h3>
            <p>{p.req}</p>
            <p class="meta" style="margin-top:12px">설치 가이드 보기</p>
          </a>
        ))}
      </div>
      <p class="meta" style="margin-top:20px">지원 환경은 2026-10-10에 msty.ai에서 확인했습니다. 책에서 안내한 다운로드 위치도 이 페이지입니다.</p>
    </div>
  </section>
</Base>
```

- [ ] **Step 4: 책 페이지**

`src/pages/book.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import { SITE } from '../data/site';
const changes = [
  { book: '1장 미스티 시작하기 (다운로드·설치)', now: '다운로드는 Msty 공식 사이트의 Studio 페이지에서 받습니다.', href: '/download/' },
  { book: '1장 첫 실행과 설정', now: '첫 실행 화면과 모델 받는 순서를 현재 앱 기준으로 다시 정리했습니다.', href: '/guide/first-run-and-models/' },
  { book: '1장 Ollama 모델 설정', now: 'Ollama로 받은 모델을 연결하는 방법을 따로 다룹니다.', href: '/guide/connect-ollama/' },
  { book: '책 전체의 "Msty"', now: '지금은 Studio, Go, Nexus, Stack 네 제품으로 나뉩니다. 책의 내용은 Studio에 해당합니다.', href: '/guide/what-is-msty/' },
];
---
<Base title="책" description="「보안걱정없이 LLM과 AI를 사용할 수 있는 가장 쉬운 방법」 소개와 책 이후 달라진 점입니다.">
  <section class="section">
    <div class="wrap narrow">
      <p class="overline-label">책</p>
      <h1 class="h-judge">보안걱정없이 LLM과 AI를 사용할 수 있는 가장 쉬운 방법</h1>
      <p class="meta">신성진·김태유 지음 · {SITE.operator} · 발행 2024-12-06 · 5,000원</p>
      <p class="lead" style="margin-top:20px">Msty를 처음 설치해 로컬 모델을 쓰기까지의 과정을 담은 한국어 사용자 가이드입니다.</p>
      <p style="margin:28px 0"><a class="btn-pill" href={`mailto:${SITE.email}?subject=${encodeURIComponent('책 구매 문의')}`}>구매 문의</a></p>

      <div class="prose">
        <h2>책 이후 달라진 점</h2>
        <p>책은 2024년 12월의 Msty를 기준으로 썼습니다. 그 뒤 바뀐 내용을 장별로 정리하고 최신 가이드로 연결합니다.</p>
      </div>
      <div class="grid" style="margin-top:20px">
        {changes.map((c) => (
          <a class="panel card" href={c.href}>
            <p class="meta">{c.book}</p>
            <p style="margin-top:8px;color:var(--body)">{c.now}</p>
          </a>
        ))}
      </div>

      <div class="prose">
        <h2>정오표</h2>
        <p>알려진 오류가 없습니다. 오류를 찾으시면 <a href={`mailto:${SITE.email}`}>{SITE.email}</a>로 알려 주세요.</p>
      </div>
    </div>
  </section>
</Base>
```

- [ ] **Step 5: 소개 페이지**

`src/pages/about.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import { SITE } from '../data/site';
---
<Base title="소개" description="msty.kr을 누가, 왜 운영하는지 밝힙니다.">
  <section class="section">
    <div class="wrap narrow">
      <h1 class="h-judge">소개</h1>
      <div class="prose">
        <h2>무엇을 하는 사이트인가</h2>
        <p>내 PC에서 AI 모델을 돌리는 방법을 한국어로 정리합니다. Msty 사용법과 함께 Ollama, Gemma, 임베딩 같은 로컬 우선 AI의 학습 자료와 소식을 다룹니다.</p>
        <h2>운영</h2>
        <p><a href={SITE.links.cdsa} target="_blank" rel="noopener">{SITE.operator}</a>가 운영합니다. 글은 <a href={SITE.links.author} target="_blank" rel="noopener">신성진</a>이 씁니다.</p>
        <h2>Msty와의 관계</h2>
        <p>{SITE.disclosure}</p>
        <p>Msty의 이름과 상표는 Msty의 것입니다. 설치 파일은 이 사이트에 올리지 않으며 <a href={SITE.mstyDownload} target="_blank" rel="noopener">공식 사이트</a>로 안내합니다. 제품 설명은 <a href={SITE.mstyDocs} target="_blank" rel="noopener">공식 문서</a>와 현재 앱을 확인하고 씁니다.</p>
        <h2>문의</h2>
        <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>
    </div>
  </section>
</Base>
```

- [ ] **Step 6: 404와 리다이렉트**

`src/pages/404.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="페이지를 찾을 수 없습니다">
  <section class="section">
    <div class="wrap narrow">
      <h1 class="h-judge">페이지를 찾을 수 없습니다</h1>
      <p class="lead">주소가 바뀌었거나 없는 페이지입니다.</p>
      <div class="hero actions" style="min-height:0;background:none;margin-top:28px">
        <a class="btn-pill" href="/">홈으로</a>
        <a class="btn-link" href="/download/">다운로드</a>
        <a class="btn-link" href="/guide/">가이드</a>
      </div>
    </div>
  </section>
</Base>
```

`public/_redirects`:

```
/channels/* / 301
/code-protection / 301
```

- [ ] **Step 7: 홈에 책 카드 추가**

`src/pages/index.astro`의 마지막 섹션 뒤에 추가:

```astro
  <section class="section">
    <div class="wrap">
      <p class="overline-label">책</p>
      <h2 class="h-judge" data-reveal>책을 읽고 오셨다면</h2>
      <p class="lead" data-reveal>책 이후 달라진 다운로드 위치와 제품 구성을 한 페이지에 모았습니다.</p>
      <p style="margin-top:24px"><a class="btn-link" href="/book/">책 이후 달라진 점 보기</a></p>
    </div>
  </section>
```

- [ ] **Step 8: 테스트 통과 확인 후 커밋**

Run: `npm test` → 전부 PASS.

```bash
git add src public tests
git commit -m "feat: 다운로드, 책, 소개, 404 페이지 추가"
```

---

### Task 4: 모델 찾기와 실습 페이지

**Files:**
- Create: `scripts/convert-model-links.mjs` (한 번 쓰고 지운다), `src/data/model-links.json`, `src/data/lab.json`
- Create: `src/pages/models.astro`, `src/pages/lab.astro`
- Delete: `docs/content-drafts/model-links.md` (JSON이 원본이 된다)
- Test: `tests/site.test.mjs`

**Interfaces:**
- Produces: `model-links.json`은 `{ group: string; name: string; url: string; desc: string; checked: string; note?: string }[]`. `lab.json`은 `{ name: string; url: string; desc: string }[]`.

- [ ] **Step 1: 실패하는 테스트 추가**

```js
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
```

- [ ] **Step 2: 실패 확인**

Run: `npm test` → 새 테스트 FAIL.

- [ ] **Step 3: 원고를 JSON으로 변환**

`scripts/convert-model-links.mjs`:

```js
import { readFileSync, writeFileSync } from 'node:fs';

const lines = readFileSync('docs/content-drafts/model-links.md', 'utf8').split(/\r?\n/);
const out = [];
let group = null;
for (const line of lines) {
  const h = line.match(/^## \d+\. (.+)$/);
  if (h) { group = h[1].trim(); continue; }
  if (line.startsWith('## ')) { group = null; continue; }
  if (!group || !line.startsWith('|')) continue;
  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  const i = cells.findIndex((c) => /^https?:\/\//.test(c));
  if (i < 1) continue;
  const [desc, note] = cells[i + 1].split(/\. (?=확인 필요|\d{4}-\d{2}-\d{2} 기준)/);
  const item = { group, name: cells[i - 1], url: cells[i], desc: desc.replace(/\.$/, ''), checked: '2026-10-10' };
  if (note) item.note = note;
  out.push(item);
}
writeFileSync('src/data/model-links.json', JSON.stringify(out, null, 2) + '\n');
console.log(out.length, 'links,', new Set(out.map((o) => o.group)).size, 'groups');
```

Run: `node scripts/convert-model-links.mjs`
Expected: `60 links, 9 groups`

`src/data/model-links.json`을 열어 `note`가 붙은 항목이 3개(Open LLM Leaderboard, GPU Poor LLM Arena, Open Ko-LLM 리더보드)인지 확인한다. 맞으면 원고와 스크립트를 지운다.

```bash
git rm -q docs/content-drafts/model-links.md
rm scripts/convert-model-links.mjs
```

- [ ] **Step 4: 실습 데이터 작성**

`src/data/lab.json`:

```json
[
  { "name": "브라우저에서 Gemma 돌리기", "url": "https://ag-firebase-board-2026.web.app/browser/44-local-gemma", "desc": "설치 없이 브라우저 안에서 Gemma 모델을 받아 대화합니다." },
  { "name": "WebLLM 채팅", "url": "https://ag-firebase-board-2026.web.app/browser/57-webllm", "desc": "WebGPU로 언어 모델을 브라우저에서 실행합니다." },
  { "name": "Chrome 내장 AI", "url": "https://ag-firebase-board-2026.web.app/browser/58-chrome-builtin-ai", "desc": "Chrome에 들어 있는 모델을 불러 써 봅니다." },
  { "name": "Whisper 음성 인식", "url": "https://ag-firebase-board-2026.web.app/browser/55-whisper", "desc": "녹음한 말을 브라우저에서 글로 바꿉니다." },
  { "name": "Kokoro 음성 합성", "url": "https://ag-firebase-board-2026.web.app/browser/56-kokoro-tts", "desc": "글을 브라우저에서 음성으로 읽어 줍니다." },
  { "name": "문서 검색", "url": "https://ag-firebase-board-2026.web.app/browser/53-doc-search", "desc": "올린 문서에서 뜻이 가까운 문장을 찾습니다." },
  { "name": "OCR", "url": "https://ag-firebase-board-2026.web.app/browser/54-ocr", "desc": "이미지 속 글자를 브라우저에서 읽어 냅니다." },
  { "name": "글 다루는 AI", "url": "https://ag-firebase-board-2026.web.app/browser/42-text-ai", "desc": "요약과 분류 같은 글 작업을 브라우저 모델로 해 봅니다." }
]
```

여덟 주소를 브라우저로 하나씩 열어 화면에 보이는 기능과 `desc`가 맞는지 확인하고, 다르면 화면에 맞게 `desc`를 고친다.

- [ ] **Step 5: 페이지 작성**

`src/pages/models.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import links from '../data/model-links.json';
const groups = [...new Set(links.map((l) => l.group))];
---
<Base title="모델 찾기" description="로컬 모델을 찾고, 비교하고, 내 PC에서 도는지 확인하는 사이트 모음입니다.">
  <section class="section">
    <div class="wrap">
      <h1 class="h-judge">모델 찾기</h1>
      <p class="lead">로컬 모델을 찾고, 성능을 비교하고, 내 PC에서 도는지 확인할 수 있는 사이트를 모았습니다. 순위는 자주 바뀌므로 각 사이트에서 직접 확인하세요.</p>
      <div class="chip-row" style="margin-top:24px">
        {groups.map((g, i) => <a class="chip chip-plain" href={`#g${i + 1}`}>{g}</a>)}
      </div>
      {groups.map((g, i) => (
        <>
          <h2 class="h-judge" id={`g${i + 1}`} style="font-size:26px;margin:64px 0 20px;scroll-margin-top:72px">{g}</h2>
          <div class="grid">
            {links.filter((l) => l.group === g).map((l) => (
              <a class="panel card model-link" href={l.url} target="_blank" rel="noopener">
                <h3>{l.name}</h3>
                <p>{l.desc}</p>
                {l.note && <p class="meta" style="margin-top:10px">{l.note}</p>}
              </a>
            ))}
          </div>
        </>
      ))}
      <p class="meta" style="margin-top:48px">접속 확인 2026-10-10. 열리지 않는 주소는 문의 메일로 알려 주세요.</p>
    </div>
  </section>
</Base>
```

`src/pages/lab.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import { SITE } from '../data/site';
import demos from '../data/lab.json';
---
<Base title="실습" description="설치 없이 브라우저에서 바로 해보는 로컬 AI 데모입니다.">
  <section class="section">
    <div class="wrap">
      <h1 class="h-judge">브라우저에서 해보는 로컬 AI</h1>
      <p class="lead">아래 데모는 모델을 브라우저로 내려받아 내 기기에서 실행합니다. 처음 열 때 모델을 받느라 시간이 걸립니다.</p>
      <div class="grid" style="margin-top:32px">
        {demos.map((d) => (
          <a class="panel card" href={d.url} target="_blank" rel="noopener">
            <h3>{d.name}</h3>
            <p>{d.desc}</p>
          </a>
        ))}
      </div>
      <div class="prose narrow">
        <h2>더 큰 모델을 쓰려면</h2>
        <p>브라우저 데모는 작은 모델만 다룹니다. 더 큰 모델은 <a href="/learn/ollama-first-steps/">Ollama</a>로 받고, 화면에서 편하게 쓰려면 <a href="/download/">Msty</a>를 설치합니다.</p>
        <p>데모는 <a href={SITE.links.board} target="_blank" rel="noopener">VibeStack 보드</a>에 있습니다.</p>
      </div>
    </div>
  </section>
</Base>
```

- [ ] **Step 6: 테스트 통과 확인 후 커밋**

Run: `npm test` → 전부 PASS.

```bash
git add -A src docs scripts tests
git commit -m "feat: 모델 찾기, 실습 페이지 추가"
```

---

### Task 5: RSS와 JSON 피드

**Files:**
- Create: `src/pages/rss.xml.js`, `src/pages/feed.json.js`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `getAllPosts()`, `postUrl()`, `SITE`.
- Produces: `/feed.json` 형식 `{ title, home, updated, items: [{ title, url, date, description, tags, collection }] }`. `url`은 절대 주소, `date`는 `YYYY-MM-DD`.

- [ ] **Step 1: 실패하는 테스트 추가**

```js
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
```

- [ ] **Step 2: 실패 확인**

Run: `npm test` → `피드가 유효하다` FAIL.

- [ ] **Step 3: 피드 작성**

`src/pages/rss.xml.js`:

```js
import rss from '@astrojs/rss';
import { getAllPosts, postUrl } from '../lib/posts';
import { SITE } from '../data/site';

export async function GET(context) {
  const posts = await getAllPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: postUrl(p.collection, p.id) })),
  });
}
```

`src/pages/feed.json.js`:

```js
import { getAllPosts, postUrl, formatDate } from '../lib/posts';
import { SITE } from '../data/site';

export async function GET() {
  const posts = await getAllPosts();
  const body = {
    title: SITE.name,
    home: SITE.url,
    updated: new Date().toISOString(),
    items: posts.map((p) => ({
      title: p.data.title,
      url: SITE.url + postUrl(p.collection, p.id),
      date: formatDate(p.data.date),
      description: p.data.description,
      tags: p.data.tags,
      collection: p.collection,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
```

- [ ] **Step 4: 테스트 통과 확인 후 커밋**

Run: `npm test` → 전부 PASS.

```bash
git add src tests
git commit -m "feat: RSS와 JSON 피드 추가"
```

---

### Task 6: MVP 글 7편

**Files:**
- Create: `src/content/guide/what-is-msty.md`, `install-windows.md`, `install-mac.md`, `first-run-and-models.md`, `connect-ollama.md`
- Create: `src/content/learn/ollama-first-steps.md`, `choose-model-for-your-pc.md`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes: Task 3·4의 페이지가 이 `id`들로 링크한다 (`what-is-msty`, `install-windows`, `install-mac`, `first-run-and-models`, `connect-ollama`, `ollama-first-steps`).

글의 본문은 계획에 미리 적지 않는다. 공식 문서를 읽고 확인한 내용만 써야 하기 때문이다. 각 글은 아래 머리말과 목차를 그대로 쓰고, 작성 규칙을 지킨다.

**작성 규칙 (모든 글 공통)**

- 쓰기 전에 출처를 읽는다. Msty 글은 `https://docs.msty.ai/studio/getting-started`와 거기서 이어지는 문서, `https://msty.ai/products/studio/`, `https://msty.ai/pricing/`. Ollama 글은 `https://github.com/ollama/ollama`의 README와 `https://ollama.com/download`.
- 메뉴 이름, 버튼 이름, 요금, 시스템 요구 사항은 출처에 적힌 그대로 쓴다. 출처에서 찾지 못한 내용은 쓰지 않는다.
- 글 끝에 `## 참고한 문서` 절을 두고 실제로 읽은 주소를 적는다.
- 스크린샷은 넣지 않는다.
- 합니다체, 한 문단 2~4문장, 글 하나에 600~1,200자(공백 제외).
- 명령어는 코드 블록에 한 줄씩 넣는다.

- [ ] **Step 1: 실패하는 테스트 추가**

```js
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
```

- [ ] **Step 2: 실패 확인**

Run: `npm test` → FAIL (글이 없고 `/guide/install-windows/` 등 내부 링크가 깨져 있음).

- [ ] **Step 3: 가이드 5편 작성**

머리말의 `verified`는 출처를 읽은 날짜로 적는다.

`what-is-msty.md`:

```markdown
---
title: Msty란 무엇인가
description: 로컬 우선 AI가 무엇인지, Msty의 네 가지 제품이 각각 무슨 일을 하는지 정리합니다.
date: 2026-10-10
order: 1
verified: 2026-10-10
tags: [Msty, 입문]
---
## 로컬 우선 AI란
## Msty가 하는 일
## 네 가지 제품 (Studio, Go, Nexus, Stack)
## 무엇부터 설치하나
## 요금
## 참고한 문서
```

`install-windows.md` — `order: 2`, title `Windows에 Msty Studio 설치하기`, description `Windows 10·11에 Msty Studio를 설치하는 순서입니다.`, tags `[Msty, 설치, Windows]`. 목차: `## 준비물` / `## 설치 파일 받기` / `## 설치하기` / `## 처음 실행하기` / `## 자주 막히는 곳` / `## 참고한 문서`.

`install-mac.md` — `order: 3`, title `Mac에 Msty Studio 설치하기`, description `Apple Silicon과 Intel Mac에 Msty Studio를 설치하는 순서입니다.`, tags `[Msty, 설치, Mac]`. 목차: `## 내 Mac 확인하기 (Apple Silicon과 Intel)` / `## 설치 파일 받기` / `## 설치하기` / `## 처음 실행하기` / `## 참고한 문서`.

`first-run-and-models.md` — `order: 4`, title `첫 실행과 모델 받기`, description `Msty Studio를 처음 켠 뒤 로컬 모델을 받아 첫 대화를 하기까지입니다.`, tags `[Msty, 모델]`. 목차: `## 처음 켜면 보이는 화면` / `## 로컬 모델 받기` / `## 첫 대화` / `## 온라인 모델도 함께 쓰려면` / `## 다음에 읽을 글` / `## 참고한 문서`. "다음에 읽을 글"에서 `/learn/choose-model-for-your-pc/`와 `/models/`로 링크한다.

`connect-ollama.md` — `order: 5`, title `Ollama 모델을 Msty에 연결하기`, description `Ollama로 이미 받아 둔 모델을 Msty Studio에서 쓰는 방법입니다.`, tags `[Msty, Ollama]`. 목차: `## 언제 필요한가` / `## Ollama가 켜져 있는지 확인하기` / `## Msty에서 연결하기` / `## 연결이 안 될 때` / `## 참고한 문서`. Ollama 설치는 `/learn/ollama-first-steps/`로 링크한다.

- [ ] **Step 4: 학습 2편 작성**

`ollama-first-steps.md` — title `Ollama 처음 시작하기`, description `Ollama를 설치하고 명령 한 줄로 모델을 받아 대화합니다.`, date `2026-10-10`, tags `[Ollama, 입문]`. 목차: `## Ollama란` / `## 설치` / `## 모델 받아 실행하기` / `## 받은 모델 보고 지우기` / `## 화면에서 쓰려면` / `## 참고한 문서`. "화면에서 쓰려면"에서 `/guide/connect-ollama/`로 링크한다.

`choose-model-for-your-pc.md` — title `내 PC 사양으로 돌릴 수 있는 모델 고르기`, description `메모리와 그래픽카드를 확인하고 내 PC에 맞는 모델 크기를 고르는 방법입니다.`, date `2026-10-10`, tags `[모델, 사양]`. 목차: `## 먼저 확인할 두 가지 (메모리, 그래픽카드)` / `## 내 사양 확인하는 법 (Windows, Mac)` / `## 모델 크기와 양자화 읽는 법` / `## 돌아가는지 확인해 주는 사이트` / `## 임베딩 모델은 따로 고릅니다` / `## 참고한 문서`. "돌아가는지 확인해 주는 사이트"는 `/models/#g6`로 링크한다. 구체적인 "몇 GB면 어떤 모델" 표는 `https://github.com/ollama/ollama` README에 적힌 메모리 안내만 인용하고, 그 밖의 수치는 쓰지 않는다.

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm test` → 전부 PASS.

- [ ] **Step 6: 사실 확인 점검**

글마다 `## 참고한 문서`의 주소를 다시 열어, 본문에 나오는 메뉴 이름·버튼 이름·요금·요구 사항이 출처와 글자 그대로 같은지 대조한다. 다른 곳은 출처에 맞춰 고치고, 출처에 없는 문장은 지운다.

- [ ] **Step 7: 커밋**

```bash
git add src tests
git commit -m "docs: MVP 가이드 5편과 학습 2편 추가"
```

---

### Task 7: 링크 검사와 화면 검증

**Files:**
- Create: `scripts/check-links.mjs`
- Modify: 검증에서 드러난 문제가 있는 파일

- [ ] **Step 1: 외부 링크 검사 스크립트**

`scripts/check-links.mjs`:

```js
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith('.html') ? [join(d, e.name)] : []));
const urls = new Set();
for (const f of walk('dist')) for (const [, u] of readFileSync(f, 'utf8').matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"/g)) urls.add(u.replace(/&amp;/g, '&'));

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';
async function check(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(20000) });
      if (res.status < 400 || res.status === 403 || res.status === 429) return null;
      if (attempt === 1) return `${res.status}`;
    } catch (e) {
      if (attempt === 1) return e.name;
    }
  }
}

const list = [...urls];
const bad = [];
for (let i = 0; i < list.length; i += 8) {
  const results = await Promise.all(list.slice(i, i + 8).map(async (u) => [u, await check(u)]));
  for (const [u, err] of results) if (err) bad.push(`${err}  ${u}`);
}
console.log(`checked ${list.length} links, ${bad.length} failed`);
if (bad.length) { console.log(bad.join('\n')); process.exit(1); }
```

403과 429는 봇 차단으로 보고 통과시킨다 (Reddit 등이 해당한다).

- [ ] **Step 2: 링크 검사 실행**

Run: `npm run build && npm run check:links`
Expected: `checked N links, 0 failed`. 실패한 주소가 있으면 브라우저로 열어 본다. 실제로 죽은 주소면 `src/data/model-links.json`이나 해당 글에서 지우고 다시 실행한다.

- [ ] **Step 3: 화면 확인**

Run: `npm run preview` (백그라운드). 브라우저로 `http://localhost:4321`을 연다.

아래 11개 주소를 375×812와 데스크톱 폭에서 각각 확인한다: `/`, `/download/`, `/guide/`, `/guide/first-run-and-models/`, `/learn/`, `/learn/choose-model-for-your-pc/`, `/models/`, `/lab/`, `/news/site-renewal/`, `/book/`, `/about/`, 그리고 없는 주소 `/nope`.

주소마다 콘솔에서 실행해 가로 넘침이 없는지 본다:

```js
document.documentElement.scrollWidth <= document.documentElement.clientWidth
```

Expected: 모두 `true`. `false`면 넘치는 요소를 찾아 `site.css`를 고친다.

- [ ] **Step 4: 모션 줄이기와 자바스크립트 꺼짐 확인**

브라우저 에뮬레이션에서 `prefers-reduced-motion: reduce`를 켜고 `/`를 새로 고친다. 히어로 제목과 모든 섹션이 애니메이션 없이 바로 보여야 한다.

자바스크립트가 꺼진 상태는 원본 HTML로 확인한다:

```bash
curl -s http://localhost:4321/ | grep -c 'data-reveal'
```

Expected: 1 이상이고, Task 1의 `자바스크립트 없이도 리빌 요소가 보인다` 테스트가 통과한다 (`.js` 클래스가 없으면 숨김 규칙이 적용되지 않는다).

- [ ] **Step 5: Lighthouse**

Run: `npx lighthouse http://localhost:4321/ --only-categories=performance,accessibility --chrome-flags="--headless" --quiet --output=json --output-path=./lighthouse.json`

그다음:

```bash
node -e "const r=require('./lighthouse.json').categories;console.log(r.performance.score*100,r.accessibility.score*100)"
```

Expected: 두 점수 모두 90 이상. 미달이면 보고서의 감점 항목을 고친 뒤 다시 잰다. `lighthouse.json`은 커밋하지 않는다 (`.gitignore`에 `lighthouse.json` 추가).

- [ ] **Step 6: 커밋**

```bash
git add scripts .gitignore src
git commit -m "test: 외부 링크 검사 추가, 화면 검증에서 나온 문제 수정"
```

---

### Task 8: Cloudflare 배포 (임시 주소)

**Files:**
- Create: `wrangler.jsonc`, `README.md`

- [ ] **Step 1: Wrangler 설정**

`wrangler.jsonc`:

```jsonc
{
  "name": "msty-kr",
  "compatibility_date": "2026-10-10",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

- [ ] **Step 2: README 작성**

`README.md`:

````markdown
# msty.kr

로컬 우선 AI 한국어 가이드 사이트. Astro 정적 사이트이며 Cloudflare Workers 정적 자산으로 배포한다.

## 명령

```bash
npm install
npm run dev          # http://localhost:4321
npm test             # 빌드 후 dist 검사
npm run test:fixtures  # draft·잘못된 머리말 검사
npm run check:links  # 외부 링크 검사
npx wrangler deploy  # 배포
```

## 글 쓰기

`src/content/guide|learn|news/`에 마크다운 파일을 추가한다. 파일 이름이 주소가 되므로 영문 소문자와 하이픈만 쓴다.

```markdown
---
title: 제목
description: 목록에 보이는 한두 문장
date: 2026-10-10
tags: [태그]
---
```

`guide` 글은 `order`(순서)와 `verified`(앱 화면 확인일)가 더 필요하다. `draft: true`를 넣으면 발행되지 않는다.

## 링크 모음

`/models`의 링크는 `src/data/model-links.json`, `/lab`의 카드는 `src/data/lab.json`에서 고친다.
````

- [ ] **Step 3: 로그인 확인**

Run: `npx wrangler whoami`
Expected: 계정 이메일이 나온다. 로그인되어 있지 않으면 여기서 멈추고 운영자에게 `npx wrangler login` 실행을 요청한다.

- [ ] **Step 4: 배포**

Run: `npm test && npx wrangler deploy`
Expected: `https://msty-kr.<계정>.workers.dev` 주소가 출력된다.

- [ ] **Step 5: 배포 확인**

출력된 주소를 `$U`로 두고:

```bash
curl -s -o /dev/null -w "%{http_code}\n" $U/
curl -s -o /dev/null -w "%{http_code}\n" $U/models/
curl -s -o /dev/null -w "%{http_code}\n" $U/nope
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" $U/channels/abc
curl -s $U/feed.json | head -c 200
```

Expected: `200`, `200`, `404`, `301 .../`, JSON 앞부분.

- [ ] **Step 6: 커밋과 GitHub push**

```bash
git add wrangler.jsonc README.md
git commit -m "chore: Cloudflare Workers 배포 설정과 README 추가"
git push -u origin main
```

- [ ] **Step 7: 운영자에게 보고**

임시 주소를 전달하고 검수를 요청한다. 자동 배포를 원하면 Cloudflare 대시보드의 Workers → `msty-kr` → Settings → Builds에서 GitHub 저장소 `cdsassj00/msty`를 연결하고 빌드 명령 `npm run build`, 배포 명령 `npx wrangler deploy`를 넣도록 안내한다.

---

### Task 9: 도메인 전환 (운영자 확인 후)

이 작업은 운영자가 임시 주소를 검수하고 전환을 승인한 뒤에만 시작한다.

**Files:**
- Modify: `wrangler.jsonc`

- [ ] **Step 1: 현재 DNS 기록**

```bash
nslookup -type=NS msty.kr
nslookup -type=NS msty.co.kr
nslookup -type=MX msty.kr
nslookup -type=MX msty.co.kr
nslookup -type=A www.msty.kr
```

결과를 `docs/dns-before-switch.md`에 그대로 붙여 커밋한다. MX 레코드가 있으면 운영자에게 메일 사용 여부를 묻고, 쓰고 있으면 Cloudflare에 같은 MX를 먼저 만든다.

- [ ] **Step 2: 운영자 작업 요청**

네임서버가 Cloudflare가 아니면 운영자에게 다음을 요청한다: Cloudflare에 `msty.kr`과 `msty.co.kr`을 추가하고, 도메인 등록 기관에서 네임서버를 Cloudflare가 알려 준 값으로 바꾼다. 두 도메인이 Cloudflare에서 Active가 될 때까지 기다린다.

- [ ] **Step 3: 커스텀 도메인 연결**

`wrangler.jsonc`에 추가:

```jsonc
  "routes": [
    { "pattern": "msty.kr", "custom_domain": true },
    { "pattern": "www.msty.kr", "custom_domain": true }
  ]
```

Run: `npx wrangler deploy`

- [ ] **Step 4: 리다이렉트 규칙**

Cloudflare 대시보드의 Rules → Redirect Rules에서 두 규칙을 만든다 (운영자 또는 운영자 확인 후 브라우저로).

1. `msty.kr` 영역: 호스트가 `www.msty.kr`이면 `https://msty.kr` + 원래 경로로 301.
2. `msty.co.kr` 영역: 호스트가 `msty.co.kr` 또는 `www.msty.co.kr`이면 `https://msty.kr` + 원래 경로로 301. 이 영역에는 프록시가 켜진 `A` 레코드 `@`와 `www`를 `192.0.2.1`로 만든다.

- [ ] **Step 5: 전환 확인**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://msty.kr/
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.msty.kr/guide/
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://msty.co.kr/download/
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.msty.co.kr/
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://msty.kr/channels/L2NoYW5uZWxzLzg4ODc
```

Expected: `200`, `301 https://msty.kr/guide/`, `301 https://msty.kr/download/`, `301 https://msty.kr/`, `301 https://msty.kr/`.

- [ ] **Step 6: 방문 분석 켜기**

Cloudflare 대시보드 Analytics & Logs → Web Analytics에서 `msty.kr`을 추가한다. 자동 삽입이 켜지면 추가 작업이 없다. 수동 방식이면 발급된 토큰을 Workers Builds의 빌드 환경 변수 `PUBLIC_CF_BEACON_TOKEN`에 넣고 다시 배포한다 (`Base.astro`가 이 값이 있을 때만 비컨 스크립트를 넣는다).

하루 뒤 Web Analytics에 `/`와 `/download/` 조회가 잡히는지 확인한다.

- [ ] **Step 7: 마무리**

```bash
git add wrangler.jsonc docs/dns-before-switch.md
git commit -m "chore: msty.kr 커스텀 도메인 연결"
git push
```

운영자에게 기존 빌더 구독 해지를 안내한다. 해지는 운영자가 직접 한다.
