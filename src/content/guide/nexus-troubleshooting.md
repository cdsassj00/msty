---
title: Nexus 문제 해결
description: Nexus가 연결되지 않거나, 토큰이 거부되거나, 모델이 보이지 않거나, 게이트웨이 요청이 실패할 때 아래 계층부터 차례로 점검하는 방법을 증상별로 정리합니다.
date: 2026-10-11
section: Msty Nexus
order: 180
verified: 2026-10-11
tags: [Msty, Nexus, 문제 해결, 오류]
---

## 점검 순서의 원칙

Troubleshooting 문서는 아래에서 위로 올라가며 보라고 합니다. 아래 계층이 깨져 있으면 위 계층을 아무리 고쳐도 소용이 없기 때문입니다.

1. Runtime
2. 인증
3. 제공업체와 런타임의 상태
4. 모델 카탈로그
5. 게이트웨이 경로

증상으로 바로 찾으려면 다음 표를 씁니다.

| 증상 | 볼 절 |
|---|---|
| 앱이 Runtime을 오프라인으로 표시 | Runtime이 오프라인일 때 |
| `UNAUTHORIZED` | 토큰이 거부될 때 |
| 제공업체 Test 실패 | 제공업체 시험이 실패할 때 |
| 모델 목록이 비어 있음 | 모델이 보이지 않을 때 |
| 앱에서 보낸 요청이 오류 | 게이트웨이 요청이 실패할 때 |
| 웹 페이지에서만 안 됨 | 브라우저 클라이언트가 실패할 때 |
| 엔진 설치·시작 실패 | 런타임 동작이 실패할 때 |
| 모델 내려받기·삭제 실패 | 모델 동작이 실패할 때 |

## Runtime이 오프라인일 때

확인할 것입니다.

- 앱이 예상한 Runtime 주소를 가리키고 있는가
- Runtime이 로컬 기기 또는 선택한 controller에서 돌고 있는가
- 설정된 포트를 다른 것이 이미 쓰고 있지 않은가
- 앱의 토큰이 키체인에 그대로 있는가

로컬 Runtime 문제에는 **Repair connection**을 씁니다. 원격 controller 프로필이라면 사정이 다릅니다. 로컬 Runtime을 복구하지 말고 controller 주소와 토큰을 확인합니다.

## 토큰이 거부될 때

증상은 세 가지 형태로 나타납니다. `UNAUTHORIZED` 오류, 앱이 토큰이 없다고 알림, 게이트웨이 클라이언트가 인증 오류를 받음.

1. 클라이언트 토큰을 새로 만듭니다. 문서는 위치를 **Settings > Client Tokens**로 적었고, 최신 Console에는 별도의 **Client Tokens** 페이지가 있습니다.
2. 앱의 API 키를 새 값으로 바꿉니다.
3. 앱이 허용된 토큰 헤더 하나로 보내는지 확인합니다.
4. 앱을 모두 옮긴 뒤 예전 토큰을 폐기합니다.

제공업체 API 키는 Nexus API 키가 아닙니다. 앱의 키 칸에 OpenAI나 Anthropic 키를 넣었다면 그것이 원인입니다. 자세한 내용은 [Client Tokens](/guide/nexus-client-tokens/)에 있습니다.

## 제공업체 시험이 실패할 때

- 제공업체가 켜져 있는가
- 필요한 자격 증명이 설정되어 있는가
- 기본 주소(base URL)가 맞는가
- 그 제공업체 계정으로 모델 목록을 볼 수 있는가
- 쓰려는 엔드포인트 계열을 제공업체가 지원하는가

진단은 `missing_credential`, `invalid_configuration`, `rejected`, `unreachable`, `invalid_response` 같은 고정된 상태값을 돌려줍니다. 값의 뜻은 [Providers](/guide/nexus-providers/)에 표로 정리했습니다.

## 모델이 보이지 않을 때

어느 경로로 설정했는지에 따라 봅니다.

| 상황 | 조치 |
|---|---|
| 온라인 제공업체 | 모델을 동기화하거나 자동 제공업체 모델을 켭니다 |
| 로컬 런타임 | 런타임을 설치·시작하고 모델 동기화를 실행합니다 |
| 검색·설치 화면에 후보가 없음 | 호환되는 Nexus 관리 런타임이 설치되어 있는지 확인합니다 |
| 숨긴 모델 | **Models**에서 보임·숨김 필터를 바꿉니다 |
| 꺼진 제공업체 | 제공업체를 다시 켭니다 |
| 찾아낸 로컬 AI | 런타임에 닿게 된 뒤 다시 스캔합니다 |

모델 저장 상태가 어긋나 보이면 **Models**에서 **Library health**를 실행합니다.

## 게이트웨이 요청이 실패할 때

문서가 꼽는 흔한 원인 열 가지입니다.

1. 로컬 Nexus 토큰이 없음
2. 기본 주소가 틀림
3. 모델 ID 오타
4. 숨긴 모델
5. 꺼진 제공업체
6. 엔드포인트 계열 불일치
7. 제공업체 자격 증명 없음
8. 로컬 런타임이 멈춰 있음
9. route pack의 fallback을 쓸 수 없음
10. multipart 경로에 모델 ID나 별칭 대신 프리셋·route pack을 씀

오류가 `MODEL_ENDPOINT_NOT_SUPPORTED`이면, 그 모델이 지원하는 경로로 바꾸거나 모델의 엔드포인트 계열을 고칩니다.

이미지, 음성 합성, 받아쓰기, rerank가 실패하면, 고른 모델이 각각 `openai.images`, `openai.audio_speech`, `openai.audio_transcriptions`, `rerank.documents` 계열을 갖고 있는지 확인합니다.

앱을 붙이기 전에 [Chat Lab](/guide/nexus-chat-lab/)에서 같은 대상을 불러 보면, 문제가 앱 설정에 있는지 Nexus 쪽에 있는지 가르기 쉽습니다.

## 브라우저 클라이언트가 실패할 때

CORS와 인증을 따로 떼어 봅니다.

| 증상 | 원인과 조치 |
|---|---|
| 요청이 Nexus에 닿기 전에 브라우저가 막음 | CORS 출처를 고칩니다 |
| Nexus가 `UNAUTHORIZED`를 돌려줌 | 로컬 Nexus 토큰을 고칩니다 |
| 다른 기기가 Runtime에 닿지 못함 | 네트워크 공개를 켜고 Runtime을 다시 시작합니다 |

CORS만으로는 Runtime이 LAN에 공개되지 않습니다. 세 가지는 서로 다른 설정이고, 위치는 모두 **Settings > Network Access**입니다.

## 런타임 동작이 실패할 때

- 이 기기에서 지원되는 런타임인가
- 런타임이 켜져 있는가
- 같은 런타임을 대상으로 하는 다른 작업이 돌고 있지 않은가
- 포트가 비어 있는가
- 경로로 지정한 설치라면 실행 파일이 있는가
- 업데이트 전에 정지가 필요한 경우, 런타임이 멈춰 있는가

Nexus는 자기가 시작한 프로세스만 조작합니다. 런타임을 Nexus 밖에서 시작했다면, Nexus의 관리 동작을 쓰기 전에 직접 멈춰야 합니다. 엔진별 설명은 [Local Runtimes](/guide/nexus-local-runtimes/)에 있습니다.

## 모델 동작이 실패할 때

- 런타임이 설치되어 있고 닿는가
- 그 런타임이 해당 모델 동작을 지원하는가
- 검색 결과에 설치 동작이 있는가
- GGUF 가져오기에서 유효한 `.gguf` 파일을 골랐는가
- 모델을 아직 가리키는 프리셋이나 route pack이 없는가
- 같은 런타임을 대상으로 하는 모델 작업이 진행 중이지 않은가

llama.cpp 삭제에서 Nexus는 자기가 관리하는 상대 경로의 GGUF 파일만 지웁니다. 관리 대상이 아닌 로컬 경로는 일부러 거부합니다. 지워지지 않는다고 오류로 볼 일이 아닙니다.

## 프리셋 경고가 나올 때

프리셋 경고는 Nexus가 저장하거나 검증한 설정을 지금 대상 모델이 지원하지 않을 수 있다는 뜻입니다.

| 코드 | 뜻 |
|---|---|
| `unsupported_param` | 제공업체가 저장된 매개변수를 지원한다고 밝히지 않음 |
| `unsupported_thinking` | 모델·제공업체가 사고 설정을 쓸 수 없음 |
| `unsupported_thinking_display` | 요청한 추론 표시 방식을 제공업체가 낼 수 없음 |
| `unsupported_prompt_cache` | 그 대상에서 프롬프트 캐시가 지원되지 않음 |
| `unknown_provider_bucket` | 제공업체 옵션에 알려진 제공업체 종류와 맞지 않는 묶음이 있음 |

해결 방법은 프리셋의 대상 모델을 바꾸거나, 지원되지 않는 필드를 지우거나, 앞으로 쓸 모델·제공업체를 위해 일부러 둔 설정이라면 경고를 그대로 두는 것입니다. 자세한 내용은 [Presets](/guide/nexus-presets/)에 있습니다.

## GPU 배치에 경고가 있을 때

| 경고 | 뜻 |
|---|---|
| `GPU_FALLBACK_TO_CPU` | 런타임이 계획한 GPU 배치 대신 시스템 메모리를 썼습니다 |
| `GPU_PLACEMENT_VERIFICATION_LIMITED` | 모델은 올라갔지만 Runtime이 실제 GPU 배치를 끝까지 확인하지 못했습니다 |

조치 순서입니다.

1. 하드웨어 정보를 새로 고칩니다.
2. 그 모델의 GPU & Performance를 검토합니다.
3. 계획을 미리 봅니다.
4. 다시 적용하고 검증합니다.
5. 지금 설정이 더 나쁘면 되돌립니다.

CPU-only는 그렇게 쓰려는 의도가 있을 때만 고릅니다.

## Gauge에 자료가 없을 때

- Settings에서 Gauge가 켜져 있는가
- 출처 계정이 연결되어 있고 켜져 있는가
- 보고용 자격 증명이 유효한가
- 새로 고침이 끝났는가
- 고른 기간에 자료가 있는가
- 기대하는 수치를 그 제공업체가 실제로 내놓는가

Gauge는 로컬에서 계정에 닿는지와 제공업체 상태 페이지의 상태를 구별해 보여 줍니다. 둘 중 어느 쪽 문제인지부터 가릅니다.

## 다른 문서에 나오는 문제

Troubleshooting 페이지에는 없지만 각 기능 문서가 다루는 상황입니다.

| 상황 | 문서의 안내 | 자세한 글 |
|---|---|---|
| 지우려는데 `RESOURCE_IN_USE` | 그것을 쓰는 모델, 프리셋, route pack을 먼저 바꾸거나 지웁니다 | [Providers](/guide/nexus-providers/) |
| 요청이 `DATA_PROTECTION_BLOCKED`로 막힘 | Data Protection 정책이 그 종류를 Block으로 처리한 것입니다. 정책이나 허용 규칙을 검토합니다 | [Data Protection](/guide/nexus-data-protection/) |
| Smart Route가 엉뚱한 lane으로 보냄 | 모델을 바꾸기 전에 lane 설명을 다듬습니다 | [Smart Routes](/guide/nexus-smart-routes/) |
| Cluster가 도는데 게이트웨이 경로가 끊김 | 자동 복구를 기다리거나 **Reconnect now**를 씁니다 | [Cluster](/guide/nexus-cluster/) |
| 호스팅 주소로 접속이 안 됨 | 기기가 등록되어 있고, 온라인이고, Fleet에 연결되어 있는지 확인합니다 | [Fleet](/guide/nexus-fleet/) |

## 지원 요청용 자료 모으기

**Settings > Diagnostics**를 씁니다. 여기서 만든 요약은 지원 요청에 붙여도 안전하도록 걸러진 것입니다.

지원 요청에 붙여 넣으면 안 되는 것도 문서에 적혀 있습니다.

- 제공업체 키
- 로컬 Nexus 토큰 값과 토큰 접두어
- 로컬 경로
- 프롬프트와 응답
- 요청 본문 원본
- 제공업체 출력
- 명령줄과 프로세스 ID
- 제공업체 오류 원문

문제가 난 요청을 특정하려면 응답 헤더의 요청 ID(`X-Msty-Nexus-Request-Id`)나 Activity에서 연 사건의 요청 식별자를 함께 알려 주면 됩니다.

## 참고한 문서

- [Nexus 문서: Troubleshooting](https://docs.msty.ai/nexus/troubleshooting)
- [Nexus 문서: Gateway](https://docs.msty.ai/nexus/gateway)
- [Nexus 문서: Activity](https://docs.msty.ai/nexus/activity)
- [Nexus 문서: Settings](https://docs.msty.ai/nexus/settings)
