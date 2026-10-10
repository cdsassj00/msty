# msty.kr

로컬 우선 AI 한국어 가이드 사이트. Astro 정적 사이트이며 Cloudflare Workers 정적 자산으로 배포한다.

## 명령

```bash
npm install
npm run dev            # http://localhost:4321
npm test               # 빌드 후 dist 검사
npm run test:fixtures  # draft·잘못된 머리말 검사
npm run check:links    # 외부 링크 검사 (빌드 후)
npm run deploy         # 테스트와 링크 검사를 통과하면 배포
```

## 글 쓰기

`src/content/guide|learn|news/`에 마크다운 파일을 추가한다. 파일 이름이 주소가 되므로 영문 소문자와 하이픈만 쓴다.

```markdown
---
title: 제목
description: 목록에 보이는 한두 문장
date: 2026-10-10
tags: [태그]
---
```

`guide` 글은 `order`(순서)와 `verified`(공식 문서 확인일)가 더 필요하다. `draft: true`를 넣으면 발행되지 않는다.

Msty 화면·요금 설명은 <https://docs.msty.ai/>를 확인하고 쓰며, 글 끝에 `## 참고한 문서`를 둔다.

## 링크 모음

`/models`의 링크는 `src/data/model-links.json`, `/lab`의 카드는 `src/data/lab.json`에서 고친다.

## 설계 문서

- 설계서: `docs/superpowers/specs/2026-10-10-msty-kr-site-design.md`
- 구현 계획: `docs/superpowers/plans/2026-10-10-msty-kr-site.md`
