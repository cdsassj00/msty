---
title: 온라인 제공업체 연결하기
description: API 키로 OpenAI, Anthropic, Gemini 같은 온라인 모델을 Msty Studio에 연결하는 방법과 제공업체 자체 도구 프리셋을 설명합니다.
date: 2026-10-11
section: 모델 관리
order: 20
verified: 2026-10-11
tags: [Msty, 온라인 모델, API 키]
---

## 온라인 제공업체란

온라인 제공업체(Online Provider)는 모델을 자기 서버에서 돌려 주는 업체입니다. 내 API 키를 Msty Studio에 넣으면, 내 PC에서 모델을 돌리지 않고도 그 업체의 모델과 대화할 수 있습니다.

PC 사양이 낮아 큰 로컬 모델을 돌리기 어렵거나, 특정 업체의 최신 모델이 필요할 때 씁니다. 다만 질문과 첨부 내용이 해당 업체 서버로 전송된다는 점은 기억해야 합니다. 사내 자료를 다룬다면 [로컬 모델](/guide/models-local-models/)과 구분해 쓰는 편이 안전합니다.

## 연결하는 순서

1. **Model Hub > Model Providers**로 갑니다.
2. **Add Provider**를 누르고 제공업체를 고릅니다.
3. API 키를 넣습니다. 업체에 따라 엔드포인트 정보가 더 필요할 수 있습니다. 넣은 뒤 저장합니다.
4. 대화를 열고 그 제공업체의 모델 중 하나를 골라 잘 되는지 확인합니다.

API 키를 어디서 발급받는지는 공식 문서의 [Find Online Model API Keys](https://docs.msty.ai/studio/how-tos/find-api-keys) 페이지에 업체별로 정리되어 있습니다.

## 지원하는 제공업체

공식 문서에 나온 목록입니다.

| 제공업체 | 제공업체 |
|---|---|
| Anthropic | Perplexity |
| Cohere | Together AI |
| Gemini | SambaNova |
| Groq | xAI |
| Mistral AI | Azure OpenAI |
| OpenAI | Amazon Bedrock |
| OpenRouter | |

이 문서 페이지에는 제공업체별 요금제 조건이 적혀 있지 않습니다. 어떤 제공업체가 어느 요금제에 포함되는지는 공식 요금 페이지의 요금제 비교표에서 확인하세요.

## 목록에 없는 제공업체 연결하기

목록에 없는 업체라도 OpenAI 호환 API를 제공한다면 **Model Providers**에서 OpenAI 호환 엔드포인트로 연결할 수 있습니다. 공식 문서는 다음 경우에 유용하다고 설명합니다.

- 직접 운영하는 게이트웨이
- 기업용 AI 플랫폼
- OpenAI API 형식을 따르는 사설 추론 엔드포인트

회사에서 사내 전용 모델 서버를 운영하고 있고 그 서버가 OpenAI 형식을 따른다면, 이 방법으로 Msty Studio에 붙일 수 있습니다.

## 연결한 뒤 정리하기

연결을 마친 뒤 할 수 있는 일입니다.

- 제공업체와 모델 이름을 알아보기 쉽게 바꿉니다.
- 대화 화면에서 기본 모델을 정합니다.
- 모델에 용도 태그를 붙입니다. 태그의 종류는 [Model Hub 한눈에 보기](/guide/models-model-hub/)에 있습니다.
- 모델 파라미터 프리셋을 적용합니다. 제공업체 자체 도구 프리셋도 여기에 포함됩니다.

## 제공업체 자체 도구

일부 온라인 제공업체는 웹 검색이나 코드 실행 같은 도구를 모델 API에 직접 붙여 제공합니다. 공식 문서는 이를 provider-native tools라고 부릅니다. 이 도구들은 Msty의 Toolbox 도구 모음을 거치지 않고 제공업체 쪽에서 실행됩니다.

Msty Studio에는 자주 쓰는 자체 도구용 모델 파라미터 프리셋이 들어 있습니다.

| 제공업체 | 들어 있는 자체 도구 프리셋 |
|---|---|
| OpenAI | Web Search, Code Interpreter |
| Anthropic / Claude | Web Search, Web Fetch, Code Execution |
| Google Gemini | URL Context, Google Search with URL Context |
| xAI | Responses API with Web Search |
| Groq | Browser Search |

예를 들어 최신 소식을 반영한 답이 필요하다면 OpenAI 모델에 웹 검색 프리셋을 적용해 질문할 수 있습니다.

### 프리셋 적용하기

1. 대화를 열고, 프리셋을 지원하는 제공업체의 모델을 고릅니다.
2. 모델 선택 목록 옆의 모델 파라미터 버튼을 누릅니다.
3. **Presets**를 열고 원하는 자체 도구 프리셋을 고릅니다. 예: **OpenAI with Web Search**, **Claude with Code Execution**.
4. **Apply**를 누른 뒤, 켜 둔 기능을 쓸 만한 질문을 보냅니다.

답변이 자체 도구를 쓰면, 지원되는 도구 결과와 근거 출처가 답변과 함께 표시됩니다.

### 알아 둘 점

자체 도구를 쓸 수 있는지는 제공업체, 모델, API 계정, 지역, 그리고 그 시점의 제공업체 기능에 따라 달라집니다. 프리셋이 목록에 보이더라도 선택한 모델이 프리셋에 들어 있는 도구를 모두 지원하지는 않을 수 있습니다. 프리셋을 적용했는데 도구가 동작하지 않으면 해당 제공업체의 모델 문서를 확인하세요.

## 다음에 읽을 글

- [Model Hub 한눈에 보기](/guide/models-model-hub/)
- [Thinking Effort로 추론 강도 조절하기](/guide/models-thinking-effort/)
- [Insights로 토큰 사용량 보기](/guide/models-insights/)

## 참고한 문서

- [Online Providers](https://docs.msty.ai/studio/managing-models/online-providers)
