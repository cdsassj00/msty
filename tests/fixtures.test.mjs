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
