---
title: 고급 모델 파라미터 살펴보기
description: Model Parameters의 Advanced Parameter와 Provider Options에 JSON으로 넣는 고급 설정을 묶음별로 정리합니다.
date: 2026-10-11
section: 모델 관리
order: 80
verified: 2026-10-11
tags: [Msty, 모델 파라미터, JSON, 고급 설정]
---

## 이 글이 다루는 범위

Msty Studio의 모델 파라미터에는 두 단계가 있습니다.

- **자주 쓰는 설정.** temperature처럼 흔히 조정하는 값은 Msty가 빠른 설정 항목으로 제공합니다. 공식 문서는 이 설정들의 뜻을 Msty 블로그의 "The AI Settings Dictionary" 글에서 설명한다고 안내합니다.
- **그보다 더 고급인 설정.** 빠른 설정에 없는 값은 Model Parameters의 **Advanced Parameter** 또는 **Provider Options** 칸에 JSON으로 직접 넣습니다.

이 글은 두 번째, 즉 JSON으로 넣는 설정을 다룹니다. 일반적인 사용에는 필요 없고, 특정 모델의 동작을 세밀하게 통제해야 하는 사람을 위한 내용입니다.

## 먼저 알아 둘 점

공식 문서는 다음을 분명히 해 둡니다.

- 아래 설정들은 여러 모델에 걸쳐 쓰이는 일반적인 형태이지만, **어떤 모델은 일부만 지원하거나 전혀 지원하지 않습니다.**
- 지원하지 않는 모델에 넣으면 **무시되거나 오류가 날 수 있습니다.**
- 쓸 수 있는 설정은 사용하는 모델 제공업체의 문서에서 확인해야 합니다.

따라서 아래 표는 "넣으면 반드시 동작하는 목록"이 아니라 "넣어 볼 수 있는 설정의 형태"로 읽어야 합니다.

## 넣는 형태

설정은 묶음 이름 아래에 값을 적는 JSON입니다. 예를 들어 샘플링 관련 값은 이런 모양입니다.

```json
{
  "samplingConfig": {
    "temperature": 0.7,
    "top_p": 0.9,
    "seed": 123456
  }
}
```

공식 문서의 예시에는 각 줄에 설명 주석이 붙어 있습니다. 아래 표는 그 예시에 나온 항목과 선택지를 묶음별로 옮긴 것입니다.

## 실행 관련 — runtimeConfig

| 항목 | 뜻 | 예시 값·선택지 |
|---|---|---|
| `priority` | 요청 우선순위 | low, standard, high |
| `timeout` | 요청 제한 시간(밀리초) | 60000 |
| `maxRetries` | 최대 재시도 횟수 | 3 |
| `stream` | 스트리밍 응답 사용 | true |
| `streamChunkSize` | 스트리밍 한 조각의 토큰 수 | 16 |
| `streamLatency` | 스트리밍 지연 방식 | low, balanced, consistent |
| `caching.enabled`, `caching.ttl` | 응답 캐싱 사용과 유지 시간(초) | true, 3600 |
| `quotaManagement` | 분당 토큰 한도, 하루 요청 한도 | 10000, 1000 |
| `logging` | 로그 수준과 프롬프트·응답 기록 여부 | debug, info, warn, error |

## 메모리와 컨텍스트 — contextConfig

| 항목 | 뜻 | 예시 값·선택지 |
|---|---|---|
| `maxTokens` | 컨텍스트 창 최대 크기 | 128000 |
| `retentionStrategy` | 무엇을 남길지 정하는 방식 | recency, importance, hybrid |
| `compressionRatio` | 컨텍스트 압축 비율(0.0~1.0) | 0.8 |
| `memoryOptimization` | 메모리 최적화 방식 | auto, aggressive, conservative |
| `contextPrioritization` | 컨텍스트 우선순위 순서 | user_instructions, recent_exchanges, relevant_facts, system_instructions |

## 멀티모달 — multimodalConfig

| 항목 | 뜻 | 예시 값·선택지 |
|---|---|---|
| `visionEnabled` | 이미지 인식 사용 | true |
| `imageAnalysisDetail` | 이미지 분석 정밀도 | low, medium, high |
| `imageGenerationEnabled` | 이미지 생성 사용 | false |
| `audioProcessingEnabled` | 오디오 처리 사용 | false |
| `videoAnalysisEnabled` | 영상 분석 사용 | false |
| `modalityPreference` | 선호하는 입력 형태 | text, visual, balanced |

## 출력 형식 — outputConfig

| 항목 | 뜻 | 예시 값·선택지 |
|---|---|---|
| `responseFormat` | 응답 형식 | markdown, plain, json, xml, html |
| `verbosityLevel` | 답의 자세한 정도 | minimal, concise, detailed, comprehensive |
| `structurePreference` | 답의 구성 방식 | narrative, analytical, bullet, dialog |
| `citationStyle` | 인용 표기 방식 | none, informal, academic, legal |
| `languageModel` | 말투 | casual, formal, technical, creative |
| `maxOutputTokens` | 응답 최대 길이 | 4096 |

## 안전 장치 — safetyConfig

| 항목 | 뜻 | 예시 값·선택지 |
|---|---|---|
| `contentFilters` | 유해·혐오·성적·폭력 콘텐츠 필터 강도 | off, standard, strict |
| `topicRestrictions` | 제한할 주제 목록 | weapons, illegal_activities |
| `refusalBehavior` | 거절할 때의 방식 | explain, redirect, minimal |
| `userVerification` | 민감한 요청에 사용자 확인 사용 | false |
| `contentWarnings` | 필요할 때 콘텐츠 경고 표시 | true |

## 샘플링 — samplingConfig

| 항목 | 뜻 | 예시 값·범위 |
|---|---|---|
| `temperature` | 답의 무작위성 | 0.7 (0.0~1.0) |
| `top_p` | 누적 확률 기준 샘플링 | 0.9 (0.0~1.0) |
| `top_k` | 상위 K개 토큰으로 후보 제한 | 40 |
| `frequencyPenalty` | 반복 억제 | 0.5 (0.0~2.0) |
| `presencePenalty` | 이미 나온 토큰 재사용 억제 | 0.5 (0.0~2.0) |
| `deterministicSampling` | 결과를 항상 같게 강제 | false |
| `seed` | 재현을 위한 난수 시드 | 123456 |

## 동작 성향 — behaviorConfig

| 항목 | 뜻 | 예시 값·선택지 |
|---|---|---|
| `personality` | 성격 | helpful, concise, creative, analytical |
| `roleplayMode` | 캐릭터 역할극 사용 | false |
| `expertiseDomains` | 전문 분야 목록 | coding, science, math |
| `conversationalStyle` | 대화 방식 | formal, casual, balanced, technical |
| `initiativeLevel` | 먼저 나서는 정도 | passive, responsive, proactive |
| `opinionExpression` | 의견 표현 정도 | neutral, balanced, opinionated |
| `uncertaintyHandling` | 불확실할 때의 태도 | confident, transparent, conservative |

## 추론 — thinkingConfig

| 항목 | 뜻 | 예시 값·선택지 |
|---|---|---|
| `thinkingBudget` | 0이면 추론 모드를 끄고, 양의 정수면 그만큼 예산을 줍니다 | 0 |
| `thinkingDepth` | 추론 깊이 | shallow, medium, deep |
| `enableAutoThinking` | 복잡한 질문에 추론 자동 사용 | false |
| `thinkingStrategy` | 추론 방식 | structured, exploratory, critical |
| `reasoningEffort` | 추론에 들이는 노력 | low |
| `microstat` | 세밀한 통계적 추론 사용 | true |

추론 강도는 JSON을 쓰지 않고 목록에서 고르는 방법이 따로 있습니다. [Thinking Effort로 추론 강도 조절하기](/guide/models-thinking-effort/)를 먼저 보세요.

## 도구 사용 — toolConfig

| 항목 | 뜻 | 예시 값·선택지 |
|---|---|---|
| `enabledTools` | 사용할 도구 목록 | calculator, web_search, code_execution |
| `toolCallThreshold` | 도구를 부를 확신도 기준(0.0~1.0) | 0.7 |
| `maxToolCalls` | 요청 한 번에 부를 최대 도구 횟수 | 5 |
| `autoToolSelection` | 적절한 도구 자동 선택 | true |
| `toolPreferences` | 우선 쓸 도구와 대체 도구 | preferred, fallback |

## 쓸 때의 순서

1. 쓰려는 모델의 제공업체 문서에서 그 모델이 받는 설정을 확인합니다.
2. 대화 화면에서 모델 파라미터를 열고 **Advanced Parameter** 또는 **Provider Options** 칸에 JSON을 넣습니다.
3. 질문을 보내 봅니다. 오류가 나면 넣은 항목 중 그 모델이 지원하지 않는 것이 있는지 확인합니다.

두 칸 중 어느 쪽에 어떤 설정을 넣어야 하는지는 이 문서 페이지에 구분해 적혀 있지 않습니다.

## 참고한 문서

- [Advanced Configs](https://docs.msty.ai/studio/managing-models/advanced-configs)
