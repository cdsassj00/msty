---
title: Msty Nexus 자세히 보기
description: 여러 AI 앱의 모델 접근, API 키, 경로, 사용량을 한곳에서 관리하는 Msty Nexus의 구조와 기능, 설정 순서, 보안 방식을 공식 사이트와 문서 기준으로 정리합니다.
date: 2026-10-11
section: Msty 제품과 요금
order: 30
verified: 2026-10-11
tags: [Msty, Nexus, 게이트웨이]
---

## Nexus는 무엇인가

Msty Nexus는 AI 앱과 모델 사이에 놓이는 게이트웨이입니다. 공식 사이트는 "AI control center"라고 부릅니다. 앱이 모델에 직접 붙는 대신 Nexus를 거치게 하고, 관리자는 Nexus에서 다음을 정합니다.

- 모델을 어디서 실행할지 (로컬 또는 온라인)
- 어떤 자격 증명(API 키)을 쓸지
- 요청을 어느 모델로 보낼지
- 조직이 무엇을 볼 수 있는지 (사용량, 활동 기록)

Nexus는 nexus.msty.ai라는 별도 사이트에서 소개하며, 요금 페이지도 따로 있습니다.

## 어떤 문제를 푸는가

사이트는 세 가지를 내세웁니다.

| 항목 | 설명 |
|---|---|
| Control AI access | 앱, 제공업체, 키, 모델 접근을 한곳에서 승인합니다. 부서마다 제각각 AI 도구를 쓰는 상황을 줄입니다 |
| Leverage local AI | 민감한 데이터는 로컬 인프라에 두고, 필요할 때 온라인 모델을 씁니다 |
| Add guardrails | 범위가 정해진 토큰, PII(개인식별정보) 가림, 키 차단, 경로 규칙을 요청이 모델에 닿기 전에 적용합니다 |

업무 예를 들면 이렇습니다. 사내에 챗 앱, 코딩 도구, 자동화 스크립트가 각각 OpenAI 키를 하나씩 들고 있다고 합시다. 키가 여러 곳에 복사되어 있으면 누가 얼마나 쓰는지 알기 어렵고, 한 사람이 퇴사하면 키를 모두 바꿔야 합니다. Nexus를 두면 키는 Nexus 안에만 있고, 각 앱은 Nexus가 발급한 토큰만 가집니다. 앱 하나를 막으려면 그 앱의 토큰만 폐기하면 됩니다.

## 작동 순서

사이트가 설명하는 네 단계입니다.

1. **모델과 MCP 도구 연결**: 로컬 엔진, 온라인 제공업체, MCP 서버를 한 게이트웨이에 모읍니다.
2. **프리셋, 경로, 가드레일 설정**: 모델 설정을 표준화하고 Data Protection, PII 가림, 키 차단, 경로 규칙을 적용합니다.
3. **앱별 접근 범위 지정**: 앱마다 토큰을 따로 발급하고, 쓸 수 있는 모델과 MCP 도구를 제한합니다. 도구 호출에는 허용, 확인 요청, 차단 정책을 둡니다.
4. **전달, 보호, 관찰**: 요청을 전달하고, 보호 규칙을 적용하고, 모델과 도구 활동을 기록합니다. 이때 제공업체 자격 증명은 앱에 노출되지 않습니다.

## 기능 목록

사이트의 기능 목록 열 가지입니다.

| 기능 | 설명 |
|---|---|
| Model gateway | 로컬과 온라인 제공업체를 아우르는 모델 목록. AWS Bedrock, Azure AI 포함 |
| MCP tools gateway | 승인된 앱이 범위가 정해진 권한, 승인, 활동 기록과 함께 도구를 찾고 호출 |
| Credential control | 제공업체 자격 증명을 한곳에 보관 |
| Compatible endpoints | OpenAI 호환, Anthropic 호환 엔드포인트 제공 |
| Runtime control | Ollama, llama.cpp, MLX 엔진을 온라인 접근과 함께 관리 |
| App tokens | 공용 마스터 키 대신 앱별 토큰 |
| Usage visibility | 앱별, 제공업체별 요청 수, 지연 시간, 사용량 |
| Model testing and benchmarks | 모델, 프리셋, 경로와 대화해 보고 실제 투입 전에 벤치마크 |
| Connection approvals | 새 모델·제공업체 연결을 앱이 쓰기 전에 검토 |
| Network boundary | 게이트웨이는 기본적으로 LAN에 열리지 않으며, 사용자가 선택할 때만 엽니다 |

고급 기능으로는 요청마다 알맞은 모델로 보내는 **Smart Routes**, 여러 엔진과 기기에 요청을 나누는 **Smart Balancer**, 여러 기기를 하나의 용량처럼 묶는 **Cluster**가 있습니다. Nexus 문서는 Cluster를 Apple Silicon Mac을 묶어 MLX 작업을 분산 실행하는 기능으로 설명합니다.

확인 당시 사이트에 표시된 버전은 Nexus 0.6.0이었고, MCP tools gateway, 모델 대화, 벤치마크, AWS Bedrock과 Azure 제공업체가 추가되었다고 안내하고 있었습니다.

## 구조

Nexus 문서는 구성 요소를 네 가지로 나눕니다.

| 구성 요소 | 역할 |
|---|---|
| Nexus Runtime | 관리 대상 기기마다 실행됩니다. 인증된 게이트웨이를 제공하고, 로컬 엔진을 띄우고, 제공업체 자격 증명을 보호합니다 |
| Nexus Console | 기기, 모델, 경로, 접근, 사용량, 팀 정책을 관리하는 화면. 데스크톱 앱에 들어 있고, 지원되는 요금제에서는 웹에서도 씁니다 |
| Desktop app | 로컬 Runtime을 시작하고, 메뉴 막대나 시스템 트레이에서 상태를 보여 주고, Console을 엽니다 |
| Client tokens | 연결되는 AI 도구가 Runtime에 인증할 때 쓰는 범위가 정해진 토큰 |

Console의 메뉴는 **Workspace**(Overview, Fleet), **Serving**(Smart Routes, Smart Balancer, Cluster, Chat Lab), **Library**(Providers, Models, Presets, Local Runtimes, Data Protection), **Observe**(Usage, Gauge, Activity), **Administer**(Teams, Client Tokens, Settings)로 나뉩니다.

## 설치 파일

| 운영체제 | 파일 형식 |
|---|---|
| macOS | Universal dmg |
| Windows x64 | exe |
| Linux (x86_64) | AppImage |
| Linux (Debian/Ubuntu amd64) | deb |

웹 Console은 사이트의 **Open web app** 버튼으로 엽니다.

## 처음 설정하는 순서

Nexus 문서의 Setup 항목이 권하는 순서입니다.

1. Msty Nexus를 엽니다.
2. Runtime에 연결되는지 확인합니다. 오프라인이나 인증 안 됨으로 나오면 **Repair connection**을 씁니다.
3. 로컬 엔진과 클라우드 제공업체 가운데 시작할 경로를 고릅니다.
   - 로컬: **Providers**에서 **Find Local Runtimes**로 이미 실행 중인 엔진을 찾거나, 카드에서 Ollama, llama.cpp, MLX, CLI Proxy를 설치합니다. 그다음 **Models**에서 모델을 동기화하거나 받습니다.
   - 클라우드: **Providers**에서 OpenAI, Anthropic, OpenRouter 또는 호환 엔드포인트를 추가하고, 키를 한 번 붙여 넣고, 저장한 뒤 **Test**를 실행합니다.
4. **Models**에 모델이 보이는지, **Health & Memory**에 문제가 없는지 확인합니다.
5. **Client Tokens**에서 토큰을 만듭니다. 토큰 원문은 한 번만 표시되므로 바로 안전한 곳에 저장합니다.
6. 게이트웨이를 시험합니다. 기본 주소는 `http://127.0.0.1:3939`이며, `/v1/models`와 `/v1/chat/completions`를 토큰과 함께 호출합니다.
7. 다른 기기나 브라우저에서 접근해야 할 때만 **Settings > Network Access**에서 네트워크와 CORS를 설정합니다.

앱에서는 이 토큰을 OpenAI 호환 또는 Anthropic 호환 클라이언트의 API 키 자리에 넣습니다.

## 보안 방식

Nexus 문서의 Security 항목에서 중요한 점만 추렸습니다.

- **토큰**: `/v1/*` 엔드포인트는 모두 Nexus 토큰이 필요합니다. 토큰은 Nexus까지만 쓰이고 온라인 제공업체나 로컬 엔진으로 전달되지 않습니다. 저장은 해시로 합니다.
- **제공업체 키**: 쓰기 전용입니다. 한 번 넣으면 Nexus는 "설정됨" 여부만 돌려줍니다. 키는 앱 상태, 로그, 진단 보고서에 나오지 않습니다.
- **네트워크**: 기본은 로컬 전용입니다. LAN 공개는 Runtime 재시작이 필요하고, CORS 설정만으로는 LAN에 공개되지 않습니다. LAN에 공개해도 토큰 인증은 그대로입니다.
- **진단 기록**: 프롬프트, 응답, 요청 본문, 키, 로컬 경로는 진단에 넣지 않습니다.
- **Access From Anywhere**: 등록된 기기로 가는 HTTPS 경로를 만들어 줍니다. 문서는 이 경우 요청과 응답이 Msty가 운영하는 중계 서버를 지난다고 밝히며, 그 경로가 허용되지 않는 업무라면 사설 네트워크나 VPN을 쓰라고 권합니다.

문서의 권장 기준은 앱마다 토큰을 따로 만들고, 앱을 없앨 때 토큰을 폐기하고, 브라우저 출처는 `*` 대신 특정 주소만 허용하는 것입니다.

## 요금

2026-10-11 확인 기준이며 바뀔 수 있습니다.

| 요금제 | 가격 | 관리 기기 | 클라이언트 토큰 |
|---|---|---|---|
| Free | 0달러 | 1대 | 10개 |
| Pro | 월 20달러 또는 연 200달러 | 3대 | 25개 |
| Enterprise | 문의 | 25대부터 | 25개부터 |

세 요금제 모두 게이트웨이 요청 수는 무제한이고, 토큰당·요청당 과금은 없습니다. 포함 항목과 "관리 기기"의 뜻은 [요금제 자세히 보기](/guide/pricing/)에서 설명합니다.

## 알아 둘 한계

- Nexus 문서 사이드바에는 Smart Balancer에 Pro, Cluster·Data Protection·Teams에 Enterprise 표시가 붙어 있습니다. 요금제에 따라 쓸 수 없는 메뉴가 있습니다.
- 사이트와 문서에는 최소 하드웨어 사양이나 지원 운영체제 버전이 적혀 있지 않습니다.
- Cluster는 Apple Silicon Mac을 대상으로 설명되어 있습니다.

## 참고한 문서

- [Msty Nexus](https://nexus.msty.ai)
- [Msty Nexus 요금](https://nexus.msty.ai/pricing)
- [Nexus 문서: Overview](https://docs.msty.ai/nexus)
- [Nexus 문서: Setup](https://docs.msty.ai/nexus/setup)
- [Nexus 문서: Security](https://docs.msty.ai/nexus/security)
