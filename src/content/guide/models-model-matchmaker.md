---
title: Model Matchmaker로 시작 모델 고르기
description: 어떤 모델부터 써야 할지 모를 때 우선순위를 정해 순위가 매겨진 추천을 받는 Model Matchmaker 사용법입니다.
date: 2026-10-11
section: 모델 관리
order: 50
verified: 2026-10-11
tags: [Msty, Model Matchmaker, 모델 선택]
---

## Model Matchmaker란

**Model Matchmaker**는 어떤 모델을 써야 할지 모를 때 시작점이 될 모델을 골라 주는 기능입니다. 내가 중요하게 여기는 조건을 정하면 순위가 매겨진 추천 목록이 나오고, 상위 후보를 실제 대화에서 시험해 보는 흐름입니다.

## 언제 쓰나

공식 문서는 다음 경우에 쓰라고 안내합니다.

- 새 제공업체를 추가했는데 어떤 모델부터 쓸지 정해야 할 때
- 이것저것 써 보며 찾는 대신 빠르게 추천을 받고 싶을 때
- 기본 모델을 정하기 전에 후보를 비교하고 싶을 때

예를 들어 제공업체를 연결했더니 모델이 수십 개 나타나 무엇을 골라야 할지 막막할 때, Matchmaker로 후보를 두세 개로 줄인 뒤 직접 써 보고 정할 수 있습니다.

## 사용 순서

1. **Model Hub > Matchmaker**로 갑니다.
2. 내 작업에서 무엇이 가장 중요한지 우선순위를 정합니다.
3. Matchmaker가 우선순위에 맞춰 순서대로 정렬한 추천 모델을 보여 줍니다. 이 목록을 확인합니다.
4. 상위 모델을 실제 질문으로 시험합니다.

어떤 우선순위 항목을 고를 수 있는지, 순위를 어떤 기준으로 계산하는지는 공식 문서에 설명이 없습니다.

## 추천받은 모델 검증하기

추천은 출발점입니다. 공식 문서는 상위 모델을 실제 프롬프트로 시험해 보라고 권하며, 시험할 곳으로 세 가지를 듭니다.

| 시험할 곳 | 방법 |
|---|---|
| 일반 대화 | 평소 하는 질문을 그대로 해 봅니다. [대화 화면 살펴보기](/guide/chat-conversations/) 참고 |
| Split Chat | 후보 모델을 나란히 놓고 같은 질문의 답을 비교합니다. [Split Chat](/guide/chat-split-chat/) 참고 |
| Turnstiles | 공식 문서가 함께 언급하는 부가 기능입니다 |

후보가 둘 이상이라면 Split Chat이 가장 빠릅니다. 같은 질문을 한 번만 입력해도 모델별 답이 옆에 나란히 나옵니다.

## 고른 뒤 할 일

모델을 정했다면 기본 모델로 지정하거나 용도 태그를 붙여 둡니다. 방법은 [Model Hub 한눈에 보기](/guide/models-model-hub/)에 있습니다.

## 다음에 읽을 글

- [Split Chat으로 모델 답 비교하기](/guide/chat-split-chat/)
- [로컬 모델 설치와 관리](/guide/models-local-models/)
- [모델 찾기](/models/)

## 참고한 문서

- [Model Matchmaker](https://docs.msty.ai/studio/managing-models/model-matchmaker)
