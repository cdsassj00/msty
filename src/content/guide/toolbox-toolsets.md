---
title: Toolsets — 도구를 묶어 대화에서 쓰기
description: Toolbox에 등록한 도구를 툴셋으로 묶고, 대화에서 켜고, 모델에 Tools 용도를 지정하는 방법입니다.
date: 2026-10-11
section: 도구와 부가 기능
order: 20
verified: 2026-10-11
tags: [Msty, Toolbox, Toolsets]
---

## 툴셋이란

**툴셋(toolset)**은 파라미터가 정해진 도구들의 묶음입니다. [Tools](/guide/toolbox-tools/)에서 도구를 등록한 뒤, 툴셋을 만들어 그 안에 도구를 넣습니다. 대화할 때는 도구를 하나씩 고르는 것이 아니라 툴셋을 하나 이상 골라 모델에 붙입니다.

묶어서 쓰는 이유는 용도별로 나눠 두기 위해서입니다. 예를 들어 다음과 같이 만들 수 있습니다.

- "문서 작업" 툴셋: 파일 읽기 도구만
- "데이터 조회" 툴셋: 데이터베이스 도구와 검색 도구

같은 도구라도 툴셋마다 파라미터를 다르게 줄 수 있으므로, 같은 데이터베이스 도구를 "운영 DB 조회" 툴셋과 "테스트 DB 조회" 툴셋에 각각 다른 접속 값으로 넣어 둘 수 있습니다.

## 툴셋 만들기

1. **Add New Toolset**을 누릅니다.
2. 툴셋에 넣을 도구를 켭니다.
3. 도구 옆의 별표(**\***) 아이콘을 눌러, 이 툴셋에서 그 도구가 쓸 파라미터를 정합니다. 도구의 기본 파라미터는 [Tools](/guide/toolbox-tools/) 글의 "도구의 기본 파라미터 정하기"에서 설정한 값입니다.
4. **Notes**에 툴셋의 용도나 기억해 둘 내용을 적습니다.
5. 다른 툴셋과 겹치지 않는 **Name**을 입력합니다.
6. **Add**를 눌러 Toolbox에 저장합니다.

## 대화에서 툴셋 쓰기

대화 화면에서 Toolset 아이콘을 누르고, 켤 툴셋을 하나 이상 고릅니다.

### 모델이 도구를 지원하는지 확인하기

여기서 가장 자주 막힙니다. 모든 모델이 도구를 쓸 수 있는 것은 아니며, Msty에서는 **기본적으로 모든 모델의 Tools 용도(purpose)가 꺼져 있습니다.**

그래서 툴셋을 대화에 추가하면 대화 도구 모음에 경고가 나타납니다. 처리 순서는 다음과 같습니다.

1. 먼저 그 모델로 툴셋을 시험해 실제로 도구를 호출하는지 확인합니다.
2. 호환되는 것이 확인되면 대화 도구 모음에서 모델 드롭다운을 엽니다.
3. 모델 옆의 수정 아이콘을 누릅니다.
4. 열린 창에서 그 모델의 용도로 **Tools**를 켭니다.

**Tools** 용도를 켜면 툴셋을 추가할 때 나오던 경고가 사라집니다.

주의할 점은, 이 설정이 "이 모델은 도구를 쓸 수 있다"고 Msty에 **알려 주는 표시**라는 것입니다. 도구를 지원하지 않는 모델에 이 표시를 켠다고 해서 도구를 쓸 수 있게 되지는 않습니다. 그래서 공식 문서는 표시를 켜기 전에 시험부터 하라고 안내합니다.

어떤 모델이 도구를 지원하는지에 대한 목록은 공식 문서에 없습니다. 모델을 고를 때는 [모델 찾기](/models/)를 참고하고, 실제 지원 여부는 위 순서대로 직접 시험합니다.

## 툴셋이 쓰이는 다른 곳

툴셋은 일반 대화 외에도 다음 기능에서 선택할 수 있습니다.

- [Persona Studio](/guide/studio-persona/)의 Assistant Persona 부가 기능
- [Turnstiles](/guide/addon-turnstiles/)의 Prompt 단계

Toolset 아이콘에서는 [Live Contexts](/guide/toolbox-live-contexts/)도 함께 고를 수 있습니다.

## 문서에 없는 내용

툴셋 하나에 넣을 수 있는 도구 개수, 한 대화에서 켤 수 있는 툴셋 개수의 제한은 공식 문서에 설명이 없습니다. 요금제에 따른 제한도 이 페이지에는 언급이 없습니다.

## 함께 읽을 글

- [Tools: MCP 도구를 Msty에 연결하기](/guide/toolbox-tools/)
- [Live Contexts](/guide/toolbox-live-contexts/)
- [Tool Dependencies](/guide/toolbox-tool-dependencies/)

## 참고한 문서

- [Toolsets](https://docs.msty.ai/studio/toolbox/toolsets)
- [Live Contexts](https://docs.msty.ai/studio/toolbox/live-contexts)
- [Persona Studio](https://docs.msty.ai/studio/studios/persona-studio)
- [Turnstiles](https://docs.msty.ai/studio/add-ons/turnstiles)
