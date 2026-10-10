---
title: 기본 프롬프트(Default Prompts) 고치기
description: 제목 생성, Knowledge Stack 검색, 첨부 파일 처리 등 Msty Studio의 여러 기능이 뒤에서 쓰는 기본 프롬프트 열다섯 가지와 고치는 방법을 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 80
verified: 2026-10-11
tags: [Msty, Studio, Settings, 프롬프트]
---

## 기본 프롬프트란

Msty Studio의 여러 기능은 사용자가 보지 않는 곳에서 모델에게 지시문을 보냅니다. 대화 제목을 자동으로 붙일 때, 첨부 파일을 분석할 때, Knowledge Stack에서 검색어를 만들 때가 그렇습니다. 이 지시문이 기본 프롬프트(Default Prompts)입니다.

공식 문서는 이것이 대화에서 쓰는 프롬프트와는 별개라고 설명합니다. 대화의 시스템 프롬프트는 "모델이 나에게 어떻게 답할지"를 정하고, 기본 프롬프트는 "Studio의 기능이 모델을 어떻게 부릴지"를 정합니다.

위치는 **Settings > Default Prompts**입니다. 이 문서 항목에는 요금제 조건이 적혀 있지 않습니다.

## 왜 고치는가

기본 프롬프트는 영어로 쓰여 있고 영어 사용을 전제로 합니다. 한국어로 쓰는 사람이 고칠 만한 이유는 다음과 같습니다.

- 대화 제목이 영어로 붙는다. 한국어 제목을 원한다.
- Knowledge Stack에 한국어 문서를 넣었는데 검색어가 영어로 만들어진다.
- 첨부 파일 설명과 태그를 한국어로 받고 싶다.
- 긴 맥락을 요약할 때 조직의 용어를 지키게 하고 싶다.

## 기본 프롬프트 열다섯 가지

문서에 나온 목록을 기능별로 묶었습니다.

### 대화와 첨부

| 이름 | 쓰이는 때 |
|---|---|
| Attachment Prompt | 사용자가 글 없이 첨부 파일만 보냈을 때 |
| YouTube Attachments | 대화에 첨부한 YouTube 영상의 자막을 모델이 어떻게 쓸지 알려 줍니다 |
| Title Generation | 대화 내용에서 대화 제목을 만듭니다 |
| Context Shield Summary | 긴 맥락을 짧게 요약해 맥락 길이와 토큰을 아낍니다 |

### Context Studio

문서는 다음 세 가지를 **Context Studio** 분류로 묶습니다.

| 이름 | 쓰이는 때 |
|---|---|
| Attachments Image Analysis | Context Studio의 이미지·영상 항목에 짧은 설명, 긴 설명, 태그를 만듭니다 |
| Attachments Document Analysis | Context Studio의 문서, 웹 페이지, YouTube 항목에 짧은 설명, 긴 설명, 태그를 만듭니다 |
| Attachments Pull Mode | 도구를 쓸 수 있는 모델에게 Dynamic Mode에서 Context Studio 내용을 찾고 읽는 방법을 알려 줍니다 |

### Knowledge Stacks

| 이름 | 쓰이는 때 |
|---|---|
| Knowledge Stack Context | Knowledge Stack의 조각(chunk)을 모델에 보낼 때 함께 보냅니다. 그 맥락을 어떻게 쓸지 지시합니다 |
| Knowledge Stack Simple Search | 모델이 Knowledge Stack에서 관련 문서를 찾을 검색어를 만들도록 돕습니다 |
| Knowledge Stack Structured Search | 더 의미 중심의 검색을 위한 것으로, 더 나은 검색어를 만들도록 돕습니다 |

### 실시간 데이터와 Live Context

| 이름 | 쓰이는 때 |
|---|---|
| Live Context Default | 모델의 답에 Live Context 데이터를 쓰는 기본 지시문 |
| Real-Time Data Query Synthesis | 실시간 데이터를 가져올 검색어를 일반 검색 엔진에 맞는 형식으로 만듭니다 |

Live Context는 [Live Context 예제](/guide/settings-live-context-examples/)에서 다룹니다.

### 페르소나와 그 밖

| 이름 | 쓰이는 때 |
|---|---|
| Crew Mode | Crew 대화에서 페르소나들이 답할 때 쓰는 배경 지시문. 참여자 명단과 `@mention` 인계 방식을 담습니다 |
| User Persona Memory Generation | 고른 대화 메시지에서 사용자 페르소나 기억의 초안을 구조에 맞춰 만듭니다 |
| Icon Finder | 사용자의 설명에 가장 알맞은 아이콘을 고릅니다 |

## 고치는 방법

1. **Settings > Default Prompts**를 엽니다.
2. 메뉴에서 고칠 프롬프트를 고릅니다.
3. 편집 창에서 글을 고칩니다.
4. **Save** 버튼을 누릅니다.

편집 창 아래에는 버튼이 세 개 있습니다.

| 버튼 | 하는 일 |
|---|---|
| **Quick Prompts** | Quick Prompts에 저장해 둔 프롬프트를 가져옵니다 |
| **Clear Content** | 편집 창을 비웁니다 |
| **Reset to Default** | 원래 기본 프롬프트로 되돌립니다 |

**Reset to Default**가 있으므로 고치다가 잘못되어도 되돌릴 수 있습니다.

## 변수를 지우면 안 됩니다

많은 기본 프롬프트에는 `{input}`이나 `{content}` 같은 변수가 들어 있습니다. 실행할 때 이 자리가 실제 내용으로 바뀝니다. 예를 들어 제목을 만드는 프롬프트라면 대화 내용이 들어갈 자리가 변수로 표시되어 있습니다.

문서는 이 변수를 프롬프트에 그대로 두라고 강조합니다. 지우면 그 기능이 제대로 작동하지 않을 수 있습니다.

고칠 때 지킬 점은 다음과 같습니다.

- 중괄호로 둘러싼 변수는 글자 하나 바꾸지 않습니다. 번역하지도 않습니다.
- 변수의 앞뒤 문장만 고칩니다.
- 변수 이름은 프롬프트마다 다를 수 있으니, 고치기 전에 원문에 어떤 변수가 있는지 먼저 확인합니다.

## 고쳐 보기 예시

### 대화 제목을 한국어로

**Title Generation**을 열고, 원래 지시문 끝에 "제목은 한국어로, 20자 이내로 쓴다"는 뜻의 문장을 더합니다. 변수는 그대로 둡니다. 저장한 뒤 새 대화를 시작해 제목이 한국어로 붙는지 확인합니다.

### 한국어 문서 검색

**Knowledge Stack Simple Search**를 열고 "검색어는 문서와 같은 언어로 만든다"는 뜻의 문장을 더합니다. 한국어 문서에 영어 검색어가 만들어져 관련 조각을 놓치는 일을 줄이려는 것입니다. 효과는 모델과 임베딩 모델에 따라 다르므로, 같은 질문으로 고치기 전과 후를 비교해 보세요.

### 요약에서 용어 지키기

**Context Shield Summary**에 "고유 명사, 숫자, 날짜는 원문 그대로 둔다"는 뜻의 문장을 더합니다. 긴 대화를 요약하는 과정에서 숫자가 바뀌는 일을 줄이는 데 도움이 됩니다.

위 예시의 문장은 이 글에서 제안하는 것이며 공식 문서에 나온 문구가 아닙니다.

## 고칠 때의 원칙

- **한 번에 하나만 고칩니다.** 여러 개를 동시에 고치면 무엇 때문에 결과가 달라졌는지 알 수 없습니다.
- **원문을 따로 보관합니다.** **Reset to Default**로 되돌릴 수 있지만, 그러면 내가 고친 내용도 사라집니다. 고친 본을 메모장에 복사해 두면 다시 적용하기 쉽습니다.
- **모델을 바꾸면 다시 확인합니다.** 같은 프롬프트라도 모델에 따라 따르는 정도가 다릅니다. 작은 로컬 모델은 긴 지시문을 잘 지키지 못할 수 있습니다.
- **작업 공간마다 따로인지 확인합니다.** 기본 프롬프트가 작업 공간별로 저장되는지 전체에 적용되는지는 문서에 적혀 있지 않습니다. 작업 공간을 여러 개 쓴다면 다른 공간에서도 바뀌었는지 직접 확인하세요.

## 관련 글

- [설정 화면 둘러보기](/guide/settings-overview/)
- [단축키와 Command Palette](/guide/settings-shortcuts-command-palette/)

## 참고한 문서

- [Default Prompts](https://docs.msty.ai/studio/settings/default-prompts)
