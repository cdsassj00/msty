---
title: Persona Studio로 맞춤 어시스턴트와 사용자 프로필 만들기
description: 어시스턴트의 답변 방식을 정하는 Assistant Persona와, 내 정보를 기억시켜 두는 User Persona를 만들고 관리하는 방법입니다.
date: 2026-10-11
section: 에이전트와 스튜디오
order: 20
verified: 2026-10-11
tags: [Msty, Persona Studio, 페르소나]
---

## Persona Studio가 하는 일

**Persona Studio**는 맞춤 어시스턴트와 사용자 프로필을 만들고 관리하는 곳입니다. 대화를 시작할 때마다 같은 지시와 같은 자기소개를 반복해서 입력하지 않도록, 그 내용을 페르소나로 저장해 두고 불러 씁니다.

페르소나는 두 종류입니다.

| 종류 | 무엇을 정하나 |
|---|---|
| **Assistant Persona** | 어시스턴트가 어떻게 답할지를 정합니다 |
| **User Persona** | 나에 대한 정보와 기억을 저장해 여러 대화에서 재사용합니다 |

## Assistant Persona

어시스턴트 쪽 설정입니다. 다음 항목을 구성할 수 있습니다.

- 이름, 아이콘, 설명
- 시스템 프롬프트(답변 태도와 규칙)
- 부가 기능: 툴셋, 모델 설정, Knowledge Stacks, 첨부 파일, Real-Time Data
- Few-shot 예시(원하는 답변의 본보기)
- 자동 응답 동작

예를 들어 "계약서 검토 담당"이라는 Assistant Persona를 만들고, 시스템 프롬프트에 검토 기준을 적고, 사내 표준 계약서를 담은 Knowledge Stack을 붙여 두면 매번 같은 기준으로 검토 답변을 받을 수 있습니다.

## User Persona와 Memories

사용자 쪽 설정입니다. 공식 문서는 다음과 같은 내용을 저장해 두라고 예를 듭니다.

- 역할
- 선호하는 글쓰기 방식
- 목표
- 진행 중인 프로젝트
- 기술 배경
- 개인적인 제약 사항

User Persona에는 **Memories**(기억)를 붙일 수 있습니다. 기억은 페르소나 대화와 크루 대화에서 재사용됩니다. 기억이 모델에 전달되는 방식은 두 단계입니다.

- 각 기억의 **제목과 요약**은 프롬프트에 직접 들어갑니다. 따라서 도구 호출(tool calling)을 지원하지 않는 모델도 볼 수 있습니다.
- 기억의 **상세 내용**을 읽으려면 어시스턴트나 페르소나 에이전트가 도구 호출을 지원해야 합니다.

### Persona Studio에서 기억 추가하기

1. **Persona Studio**를 열고 **User Personas** 탭으로 갑니다.
2. 사용자 페르소나를 고릅니다.
3. **Memories** 영역에서 **Add Note** 또는 **Add Structured**를 누릅니다.
4. 기억 항목을 채우고 사용자 페르소나를 저장합니다.

### 대화 중에 기억 추가하기

방법이 두 가지입니다.

- **직접 추가**: 채팅 도구 영역의 **User Persona** 아이콘을 누르고, 사용자 페르소나 옆의 **Add memory**를 누릅니다.
- **메시지에서 추가**: 대화 메시지의 추가 메뉴에서 **Add to User Persona Memory**를 고르면 초안이 만들어집니다.

메시지에서 추가할 때 Msty Studio는 다음 순서로 동작합니다.

1. **Model Hub > Model Squad**에서 **User Persona Memory Extraction**에 지정된 모델을 사용합니다.
2. 지정된 모델이 없으면 해당 대화에서 선택된 모델을 대신 사용합니다.
3. **Settings > Default Prompts**의 **User Persona Memory Generation** 프롬프트로 내용 초안을 작성합니다.
4. **Review Memory Draft** 창이 열리고, 여기서 내용을 고친 뒤 저장합니다.

### 관련 모델과 프롬프트를 바꾸는 곳

| 바꾸려는 것 | 위치 |
|---|---|
| 기억 추출에 쓰는 모델 | **Model Hub > Model Squad**의 **User Persona Memory Extraction** |
| 기억 초안 작성 프롬프트 | **Settings > Default Prompts**의 **User Persona Memory Generation** |
| 크루 대화의 인계·조율 지시문 | **Settings > Default Prompts**의 **Crew Mode** |

## 페르소나 만들고 정리하기

1. 왼쪽 사이드바에서 **Persona Studio**를 엽니다.
2. **Assistant Persona**와 **User Persona** 중 만들 종류를 고릅니다.
3. 프롬프트 내용, 부가 기능, 태그, 폴더 위치를 정하고 저장합니다.
4. 버전과 샌드박스 테스트로 다듬어 갑니다.

## 버전과 샌드박스

- 페르소나를 고칠 때마다 버전으로 저장할 수 있습니다.
- 필요할 때 활성 버전을 바꿉니다.
- 바꾼 내용을 평소 작업에 적용하기 전에, 샌드박스의 분할 화면에서 버전별 동작을 비교합니다.

## Persona AI Tools

Persona Studio의 AI 도구는 다음 일을 대신해 줍니다.

- 시스템 프롬프트 초안을 만들거나 개선하기
- 태그 제안
- Few-shot 예시 초안 작성

공식 문서에서 이 항목에는 **Aurum Perk** 표시가 붙어 있습니다.

## 대화에서 페르소나 쓰기

- **New** 메뉴에서 페르소나 대화를 시작합니다.
- 채팅 입력란에 `@`를 입력하면 페르소나를 빠르게 고를 수 있습니다.
- 메시지 입력란 위의 페르소나 컨트롤로 페르소나 프롬프트를 보내고, 맥락을 다루는 방식을 조절합니다.

## 개수 제한

| 요금제 | 만들 수 있는 개수 |
|---|---|
| Free | Assistant Persona 2개, User Persona 1개까지 |
| 유료 요금제 | 더 높은 한도와 고급 페르소나 도구 |

유료 요금제의 구체적인 한도 숫자는 공식 문서에 설명이 없습니다.

## 함께 읽을 글

- [Prompt Studio로 프롬프트 관리하기](/guide/studio-prompt/)
- [Agent Mode](/guide/agent-mode/)

## 참고한 문서

- [Persona Studio](https://docs.msty.ai/studio/studios/persona-studio)
