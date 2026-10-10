---
title: 대화 화면 살펴보기
description: Msty Studio의 대화 종류 네 가지와 일반 대화 화면의 기능, Project Context, Mini Map을 한 번에 정리합니다.
date: 2026-10-11
section: 대화
order: 10
verified: 2026-10-11
tags: [Msty, 대화, Sticky Prompt, Mini Map]
---

## 대화 종류 고르기

Msty Studio에는 대화 종류가 네 가지 있습니다. 공식 문서는 다음 기준으로 고르라고 안내합니다.

| 종류 | 이럴 때 씁니다 |
|---|---|
| **Normal Conversations** | 일상적인 질문, 초안 작성, 질의응답처럼 모델 하나와 주고받으며 다듬는 작업 |
| **Persona Conversations** | 특정 역할, 말투, 전문성이 대화 전체를 이끌게 하고 싶을 때 |
| **Crew Mode Conversations** | 여러 페르소나가 같은 질문에 답하게 해 관점을 비교하고 싶을 때 |
| **Agent Mode Conversations** | 에이전트가 계획을 세우고 도구를 쓰며 여러 단계를 스스로 실행하는 작업 |

어디서 시작할지 모르겠다면 일반 대화로 시작하고, 작업이 더 짜임새를 갖추면 Persona, Crew Mode, Agent Mode로 옮겨 가면 됩니다. 이 글은 일반 대화를 다룹니다. 다른 종류는 [페르소나 대화](/guide/chat-persona-conversations/)와 [Crew 대화](/guide/chat-crew-conversations/) 글을 보세요.

## 새 대화 시작하기

Projects 패널 아래쪽의 **New** 버튼을 누릅니다. 표준 대화 화면이 열립니다.

## 대화 화면의 기능

### Sticky Prompt — 한 가지 맥락에 고정하기

줄임표(…) 아이콘 메뉴에서 **Sticky Prompt**를 설정합니다. Sticky Prompt를 고정해 두면, 새 메시지를 보낼 때마다 그 프롬프트가 메시지 앞에 붙고 **이전 메시지들은 무시됩니다.** 대화가 하나의 맥락에만 집중하게 되는 효과가 있습니다. 시스템 프롬프트는 이때도 항상 포함됩니다.

예를 들어 "다음 문장을 공문서체로 고쳐 주세요"를 Sticky Prompt로 고정하면, 그 뒤로는 문장만 붙여 넣어도 매번 같은 지시가 적용되고 앞서 고친 문장들이 섞이지 않습니다.

### Attachments — 자료 붙이기

파일, 이미지, 웹사이트, YouTube 링크를 대화에 붙일 수 있습니다. 여러 번 다시 쓸 첨부 자료는 Context Studio에서 관리합니다.

### Real-time Data — 실시간 정보

모델이 웹을 검색해 실시간 정보를 가져오게 합니다. 공식 문서는 이 기능을 Remote Connections 또는 Msty Sidecar를 쓸 때 사용할 수 있다고 설명합니다.

### Personas — 페르소나 불러오기

Persona 아이콘을 누르고 페르소나를 고르면 대화에 추가됩니다. 입력창에 **@**를 입력해 빠르게 고를 수도 있습니다. 페르소나를 추가하면 입력창 위에 Persona 탭이 나타나고, 다음 옵션을 씁니다.

| 옵션 | 하는 일 |
|---|---|
| 위쪽 화살표 | 페르소나에 지정된 프롬프트를 대화에 바로 보냅니다. 페르소나의 프롬프트에 따른 답을 빨리 받고 싶을 때 씁니다 |
| **Context Message Count** | 함께 보내는 이전 메시지를 최근 몇 개로 제한합니다. 기본은 대화의 모든 이전 메시지를 보냅니다. 가장 최근 메시지만 보내려면 **1**을 넣습니다 |
| **Auto Responder** | 켜 두면 페르소나가 나와 모델 사이의 대화에 반응합니다. 공식 문서에 **Aurum Perk**로 표시된 기능입니다 |

**Auto Responder**는 대화에 직접 참여하지 않고 옆에서 듣다가 논평하는 페르소나라고 생각하면 됩니다. 공식 문서는 모델의 답을 검증하는 사실 확인 담당으로 쓰는 예를 듭니다.

### Prompt Library — 저장해 둔 프롬프트

Prompts Library 아이콘을 누르면 라이브러리에 넣어 둔 프롬프트를 검색해 입력창에 넣을 수 있습니다. 입력창에 **/**를 입력하면 빠르게 검색됩니다.

### Toolsets와 Live Contexts

대화에 Toolsets와 Live Contexts를 포함할 수 있습니다. 도구는 대화에 MCP 기능을 더하고, Live Contexts는 API에서 가져온 데이터를 대화에 넣게 해 줍니다.

### Turnstiles

Turnstiles를 포함하면 에이전트와 비슷한 방식으로 대화할 수 있습니다. 공식 문서는 글을 생성하는 데 그치지 않고 당면한 작업에 더 집중하는 대화가 된다고 설명합니다.

### 모델 선택, 파라미터, 시스템 프롬프트

| 기능 | 내용 |
|---|---|
| 모델 선택 | 대화에 쓸 모델을 고릅니다. 모델 이름 옆 별 아이콘으로 기본 모델을 정합니다 |
| 모델 파라미터 | temperature, top-p 등을 조정해 모델의 출력을 조절합니다 |
| 시스템 프롬프트 | 대화의 맥락을 정하는 프롬프트입니다. 항상 컨텍스트에 포함되어 모델의 답을 이끕니다 |

모델 쪽 설정은 [Model Hub 한눈에 보기](/guide/models-model-hub/)에서 이어집니다.

## Project Context — 프로젝트 정보를 대화에 넣기

프로젝트에는 Project Context 옵션이 있습니다. 이 옵션을 켜면 프로젝트의 **제목**과 **설명**이 그 프로젝트 안 모든 대화에 컨텍스트로 포함됩니다. 하위 프로젝트의 대화라면 상위 프로젝트의 제목과 설명도 함께 들어갑니다.

기본값은 꺼짐입니다. 프로젝트 폴더를 편집해 켭니다.

프로젝트 설명에 "2026년 하반기 교육 사업 제안서 작성. 독자는 지자체 담당자"처럼 적어 두고 이 옵션을 켜면, 대화마다 배경을 다시 설명하지 않아도 됩니다.

## Mini Map — 긴 대화에서 길 찾기

Mini Map은 긴 대화의 여러 지점으로 빠르게 이동하게 해 주는 기능입니다.

1. **Settings > General > Mini Map**에서 켭니다.
2. 대화 창 왼쪽 가운데에 지도 아이콘이 생깁니다. 누르면 Mini Map이 열립니다.

| 누르는 곳 | 동작 |
|---|---|
| 위쪽 점 | 대화 맨 위로 이동합니다 |
| 아래쪽 점 | 대화 맨 아래로 이동합니다 |
| 가운데 영역 | 대화를 이루는 질문과 답을 한눈에 보여 줍니다. 원하는 부분을 누르면 그 위치로 이동합니다 |

## 내보내기와 가져오기

대화 메뉴에서 대화를 JSON이나 `.mstyconv` 묶음으로 내보낼 수 있습니다. 자세한 내용은 [대화 내보내기와 가져오기](/guide/chat-export-import/)에 있습니다.

## 다음에 읽을 글

- [답변 다루기](/guide/chat-responses/)
- [Split Chat으로 모델 답 비교하기](/guide/chat-split-chat/)
- [System Prompt Modes](/guide/chat-system-prompt-modes/)

## 참고한 문서

- [Conversations](https://docs.msty.ai/studio/conversations/main-chat)
