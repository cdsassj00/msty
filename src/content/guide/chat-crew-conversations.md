---
title: Crew 대화로 여러 페르소나와 함께 이야기하기
description: 여러 페르소나를 한 팀으로 묶어 같은 대화에 참여시키는 Crew Conversation의 설정 항목과 제약을 설명합니다.
date: 2026-10-11
section: 대화
order: 40
verified: 2026-10-11
tags: [Msty, Crew Conversations, 페르소나]
---

## Crew 대화란

**Crew Conversation**은 여러 페르소나와 동시에 대화하는 방식입니다. 먼저 참여시킬 페르소나들을 만들고, Crew 대화를 새로 시작해 페르소나를 Crew(팀)에 넣은 뒤 대화합니다.

공식 문서는 Crew 대화를 팀원들이 모인 대화방에 가깝다고 설명합니다.

## 어떤 일에 쓰나

공식 문서가 제시하는 예입니다.

- 서로 다른 성격의 친구 페르소나들을 모아 대화합니다.
- 친구와 반대 의견을 내는 상대를 섞어 토론에 긴장을 더합니다.
- 운영부터 재무회계까지 분야가 다른 이사회 구성원 Crew를 만들어 아이디어를 토론하거나 전략 계획을 다듬습니다.
- 아이디어를 내는 Crew에서 제품 아이디어를 만들고, 기획자와 분석가 Crew로 가져가 프로젝트 계획과 상위 요구사항을 만든 뒤, 설계자와 요구사항 분석가 Crew에서 실행 가능한 작업으로 쪼갭니다.
- 저마다의 관점을 가진 예술가 Crew로 새로운 작품을 만듭니다.

업무로 옮기면 이렇습니다. 신규 교육 과정 기획안을 "교육 설계 담당", "예산 담당", "수강생 대표" 페르소나에게 차례로 검토받으면, 한 모델에게 물었을 때 빠지기 쉬운 관점을 한 화면에서 확인할 수 있습니다.

## 시작하는 순서

1. 새 대화 버튼 옆의 아래쪽 화살표를 누르고 **New Crew Conversation**을 고릅니다.
2. **Select a Crew** 버튼을 누릅니다.
3. Crew를 설정하고 **Create**를 누릅니다.

## Crew 설정 항목

| 항목 | 뜻 |
|---|---|
| **Name** | Crew의 이름 |
| **Description** | Crew에 대한 설명 |
| **Personas** | Crew에 넣을 페르소나 |
| **Response** | 응답 방식. Auto 또는 Manual |
| **Context** | 페르소나끼리 서로의 답을 아는지 여부. Independent 또는 Contextual |

### Response — 누가 언제 답하나

| 값 | 동작 |
|---|---|
| Auto | 내 메시지에 페르소나들이 자동으로 답합니다 |
| Manual | 어떤 Crew 구성원이 답할지 내가 고르고, 실행 버튼을 눌러 답하게 합니다 |

### Context — 서로의 답을 보나

| 값 | 동작 |
|---|---|
| Independent | 각 페르소나가 다른 페르소나와 그 답을 알지 못한 채 따로 답합니다 |
| Contextual | 각 페르소나가 자기보다 앞선 페르소나들의 답을 알고 답합니다 |

독립적인 의견 여러 개를 받아 비교하려면 Independent가, 앞사람의 말을 받아 논의를 이어 가게 하려면 Contextual이 맞습니다.

## 답하는 순서 바꾸기

Crew의 페르소나들은 정해진 순서대로 답합니다. 순서는 위에서 아래입니다.

1. Crew의 페르소나 옆에 있는 **+** 아이콘을 누릅니다.
2. 페르소나 위에 마우스를 올리면 오른쪽에 잡는 손잡이가 나타납니다.
3. 끌어다 놓아 원하는 순서로 바꿉니다.

Contextual로 설정했다면 순서가 결과에 영향을 줍니다. 뒤에 답하는 페르소나일수록 앞선 답을 더 많이 알고 답합니다.

## 부가 기능의 제약

Crew 대화에서 켤 수 있는 대화 부가 기능은 **빠른 프롬프트(quick prompts)와 첨부** 두 가지뿐입니다.

페르소나에게 추가 맥락이 필요하다면 대화가 아니라 **페르소나 설정**에 넣습니다. 실시간 데이터, 도구, Knowledge Stack, 페르소나가 쓸 모델을 페르소나 설정에서 지정할 수 있습니다.

## 알아 둘 점

- Crew 대화에서는 일반 대화에 있는 Split Chat과 스레드 같은 기능을 쓸 수 없습니다.
- Crew Mode에서 페르소나 사이의 인계와 조율에 쓰이는 배경 프롬프트는 **Settings > Default Prompts**에서 조정할 수 있습니다.
- 페르소나 하나와만 대화하려면 [페르소나 대화](/guide/chat-persona-conversations/)를 씁니다.

## 다음에 읽을 글

- [페르소나 대화](/guide/chat-persona-conversations/)
- [Shadow Persona](/guide/chat-shadow-persona/)
- [대화 화면 살펴보기](/guide/chat-conversations/)

## 참고한 문서

- [Crew Conversations](https://docs.msty.ai/studio/conversations/crew-chats)
