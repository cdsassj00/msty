---
title: Query Settings — Knowledge Stack 검색 방식 조정하기
description: 대화 중에 Knowledge Stack을 어떻게 검색하고 무엇을 모델에 넘길지 정하는 Query Settings의 항목과 사용법입니다.
date: 2026-10-11
section: Knowledge Stacks
order: 30
verified: 2026-10-11
tags: [Msty, Knowledge Stacks, 검색 설정]
---

## Query Settings가 하는 일

**Query Settings**는 대화 중에 Knowledge Stack을 어떻게 검색할지 정하는 설정입니다. 같은 스택이라도 조각을 몇 개 넘길지, 뜻으로 찾을지 단어로 찾을지에 따라 답의 품질이 달라집니다.

"규정집에 분명히 있는 내용인데 모델이 못 찾는다" 또는 "관계없는 내용이 섞여 답이 흐려진다" 같은 문제가 생기면 이 설정을 조정합니다.

## 설정하는 위치와 적용 범위

| 구분 | 위치 | 적용 |
|---|---|---|
| 기본 설정 | Knowledge Stacks 화면에서 스택의 설정 영역에 있는 **Query Settings** | 그 스택을 대화에서 선택하면 자동으로 적용됩니다 |
| 대화별 설정 | 대화의 **Conversation Add-Ons** | 해당 대화에만 적용됩니다 |

스택을 여러 개 켜면 그중 **한 스택의 기본 설정만** 적용됩니다. 그래서 공식 문서는 여러 스택을 함께 쓸 때 대화마다 설정을 확인하고 맞추라고 권합니다.

## 기본 설정 항목

### Chunk Retrieval Mode

| 모드 | 동작 |
|---|---|
| **Push Mode** (기본값) | 먼저 스택을 검색하고, 결과를 맥락으로 모델에 보냅니다 |
| **Pull Mode** | 모델이 필요하다고 판단할 때 스택에 맥락을 요청하고, 그때 관련 결과를 가져옵니다 |

Pull Mode를 쓰려면 모델이 도구 호출(tool calls)을 할 수 있어야 합니다.

### Prompt Prefix

모델에게 "지금 어떤 맥락을 받았고, 그것으로 무엇을 해야 하는지" 알려 주는 문구입니다. 공식 문서는 더 나은 결과를 위해 이 문구를 넣기를 권합니다.

### Number of Chunks

모델에 넘길 조각의 최대 개수입니다.

### Similarity Threshold

얼마나 비슷해야 결과로 인정할지 정하는 기준입니다. 값을 올리면 더 정확하고 가까운 것만 걸립니다.

### Search Type

| 방식 | 찾는 방법 | 맞는 질문 |
|---|---|---|
| **Semantic** (기본값) | 벡터 임베딩으로 뜻이 비슷한 것을 찾습니다. 쓰인 단어가 달라도 찾습니다 | 자연스러운 문장으로 묻는 질문, 개념이나 설명을 찾을 때 |
| **Keyword** | 정확한 단어나 구절이 일치하는 것을 찾습니다 | 이름, 기술 용어, 정확한 값을 찾을 때 |
| **Hybrid** | 두 방식을 합치고, Msty가 상황에 맞는 방식을 고릅니다 | 어느 쪽이 맞을지 모를 때 |

예를 들어 "연차는 어떻게 쓰나요"처럼 풀어서 묻는다면 Semantic이 맞고, "제17조의2"처럼 조문 번호를 정확히 찾는다면 Keyword가 맞습니다.

## Aurum Perk 표시가 붙은 항목

공식 문서에서 다음 세 항목에는 **Aurum Perk** 표시가 붙어 있습니다.

### Max Full Content Contexts

조각이 아니라 **파일 전체**를 모델에 보냅니다. 요약, 글 전체의 흐름 분석, 문서 간 종합 비교처럼 일부 조각만으로는 답할 수 없는 작업에 씁니다.

- 맥락에 넣을 전체 파일의 최대 개수를 정합니다.
- 기본값은 꺼짐입니다.
- 전체 내용을 보낼지는 질문의 뜻을 보고 판단합니다. 전체 내용이 넘어가지 않았다면 프롬프트를 고쳐 전체 문서가 필요하다는 점을 드러냅니다.
- 작업 성격과 모델의 토큰 한도를 따져 필요한 경우에만 씁니다.

### Synthesize Query

모델이 스택에서 찾은 정보를 해석하고 합쳐서 답하게 합니다. 여러 부분으로 된 질문이나 추론이 필요한 질문에서 더 풍부한 답을 얻기 위한 설정입니다. 기본값은 꺼짐입니다.

### PII Scrubbing

개인 식별 정보(PII)가 모델에 넘어가지 않게 막습니다. 공식 문서는 이 설정이 주로 온라인 모델 제공업체를 쓸 때 중요하다고 설명합니다.

1. 설정을 켭니다.
2. PII를 찾아 가리는 일을 맡을 **로컬에 설치된 모델**을 고릅니다.

개인정보가 문제 되는 스택을 온라인 제공업체와 함께 쓰기 전에, [Chunks Visualizer와 Chunks Console](/guide/ks-chunks-visualizer-console/)에서 실제로 가려지는지 먼저 시험하라고 공식 문서는 권합니다.

## 대화에서 설정 바꾸기

대화는 기본 Query Settings를 그대로 쓰지만, 특정 대화에서만 값을 바꿀 수 있습니다.

- **Prompt Prefix를 제외한** 모든 설정을 대화에서 바꿀 수 있습니다.
- 여러 스택을 켠 경우에는 설정이 그 대화에 맞는지 확인합니다.

## 무엇이 모델에 넘어갔는지 확인하기

대화에서 Knowledge Stacks를 켜면, 실제로 모델에 무엇이 전달됐는지 볼 수 있습니다. 답이 이상할 때 가장 먼저 봐야 할 곳입니다.

| 항목 | 내용 |
|---|---|
| **Knowledge Stacks Metrics** | 검색의 주요 수치와 그때 쓰인 설정 |
| **Query Analysis** | 어떤 문서가 반환됐는지, 조각·전체 내용 중 무엇이 제공됐는지, 검색 키워드와 각 키워드의 가중치 |
| **Returned Chunks and Full Contexts** | 모델에 실제로 보낸 조각과 전체 내용 |

여기에 원하는 내용이 없다면 검색 단계의 문제이므로 Query Settings나 [Compose Options](/guide/ks-compose-options/)를 조정합니다. 내용은 넘어갔는데 답이 틀렸다면 모델이나 프롬프트 쪽을 봅니다.

## 함께 읽을 글

- [Compose Options](/guide/ks-compose-options/)
- [Chunks Visualizer와 Chunks Console](/guide/ks-chunks-visualizer-console/)
- [Knowledge Stacks Next Gen](/guide/ks-next-gen/) — Rerank Model 설정

## 참고한 문서

- [Query Settings](https://docs.msty.ai/studio/knowledge-stacks/query-settings)
