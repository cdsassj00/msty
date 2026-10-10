---
title: Knowledge Stacks 개요 — 내 문서를 근거로 답하게 하기
description: Knowledge Stack이 무엇을 위한 기능인지 쉬운 말로 설명하고, 첫 스택을 만들어 대화에 연결하기까지의 순서를 정리합니다.
date: 2026-10-11
section: Knowledge Stacks
order: 10
verified: 2026-10-11
tags: [Msty, Knowledge Stacks, RAG]
---

## Knowledge Stack은 무엇을 위한 기능인가

AI 모델은 학습할 때 본 내용만 압니다. 우리 회사 취업규칙, 지난달 회의록, 내가 쓴 보고서는 모릅니다. 그래서 "우리 회사 출장비 정산 기한이 며칠인가요"라고 물으면 모르는 내용을 그럴듯하게 지어내기도 합니다.

**Knowledge Stack**은 이 문제를 푸는 기능입니다. 내 문서를 묶음으로 등록해 두면, 질문이 들어올 때 Msty가 그 묶음에서 관련 있는 부분을 먼저 찾아 모델에게 함께 넘깁니다. 모델은 넘겨받은 내용을 읽고 답하므로, 답이 내 문서를 근거로 하게 됩니다.

이 방식을 RAG(Retrieval-Augmented Generation, 검색 증강 생성)라고 부릅니다. 공식 문서는 Knowledge Stacks를 Msty Studio의 RAG 구현이라고 설명합니다. 원리가 궁금하면 [RAG란 무엇인가](/learn/what-is-rag/)를 먼저 읽어도 좋습니다.

공식 문서 기준으로 Knowledge Stacks는 **Msty Studio Desktop에서만** 제공됩니다.

## 주요 기능

| 기능 | 설명 |
|---|---|
| Flexible Embedding | 원하는 로컬 임베딩 모델을 골라 문서를 임베딩합니다. 임베딩이 무엇인지는 [임베딩이란](/learn/what-is-embedding/)에서 설명합니다 |
| Chunk Console and Visualizer | 문서가 어떻게 조각(chunk)으로 나뉘었는지 보고, 콘솔에서 시험 질문을 던져 봅니다 |
| Advanced Query Settings | 관련도 기준, 넘겨줄 맥락의 양 등 검색 설정을 조정합니다 |
| Synthesized Responses | 스택의 지식을 바탕으로 Msty가 답변을 종합해 만듭니다 |
| PII Scrubbing | 스택 안의 개인 식별 정보를 찾아 가립니다 |

## 첫 Knowledge Stack 만들기

공식 문서는 스택 하나를 하나의 주제나 분류로 생각하라고 권합니다. 한 스택에 한 가지 주제만 담을 때 결과가 가장 좋습니다. "인사 규정", "A 프로젝트 자료", "제품 매뉴얼"처럼 나누는 식입니다.

넣을 수 있는 자료는 파일, 폴더, 노트, YouTube 링크입니다.

1. **Knowledge Stacks** 아이콘을 누르고 새 스택을 만드는 메뉴를 고릅니다.
2. **Title**(제목)과 **Description**(설명)을 입력합니다.
3. **Files**, **Folders**, **Notes**, **YouTube Links** 중 필요한 것을 추가합니다.
4. **Compose Settings**를 설정합니다. 세부 항목은 [Compose Options](/guide/ks-compose-options/) 글에서 다룹니다.
5. **Compose**를 실행합니다.

**Compose**는 등록한 자료를 조각으로 나누고, 검색할 수 있는 형태로 바꿔 저장하는 작업입니다. Compose가 끝나야 스택을 대화에서 쓸 수 있습니다.

## 대화에서 Knowledge Stack 쓰기

1. 대화를 새로 시작하거나 기존 대화를 엽니다.
2. 대화 도구 모음에서 **Knowledge Stack** 아이콘을 누릅니다.
3. **Recently Updated**나 **All Stacks**에서 찾거나, 스택 제목으로 검색합니다.
4. Compose가 끝난 스택을 하나 이상 선택합니다.
5. 필요하면 **Configure**를 펼쳐 이 대화에서 쓸 검색 설정을 조정합니다.
6. 모델과 대화를 시작합니다.

이제 모델은 선택한 스택의 내용을 참고해 답합니다. 검색 결과를 더 좋게 만드는 설정은 [Query Settings](/guide/ks-query-settings/) 글에서 다룹니다.

## 스택 선택 창(Knowledge Stack Picker)

스택이 많아져도 찾기 쉽도록 선택 창은 다음과 같이 구성됩니다.

| 영역 | 설명 |
|---|---|
| **Recently Updated** | 최근에 바뀐, 사용할 수 있는 스택을 최대 5개 보여 줍니다 |
| **All Stacks** | 나머지 사용 가능한 스택을 알파벳순으로 보여 줍니다 |
| **Search** | 스택을 제목으로 찾습니다 |
| 선택한 스택 | 선택한 스택은 별도 영역에 모아 표시됩니다 |
| **Manage Stacks** | Knowledge Stacks 전체 관리 화면을 엽니다 |

알아 둘 점이 두 가지 있습니다.

- **가장 최근에 선택한 스택**의 설정이 처음 검색 설정으로 적용됩니다.
- Compose가 끝났고 쓸 수 있는 내용이 있는 스택만 선택할 수 있습니다. 목록에 스택이 보이지 않으면 Compose가 끝났는지 확인합니다.

## 미리 만들어진 스택 설치하기

Knowledge Stacks Next Gen을 열고 **Discover**를 누르면 미리 만들어진 스택 목록을 볼 수 있습니다.

공식 **Msty Docs** 스택에는 Msty Studio 문서가 들어 있습니다. 내 파일을 올리지 않고도 Knowledge Stack이 어떻게 동작하는지 시험해 볼 수 있습니다.

처음 앱을 설정하는 과정에서 **Chat with Msty Studio Docs**를 고르면 이 스택을 가져옵니다. 이때 Msty는 문서가 연결된 **Msty Clippy** 페르소나도 함께 만듭니다.

## Next Gen으로 바꾸기를 권합니다

공식 문서 개요 페이지의 첫머리는 **Knowledge Stacks Next Gen** 안내입니다. 기존(classic) 방식에서 Next Gen으로 바꾸기를 권하며, 달라진 점을 다음과 같이 소개합니다.

- 파일과 폴더 외에 Msty Studio 프로젝트, 지난 대화, 웹 링크를 추가할 수 있습니다.
- 찾아낸 조각의 순서를 전용 모델로 다시 매기는 **Rerank Model** 설정이 생겼습니다.
- 항목 하나를 통째로 한 조각으로 두는 **File (Single Chunk)** 방식이 생겼습니다.
- 화면이 더 깔끔해졌습니다.

자세한 내용은 [Knowledge Stacks Next Gen](/guide/ks-next-gen/) 글에서 다룹니다.

## 이 묶음의 다른 글

- [Compose Options: 문서를 나누고 임베딩하는 설정](/guide/ks-compose-options/)
- [Query Settings: 검색 방식 조정](/guide/ks-query-settings/)
- [Chunks Visualizer와 Chunks Console](/guide/ks-chunks-visualizer-console/)
- [공유·관리와 Analytics](/guide/ks-share-and-manage/)
- [.mstyignore 파일](/guide/ks-ignore-file/)
- [Knowledge Stacks Next Gen](/guide/ks-next-gen/)

## 참고한 문서

- [Knowledge Stacks Overview](https://docs.msty.ai/studio/knowledge-stacks/overview)
