---
title: Nexus 요금제별 기능 차이
description: Nexus의 Free, Pro, Enterprise에서 무엇이 되고 안 되는지를 요금 페이지의 비교표와 문서의 요금제 표시로 대조하고, 두 자료가 서로 다른 항목을 따로 짚습니다.
date: 2026-10-11
section: Msty Nexus
order: 190
verified: 2026-10-11
tags: [Msty, Nexus, 요금제, Pro, Enterprise]
---

## 이 글의 쓰임

Nexus의 요금제 정보는 두 곳에 흩어져 있습니다. 요금 페이지(nexus.msty.ai/pricing)의 비교표, 그리고 문서 각 페이지에 붙은 Pro·Enterprise 표시와 본문입니다. 이 글은 둘을 한자리에 놓고 봅니다.

가격과 수치는 2026-10-11 확인 기준이며 바뀔 수 있습니다. Msty 제품 전체의 요금은 [요금제 자세히 보기](/guide/pricing/)에 있습니다.

## 가격과 기본 수치

| 항목 | Free | Pro | Enterprise |
|---|---|---|---|
| 가격 | 0달러 | 월 20달러 또는 연 200달러 | 문의 |
| 게이트웨이 요청 수 | 무제한 | 무제한 | 무제한 |
| 관리 기기(managed machines) | 1대 | 3대 | 25대부터 |
| 클라이언트 토큰 | 10개 | 25개 | 25개부터 |
| 운영체제 | macOS, Windows, Linux | macOS, Windows, Linux | macOS, Windows, Linux |

Pro는 Nexus Console에서 구매할 수 있다고 요금 페이지는 안내합니다. 연간 결제는 월 결제 열두 달보다 40달러 적습니다.

## 과금 방식

요금 페이지의 FAQ가 설명하는 셈법입니다.

- **관리 기기**는 모델 추론을 제공하려고 Nexus에 등록한 기기 또는 추론 런타임의 수입니다. 직원의 Mac, Mac Studio, 중앙 서버가 예로 나옵니다.
- **클라이언트 기기는 자동으로 관리 기기로 세지 않습니다.** 중앙 서버의 추론을 받아 쓰기만 하는 노트북은 클라이언트입니다. 그 노트북도 Nexus로 추론을 제공할 때만 관리 기기가 됩니다.
- **사람과 AI 작업을 똑같이 취급합니다.** 클라이언트는 사람, AI 에이전트, 앱, 워크플로, 서비스 어느 것이든 될 수 있습니다.
- **요금제 용량은 등록된 관리 기기 수를 기준으로 합니다.**
- **토큰 수나 게이트웨이 요청 수로 과금하지 않습니다.** 많이 써도 요청당 요금이나 초과 요금이 생기지 않습니다.
- **온프레미스도 같은 방식입니다.** 용량 제한을 로컬에서 적용할 수 있어, 사용량 정보를 Msty로 보내지 않고도 비공개·폐쇄망 환경을 지원한다고 적혀 있습니다.

## 요금 페이지의 기능 비교표

| 기능 | Free | Pro | Enterprise |
|---|---|---|---|
| AWS Bedrock & Azure AI providers | 없음 | 포함 | 포함 |
| Desktop Console | 포함 | 포함 | 포함 |
| Cloud console | 없음 | 포함 | 포함 |
| Teams / RBAC | 없음 | 없음 | 포함 |
| Team / User rate limit | 없음 | 없음 | 포함 |
| Single Sign-On (SSO) | 없음 | 없음 | 포함 |
| MDM deployment & AI governance | 없음 | 없음 | 포함 |
| Data Protection | 포함 | 포함 | 포함 |
| Guardrails | 없음 | Local policies | Organization-wide policies |
| Smart Routes | 3 | 포함 | 포함 |
| Load Balancer | 없음 | 포함 | 포함 |
| MCP tools gateway | 없음 | 없음 | 포함 |
| Cluster | 없음 | 없음 | 포함 |
| Fallbacks | 없음 | 포함 | 포함 |
| Basic logging | 포함 | 포함 | 포함 |
| Team/User logging | 없음 | 없음 | 포함 |
| Priority Support | 없음 | 없음 | 포함 |

요금제 카드에는 표에 없는 문구도 있습니다. Pro 카드는 "PII detection, key blocking, additional guardrails, and basic logging"을, Enterprise 카드는 "air-gapped support"를 적었습니다.

## 문서에 적힌 요금제 조건

문서 쪽에서 요금제를 언급한 대목만 모았습니다.

| 기능 | 문서의 설명 | 출처 |
|---|---|---|
| Fleet 기기 수 | Free는 현재 로컬 컴퓨터, Pro는 관리 기기 3대, Enterprise는 조직에 배정된 한도 | Fleet |
| Access from anywhere | Free는 켤 수 없음. Pro는 관리 기기당 원격 엔드포인트 하나가 기본. Enterprise는 조직에 배정된 한도 | Fleet |
| Smart Routes | Free는 활성 route 2개, Pro는 무제한, Enterprise는 배정된 한도 | Smart Routes |
| Smart Balancer | Pro, Enterprise 표시 | Smart Balancer |
| Cluster | Enterprise 표시. 모든 참여 node에 명시적으로 부여된 Enterprise Cluster 자격이 필요 | Cluster |
| Data Protection | Enterprise 표시. 명시적으로 부여된 Enterprise 자격이 필요 | Data Protection |
| Teams | Enterprise 표시 | Teams |
| Admin 토큰 | Free는 만들 수 없음 | Client Tokens |
| 웹 Console | "지원되는 요금제에서" 웹으로 제공. 변경 기록은 Pro 이상이라고 명시 | Overview, 변경 기록 |

## 두 자료가 서로 다른 항목

대조하면 맞지 않는 곳이 세 군데 있습니다. 어느 쪽이 지금 제품과 맞는지는 공개된 자료만으로 판단할 수 없으므로, 양쪽을 그대로 적습니다.

### Data Protection

| 자료 | 내용 |
|---|---|
| 요금 페이지 비교표 | Free, Pro, Enterprise 모두 포함 표시 |
| 요금 페이지 Pro 카드 | PII detection, key blocking 포함 |
| 문서 (Data Protection 페이지, 사이드바) | Enterprise 표시. "명시적으로 부여된 Enterprise 자격이 필요" |

민감 정보 가림이 도입 이유라면 이 차이는 요금제 선택을 좌우합니다. 실제 앱에서 **Data Protection**을 켤 수 있는지 확인하거나 Msty에 문의하는 것이 확실합니다.

### Free의 Smart Routes 개수

| 자료 | 내용 |
|---|---|
| 요금 페이지 비교표 | 3 |
| 문서 (Smart Routes 페이지) | 활성 route 2개. 세 번째를 만들거나 켜려 하면 Runtime API 단계에서 막음 |

### Fallbacks

요금 페이지 비교표는 Fallbacks를 Free에는 없고 Pro부터 있는 것으로 표시합니다. 그런데 문서는 Free에서도 쓸 수 있는 Smart Route에 fallback 대상이 기본 구성 요소라고 설명합니다. 비교표의 "Fallbacks"가 정확히 무엇을 가리키는지는 요금 페이지에 설명이 없습니다.

## 사이트에는 있고 문서에는 없는 기능

Nexus 사이트와 0.6.0 변경 기록(2026-09-21)이 소개하지만, 확인 당시 문서 사이트에 전용 페이지가 없는 기능입니다. 사용법은 공식 문서에는 설명이 없습니다.

| 기능 | 사이트·변경 기록의 설명 | 요금 비교표 |
|---|---|---|
| MCP tools gateway | 도구 연동을 Nexus에 연결해, 클라이언트가 Nexus를 통해 도구를 찾고 부릅니다. 토큰별 도구 권한, 승인 설정, 활동 기록이 있습니다 | Enterprise |
| AWS Bedrock, Azure AI 제공업체 | 두 제공업체가 추가되었고, 그 모델의 사고 설정을 지원합니다 | Pro, Enterprise |
| 벤치마크 | 모델, 프리셋, cluster, load balancer, Smart Route에 대해 실행할 수 있습니다 | 표에 없음 |
| Lobby walls | 통계와 사용량을 별도 페이지로 원격 표시합니다 | 표에 없음 |
| Apple Foundation Models | macOS 26과 macOS 27에서 기본 지원합니다 | 표에 없음 |

## 요금제 고르는 기준

문서와 요금 페이지에 적힌 조건만으로 정리하면 이렇습니다.

| 상황 | 필요한 요금제 |
|---|---|
| 한 컴퓨터에서 로컬 게이트웨이를 쓰고, 앱 몇 개에 토큰을 나눠 줌 | Free |
| 기기를 두세 대 묶어 Smart Balancer로 부하를 나눔 | Pro |
| 사설망 밖에서 호스팅 주소로 접속(Access from anywhere) | Pro 이상 |
| 웹 Console로 관리 | Pro 이상 |
| 팀별 기기 접근, SSO, 팀·사용자 단위 한도와 로그 | Enterprise |
| Mac 여러 대로 모델 하나를 나눠 실행(Cluster) | Enterprise |
| 기기 4대 이상 관리 | 요금 페이지 기준으로는 Enterprise. Pro는 3대입니다 |

## 요금제를 내릴 때

Smart Routes 문서는 한도가 낮은 요금제로 옮길 때의 동작을 적었습니다. 한도를 넘는 route의 설정은 보관되지만 실행되지 않습니다. route, 자격 증명, 모델, 사용 기록은 지워지지 않습니다.

Smart Balancer 풀, 원격 엔드포인트, 추가 관리 기기가 요금제를 내릴 때 어떻게 되는지는 공식 문서에는 설명이 없습니다. 변경 기록은 반대 방향만 언급합니다. Pro로 올리면 이미 연결해 둔 기기에 자동으로 적용된다는 내용입니다.

## 참고한 문서

- [Msty Nexus 요금](https://nexus.msty.ai/pricing)
- [Msty Nexus](https://nexus.msty.ai)
- [Msty Nexus 변경 기록](https://nexus.msty.ai/changelog/)
- [Nexus 문서: Fleet](https://docs.msty.ai/nexus/fleet)
- [Nexus 문서: Smart Routes](https://docs.msty.ai/nexus/smart-routes)
- [Nexus 문서: Smart Balancer](https://docs.msty.ai/nexus/smart-balancer)
- [Nexus 문서: Cluster](https://docs.msty.ai/nexus/cluster)
- [Nexus 문서: Data Protection](https://docs.msty.ai/nexus/data-protection)
- [Nexus 문서: Teams](https://docs.msty.ai/nexus/teams)
- [Nexus 문서: Client Tokens](https://docs.msty.ai/nexus/client-tokens)
