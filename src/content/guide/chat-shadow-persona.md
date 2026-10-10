---
title: Shadow Persona로 대화 지켜보게 하기
description: 대화를 옆에서 지켜보다가 요약, 검증, 종합 같은 일을 하는 Shadow Persona를 만들고 쓰는 방법입니다.
date: 2026-10-11
section: 대화
order: 30
verified: 2026-10-11
tags: [Msty, Shadow Persona, 페르소나, Split Chat]
---

## Shadow Persona란

**Shadow Persona**는 내가 모델과 나누는 대화를 옆에서 지켜보는 보조 역할입니다. 대화 하나를 지켜볼 수도 있고, 여러 개의 Split Chat을 함께 지켜볼 수도 있습니다.

지켜본 뒤 무엇을 할지는 바탕이 되는 페르소나의 프롬프트를 어떻게 썼느냐에 달려 있습니다. 요약하라고 쓰면 요약하고, 사실을 확인하라고 쓰면 확인합니다.

공식 문서가 드는 대표적인 예는 이렇습니다. 두 모델을 Split Chat으로 나란히 놓고 같은 질문을 한 뒤, Shadow Persona가 두 답을 검토해 각각의 좋은 부분을 합친 하나의 답으로 정리합니다.

공식 문서는 새 Shadow Persona를 추가하는 항목에 **Aurum Perk** 표시를 붙여 두었습니다.

## 여는 곳

창 오른쪽 위, 줄임표(…) 메뉴 왼쪽에 있는 Shadow Persona 아이콘을 누릅니다.

## 만드는 순서

### 1단계 — 바탕이 될 페르소나 만들기

Shadow Persona의 지시와 능력은 바탕 페르소나에서 옵니다. 먼저 Persona Studio에서 페르소나를 만듭니다. Shadow Persona는 페르소나의 다음 요소를 그대로 이어받습니다.

| 이어받는 요소 | 역할 |
|---|---|
| **System Prompt** | Shadow Persona가 맡을 일을 정하는 핵심 지시입니다 |
| **Attachments** | 참고할 자료를 붙여 둡니다 |
| **Real-Time Data** | 인터넷을 검색할 수 있게 합니다 |
| **Toolbox** | 도구와 Live Context 엔드포인트를 호출할 수 있게 합니다 |
| **Knowledge Stacks** | 특정 Knowledge Stack을 참고하게 합니다 |
| **Model** | Shadow Persona가 쓸 모델을 지정합니다. 기본값은 대화에서 고른 모델과 같습니다 |
| **Model Parameters** | 파라미터를 따로 정합니다. 로컬 모델을 쓴다면 컨텍스트 한도를 늘리면 결과가 좋아집니다 |

### 2단계 — Shadow Persona 설정하기

1. 오른쪽 위의 Shadow Persona 아이콘을 눌러 패널을 엽니다.
2. **Create New**를 누릅니다. 이미 만들어 둔 Shadow Persona를 붙이려면 **Attach Existing**을 누르고 고릅니다.
3. 설정 창을 채웁니다.
4. **Create and Assign**을 누르면 Shadow Persona가 만들어지고 지금 대화에 지정됩니다.

설정 항목은 다음과 같습니다.

| 항목 | 뜻 |
|---|---|
| **Shadow Persona Name** | 구분하기 위한 고유한 이름 |
| **Select Persona** | 바탕이 될 페르소나 |
| **Update Trigger** | 얼마나 자주 반응할지 정합니다. 새 메시지마다, 메시지 세 개마다, 수동 실행 중에서 고릅니다 |
| **Messages Per Split** | Split 하나당 Shadow Persona에 컨텍스트로 보낼 메시지 수. 가장 최근 메시지만 보고 반응하게 하려면 1로 둡니다 |
| **Synthesis Mode** | Split Chat이 여러 개일 때 중요합니다. 각 Split에 따로 반응할지, 모든 Split을 종합할지, Split끼리 비교·대조할지 정합니다 |
| **Max Versions** | 대화 중 보관할 Shadow Persona 출력의 최대 개수. 정한 수를 넘으면 버려집니다 |

## 대화에서 쓰기

Shadow Persona를 켜 두면, 대화의 모델들이 답을 끝낼 때까지 기다린 뒤 자기 답을 냅니다. 수동 실행으로 설정한 경우에는 내가 실행할 때만 답합니다.

패널에서 쓸 수 있는 조작입니다.

| 조작 | 하는 일 |
|---|---|
| 켜기·끄기 | Shadow Persona의 자동 반응을 켜거나 끕니다 |
| 줄임표 메뉴 | 설정 편집, 새 Shadow Persona 만들기, 삭제 |
| **Manage Split Chats** | 어떤 Split Chat을 지켜보게 할지 고릅니다 |
| 출력 옵션 | 출력 사이를 오가고, 출력을 복사하거나 지웁니다 |
| 응답 출력 | 지시에 따른 Shadow Persona의 답입니다. 사용한 도구, 참고한 Knowledge Stack, 실시간 데이터 출처도 표시됩니다 |
| 수동 실행 | Shadow Persona의 응답을 직접 실행합니다 |

## 활용 예

공식 문서가 제시하는 쓰임새입니다.

| 역할 | 내용 |
|---|---|
| 해설자 | 본 대화에 해설을 덧붙입니다 |
| 응답 분석 | 답의 품질을 분석합니다. Split Chat이 여러 개일 때 특히 유용합니다 |
| 응답 종합 | 여러 Split Chat의 답에서 좋은 부분을 모아 더 나은 답을 만듭니다 |
| 사실 확인 | 바탕 페르소나에 실시간 데이터, Knowledge Stack, Toolbox를 켜 두고, 대화 모델의 답이 정확한지 근거 자료와 대조합니다 |
| 감시와 실행 | 대화에서 특정 내용이 나오는지 지켜보다가 알려 주거나, 도구를 호출해 후속 작업을 시작합니다 |
| 요약 | 대화하는 동안 논의한 항목을 간결한 목록으로 정리합니다 |

회의 안건을 모델과 길게 논의하는 동안 Shadow Persona가 결정 사항만 목록으로 쌓아 두게 하면, 대화가 끝난 뒤 따로 정리할 필요가 줄어듭니다.

## Auto Responder와의 차이

일반 대화의 페르소나에도 대화에 반응하는 **Auto Responder** 옵션이 있습니다([대화 화면 살펴보기](/guide/chat-conversations/) 참고). 두 기능이 어떻게 다른지는 공식 문서에 설명이 없습니다. 문서에 나온 범위에서 Shadow Persona는 여러 Split Chat을 함께 지켜보고, 반응 주기와 종합 방식을 따로 설정한다는 점이 확인됩니다.

## 다음에 읽을 글

- [Split Chat으로 모델 답 비교하기](/guide/chat-split-chat/)
- [페르소나 대화](/guide/chat-persona-conversations/)

## 참고한 문서

- [Shadow Persona](https://docs.msty.ai/studio/conversations/shadow-personas)
