---
title: Thinking Effort로 추론 강도 조절하기
description: 추론 모델이 답하기 전에 얼마나 깊이 생각할지 정하는 Thinking Effort 설정과 제공업체별 지원 범위를 정리합니다.
date: 2026-10-11
section: 모델 관리
order: 90
verified: 2026-10-11
tags: [Msty, Thinking Effort, 추론 모델]
---

## Thinking Effort란

추론 모델은 답을 쓰기 전에 먼저 생각하는 단계를 거칩니다. 많은 추론 모델은 이 단계에 들이는 시간과 노력을 조절할 수 있게 해 두었고, Msty Studio에서는 이를 **Thinking Effort**(추론 강도)로 설정합니다.

간단한 맞춤법 교정에는 깊은 추론이 필요 없으니 강도를 낮춰 빠르게 답을 받고, 복잡한 계약 조건 비교나 수식이 얽힌 문제에는 강도를 높여 더 꼼꼼한 답을 받는 식으로 씁니다. 강도가 높을수록 답이 나오기까지 시간이 더 걸립니다.

## 먼저 알아 둘 점

- 모든 모델이 추론을 지원하지는 않습니다.
- 제공업체마다 추론 강도 설정 방식이 다릅니다.
- 모델이 생각한 과정을 담은 텍스트가 모든 모델에서 표시되는 것은 아닙니다.

## 설정하는 순서

### 1. 모델 용도에 Thinking 켜기

추론 강도를 조절하려면 먼저 모델의 용도에 **Thinking**이 켜져 있어야 합니다.

1. 모델 선택 목록에서 대상 모델을 찾습니다.
2. 편집 아이콘을 누릅니다.
3. **Thinking**을 켭니다.

### 2. 강도 고르기

**Thinking**을 켠 뒤, 모델 설정의 **Thinking Effort** 드롭다운에서 강도를 고릅니다.

## 선택지의 뜻

| 선택지 | 뜻 |
|---|---|
| **None** | 추론하지 않습니다. 모델이 생각 단계 없이 바로 답합니다 |
| **Default** | 제공업체가 정한 기본 추론 강도를 씁니다 |
| **Think Lightly** | 가볍게 추론합니다. 최소한의 추론만 하고 짧은 시간 안에 답합니다 |
| **Think Moderately** | 중간 정도로 추론합니다. 답이 나오기까지 더 걸립니다 |
| **Think Deeply** | 깊이 추론합니다. 가장 오래 걸리고 가장 폭넓게 추론합니다 |
| **Dynamic** | 질문의 복잡도에 따라 모델이 추론 강도를 스스로 조절합니다 |
| **Exclude** | 모델은 기본 강도로 추론하지만, 추론 텍스트는 돌려주지 않습니다 |

## 제공업체별 지원 범위

공식 문서가 추론 강도를 지원한다고 밝힌 제공업체와 각 선택지입니다. O는 지원, 빈칸은 목록에 없음을 뜻합니다.

| 제공업체 | None | Default | Think Lightly | Think Moderately | Think Deeply | Dynamic | Exclude |
|---|---|---|---|---|---|---|---|
| Ollama / Msty Models | O | O | | | | | |
| OpenAI Compatible Models | O | O | | | | | |
| OpenAI / ChatGPT | | O | O | O | O | | |
| Anthropic / Claude | O | O | O | O | O | | |
| Google Generative AI / Gemini | O | O | O | O | O | O | |
| xAI | O | O | O | O | O | | |
| OpenRouter | O | O | O | O | O | | O |
| Mistral AI | O | O | O | O | O | | |
| Perplexity | O | O | O | O | O | | |
| Groq | O | O | O | O | O | | |
| Cohere | O | O | O | O | O | | |
| Azure OpenAI | | O | O | O | O | | |
| DeepSeek | O | O | O | O | O | | |

표에서 눈여겨볼 부분입니다.

- **로컬 모델(Ollama / Msty Models)과 OpenAI 호환 모델**은 None과 Default 두 가지만 고를 수 있습니다. 추론을 켜거나 끄는 수준입니다.
- **OpenAI / ChatGPT와 Azure OpenAI**에는 None이 없습니다.
- **Dynamic**은 Gemini에만, **Exclude**는 OpenRouter에만 있습니다.
- 공식 문서는 Gemini 2.5 Pro가 추론을 끄는 것을 허용하지 않는다고 따로 적어 두었습니다.

## 오류가 날 때

위 표는 제공업체 단위의 지원 범위입니다. 같은 제공업체 안에서도 **모든 모델이 추론 강도 설정을 지원하는 것은 아닙니다.**

지원하지 않는 모델에 추론 강도를 설정하고 대화하면 오류 메시지가 돌아올 가능성이 높습니다. 이럴 때는 해당 모델이 추론 강도 설정을 지원하는지 제공업체와 모델의 문서에서 확인하세요. 공식 문서가 안내하는 점검 방법은 이것 하나입니다.

## JSON으로 더 세밀하게 넣기

목록에서 고르는 대신 추론 관련 값을 JSON으로 직접 넣는 방법도 있습니다. [고급 모델 파라미터 살펴보기](/guide/models-advanced-configs/)의 추론 항목을 보세요.

## 다음에 읽을 글

- [Model Hub 한눈에 보기](/guide/models-model-hub/)
- [고급 모델 파라미터 살펴보기](/guide/models-advanced-configs/)

## 참고한 문서

- [Thinking Effort](https://docs.msty.ai/studio/managing-models/thinking-effort)
