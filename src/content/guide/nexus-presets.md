---
title: Presets와 route pack으로 모델 설정 고정하기
description: Nexus의 프리셋으로 모델 기본값, 사고 수준, 프롬프트 캐시, 로컬 가속을 묶어 두는 방법과 route pack의 구조, 경고 코드의 뜻을 정리합니다.
date: 2026-10-11
section: Msty Nexus
order: 60
verified: 2026-10-11
tags: [Msty, Nexus, Presets, route pack]
---

## 왜 프리셋을 쓰는가

앱마다 제공업체, 모델, 온도 같은 값을 직접 적어 두면, 모델을 바꿀 때 앱을 전부 고쳐야 합니다. 프리셋과 route pack은 앱에 "바뀌지 않는 모델 값" 하나를 주고, 그 뒤의 실제 결정은 Nexus에서 하게 합니다.

업무 예를 들면(설명을 위한 예입니다), 사내 문서 요약 도구에 `@preset/summary`만 적어 두면, 나중에 요약에 쓰는 모델을 다른 것으로 바꿔도 도구 쪽 설정은 그대로입니다.

문서는 route pack은 **Models**에서, 프리셋은 앱 안의 **Presets** 화면에서 관리한다고 적었습니다.

## 프리셋

프리셋은 이름이 붙은 모델 설정입니다. 앱은 모델 자리에 다음 값을 넣어 부릅니다.

```text
@preset/<slug>
```

프리셋에 담을 수 있는 것은 다음과 같습니다.

- 표시 이름
- 대상 모델
- 범위(scope)
- 온도, 최대 토큰 같은 기본 매개변수
- 제공업체별 옵션
- 사고 수준(thinking effort)과 사고 표시 방식
- Anthropic 프롬프트 캐시
- 로컬 가속 설정(지원되는 경우)
- Data Protection을 통한 개인정보 제거(선택)

### 값이 합쳐지는 순서

게이트웨이는 프리셋의 기본값을 먼저 깔고, 들어온 요청의 값을 마지막에 덮어씁니다. 그래서 호출하는 쪽은 프리셋을 고치지 않고도 요청 한 번에 한해 값 하나를 바꿀 수 있습니다.

## 생성 관련 설정

| 설정 | 내용 |
|---|---|
| Params | 제공업체와 무관한 기본값. 온도, 최대 토큰 등 |
| Provider options | 제공업체 종류별로 나눠 적는 옵션. `*`는 모든 제공업체에 적용되는 기본값 |
| Thinking effort | `off`, `minimal`, `low`, `medium`, `high`, `max` |
| Thinking display | `summarized`(요약해 보여 줌), `omitted`(생략) |
| Prompt cache | Anthropic 모델에 고정된 프롬프트 앞부분을 `5m` 또는 `1h` 동안 캐시하도록 요청 |

Nexus는 이 설정을 요청 시점에 선택된 제공업체의 형식으로 바꿔 줍니다. 문서의 예로는, OpenAI 방식 제공업체에는 reasoning 필드로, Anthropic에는 그쪽의 thinking·cache 형식으로, llama.cpp에는 지원되는 경우 대화 템플릿의 thinking 스위치로 전달됩니다.

### 지원되지 않는 설정은 어떻게 되는가

제공업체가 저장된 설정을 받을 수 없으면 Nexus는 경고를 내고, 그 필드를 제공업체로 보내기 전에 뺍니다. 모르는 채로 그대로 넘기지 않습니다.

| 경고 코드 | 뜻 |
|---|---|
| `unsupported_param` | 제공업체가 그 매개변수를 지원한다고 밝히지 않음 |
| `unsupported_thinking` | 모델 또는 제공업체가 사고 설정을 쓸 수 없음 |
| `unsupported_thinking_display` | 요청한 사고 표시 방식을 제공업체가 낼 수 없음 |
| `unsupported_prompt_cache` | 그 대상에서는 프롬프트 캐시가 지원되지 않음 |
| `unknown_provider_bucket` | 제공업체 옵션에 알려진 제공업체 종류와 맞지 않는 묶음이 있음 |

대응은 세 가지 가운데 하나입니다. 프리셋의 대상 모델을 바꾸거나, 지원되지 않는 필드를 지우거나, 앞으로 쓸 모델을 위해 일부러 넣어 둔 설정이라면 경고를 그대로 둡니다.

### 저장 전에 검증하기

프리셋을 크게 바꿀 때는 저장하기 전에 프리셋 검증을 쓰라고 문서는 권합니다. 검증은 초안을 대상 모델에 대해 시험 실행(dry-run)하고, 저장된 프리셋은 건드리지 않은 채 경고만 알려 줍니다.

## 프리셋이 어울리는 경우

- 앱에 알기 쉬운 모델 이름을 줄 때
- 팀이나 업무 흐름의 기본값을 고정할 때
- 요청마다 되풀이하고 싶지 않은 제공업체별 기본값이 있을 때
- 로컬 런타임 가속 설정을 쓸 때
- 나중에 실제 모델 ID가 바뀔 수 있어 안전하게 넘겨주고 싶을 때

모델을 지우려는데 `RESOURCE_IN_USE`로 실패하면, 그 모델을 가리키는 프리셋이 남아 있는지 확인합니다.

## 프리셋 가속

호환되는 로컬 프리셋은 더 작은 보조 모델(helper model)을 써서 생성 속도를 높일 수 있습니다. 보조 모델이 대상 모델·런타임과 맞는지는 앱이 검증합니다.

1. 로컬 프리셋을 만들거나 엽니다.
2. **Speed up this preset**을 고릅니다.
3. 호환되는 보조 모델을 고릅니다.
4. 검증을 실행합니다.
5. 변경을 적용합니다.
6. 필요하다고 나오면 런타임을 다시 시작합니다.

사용량 통계에는 가속 관련 수치가 따로 나옵니다. 속도 향상 정도, 받아들여진 초안 토큰 수, 가속 없이 처리된 요청 수가 있고, 비교할 기준 트래픽이 충분히 쌓이면 절약된 시간 추정도 나옵니다.

## Route pack

route pack은 모델 값 하나가 여러 대상 모델 가운데서 고르게 하는 묶음입니다. 앱은 이렇게 부릅니다.

```text
@route/<slug>
```

route pack 하나는 다음으로 이루어집니다.

- slug
- 이름과 설명
- 켜짐 상태
- fallback 모델(기본으로 돌아갈 모델)
- 맞는 요청 종류를 특정 대상 모델로 보내는 route들(선택)

앱은 값 하나만 부르고, 요청 종류에 따라 다른 모델로 보내는 일은 Nexus가 맡아야 할 때 씁니다. fallback 모델은 route pack이 받을 트래픽에 맞춰 대화용일 수도, 이미지 생성용일 수도 있습니다.

### Smart Route와의 관계

Presets 문서는 Smart Route를, 호환되는 로컬 런타임으로 작은 분류 모델을 준비해 두는 기능으로 설명합니다. Smart Route가 준비되지 않았으면 route pack은 안전한 fallback 경로에 머뭅니다.

준비 순서의 뼈대는 이렇습니다.

1. 호환되는 로컬 런타임을 하나 이상 설정합니다. MLX, llama.cpp, Ollama 가운데 하나입니다.
2. 대화가 되는 fallback 모델을 추가합니다.
3. route pack 화면을 열어 Smart Route를 준비합니다.
4. fallback을 넣어 route pack을 만듭니다.
5. 분명한 분류 기준이 있을 때만 route를 추가합니다.

Nexus는 경로 결정을 고정된 ID와 수치로만 기록합니다. 프롬프트, 분류기의 출력, 제공업체의 응답 본문은 사용량 집계에 저장하지 않습니다.

"route pack"과 "Smart Route" 두 이름이 정확히 어떻게 나뉘는지는 공식 문서에 따로 정의되어 있지 않습니다. 두 문서 모두 `@route/<slug>`라는 같은 주소 형식을 씁니다. lane 설계와 실시간 화면은 [Smart Routes로 요청 나눠 보내기](/guide/nexus-smart-routes/)에서 자세히 다룹니다.

### Gauge 용량 신호 반영

Gauge가 켜져 있고 설정되어 있으면, route pack이 Gauge의 용량 신호를 반영하도록 고를 수 있습니다. 선택된 대상의 용량이 부족하면 Nexus는 설정된 fallback을 쓰고, 결정 이유로 `gauge_capacity_constrained`를 기록합니다.

Gauge가 route pack 정책 바깥에서 계정이나 제공업체를 스스로 바꾸는 일은 없습니다. fallback 동작은 route pack이 정합니다.

### 다른 기능과의 조합

Smart Route는 같은 호환 모델을 여러 대상이 제공할 때 [Smart Balancer](/guide/nexus-smart-balancer/) 풀을 대상으로 삼을 수 있습니다. 여러 Mac이 힘을 합쳐 MLX 모델 하나를 돌려야 한다면 [Cluster](/guide/nexus-cluster/)를 씁니다.

## 무엇을 언제 쓸지

문서의 권장을 표로 옮겼습니다.

| 상황 | 쓸 것 |
|---|---|
| 고정된 모델 이름만 있으면 됨 | 별칭(alias) |
| 매개변수나 제공업체 옵션이 중요함 | 프리셋 |
| 앱이 부르는 값 하나가 여러 모델로 나뉘어야 함 | route pack |

덧붙는 주의는 세 가지입니다.

- 고급 route를 추가하기 전에 모든 route pack의 fallback이 유효한지 확인합니다.
- 프리셋의 사고·캐시 설정은 앱에서 기대기 전에 검증합니다.
- Smart Route는 로컬 런타임과 fallback 모델이 안정된 뒤에 준비합니다.

숨긴 모델은 route pack과 Smart Route 선택 목록에서 빠집니다. 연결된 앱이 부르면 안 되는 모델은 route를 배정하기 전에 **Models**에서 먼저 숨깁니다.

## 참고한 문서

- [Nexus 문서: Presets](https://docs.msty.ai/nexus/presets-and-routes)
- [Nexus 문서: Troubleshooting](https://docs.msty.ai/nexus/troubleshooting)
- [Nexus 문서: Smart Routes](https://docs.msty.ai/nexus/smart-routes)
