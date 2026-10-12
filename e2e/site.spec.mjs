// 실제 브라우저로 사이트를 열어 사용자가 겪는 흐름을 검사한다.
// 실행: npm run test:e2e (먼저 npm run build 필요, 미리보기 서버는 자동으로 뜬다)
import { test, expect } from '@playwright/test';

const PAGES = ['/', '/guide/', '/learn/', '/models/', '/lab/', '/glossary/', '/news/', '/book/', '/about/', '/download/',
  '/guide/product-studio/', '/guide/pricing/', '/learn/what-is-rag/', '/news/site-renewal/', '/nope'];

/** 스크롤 연출로 숨어 있는 요소를 모두 드러낸다. */
async function revealAll(page) {
  await page.evaluate(() => document.querySelectorAll('[data-reveal],[data-stagger]').forEach((el) => el.classList.add('show')));
}

/** 글자색과 배경색의 명암비가 3 미만인 글자를 찾는다. 흰 바탕의 흰 글자 같은 실수를 잡는다. */
async function lowContrast(page) {
  return page.evaluate(() => {
    const lum = (c) => { const a = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; };
    const parse = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).map(Number); return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 }; };
    const out = [];
    const seen = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue.trim()) continue;
      const el = node.parentElement;
      if (seen.has(el) || el.closest('[aria-hidden=true],script,style,noscript')) continue;
      seen.add(el);
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const fg = parse(cs.color);
      if (!fg || fg.a < 0.1) continue;
      let bg = null;
      for (let e = el; e; e = e.parentElement) {
        const p = parse(getComputedStyle(e).backgroundColor);
        if (p && p.a > 0.5) { bg = p.rgb; break; }
      }
      bg ??= [255, 255, 255];
      const l1 = lum(fg.rgb), l2 = lum(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      if (ratio < 3) out.push(`${ratio.toFixed(1)} <${el.tagName.toLowerCase()} class="${el.className}"> ${node.nodeValue.trim().slice(0, 30)}`);
    }
    return out;
  });
}

test.describe('글자가 보이는지', () => {
  for (const path of PAGES) {
    test(`${path} 에 배경과 구분되지 않는 글자가 없다`, async ({ page }) => {
      await page.goto(path);
      await revealAll(page);
      expect(await lowContrast(page)).toEqual([]);
    });
  }

  test('시작 3단계 카드의 제목과 설명이 보인다', async ({ page }) => {
    await page.goto('/#start');
    await revealAll(page);
    const cards = page.locator('#start .steps li');
    await expect(cards).toHaveCount(3);
    for (const title of ['설치합니다', '첫 모델을 받습니다', '대화를 시작합니다']) {
      await expect(page.locator('#start .steps h3', { hasText: title })).toBeVisible();
    }
    const colors = await cards.first().evaluate((li) => ({ bg: getComputedStyle(li).backgroundColor, fg: getComputedStyle(li.querySelector('h3')).color }));
    expect(colors.bg).not.toBe(colors.fg);
  });
});

test.describe('상단 배너와 머리', () => {
  test('갈색 배너가 cdsa.kr로 연결되고 새 탭으로 열린다', async ({ page }) => {
    await page.goto('/');
    const banner = page.locator('.ad-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAttribute('href', 'https://cdsa.kr');
    await expect(banner).toHaveAttribute('target', '_blank');
    await expect(banner).toHaveAttribute('rel', /noopener/);
    const bg = await banner.evaluate((el) => getComputedStyle(el).backgroundColor);
    const [r, g, b] = bg.match(/\d+/g).map(Number);
    expect(r).toBeGreaterThan(g); expect(g).toBeGreaterThan(b); expect(r).toBeLessThan(110); // 진한 갈색
  });

  test('스크롤해도 배너와 메뉴가 화면 위에 남는다', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(300);
    const banner = await page.locator('.ad-banner').boundingBox();
    const header = await page.locator('.site-header').boundingBox();
    expect(Math.round(banner.y)).toBe(0);
    expect(Math.round(header.y)).toBe(Math.round(banner.height));
  });

  test('모든 화면에 배너가 있다', async ({ page }) => {
    for (const path of ['/guide/', '/learn/what-is-rag/', '/glossary/', '/nope']) {
      await page.goto(path);
      await expect(page.locator('.ad-banner')).toBeVisible();
    }
  });
});

test.describe('홈', () => {
  test('구역이 모두 있고 스크롤하면 숨은 내용이 남지 않는다', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('보안 걱정 없이');
    for (const id of ['why', 'promise', 'products', 'features', 'start', 'learn', 'lab', 'tools', 'faq']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) { await page.evaluate((top) => window.scrollTo(0, top), y); await page.waitForTimeout(80); }
    await page.waitForTimeout(900);
    expect(await page.locator('[data-reveal]:not(.show), [data-stagger]:not(.show)').count()).toBe(0);
    expect(errors).toEqual([]);
  });

  test('제품 4종 카드가 각 제품 글로 이동한다', async ({ page }) => {
    for (const [name, href] of [['Studio', '/guide/product-studio/'], ['Go', '/guide/product-go/'], ['Nexus', '/guide/product-nexus/'], ['Stack', '/guide/product-stack/']]) {
      await page.goto('/#products');
      await revealAll(page);
      await page.locator(`#products a.product[href="${href}"]`).click();
      await expect(page).toHaveURL(new RegExp(href));
      await expect(page.locator('h1')).toContainText(name);
    }
  });

  test('자주 묻는 질문을 누르면 답이 펼쳐진다', async ({ page }) => {
    await page.goto('/#faq');
    await revealAll(page);
    const first = page.locator('#faq details').first();
    await expect(first.locator('p').first()).toBeHidden();
    await first.locator('summary').click();
    await expect(first.locator('p').first()).toBeVisible();
  });

  test('찾아보기의 알약을 누르면 해당 글로 이동한다', async ({ page }) => {
    await page.goto('/#tools');
    await revealAll(page);
    await page.locator('.toolkit a', { hasText: 'RAG' }).click();
    await expect(page).toHaveURL(/\/learn\/what-is-rag\/$/);
  });

  test('모션 줄이기 설정에서도 제목과 내용이 보인다', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.locator('.cta-band h2')).toBeVisible();
  });
});

test.describe('글 읽기 흐름', () => {
  test('메뉴에서 가이드 목록으로, 목록에서 글로 들어간다', async ({ page }) => {
    await page.goto('/');
    await page.locator('.site-nav a', { hasText: 'Msty 가이드' }).click();
    await expect(page).toHaveURL(/\/guide\/$/);
    await expect(page.locator('.series-title').first()).toBeVisible();
    await page.locator('a.post-card').first().click();
    await expect(page.locator('article h1')).toBeVisible();
    await expect(page.locator('.summary')).toContainText('이 글에서 다루는 것');
  });

  test('글 화면에 같은 묶음 목록, 목차, 다음 글이 동작한다', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/guide/ks-overview/');
    await expect(page.locator('.side a[aria-current="page"]')).toHaveText(/Knowledge Stacks 개요/);
    const tocLink = page.locator('.toc a').nth(1);
    const hash = await tocLink.getAttribute('href');
    await tocLink.click();
    // 한글 제목은 주소에서 %로 바뀌므로 풀어서 비교한다.
    await expect.poll(() => decodeURIComponent(new URL(page.url()).hash)).toBe(decodeURIComponent(hash));
    const nextTitle = await page.locator('.pager a.next b').textContent();
    await page.locator('.pager a.next').click();
    await expect(page.locator('article h1')).toHaveText(nextTitle);
  });

  test('학습 목록의 시리즈 카드가 해당 시리즈로 내려간다', async ({ page }) => {
    await page.goto('/learn/');
    await page.locator('.tracks a.track').nth(2).click();
    await expect(page).toHaveURL(/#s3$/);
    await expect(page.locator('#s3')).toBeInViewport();
  });

  test('다운로드 안내는 Msty 공식 사이트로 보낸다', async ({ page }) => {
    await page.goto('/download/');
    const button = page.locator('a.btn-pill', { hasText: '공식 사이트' });
    await expect(button).toHaveAttribute('href', 'https://msty.ai/products/studio/');
    await expect(button).toHaveAttribute('target', '_blank');
  });

  test('없는 주소는 안내 화면을 보여 준다', async ({ page }) => {
    const res = await page.goto('/nope');
    expect(res.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('페이지를 찾을 수 없습니다');
    await page.locator('main a', { hasText: '홈으로' }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('휴대폰 화면', () => {
  test.use({ viewport: { width: 375, height: 812 } });
  for (const path of ['/', '/guide/', '/guide/pricing/', '/learn/ollama-api-python/', '/models/', '/glossary/', '/lab/']) {
    test(`${path} 가 가로로 밀리지 않는다`, async ({ page }) => {
      await page.goto(path);
      await revealAll(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }

  test('휴대폰에서도 배너와 메뉴가 보이고 글 목록을 펼칠 수 있다', async ({ page }) => {
    await page.goto('/guide/ks-overview/');
    await expect(page.locator('.ad-banner')).toBeVisible();
    await expect(page.locator('.site-nav')).toBeVisible();
    const side = page.locator('details.side');
    await expect(side).not.toHaveAttribute('open', '');
    await side.locator('summary').click();
    await expect(side.locator('a[aria-current="page"]')).toBeVisible();
  });
});

test.describe('도면 디자인과 움직임', () => {
  test('그림의 바탕색이 화면 바탕색과 같다', async ({ page }) => {
    await page.goto('/');
    const result = await page.evaluate(async () => {
      const bg = getComputedStyle(document.body).backgroundColor.match(/\d+/g).slice(0, 3).map(Number);
      const out = [];
      for (const img of document.querySelectorAll('.plate img')) {
        img.loading = 'eager';
        await img.decode();
        const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
        const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0);
        for (const [x, y] of [[3, 3], [c.width - 4, 3], [3, c.height - 4], [c.width - 4, c.height - 4]]) {
          const px = [...ctx.getImageData(x, y, 1, 1).data].slice(0, 3);
          out.push({ src: img.getAttribute('src'), diff: Math.max(...px.map((v, i) => Math.abs(v - bg[i]))) });
        }
      }
      return out;
    });
    expect(result.length).toBe(16);
    for (const r of result) expect(r.diff, r.src).toBeLessThanOrEqual(1);
  });

  test('시작 화면은 저절로 걷히고, 다시 들어오면 나오지 않는다', async ({ page }) => {
    await page.goto('/');
    const intro = page.locator('#intro');
    await expect(intro).toBeVisible();
    await expect(intro).toBeHidden({ timeout: 4000 });
    await page.reload();
    await expect(intro).toBeHidden();
    await page.locator('.hero .btn-ghost').click();
    await expect(page).toHaveURL(/\/guide\/$/);
  });

  test('그림 위에서 마우스를 움직이면 좌표가 따라온다', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#intro')).toBeHidden({ timeout: 4000 });
    const plate = page.locator('.hero .plate');
    const box = await plate.boundingBox();
    await page.mouse.move(box.x + 200, box.y + 120);
    await expect(plate).toHaveClass(/live/);
    await expect(plate.locator('.xy')).toHaveText(/X: 0200PX\s+Y: 0120PX/);
    await page.mouse.move(box.x + box.width + 40, box.y + box.height + 200);
    await expect(plate).not.toHaveClass(/live/);
  });

  test('그림은 화면에 들어오면 드러나고 표식 세 개가 찍힌다', async ({ page }) => {
    await page.goto('/');
    const plate = page.locator('.hero .plate');
    await expect(plate).toHaveClass(/show/);
    await expect(plate.locator('.pt')).toHaveCount(3);
    await page.waitForTimeout(2600);
    const clip = await plate.locator('img').evaluate((img) => getComputedStyle(img).clipPath);
    expect(clip).toMatch(/inset\(0(px)?( 0(px)?){0,3}\)/);
    expect(await plate.locator('.pt').first().evaluate((el) => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.9);
  });
});

test('상단 메뉴 칸의 가로 크기가 모두 같다', async ({ page }) => {
  await page.goto('/guide/');
  const widths = await page.locator('.site-nav a').evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().width)));
  expect(widths.length).toBe(7);
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
});
