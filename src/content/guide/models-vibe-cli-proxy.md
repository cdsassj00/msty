---
title: Vibe CLI Proxy로 CLI 도구의 모델 쓰기
description: Claude Code, Codex 같은 명령줄 도구의 계정을 연결해 그 모델을 Msty Studio 대화에서 쓰는 방법입니다.
date: 2026-10-11
section: 모델 관리
order: 40
verified: 2026-10-11
tags: [Msty, Vibe CLI Proxy, CLI]
---

## Vibe CLI Proxy란

**Vibe CLI Proxy**는 명령줄(CLI) 도구가 제공하는 모델을 Msty Studio 안으로 가져오는 기능입니다. 지원되는 CLI 제공업체에 로그인해 권한을 주면, 그 업체의 모델이 Msty Studio의 대화에서 다른 모델과 나란히 나타납니다.

이미 코딩용 CLI 도구를 쓰고 있는 사람이, 같은 모델을 Msty Studio의 대화 화면에서도 쓰고 싶을 때 맞는 기능입니다.

## 지원하는 CLI 제공업체

공식 문서에 나온 목록입니다.

- Claude Code
- Codex
- Google Gemini
- iFlow
- Github Copilot
- Antigravity

## 연결하는 순서

1. **Settings > Vibe CLI Proxy**로 갑니다.
2. Authentication 항목에서 제공업체를 고르고 **Authorize**를 누릅니다.
3. 브라우저 창이 열리면 해당 제공업체의 로그인과 권한 승인 절차를 마칩니다.

## 연결한 모델 쓰기

1. 아무 대화에서나 모델 선택 목록을 엽니다.
2. 권한을 준 CLI 제공업체의 모델이 목록에 나타납니다. 하나를 고르고 대화를 시작합니다.

권한을 준 뒤에는 따로 설정할 것이 없습니다. CLI 모델은 이미 연결해 둔 다른 모델과 함께 쓸 수 있고, 켜 둔 CLI 제공업체는 Model Hub에도 표시됩니다.

## 알아 둘 점

이 문서 페이지는 짧습니다. 다음 내용은 공식 문서에 설명이 없습니다.

- 각 CLI 도구를 PC에 미리 설치해 두어야 하는지
- 제공업체별로 어떤 요금제나 구독이 필요한지
- 사용량 한도가 어떻게 적용되는지

각 제공업체의 계정으로 로그인하는 방식이므로, 사용 조건과 한도는 그 제공업체의 약관과 안내를 따로 확인하세요.

## 다음에 읽을 글

- [온라인 제공업체 연결하기](/guide/models-online-providers/)
- [Model Hub 한눈에 보기](/guide/models-model-hub/)

## 참고한 문서

- [Vibe CLI Proxy](https://docs.msty.ai/studio/managing-models/vibe-cli-proxy)
