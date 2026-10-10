import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// 빌드된 HTML에서 외부 링크를 새 탭으로 열게 한다 (마크다운 본문 링크 포함).
function externalLinks() {
  const htmlFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
  return {
    name: 'external-links',
    hooks: {
      'astro:build:done': ({ dir }) => {
        for (const file of htmlFiles(fileURLToPath(dir))) {
          const html = readFileSync(file, 'utf8');
          const out = html.replace(/<a\b(?![^>]*\btarget=)([^>]*\bhref="https?:\/\/(?!msty\.kr)[^"]*"[^>]*)>/g, '<a$1 target="_blank" rel="noopener">');
          if (out !== html) writeFileSync(file, out);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://msty.kr',
  integrations: [sitemap(), externalLinks()],
  build: { inlineStylesheets: 'always' },
});
