// 로컬 AI 학습 글의 시리즈. 목록 페이지는 이 순서로 묶어 보여 준다.
export const SERIES = ['로컬 AI 기초', 'Ollama 실전', 'RAG와 임베딩', '폐쇄망·공공기관 활용', '만들어 보기'] as const;
export type Series = (typeof SERIES)[number];

// Msty 가이드의 묶음. 목록 페이지는 이 순서로 보여 준다.
export const GUIDE_SECTIONS = ['시작하기', 'Msty 제품과 요금', '모델 관리', '대화', '에이전트와 스튜디오', 'Knowledge Stacks', '도구와 부가 기능', '워크스페이스와 설정', '기업과 팀'] as const;
