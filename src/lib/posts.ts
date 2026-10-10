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
