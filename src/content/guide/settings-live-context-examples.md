---
title: Live Context 예제 모음
description: 외부 주소에서 실시간 데이터를 가져와 대화에 넣는 Live Contexts의 추가 방법과, 공식 문서가 예로 든 서른세 개의 공개 주소를 쓰임새별로 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 160
verified: 2026-10-11
tags: [Msty, Studio, Live Contexts, 도구]
---

## Live Context란

모델은 학습이 끝난 시점까지만 압니다. 오늘 날씨, 지금 환율, 방금 올라온 보안 공지는 알지 못합니다. Live Contexts는 외부 주소(API)를 호출해 받은 데이터를 대화에 넣어 주는 기능입니다.

공식 문서는 요청 방식을 두 가지로 설명합니다.

- 정해진 주소에서 데이터를 가져오는 단순한 GET 요청
- 대화 내용에 따라 모델이 변수와 매개변수를 채워 넣는 동적 요청

예를 들어 환율 주소를 Live Context로 등록해 두면 "오늘 달러 기준으로 이 견적을 원화로 바꿔 줘"라는 질문에 모델이 실제 환율 값을 보고 답합니다.

## 요금제 조건

Live Contexts 문서 항목에는 요금제 조건이 적혀 있지 않습니다. 요금 페이지의 비교표는 "Toolbox - Live Contexts"를 Free에서 미제공, Aurum과 Teams에서 제공으로 표시합니다. [요금제 자세히 보기](/guide/pricing/)를 보세요.

## Live Context 추가하기

위치는 **Toolbox > Live Contexts**입니다.

1. **Add New Live Context**를 누릅니다.
2. **HTTP Method**를 고릅니다. GET 또는 POST입니다.
3. **URL Endpoint**를 넣습니다. 중괄호로 변수를 넣을 수 있고, 모델이 그 값을 채웁니다.
4. 필요하면 **Prompt**를 고칩니다. 프롬프트는 메시지를 보낼 때 더할 수도 있습니다.
5. 필요하면 **Request Headers**를 더합니다. 인증 헤더가 그 예입니다. 여기에도 변수를 쓸 수 있습니다.
6. **Live Context Mode**를 정합니다.
7. 필요하면 **Request Body**를 더합니다. JSON이 그 예이며 변수를 쓸 수 있습니다.
8. **Processing Function**을 정합니다. 기본값은 응답을 문자열로 돌려주는 것이며, 문서는 대부분 그대로 두라고 합니다.
9. **Test Connection**을 눌러 시험합니다. 필요하면 시험용 변수를 넣습니다.
10. 필요하면 **Notes**를 적습니다. 메모는 모델이 볼 수 있어서, 이 Live Context를 어떻게 쓸지 안내하는 데 쓸 수 있습니다.
11. 겹치지 않는 **Name**을 넣습니다.
12. **Add**를 눌러 저장합니다.

### Push와 Pull

| 모드 | 동작 | 맞는 경우 |
|---|---|---|
| **Push** (기본값) | 대화에 포함하면 데이터를 자동으로 모델에 보냅니다 | 주소가 고정된 단순 조회 |
| **Pull** | 모델이 대화 중에 필요하다고 판단할 때 호출합니다 | 주소나 헤더에 모델이 채워야 할 변수가 있을 때 |

Pull 모드는 도구를 호출할 수 있는 모델이어야 제대로 작동합니다.

### 대화에서 쓰기

대화 화면에서 **Toolset** 아이콘을 누르고 넣을 Live Context를 고릅니다. 한 대화에 여러 개를 넣을 수 있습니다.

## 예제 주소를 쓰기 전에

공식 문서의 Live Context Examples 항목은 예제 주소 서른세 개를 나열합니다. 문서가 밝힌 주의 사항은 다음과 같습니다.

- 이 주소들은 제3자가 운영합니다. Msty가 관리하지 않습니다.
- 정확성, 가용성, 신뢰성을 보장하지 않습니다.
- 추가할 예제는 문서 저장소에 풀 리퀘스트로 제안할 수 있습니다.

문서에는 주소만 나와 있고 요청 방식, 헤더, 응답 형식 설명은 없습니다. 대부분 주소를 그대로 넣고 GET으로 호출하면 되는 형태입니다. 다만 문서가 쓰인 뒤 운영이 중단되었거나 접근 조건이 바뀐 주소가 있을 수 있으므로, 등록할 때 **Test Connection**으로 반드시 확인하세요.

## 예제 주소: 업무에 쓸 만한 것

| 이름 | 주소 | 쓰임새 |
|---|---|---|
| Clock | `https://worldtimeapi.org/api/ip` | 현재 시각과 시간대 |
| USD Exchange Rates | `https://open.er-api.com/v6/latest/USD` | 달러 기준 환율 |
| Current Weather | `https://wttr.in/?format=j1` | 현재 날씨 |
| IP Address | `https://api.ipify.org/` | 내 공인 IP 주소 |
| Network Diagnostics | `https://www.cloudflare.com/cdn-cgi/trace` | 네트워크 연결 정보 |
| CISA Known Exploited Vulnerabilities | `https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json` | 실제 악용이 확인된 취약점 목록 |

## 예제 주소: 재난과 자연 현상

| 이름 | 주소 | 쓰임새 |
|---|---|---|
| Earthquakes | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson` | 지난 하루의 지진 |
| Current Natural Events | `https://eonet.gsfc.nasa.gov/api/v3/events` | 진행 중인 자연 현상 |
| US Weather Alerts | `https://api.weather.gov/alerts/active` | 미국 기상 특보 |
| COVID Global Status | `https://disease.sh/v3/covid-19/all` | 코로나19 세계 현황 |
| Current Mars Weather | `https://api.maas2.apollorion.com/` | 화성 날씨 |
| GPS (ISS Now) | `http://api.open-notify.org/iss-now.json` | 국제우주정거장의 현재 위치 |

## 예제 주소: 금융과 통계

| 이름 | 주소 | 쓰임새 |
|---|---|---|
| NASDAQ Listings | `https://www.nasdaqtrader.com/dynamic/SymDir/nasdaqlisted.txt` | 나스닥 상장 종목 목록 |
| Not NASDAQ Listings | `https://www.nasdaqtrader.com/dynamic/SymDir/otherlisted.txt` | 그 밖의 미국 거래소 상장 종목 |
| Top Crypto | `https://api.coinlore.net/api/tickers/` | 주요 암호화폐 시세 |
| Crypto Fear / Greed Index | `https://api.alternative.me/fng/` | 암호화폐 공포·탐욕 지수 |
| World Bank Country Data | `https://api.worldbank.org/v2/country/all?format=json` | 세계은행 국가 정보 |
| World Bank Indicators | `https://api.worldbank.org/v2/indicator/SP.POP.TOTL?format=json` | 세계은행 인구 지표 |

이 데이터는 참고용입니다. 투자 판단의 근거로 삼기에는 문서 스스로 정확성을 보장하지 않는다고 밝힌 주소들입니다.

## 예제 주소: 개발자용

| 이름 | 주소 | 쓰임새 |
|---|---|---|
| Latest GitHub Events | `https://api.github.com/events` | GitHub 공개 활동 |
| Latest NPM Package Metadata Events | `https://registry.npmjs.org/react/latest` | NPM 패키지(react)의 최신 정보 |
| Latest PyPI Package Metadata Events | `https://pypi.org/pypi/requests/json` | PyPI 패키지(requests)의 정보 |
| Latest Stack Overflow Posts | `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&pagesize=10` | Stack Overflow 최근 질문 |
| Latest Reddit Posts | `https://www.reddit.com/r/news/new.json?limit=25` | Reddit 뉴스 게시판의 새 글 |
| HTTP Echo / Request Info | `https://httpbin.org/get` | 내가 보낸 요청을 그대로 돌려줌. 헤더 시험용 |
| Dummy JSON Data | `https://jsonplaceholder.typicode.com/posts` | 연습용 가짜 데이터 |
| Generate UUID | `https://www.uuidtools.com/api/generate/v4/count/1` | UUID 하나 생성 |
| Food Facts | `https://world.openfoodfacts.org/api/v0/product/737628064502.json` | 식품 정보(바코드 하나의 예) |

NPM과 PyPI 주소는 패키지 이름 부분을 바꾸면 다른 패키지를 볼 수 있습니다. 이런 자리를 변수로 바꾸고 Pull 모드로 두면 모델이 대화에 나온 패키지 이름을 채워 호출하게 할 수 있습니다.

## 예제 주소: 연습과 재미

| 이름 | 주소 |
|---|---|
| Random Fact | `https://uselessfacts.jsph.pl/api/v2/facts/random` |
| Random Joke | `https://official-joke-api.appspot.com/random_joke` |
| Random Chuck Norris Fact | `https://api.chucknorris.io/jokes/random` |
| Random Number | `https://www.randomnumberapi.com/api/v1.0/random` |
| Random Person (JSON) | `https://randomuser.me/api/` |
| Random Word | `https://random-word-api.herokuapp.com/word` |

기능을 익힐 때는 이런 주소가 좋습니다. 응답이 짧아서 모델이 데이터를 받았는지 바로 알 수 있습니다.

## 처음 해 보기: 환율 넣기

1. **Toolbox > Live Contexts**에서 **Add New Live Context**를 누릅니다.
2. **HTTP Method**는 GET으로 둡니다.
3. **URL Endpoint**에 `https://open.er-api.com/v6/latest/USD`를 넣습니다.
4. **Live Context Mode**는 Push로 둡니다.
5. **Test Connection**으로 응답이 오는지 봅니다.
6. **Notes**에 "달러 기준 환율 데이터"라고 적습니다.
7. **Name**을 정하고 **Add**를 누릅니다.
8. 새 대화에서 **Toolset** 아이콘을 눌러 이 Live Context를 고릅니다.
9. "1,250달러는 원화로 얼마인가"처럼 묻습니다.

모델의 답에 나온 환율이 응답 데이터의 값과 같은지 한 번 확인하세요. 모델이 데이터를 무시하고 기억에 있는 숫자로 답하는 일이 있습니다.

## 쓸 때의 주의점

- **응답이 큰 주소는 맥락을 많이 차지합니다.** 상장 종목 목록이나 취약점 목록은 매우 깁니다. Push 모드로 넣으면 대화마다 그 전체가 모델에 들어가 느려지고, 온라인 모델이라면 비용이 늘어납니다. 큰 데이터는 Pull 모드가 낫습니다.
- **외부 호출은 흔적을 남깁니다.** 주소를 호출하면 그 서버는 내 IP 주소를 알게 됩니다. 변수로 대화 내용을 주소에 넣는다면 그 내용도 전달됩니다.
- **사내 주소도 넣을 수 있습니다.** 공개 주소 대신 사내 시스템의 조회 주소를 넣는 것이 실무에서 더 쓸모 있습니다. 인증이 필요하면 **Request Headers**에 넣되, 키는 [환경과 변수](/guide/workspace-environments/)의 변수로 관리하는 편이 안전합니다.
- **기본 지시문을 고칠 수 있습니다.** 모델이 Live Context 데이터를 다루는 기본 지시문은 **Live Context Default**입니다. [기본 프롬프트 고치기](/guide/settings-default-prompts/)를 보세요.

## 참고한 문서

- [Live Context Examples](https://docs.msty.ai/studio/how-tos/live-context-examples)
- [Live Contexts](https://docs.msty.ai/studio/toolbox/live-contexts)
- [Default Prompts](https://docs.msty.ai/studio/settings/default-prompts)
- [Msty 요금](https://msty.ai/pricing/)
