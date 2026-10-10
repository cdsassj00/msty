---
title: Real-Time Data — 웹 검색 결과를 대화에 넣기
description: 최신 정보를 검색해 모델에 넘겨주는 Real-Time Data의 동작 원리, 검색 제공자별 차이, 고급 옵션과 문제 해결 방법입니다.
date: 2026-10-11
section: 도구와 부가 기능
order: 60
verified: 2026-10-11
tags: [Msty, Real-Time Data, 웹 검색]
---

## Real-Time Data가 하는 일

모델은 학습이 끝난 시점 이후의 일을 모릅니다. 오늘 날씨, 어제 경기 결과, 이번 주 뉴스는 답하지 못하거나 틀리게 답합니다. **Real-Time Data**(줄여서 RTD)는 대화에 최신 정보를 넣어 주는 기능입니다.

동작 방식은 다음과 같습니다.

1. 모델이 아니라 **검색 엔진**이 인터넷에서 정보를 가져옵니다.
2. Msty Studio가 검색 결과를 맥락으로 모델에 넘깁니다.
3. 모델이 그 맥락을 읽고 답합니다.

즉 모델이 인터넷에 접속하는 것이 아니라, Msty가 검색해서 가져온 결과를 모델이 읽는 구조입니다. 로컬 모델을 쓰더라도 RTD를 켜면 검색어는 검색 서비스로 전송됩니다.

## 쓸 수 있는 환경

RTD는 **Msty Studio Desktop**에 내장되어 있습니다. Studio Web은 자체적으로 RTD를 쓸 수 없으며, Remote Connections 또는 Msty Sidecar로 Desktop에 연결해야 쓸 수 있습니다.

## 켜는 방법

채팅 입력란 안의 **지구본 아이콘**을 누릅니다.

공식 문서는 두 가지를 덧붙입니다.

- 실시간 정보나 현재 날짜와 관련된 질문은 모델에 따라 처리 능력이 다릅니다.
- 프롬프트에 날짜 범위나 정확한 날짜를 적어 줘야 할 수 있습니다.

지구본 아이콘을 **오른쪽 클릭**하면 검색 제공자 선택을 포함한 고급 옵션이 열립니다.

## 검색 제공자

### 모든 사용자가 쓸 수 있는 것

| 제공자 | 특징 |
|---|---|
| **Google** | 맞춤 검색 옵션을 제공합니다 |
| **Brave** | 검색 옵션을 제공합니다 |

두 제공자 모두 요청이 잦거나 범위가 넓으면 Google이나 Brave 쪽에서 요청을 제한하거나, 속도를 늦추거나, 차단할 수 있습니다. 이 제한은 Msty Studio가 통제할 수 없습니다.

### Aurum Perk 표시가 붙은 것

공식 문서에서 다음 제공자에는 **Aurum Perk** 표시가 붙어 있습니다.

| 제공자 | 필요한 것 | 특징과 제약 |
|---|---|---|
| **Jina** | Jina 계정과 API 키. **Use Jina** 탭에 입력 | 질문의 뜻을 이해하는 의미 검색. 웹 내용 추출에 유용. **Maximum Results**로 가져올 결과 수 조절 |
| **SearXNG** | 내 SearXNG 인스턴스 주소. **Use SearXNG** 탭에 입력 (예: `https://searxng.example.com/`) | 여러 검색 엔진의 결과를 모으는 무료 메타 검색 엔진. 사용자를 추적하지 않음 |
| **Tavily** | 무료 계정으로 발급받는 API 키. **Use Tavily** 탭에 입력 | 사용자를 추적하지 않는 검색 엔진. 세부 옵션이 많음 |
| **Exa** | 무료 계정으로 발급받는 API 키. **Use Exa** 탭에 입력 | 사용자를 추적하지 않는 검색 엔진 |
| **Ollama** | Ollama 계정과 API 키 | 웹의 CORS 제한 때문에 **Desktop 전용** |
| **Google API** | 내 Google Custom Search Engine의 API 키와 CSE ID. **Use Google API** 탭에 입력 | 더 안정적인 결과 |
| **Brave API** | 내 Brave Search API 키. **Use Brave API** 탭에 입력 | 더 안정적인 결과. Brave 쪽 CORS 제한 때문에 **Desktop 전용** |

SearXNG는 직접 운영하는 서버에 설치해 쓰는 검색 엔진입니다. 검색어를 외부 검색 회사에 직접 넘기지 않으려는 조직에서 고려할 만합니다.

### Tavily의 세부 옵션

| 옵션 | 선택지 |
|---|---|
| **Search Topic** | **General**(기본값, 폭넓은 결과), **News**(시사와 보도), **Finance**(금융 시장과 경제 뉴스) |
| **Search Depth** | **Basic**(기본값, 개략적인 정보), **Advanced**(더 많은 내용과 깊은 맥락) |
| **Limit Domain** | 결과를 특정 사이트나 도메인으로 한정합니다 |
| **Custom Search Query** | 검색어를 직접 입력합니다. 공식 문서는 비워 두어 모델이 자연어에서 검색어를 만들게 하기를 권합니다 |
| **Time Range** | 결과를 특정 기간으로 한정합니다 |

### Google API 키 준비 순서

1. Google Cloud Console로 갑니다.
2. 새 프로젝트를 만들거나 기존 프로젝트를 고릅니다.
3. 프로젝트에서 Custom Search API를 사용 설정합니다.
4. API 키 인증 정보를 만듭니다.
5. Custom Search Engine을 설정하고 CSE ID를 받습니다.

### Brave API 키 준비 순서

1. Brave Search API 페이지로 갑니다.
2. API 키를 신청합니다.
3. 필요에 맞는 요금제를 고릅니다.
4. 키를 **Use Brave API** 탭에 입력합니다.

각 서비스의 요금은 공식 문서에 설명이 없습니다. 해당 서비스의 안내를 확인합니다.

## 고급 옵션과 지원하는 제공자

| 옵션 | 지원하는 제공자 |
|---|---|
| **Maximum Results** | Jina, Tavily, Exa, Google, Brave |
| **Custom Search Query** | Tavily, Exa, Google, Brave |
| **Limit Domain** | Tavily, Exa, Google, Brave |
| **Time Range / Search Date Range** | Tavily, Exa, Google |
| **Search Operators / Filters** | Google, Brave |

**Limit Domain**은 업무에서 쓸모가 큽니다. 법령 정보 사이트나 소속 기관 누리집처럼 믿을 수 있는 출처로만 검색을 한정할 수 있습니다.

## 기본 제공자 정하기

**Settings > General > Add-ons Defaults**에서 기본 RTD 제공자와 옵션을 정합니다. 이 기본값은 새로 만드는 모든 대화에 적용되며, 특정 대화에서 따로 바꿀 수 있습니다.

## Pull 모드

제공자를 Pull 모드로 두면 대화 중에 **모델이 언제 RTD를 호출할지 스스로 결정**합니다. 데이터를 가져올 시점을 모델에 맡기고 싶을 때 씁니다.

## HTTP 주소의 인스턴스를 쓸 때

Studio는 JSON API를 사용하므로, 연결하려는 인스턴스는 대체로 **HTTPS**로 제공되어야 합니다. 일부 브라우저는 특정 사이트에 한해 안전하지 않은(HTTP) 콘텐츠를 허용하는 설정을 제공합니다. 공식 문서는 Brave 브라우저의 `brave://settings/content/insecureContent` 설정에서 Msty Studio를 허용하는 방법을 예로 듭니다.

## 문제 해결

### 검색 결과가 없거나 엉뚱할 때

- **Model Parameters** 아이콘에서 모델의 컨텍스트 창을 늘립니다.
- 다른 검색 엔진으로 바꿔 봅니다. 잦거나 넓은 요청을 제한하는 엔진이 있습니다.
- VPN을 끕니다. VPN이 결과에 영향을 줄 수 있습니다.
- 더 안정적인 결과를 원하면 Jina나 SearXNG를 써 봅니다.
- Sidecar를 쓰고 있다면 Studio가 연결되어 있는지 확인합니다.

### 모델이 검색 결과를 제대로 활용하지 못할 때

- 가능하면 컨텍스트 창을 늘립니다. 컨텍스트 창은 모델이 한 번에 고려할 수 있는 정보의 양을 정합니다.
- 그 모델이 실시간 데이터를 다룰 수 있는지 확인합니다. 이에 맞게 만들어지지 않은 모델도 있습니다.
- 원하는 정보를 프롬프트에 더 구체적으로 적습니다.

## 공식 문서가 권하는 사용법

- 최신 정보나 사실 확인이 필요하다는 점이 드러나도록 분명하고 구체적으로 묻습니다.
- RTD를 켰는데 **출처가 표시되지 않으면 조심합니다.** 모델이 지어낸 답일 수 있습니다.
- 검색이 이루어진다는 점을 시스템 프롬프트에 적어 두면 결과가 더 일관될 수 있습니다.
- 검색 결과가 0건이면 자신 있게 틀린 답을 하는 대신 오류나 대체 안내를 돌려주도록 모델에 지시해 둡니다.

## 함께 읽을 글

- [Live Contexts: API 데이터를 대화에 넣기](/guide/toolbox-live-contexts/)
- [Attachments](/guide/addon-attachments/)
- [Turnstiles](/guide/addon-turnstiles/)

## 참고한 문서

- [Real-Time Data](https://docs.msty.ai/studio/add-ons/real-time-data)
