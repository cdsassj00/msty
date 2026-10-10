---
title: 게이트웨이 API로 앱 연결하기
description: Nexus 게이트웨이의 기본 주소와 토큰 헤더, 지원 경로, 모델 값의 네 가지 형식, 요청 처리 순서, 오류 형식, 브라우저 CORS 규칙을 앱을 연결하는 사람의 관점에서 정리합니다.
date: 2026-10-11
section: Msty Nexus
order: 120
verified: 2026-10-11
tags: [Msty, Nexus, Gateway, API, OpenAI 호환]
---

## 게이트웨이가 하는 일

Nexus 게이트웨이는 로컬 앱에 API 창구 하나를 내어 줍니다. 그 뒤에 있는 모델이 로컬이든 온라인이든 앱이 부르는 방식은 같습니다.

흐름은 이렇습니다. 앱은 로컬 Nexus 토큰으로 Nexus에 인증합니다. Nexus는 어떤 모델인지 찾고, 필요하면 안전한 저장소에서 제공업체 자격 증명을 읽고, 제공업체로는 안전한 정보만 넘깁니다.

이 글은 개발 지식이 조금 필요한 내용입니다. 챗 앱 설정 화면에 주소와 키만 넣으면 되는 경우라면 앞의 두 절만 읽어도 충분합니다.

## 기본 주소와 인증

게이트웨이 주소는 앱에서 복사합니다. 기본값은 로컬 전용입니다.

```text
http://127.0.0.1:3939
```

토큰은 세 가지 헤더 가운데 하나로 보냅니다.

| 헤더 | 쓰는 경우 |
|---|---|
| `Authorization: Bearer <token>` | OpenAI 호환 클라이언트의 일반적인 방식 |
| `X-Msty-Nexus-Token: <token>` | Nexus 전용 헤더 |
| `x-api-key: <token>` | 이 헤더를 기대하는 Anthropic 호환 클라이언트 |

`x-api-key`에 넣는 값도 로컬 Nexus 토큰입니다. 제공업체 키가 아니며, 제공업체로 전달되지도 않습니다.

실제 설정 예를 들면(설명을 위한 예입니다), OpenAI 호환 주소를 받는 챗 앱에서 "API 주소" 칸에 게이트웨이 주소를, "API 키" 칸에 Nexus 클라이언트 토큰을 넣는 식입니다. 주소 끝에 `/v1`을 붙여야 하는지는 앱마다 다르며, 이 부분은 공식 문서에는 설명이 없습니다.

## 지원하는 경로

### OpenAI 호환

| 경로 | 용도 |
|---|---|
| `GET /v1/models` | 모델 목록 |
| `POST /v1/chat/completions` | 대화 |
| `POST /v1/embeddings` | 임베딩 |
| `POST /v1/responses` | Responses API |
| `POST /v1/responses/input_tokens` | 입력 토큰 수 |
| `POST /v1/responses/compact` | 압축 |
| `GET /v1/responses/{id}` | 응답 조회 |
| `DELETE /v1/responses/{id}` | 응답 삭제 |
| `GET /v1/responses/{id}/input_items` | 입력 항목 조회 |
| `POST /v1/responses/{id}/cancel` | 취소 |
| `POST /v1/images/generations` | 이미지 생성 |
| `POST /v1/images/edits` | 이미지 편집 |
| `POST /v1/audio/speech` | 음성 합성 |
| `POST /v1/audio/transcriptions` | 음성 받아쓰기 |

용도 칸은 경로 이름을 풀어 쓴 것입니다. 문서는 경로 목록만 싣고 경로별 설명은 하지 않습니다.

### Anthropic 호환

- `POST /v1/messages`
- `POST /v1/messages/count_tokens`

### Rerank

- `POST /v1/rerank`

모든 제공업체와 모델이 모든 경로를 지원하지는 않습니다. 지금 기기의 실제 지원 범위는 `GET /v1/capabilities`로 확인합니다. 프로그램이 읽을 수 있는 형태로 돌려줍니다.

## 엔드포인트 계열

모델 기록마다 지원하는 엔드포인트 계열 ID가 적혀 있습니다. `openai.chat_completions`, `openai.embeddings`, `openai.responses`, `openai.images`, `openai.audio_speech`, `openai.audio_transcriptions`, `anthropic.messages`, `rerank.documents` 여덟 가지입니다.

Nexus는 제공업체 자격 증명을 찾기 전에 이 계열을 먼저 확인합니다. 모델에 필요한 계열이 없으면 요청은 제공업체까지 가지 않고 로컬에서 실패합니다.

## 모델 값의 네 가지 형식

요청의 `model` 자리에 넣을 수 있는 값입니다.

| 형식 | 예 (문서의 예시 값) |
|---|---|
| 모델 ID | `openai/gpt-test`, `ollama/llama3.1:8b`, `llamacpp/qwen.gguf` |
| 별칭(alias) | `default-chat` |
| 프리셋 | `@preset/coder-fast` |
| route pack | `@route/research` |

[Smart Balancer](/guide/nexus-smart-balancer/) 문서는 여기에 더해 풀 주소 `@pool/<slug>`를 모델 이름으로 쓴다고 설명합니다.

알아 둘 규칙은 세 가지입니다.

- 모델 ID가 별칭보다 우선합니다.
- 숨긴 모델은 `/v1/models`에서 빠지고, 모델 ID나 별칭으로 부를 수도 없습니다.
- 이미지 편집, 음성 받아쓰기 같은 multipart 경로는 모델 ID나 별칭만 받습니다. 프리셋과 route pack은 받지 않습니다. 업로드를 흘려보내기 전에 Nexus가 multipart의 `model` 필드부터 풀어야 하기 때문입니다.

## 요청이 처리되는 순서

1. 모델, 별칭, 프리셋, route pack 가운데 무엇인지 찾습니다.
2. 고른 엔드포인트 계열이 맞는지 확인합니다.
3. 제공업체 기록과 제공업체 종류를 찾습니다.
4. 프리셋을 썼다면 프리셋 기본값을 합칩니다.
5. 요청에 들어 있는 필드를 마지막에 적용합니다.
6. Runtime 안에 저장된 자격 증명으로 제공업체에 요청을 보냅니다.

프리셋의 매개변수와 제공업체별 옵션은 기본값으로 작동합니다. 요청 본문이 그 값을 한 번의 호출에 한해 덮어쓸 수 있습니다.

## 헤더의 경계

앱은 제공업체 자격 증명을 Nexus로 보내면 안 됩니다. Nexus는 보호 대상 전송 헤더를 무시하거나 막고, 제공업체 인증은 자기가 직접 붙입니다.

비밀이 아닌 헤더로 제공업체에 힌트를 주는 것은 허용됩니다. 문서가 든 예는 다음과 같습니다.

- OpenAI의 프로젝트나 조직 선택
- Anthropic의 베타 기능 헤더
- OpenRouter의 referer, title, category, 실험적 메타데이터

응답이 앱에 닿기 전에 Nexus는 구간별(hop-by-hop) 헤더, 자격 증명이 담긴 응답 헤더, 제공업체의 CORS 헤더를 걷어 냅니다.

## 이미지, 오디오, rerank의 동작

나중에 추가된 경로도 글 경로와 같은 토큰·모델 계열 규칙을 따릅니다.

| 종류 | 형식과 제한 |
|---|---|
| 이미지 생성 | JSON. 모델, 별칭, 프리셋, route pack 모두로 보낼 수 있습니다 |
| 이미지 편집 | `multipart/form-data`. `model` 필드 하나와 `prompt`, 그리고 `image` 또는 `image[]` 파일이 필요합니다. 모델 ID나 별칭만 됩니다 |
| 음성 합성 | JSON으로 요청하고, 제공업체의 오디오 응답을 바이트 그대로 전달합니다 |
| 받아쓰기 | 제공업체 지원에 따라 multipart 오디오 업로드 또는 JSON `input_audio`. multipart 요청은 모델 ID나 별칭만 됩니다 |
| Rerank | 제공업체에 묶이지 않는 `{ model, query, documents[] }` 형식. 순번이 붙은 관련도 점수를 돌려줍니다 |

사용량 집계와 관련해 알아 둘 점이 있습니다. 음성 합성, 받아쓰기, 이미지 편집, rerank 요청은 현재 Usage에서 토큰이 집계되지 않습니다. 이미지 생성은 제공업체가 토큰 수를 알려 줄 때만 기록됩니다.

## 요청 ID와 오류

모든 응답에는 Nexus 요청 ID가 붙습니다. 헤더 이름은 `X-Msty-Nexus-Request-Id`, `X-Request-Id`, `request-id` 세 가지입니다. 문제를 추적할 때 이 값을 Activity의 기록과 맞춰 봅니다.

오류는 프로그램이 읽을 수 있는 고정된 코드로 옵니다.

```json
{
  "type": "error",
  "request_id": "nxs_req_example",
  "error": {
    "code": "MODEL_ENDPOINT_NOT_SUPPORTED",
    "message": "Model does not support this endpoint.",
    "type": "invalid_request_error",
    "param": "model",
    "messageKey": "error.model.endpoint.not.supported",
    "details": {}
  }
}
```

문서의 지침은 분명합니다. 코드에서 분기할 때는 영어 `message`가 아니라 `error.code`를 기준으로 삼습니다.

다른 문서 페이지에 나오는 오류 코드도 함께 적어 둡니다.

| 코드 | 나오는 경우 |
|---|---|
| `MODEL_ENDPOINT_NOT_SUPPORTED` | 모델이 그 경로를 지원하지 않음 |
| `UNAUTHORIZED` | Nexus 토큰이 없거나 맞지 않음 |
| `RESOURCE_IN_USE` | 다른 것이 쓰고 있어 지우거나 실행할 수 없음 |
| `DATA_PROTECTION_BLOCKED` | Data Protection이 요청을 막음 |

전체 오류 코드 목록은 공식 문서에는 설명이 없습니다.

## 브라우저 클라이언트와 CORS

CORS는 기본적으로 꺼져 있습니다. 브라우저 페이지에서 Nexus를 부르려면 먼저 **Settings > Network Access**에서 브라우저 출처를 명시적으로 추가합니다.

- 허용된 출처의 사전 요청(preflight)에는 토큰이 필요 없습니다.
- 실제 `/v1/*` 요청에는 항상 토큰이 필요합니다.
- `*` 대신 믿을 수 있는 특정 출처를 추가합니다. 와일드카드는 어떤 브라우저 출처든 인증 요청을 시도할 수 있게 합니다.
- CORS는 Runtime이 듣는 주소를 바꾸지 않습니다.

문제가 났을 때 가르는 방법입니다.

| 증상 | 먼저 볼 곳 |
|---|---|
| 요청이 API에 닿기 전에 브라우저가 막음 | CORS 허용 목록 |
| API에 닿았는데 `UNAUTHORIZED` | 로컬 Nexus 토큰 |

## 요청이 실패할 때의 점검 목록

Troubleshooting 문서가 꼽는 흔한 원인입니다.

- 로컬 Nexus 토큰 누락
- 기본 주소 틀림
- 모델 ID 오타
- 숨긴 모델
- 꺼진 제공업체
- 엔드포인트 계열 불일치
- 제공업체 자격 증명 없음
- 로컬 런타임 정지
- route pack의 fallback을 쓸 수 없음
- multipart 경로에 모델 ID나 별칭 대신 프리셋·route pack을 씀

토큰 발급은 [Client Tokens](/guide/nexus-client-tokens/), 그 밖의 문제는 [문제 해결](/guide/nexus-troubleshooting/)에 있습니다.

## 참고한 문서

- [Nexus 문서: Gateway](https://docs.msty.ai/nexus/gateway)
- [Nexus 문서: Setup](https://docs.msty.ai/nexus/setup)
- [Nexus 문서: Troubleshooting](https://docs.msty.ai/nexus/troubleshooting)
