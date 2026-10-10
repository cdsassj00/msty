import { getCollection } from 'astro:content';
import { SERIES, GUIDE_SECTIONS } from '../data/series';

export const COLLECTIONS = ['guide', 'learn', 'news'] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export const LABELS: Record<CollectionName, { title: string; lead: string }> = {
  guide: { title: 'Msty 가이드', lead: 'Msty의 제품과 기능을 공식 문서를 바탕으로 한국어로 풀어 씁니다. 설치부터 모델, 대화, 에이전트, Knowledge Stacks, 설정까지 다룹니다.' },
  learn: { title: '로컬 AI 학습', lead: '로컬 모델의 기초부터 Ollama, RAG와 임베딩, 폐쇄망 활용, 직접 만들어 보기까지 순서대로 읽습니다.' },
  news: { title: '소식', lead: 'Msty와 로컬 모델의 새 소식을 정리합니다.' },
};

// 묶음(가이드의 section, 학습의 series)마다 쓰는 색. theme.css의 .c-* 클래스와 짝이다.
export const GROUP_COLORS: Record<string, string> = {
  '시작하기': 'blue', 'Msty 제품과 요금': 'purple', '모델 관리': 'teal', '대화': 'green', '에이전트와 스튜디오': 'orange',
  'Knowledge Stacks': 'pink', '도구와 부가 기능': 'purple', '워크스페이스와 설정': 'teal', '기업과 팀': 'blue',
  '로컬 AI 기초': 'blue', 'Ollama 실전': 'green', 'RAG와 임베딩': 'purple', '폐쇄망·공공기관 활용': 'teal', '만들어 보기': 'orange',
};

// 묶음마다 쓰는 아이콘. Icon.astro의 이름과 짝이다.
export const GROUP_ICONS: Record<string, string> = {
  '시작하기': 'play', 'Msty 제품과 요금': 'layers', '모델 관리': 'cube', '대화': 'chat', '에이전트와 스튜디오': 'bolt',
  'Knowledge Stacks': 'book', '도구와 부가 기능': 'wand', '워크스페이스와 설정': 'gate', '기업과 팀': 'users',
  '로컬 AI 기초': 'cube', 'Ollama 실전': 'terminal', 'RAG와 임베딩': 'search', '폐쇄망·공공기관 활용': 'building', '만들어 보기': 'hammer',
};

const GROUPING: Partial<Record<CollectionName, { names: readonly string[]; key: 'section' | 'series' }>> = {
  guide: { names: GUIDE_SECTIONS, key: 'section' },
  learn: { names: SERIES, key: 'series' },
};

export const postUrl = (collection: string, id: string) => `/${collection}/${id}/`;
export const formatDate = (d: Date) => d.toISOString().slice(0, 10);

/** 글이 속한 묶음 이름. 소식처럼 묶음이 없으면 undefined. */
export const groupOf = (entry: any): string | undefined => entry.data.section ?? entry.data.series;
export const colorOf = (entry: any): string => GROUP_COLORS[groupOf(entry) ?? ''] ?? (entry.collection === 'news' ? 'gray' : 'blue');

/** 초안을 뺀 글 목록. 발행일 내림차순. */
export async function getPosts(name: CollectionName) {
  const posts = await getCollection(name, (e) => !e.data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

/** 묶음별 글 목록. 묶음은 정해진 순서, 묶음 안은 order 순. 묶음이 없는 컬렉션은 빈 배열. */
export async function getGroups(name: CollectionName) {
  const grouping = GROUPING[name];
  if (!grouping) return [];
  const posts = await getPosts(name);
  return grouping.names
    .map((group) => ({
      name: group,
      posts: posts.filter((p: any) => p.data[grouping.key] === group).sort((a: any, b: any) => a.data.order - b.data.order || a.id.localeCompare(b.id)),
    }))
    .filter((g) => g.posts.length > 0);
}

/** 읽는 순서대로 편 목록. 이전 글·다음 글 연결에 쓴다. */
export async function getOrdered(name: CollectionName) {
  const groups = await getGroups(name);
  return groups.length > 0 ? groups.flatMap((g) => g.posts) : getPosts(name);
}

/** 모든 컬렉션의 글. 발행일 내림차순, 같은 날이면 소식 → 학습 → 가이드 순. */
export async function getAllPosts() {
  const rank: Record<string, number> = { news: 0, learn: 1, guide: 2 };
  const lists = await Promise.all(COLLECTIONS.map((c) => getOrdered(c)));
  return lists.flat().map((p, i) => ({ p, i })).sort((a, b) =>
    b.p.data.date.getTime() - a.p.data.date.getTime() || rank[a.p.collection] - rank[b.p.collection] || a.i - b.i,
  ).map((x) => x.p);
}
