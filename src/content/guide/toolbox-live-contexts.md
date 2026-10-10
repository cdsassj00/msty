---
title: Live Contexts — API 데이터를 대화에 넣기
description: 외부 API를 호출해 받은 데이터를 대화의 맥락으로 넣는 Live Contexts의 설정 항목과 Push·Pull 모드의 차이를 설명합니다.
date: 2026-10-11
section: 도구와 부가 기능
order: 30
verified: 2026-10-11
tags: [Msty, Toolbox, Live Contexts, API]
---

## Live Contexts가 하는 일

**Live Contexts**는 API를 호출해 받은 외부 데이터를 대화에 넣는 기능입니다. 모델이 모르는 최신 정보나 사내 시스템의 값을 답변에 반영하게 할 때 씁니다.

[Tools](/guide/toolbox-tools/)가 MCP 서버를 설치해 연결하는 방식이라면, Live Contexts는 주소(URL) 하나만 있으면 되는 더 가벼운 방식입니다. 예를 들어 사내 공지 시스템이 "오늘의 공지" API를 제공한다면, 그 주소를 Live Context로 등록해 두고 대화에서 켜는 것만으로 모델이 오늘 공지를 읽고 답하게 할 수 있습니다.

요청 방식은 두 가지입니다.

- **단순 요청**: 정해진 주소에서 데이터를 가져오는 GET 요청입니다.
- **동적 요청**: 대화 내용을 보고 모델이 API 호출에 쓸 변수와 파라미터를 정합니다. 검색어를 모델이 채워 넣는 경우가 여기에 해당합니다.

## 준비

쓰려는 API를 정하고, API 키 같은 접속 정보를 미리 확보합니다. 공식 문서에는 시험해 볼 만한 API 예시 모음(Live Context Examples)이 따로 있습니다.

## 새 Live Context 만들기

1. **Toolbox** 영역에서 **Live Contexts**를 고릅니다.
2. **Add New Live Context**를 누릅니다.
3. 아래 표의 항목을 채웁니다.
4. **Test Connection**을 눌러 접속을 시험합니다. 필요하면 시험용 변수 값을 넣습니다.
5. 다른 항목과 겹치지 않는 **Name**을 입력하고 **Add**를 눌러 저장합니다.

| 항목 | 설명 |
|---|---|
| **HTTP Method** | GET 또는 POST 중에서 고릅니다 |
| **URL Endpoint** | API 주소를 입력합니다. 중괄호로 변수를 넣을 수 있습니다. 예: `{query:'keyword'}`. 이 변수는 모델이 채웁니다 |
| **Prompt** | 필요하면 고칩니다. 프롬프트는 메시지를 보낼 때 추가할 수도 있습니다 |
| **Request Headers** | 요청 헤더를 추가합니다. 예: Authorization 헤더. 여기에도 변수를 넣을 수 있습니다 |
| **Live Context Mode** | **Push** 또는 **Pull**. 아래에서 설명합니다 |
| **Request Body** | 요청 본문을 추가합니다. 예: JSON. 여기에도 변수를 넣을 수 있습니다 |
| **Processing Function** | API 응답을 처리하는 함수입니다. 기본값은 응답을 문자열로 돌려주며, 보통 그대로 둡니다 |
| **Notes** | 선택 항목입니다. **모델이 이 내용을 볼 수 있으며**, 모델이 이 Live Context를 어떻게 쓸지 안내하는 역할을 합니다 |

Processing Function의 기본값은 다음과 같습니다.

```js
return JSON.stringify(data)
```

API 응답이 너무 길어 필요한 부분만 넘기고 싶을 때 이 함수를 고치게 됩니다. 함수 작성 규칙에 대한 자세한 안내는 이 페이지에 없습니다.

## Push와 Pull

| 모드 | 동작 | 맞는 경우 |
|---|---|---|
| **Push** (기본값) | Live Context를 대화에 포함하면 데이터가 자동으로 모델에 전달됩니다 | 주소가 고정되어 있고, 항상 같은 종류의 데이터를 넣을 때 |
| **Pull** | 대화 중에 모델이 필요하다고 판단할 때 Live Context를 호출합니다 | 주소나 헤더에 모델이 채워야 하는 변수가 있을 때 |

정리하면 "오늘의 환율"처럼 물을 것이 정해져 있으면 Push, "사용자가 말한 도시의 날씨"처럼 호출할 때마다 값이 달라지면 Pull입니다. 공식 문서는 주소나 헤더에 모델이 채워야 할 동적 변수가 있을 때 Pull을 쓰라고 안내합니다.

Pull은 모델이 스스로 호출을 결정하는 방식입니다. 모델이 도구 호출을 지원해야 하는지에 대해 이 페이지는 따로 적고 있지 않지만, [Toolsets](/guide/toolbox-toolsets/) 글에서 설명한 모델의 **Tools** 용도 설정을 함께 확인해 두는 편이 좋습니다.

## Notes를 잘 쓰는 법

Notes는 사람을 위한 메모이면서 동시에 모델에게 주는 설명입니다. "이 API는 사내 공지 목록을 돌려준다. 사용자가 공지나 일정에 관해 물을 때만 사용한다"처럼 무엇을 돌려주는지와 언제 써야 하는지를 적어 두면, Pull 모드에서 모델이 호출 시점을 더 정확히 판단합니다.

## 대화에서 쓰기

대화 화면에서 **Toolset** 아이콘을 누르고, 포함할 Live Context를 고릅니다. 한 대화에 Live Context를 여러 개 넣을 수 있습니다.

## 주의할 점

- Request Headers에 넣은 API 키는 외부 서비스의 인증 정보입니다. 내보내기나 공유를 할 때 키가 어떻게 다뤄지는지는 이 페이지에 설명이 없습니다.
- Push 모드는 대화에 포함하면 매번 데이터를 가져옵니다. 호출 횟수에 따라 요금을 받는 API라면 비용을 고려합니다. 호출 빈도에 대한 구체적인 설명은 공식 문서에 없습니다.
- API가 돌려준 내용은 그대로 모델에 전달됩니다. 온라인 모델을 쓰고 있다면 사내 API의 응답이 그 모델 제공업체로 넘어가게 됩니다.

## 함께 읽을 글

- [Tools](/guide/toolbox-tools/)
- [Toolsets](/guide/toolbox-toolsets/)
- [Real-Time Data: 웹 검색 결과를 대화에 넣기](/guide/addon-real-time-data/)

## 참고한 문서

- [Live Contexts](https://docs.msty.ai/studio/toolbox/live-contexts)
