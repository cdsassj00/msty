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
