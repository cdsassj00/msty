// 로컬 AI 학습 글의 시리즈. 목록 페이지는 이 순서로 묶어 보여 준다.
export const SERIES = ['로컬 AI 기초', 'Ollama 실전', 'RAG와 임베딩', '폐쇄망·공공기관 활용', '만들어 보기'] as const;
export type Series = (typeof SERIES)[number];
