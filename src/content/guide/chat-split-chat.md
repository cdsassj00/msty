---
title: Split Chat으로 모델 답 비교하기
description: 여러 모델에 같은 질문을 동시에 보내 답을 나란히 비교하는 Split Chat과, 구성을 저장해 다시 쓰는 Split Presets를 설명합니다.
date: 2026-10-11
section: 대화
order: 60
verified: 2026-10-11
tags: [Msty, Split Chat, 모델 비교]
---

## Split Chat이란

**Split Chat**은 대화 창을 여러 칸으로 나눠 여러 모델과 동시에 대화하는 기능입니다. 같은 질문에 대한 모델별 답이 나란히 나오므로, 각 모델의 강점과 약점을 비교해 내 작업에 맞는 모델을 고르기 쉽습니다.

예를 들어 보도자료 초안을 맡길 모델을 정해야 한다면, 로컬 모델 하나와 온라인 모델 둘을 Split으로 나란히 놓고 같은 지시를 보내 봅니다. 질문을 세 번 입력할 필요 없이 한 번에 세 가지 답을 받아 비교할 수 있습니다.

## Split 추가하기

창 오른쪽 위의 **Add Split Chat**을 누르면 새 Split이 추가됩니다.

Split을 추가하면 자동으로 복제 모드(duplication mode)가 켜집니다. 한 칸에 입력한 메시지가 다른 칸에도 똑같이 전달되므로, 모델별 답을 나란히 비교할 수 있습니다.

## Split 없애기 또는 감추기

Split 칸의 오른쪽 위 줄임표(**...**) 아이콘을 누릅니다.

| 메뉴 | 동작 |
|---|---|
| **Delete Split Chat** | Split을 삭제합니다 |
| **Hide Split Chat** | Split을 지우지 않고 감춥니다. 대화 기록이 남아 나중에 참고할 수 있습니다 |

비교가 끝나 한 모델로 계속 대화하고 싶지만 다른 모델의 답도 기록으로 남겨 두려면 삭제 대신 감추기를 씁니다.

## Split Presets — 구성 저장해 다시 쓰기

자주 쓰는 Split 구성을 프리셋으로 저장해 둘 수 있습니다. 매번 같은 구성을 손으로 다시 만들고 프롬프트를 다시 넣을 필요가 없어집니다.

세 가지 메뉴 모두 창 오른쪽 위 줄임표(**...**) 아이콘에 있습니다.

| 하려는 일 | 메뉴 | 설명 |
|---|---|---|
| 저장 | **Save Splits As** | 프리셋 이름을 넣고, 함께 저장할 프롬프트와 첨부를 고릅니다 |
| 관리 | **Manage Split Presets** | 창이 열리고 저장한 프리셋을 보거나, 고치거나, 지웁니다 |
| 사용 | **Split Presets** | 목록에서 쓸 프리셋을 고릅니다 |

새 모델이 나올 때마다 같은 시험 질문으로 평가하는 사람이라면, 시험 질문을 포함해 프리셋으로 저장해 두면 됩니다.

## 함께 쓰면 좋은 기능

- **특정 메시지만 새 Split으로 보내기.** 메시지의 추가 동작 메뉴에 있는 **Use as Prompt in New Split**은 그 메시지를 첫 프롬프트로 하는 새 Split을 만듭니다. [답변 다루기](/guide/chat-responses/)에서 설명합니다.
- **Split들의 답을 하나로 종합하기.** [Shadow Persona](/guide/chat-shadow-persona/)는 여러 Split을 지켜보다가 답을 비교하거나 종합할 수 있습니다.
- **후보 모델 좁히기.** 무엇을 비교할지부터 막막하다면 [Model Matchmaker](/guide/models-model-matchmaker/)로 후보를 먼저 추립니다.

## 알아 둘 점

- [Crew 대화](/guide/chat-crew-conversations/)에서는 Split Chat을 쓸 수 없습니다.
- Split을 최대 몇 개까지 만들 수 있는지, 복제 모드를 끄는 방법은 이 문서 페이지에 설명이 없습니다.

## 참고한 문서

- [Split Chat](https://docs.msty.ai/studio/conversations/split-chat)
