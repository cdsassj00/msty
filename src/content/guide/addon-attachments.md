---
title: Attachments — 대화에 파일·이미지·웹페이지 붙이기
description: 문서, 이미지, 웹페이지, YouTube 링크를 대화에 붙여 모델이 참고하게 하는 방법과, 붙인 자료를 다시 쓰는 방법입니다.
date: 2026-10-11
section: 도구와 부가 기능
order: 70
verified: 2026-10-11
tags: [Msty, Attachments, 첨부]
---

## Attachments가 하는 일

**Attachments**는 대화에 자료를 붙여 모델이 그 내용을 참고해 답하게 하는 기능입니다. 붙일 수 있는 것은 네 가지입니다.

- 파일(문서)
- 이미지
- 웹페이지
- YouTube 링크

"이 계약서 초안에서 위약금 조항을 찾아 주세요"처럼 지금 가진 자료 한두 개에 대해 묻는 경우에 가장 간단한 방법입니다.

## 붙이는 세 가지 방법

- 채팅 입력란의 첨부 아이콘을 누릅니다.
- 자료를 입력 영역으로 끌어다 놓습니다.
- 지원되는 URL을 붙여 넣습니다.

대화를 진행하는 동안 붙인 자료를 **선택하거나 선택 해제**할 수 있습니다. 선택된 자료만 맥락에 포함됩니다. 자료를 지우지 않고도 이번 질문에는 빼 둘 수 있다는 뜻입니다.

## 자료 종류별 안내

| 종류 | 붙이는 방법 | 알아 둘 점 |
|---|---|---|
| 문서 | 입력란에 끌어다 놓거나 첨부 아이콘 사용 | Context Studio에 저장되어 나중에 다시 쓸 수 있습니다 |
| 이미지 | 입력란에 끌어다 놓기, 첨부 아이콘, 지원되는 환경에서는 화면 캡처 | Context Studio에 저장되며 Media Studio에서도 쓸 수 있습니다 |
| 웹페이지 | URL을 입력란에 끌어다 놓거나 붙여 넣기 | 데스크톱 sidecar가 연결되어 있으면 기본 웹 가져오기 방식을 씁니다 |
| YouTube 링크 | 링크를 입력란에 끌어다 놓거나 붙여 넣기 | 가능한 경우 영상 정보와 자막 내용을 가져옵니다 |

### 웹페이지를 가져오지 못할 때

기본 웹 가져오기는 데스크톱 sidecar 연결을 사용합니다. sidecar를 쓸 수 없다면 Context Studio 설정에서 **Jina**를 켜고 Jina API 키를 넣습니다.

### 이미지를 붙일 때

이미지를 모델이 읽으려면 이미지를 이해하는 모델을 골라야 합니다. 이 페이지는 어떤 모델이 이미지를 지원하는지 따로 설명하지 않습니다. 모델을 고를 때는 [모델 찾기](/models/)를 참고합니다.

## 이미 붙였던 자료 다시 쓰기

첨부 메뉴에서 **Browse Existing Attachments**를 엽니다. Context Studio에 이미 들어 있는 항목을 골라 붙일 수 있습니다.

파일을 다시 올리거나 웹페이지를 다시 가져올 필요가 없습니다. 대화에 한 번 붙인 문서와 이미지는 Context Studio에 저장되기 때문입니다. Context Studio는 예전에 Attachment Manager라고 부르던 기능의 새 이름이며, 자료를 정리하고 미리 보고 검색하는 보관함입니다. 자세한 사용법은 [Context Studio 글](/guide/studio-context/)에서 다룹니다.

## Dynamic Mode

공식 문서에서 이 항목에는 **Aurum Perk** 표시가 붙어 있습니다.

보통의 첨부는 고른 자료를 프롬프트와 함께 매번 모델에 보냅니다. **Dynamic Mode**는 방식이 다릅니다. 도구를 쓸 수 있는 모델이 Context Studio의 선택한 폴더 또는 보관함 전체를 **필요할 때 직접 검색**합니다.

특정 자료를 매번 지정해 보내는 대신, 모델이 관련 자료를 스스로 찾게 하고 싶을 때 씁니다.

조건은 다음과 같습니다.

- 도구를 지원하는 모델
- Context Studio 설정

필요한 설정과 이용 권한은 [Context Studio 글](/guide/studio-context/)의 Dynamic Mode 항목에 정리했습니다.

## Attachments와 Knowledge Stacks 중 무엇을 쓸까

두 기능 모두 내 자료를 근거로 답하게 하지만 쓰임이 다릅니다. 공식 문서가 두 기능을 직접 비교하지는 않으므로, 각 문서 페이지의 설명을 기준으로 정리하면 다음과 같습니다.

| 구분 | Attachments | Knowledge Stacks |
|---|---|---|
| 준비 | 붙이면 바로 사용 | Compose를 먼저 실행해야 사용 |
| 맞는 경우 | 지금 가진 자료 몇 개에 대해 물을 때 | 한 주제의 문서 묶음을 계속 검색해 쓸 때 |
| 검색 설정 | 고른 자료를 맥락에 포함 | 조각 개수, 검색 방식 등을 조정 |

Knowledge Stacks는 [Knowledge Stacks 개요](/guide/ks-overview/)에서 다룹니다.

## 문서에 없는 내용

붙일 수 있는 파일의 형식과 크기 제한은 공식 문서에 설명이 없습니다. 분량이 큰 문서를 붙였을 때 모델의 컨텍스트 한도를 넘으면 어떻게 처리되는지도 이 페이지에는 언급이 없습니다.

## 함께 읽을 글

- [Context Studio로 자료 보관함 만들기](/guide/studio-context/)
- [Knowledge Stacks 개요](/guide/ks-overview/)
- [Real-Time Data](/guide/addon-real-time-data/)

## 참고한 문서

- [Attachments](https://docs.msty.ai/studio/add-ons/attachments)
- [Context Studio](https://docs.msty.ai/studio/studios/context-studio)
