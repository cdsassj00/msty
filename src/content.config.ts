import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 빈 값은 1970년으로 변환되므로 2024년 이후 날짜만 받는다.
const day = z.coerce.date().refine((d) => d.getFullYear() >= 2024, '날짜가 비었거나 잘못되었습니다');

const base = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: day,
  updated: day.optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});
const md = (dir: string) => glob({ base: `./src/content/${dir}`, pattern: '**/*.md' });

export const collections = {
  guide: defineCollection({ loader: md('guide'), schema: base.extend({ order: z.number(), verified: day }) }),
  learn: defineCollection({ loader: md('learn'), schema: base }),
  news: defineCollection({ loader: md('news'), schema: base }),
};
