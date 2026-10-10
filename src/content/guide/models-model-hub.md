---
title: Model Hub 한눈에 보기
description: Msty Studio에서 모델을 연결하고 받고 정리하는 곳인 Model Hub의 구성과 기본 작업 순서를 정리합니다.
date: 2026-10-11
section: 모델 관리
order: 10
verified: 2026-10-11
tags: [Msty, Model Hub, 모델]
---

## Model Hub가 하는 일

**Model Hub**는 Msty Studio에서 모델과 관련된 일을 모아 둔 곳입니다. 온라인 제공업체를 연결하는 일, 로컬 모델을 받는 일, 모델 후보를 비교하는 일, 모델 동작을 조정하는 일을 모두 여기서 합니다.

예를 들어 보고서 초안은 내 PC의 로컬 모델로 쓰고, 긴 문서 요약은 온라인 모델에 맡기고 싶다면 두 종류의 모델을 모두 Model Hub에서 준비합니다. 그다음 대화 화면에서 그때그때 골라 씁니다.

## 여는 방법

사이드바에서 **Model Hub**를 누르거나 Command Palette에서 엽니다.

## 기본 작업 순서

공식 문서는 대부분의 사용자가 다음 순서로 모델을 준비한다고 안내합니다.

1. 사이드바나 Command Palette에서 **Model Hub**를 엽니다.
2. 온라인 제공업체를 연결하거나, 로컬 모델을 설치하거나, 둘 다 합니다.
3. 서비스와 모델을 받는 진행 상황을 Model Hub 배지에서 확인합니다.
4. 기본 모델과 용도 태그를 정합니다.
5. 필요하면 모델 파라미터를 조정하거나 프리셋을 적용합니다.

## Model Hub의 구성

| 구역 | 하는 일 |
|---|---|
| **Model Providers** | 온라인 제공업체와 그 모델을 연결하고 관리합니다 |
| **Local Models** | Ollama, MLX, Llama.cpp로 돌리는 모델을 찾고, 설치하고, 가져오고, 관리합니다 |
| **Model Squad** | 작업 종류별로 선호하는 모델을 지정합니다 |
| **Model Matchmaker** | 필요에 맞는 모델을 단계별로 추천받습니다 |
| **Cost Calculator** | 온라인 모델 사용 비용을 추정합니다 |
| **VRAM Calculator** | 로컬 모델이 내 하드웨어에 들어가는지 추정합니다 |
| **Context Explorer** | 컨텍스트 창과 토큰 사용량이 대화에 미치는 영향을 익힙니다 |

Model Squad, Cost Calculator, VRAM Calculator는 이 개요 페이지에 한 줄 설명만 있고, 자세한 사용법은 공식 문서에 설명이 없습니다.

## 온라인 모델과 로컬 모델

Msty Studio가 쓰는 모델은 두 종류입니다.

| 종류 | 설명 | 이럴 때 씁니다 |
|---|---|---|
| **Online Providers** | API 키로 연결하는 호스팅 모델 | 설치 없이 바로 쓰고 싶고, 서버 관리를 업체에 맡기고 싶을 때 |
| **Local Models** | 내 컴퓨터에 설치해 돌리는 모델 | 개인정보 통제, 오프라인 사용, 성능 조정을 직접 하고 싶을 때 |

각각의 자세한 방법은 [온라인 제공업체 연결하기](/guide/models-online-providers/)와 [로컬 모델 설치와 관리](/guide/models-local-models/)에서 다룹니다. 어떤 모델부터 써야 할지 모르겠다면 [Model Matchmaker](/guide/models-model-matchmaker/)를 씁니다.

## 받는 중인 항목 확인하기

모델이나 로컬 서비스를 설치하는 동안에는 사이드바의 Model Hub 아이콘에 활동 배지가 표시됩니다.

- 배지를 누르면 Model Hub로 돌아갑니다.
- 진행 중인 로컬 설치와 원격 설치의 개수를 볼 수 있습니다.
- 설치 목록 패널을 열어 진행 상황을 확인하거나 설치를 취소할 수 있습니다.

## 매일 쓰기 좋게 정리하기

### 기본 모델 정하기

대화 화면의 모델 선택 목록에서 별 아이콘을 누르면 그 모델이 기본 모델이 됩니다.

### 이름 바꾸기

Model Hub나 대화 화면의 모델 선택 목록에서 편집 아이콘을 누르면 제공업체와 모델의 이름을 바꿀 수 있습니다. 모델 이름이 길고 비슷해서 헷갈릴 때 "회의록 요약용"처럼 알아보기 쉬운 이름을 붙여 두면 편합니다.

### 용도 태그 정하기

용도 태그(purpose tag)는 각 모델이 무엇을 잘하는지 분류하는 표시입니다.

| 태그 | 뜻 |
|---|---|
| **Text** | 일반적인 글 생성과 이해 |
| **Coding** | 코드 생성, 분석, 디버깅 |
| **Tools** | Toolbox(MCP)를 통한 도구·API 사용 |
| **Image** | 이미지 생성 모델 |
| **Vision** | 이미지를 보고 이해·분석 |
| **Embedding** | 검색과 벡터 작업. Knowledge Stacks에 쓰입니다 |
| **Streaming** | 실시간에 가까운 데이터 처리 |
| **Thinking** | 추론 강도를 조절할 수 있는 추론 모델 |

태그는 단순한 메모가 아닙니다. **Image** 태그는 이미지 생성 요청을 처리하는 방식에, **Thinking** 태그는 추론 강도 설정을 쓸 수 있는지에 영향을 줍니다. 자세한 내용은 [이미지 생성](/guide/models-image-generation/)과 [Thinking Effort](/guide/models-thinking-effort/) 글에 있습니다.

### 로고 바꾸기

Model Hub의 편집 창에서 제공업체와 모델의 로고를 바꿀 수 있습니다.

## 다음에 읽을 글

- [온라인 제공업체 연결하기](/guide/models-online-providers/)
- [로컬 모델 설치와 관리](/guide/models-local-models/)
- [첫 실행과 모델 받기](/guide/first-run-and-models/)

## 참고한 문서

- [Managing Models](https://docs.msty.ai/studio/managing-models)
