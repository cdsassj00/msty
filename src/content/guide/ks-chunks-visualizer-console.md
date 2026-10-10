---
title: Chunks Visualizer와 Chunks Console — 조각과 검색 결과 점검하기
description: 문서가 어떻게 조각으로 나뉘었는지 눈으로 확인하는 Chunks Visualizer와, 시험 질문으로 검색 결과를 확인하는 Chunks Console 사용법입니다.
date: 2026-10-11
section: Knowledge Stacks
order: 40
verified: 2026-10-11
tags: [Msty, Knowledge Stacks, 청킹]
---

## 두 도구의 역할

Knowledge Stack을 만든 뒤 답이 기대와 다르면 원인은 대개 둘 중 하나입니다. 문서가 엉뚱한 자리에서 잘렸거나, 검색이 엉뚱한 조각을 가져왔거나입니다. 두 도구는 각각 이 두 가지를 확인합니다.

| 도구 | 확인하는 것 |
|---|---|
| **Chunks Visualizer** | 문서가 조각으로 어떻게 나뉘었는가 |
| **Chunks Console** | 질문을 던졌을 때 어떤 조각이 돌아오는가 |

두 도구 모두 대화를 시작하기 전에 스택을 점검하는 용도입니다. 공식 문서는 표기가 섞여 있어 Chunk Visualizer, Chunk Console이라고도 씁니다.

## Chunks Visualizer

### 조각이 왜 중요한가

Compose는 큰 문서를 작은 조각으로 나눈 뒤 벡터로 바꿔 검색에 씁니다. 조각이 잘 나뉘어야 관련 내용이 정확히 검색되고 답의 품질이 올라갑니다. 배경 설명은 [문서 청킹](/learn/chunking-documents/)을 참고합니다.

Chunks Visualizer는 스택의 **Compose가 끝난 뒤에만** 쓸 수 있습니다.

### 무엇을 봐야 하나

공식 문서에서 이 항목에는 **Aurum Perk** 표시가 붙어 있습니다.

조각이 다음 세 가지를 만족하는지 확인합니다.

- 내용이 일관되는가
- 맥락이 온전한가
- 논리적으로 구분되어 있는가

이상적으로는 조각 하나에 그 자체로 이해되는 생각 하나, 또는 이야기 한 단위가 담겨야 합니다. 문장이나 생각이 어색한 자리에서 잘리면 임베딩 모델이 뜻을 제대로 잡지 못해 검색 품질이 떨어집니다.

Visualizer는 조각의 경계, 조각끼리 겹치는 부분, 조각 사이에서 글이 어떻게 이어지는지를 보여 줍니다. 이웃한 두 조각이 같은 구절을 공유하는 것은 **정상**입니다. 공식 문서는 이런 겹침이 연속성을 유지해 주므로 검색에서 대체로 바람직하다고 설명합니다.

주의해서 볼 것은 다음과 같습니다.

- 지나치게 짧은 조각
- 너무 잘게 흩어진 조각
- 중요한 내용을 부자연스럽게 끊은 조각

조각이 기대에 못 미치면 [Compose Options](/guide/ks-compose-options/)에서 Chunking Method, Chunk Size, Overlapping을 조정하고 다시 Compose합니다.

### Show Stitched

조각들을 다시 이어 붙여 문서 전체를 끊김 없이 보여 주는 보기입니다.

모델이 스택을 쓰는 방식은 두 가지입니다. 질문과 관련된 조각만 가져오는 방식은 빠르고 대부분의 질문에 충분합니다. 반면 파일의 전체 구조나 이야기의 흐름을 이해해야 하는 작업에는 이어 붙인 전체 내용이 필요하며, 이때 더 정확하고 빠짐없는 결과가 나옵니다. 전체 내용을 모델에 보내는 설정은 [Query Settings](/guide/ks-query-settings/)의 Max Full Content Contexts에서 다룹니다.

## Chunks Console

### 시험 질문 던져 보기

Chunks Console은 스택에 질문을 던지고 어떤 조각이 돌아오는지 보는 곳입니다. 모델이 올바른 자료를 받게 될지 대화 전에 확인할 수 있습니다.

[Query Settings](/guide/ks-query-settings/)의 값을 바꿔 가며 결과가 어떻게 달라지는지 시험할 수 있습니다. 예를 들어 Search Type을 Semantic에서 Keyword로 바꿨을 때 원하는 조항이 올라오는지 비교해 봅니다.

결과가 기대와 다르면 고칠 곳은 둘 중 하나입니다.

- Query Settings: 검색 방식과 개수, 기준을 바꿉니다.
- Compose Options: 조각을 나누는 방식 자체를 바꿉니다.

### 조각 제거하기

특정 조각이 검색 결과와 모델 대화에 나오지 않게 하려면 그 조각의 휴지통 아이콘을 누릅니다.

한 가지 주의할 점이 있습니다. 해당 자료를 다음에 다시 Compose하면 지운 조각이 **다시 생길 가능성이 높습니다.** 조각 하나를 영구적으로 빼는 방법은 공식 문서에 설명이 없습니다.

### PII 가리기 확인

공식 문서에서 이 항목에는 **Aurum Perk** 표시가 붙어 있습니다.

**PII Scrubbing** 옵션을 켜면 개인 식별 정보가 감지되어 표시(flag)로 바뀌고, 원래 값은 모델에 전달되지 않습니다. 원치 않는 개인정보가 온라인 모델로 넘어가는 일을 줄이기 위한 기능입니다.

Chunks Console에서 여러 질문을 던져 보고 개인정보가 실제로 가려지는지 확인합니다. 주민등록번호나 전화번호가 들어 있는 문서를 스택에 넣었다면, 온라인 모델과 연결하기 전에 이 확인을 먼저 합니다. 어떤 종류의 정보를 감지하는지, 한국어 개인정보를 얼마나 잘 잡는지는 공식 문서에 설명이 없으므로 직접 시험해 봐야 합니다.

## 점검 순서 정리

1. 스택을 Compose합니다.
2. Chunks Visualizer에서 조각이 자연스러운 자리에서 나뉘었는지 봅니다.
3. Chunks Console에서 실제로 물어볼 만한 질문을 몇 개 던져 봅니다.
4. 결과가 나쁘면 Query Settings를 먼저 바꿔 보고, 그래도 안 되면 Compose Options를 바꿔 다시 Compose합니다.

## 함께 읽을 글

- [Compose Options](/guide/ks-compose-options/)
- [Query Settings](/guide/ks-query-settings/)
- [공유·관리와 Analytics](/guide/ks-share-and-manage/)

## 참고한 문서

- [Chunks Visualizer](https://docs.msty.ai/studio/knowledge-stacks/chunks-visualizer)
- [Chunks Console](https://docs.msty.ai/studio/knowledge-stacks/chunks-console)
