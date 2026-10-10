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
