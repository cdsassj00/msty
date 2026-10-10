---
title: Knowledge Stacks Next Gen — 달라진 점과 전환 방법
description: 프로젝트·대화·웹 링크 추가, Rerank Model, File (Single Chunk) 방식, 폴더 감시, Compose 일시 정지 등 Next Gen에서 바뀐 내용과 전환 방법입니다.
date: 2026-10-11
section: Knowledge Stacks
order: 70
verified: 2026-10-11
tags: [Msty, Knowledge Stacks, Next Gen]
---

## Next Gen이란

**Knowledge Stacks Next Gen**은 Msty Studio의 Knowledge Stacks를 크게 개선한 새 버전입니다. 넣을 수 있는 자료의 종류가 늘었고, 검색이 개선됐고, 조각 나누기와 Compose 관련 옵션이 추가됐습니다.

기존(classic) Knowledge Stacks는 계속 동작합니다. 기존 스택을 그대로 두고 Next Gen 스택을 따로 만들어 함께 쓸 수 있습니다. 공식 문서는 Next Gen으로 전환하기를 권합니다.

Knowledge Stack이 처음이라면 [Knowledge Stacks 개요](/guide/ks-overview/)를 먼저 읽습니다.

## 전환하는 방법

1. **Msty Studio**를 열고 **Knowledge Stacks** 영역으로 갑니다.
2. Knowledge Stacks 패널의 왼쪽 아래에 있는 드롭다운을 누르고 **Switch to Next Gen Knowledge Stack**을 고릅니다.

기존 방식으로 돌아가려면 같은 자리에서 비슷한 순서로 언제든 바꿀 수 있습니다.

## Discover: 만들어진 스택 설치하기

**Discover** 탭에서 Msty 카탈로그에 공개된 스택을 둘러봅니다.

- 이름, 설명, 태그로 검색합니다.
- 항목을 열어 상세 내용을 확인합니다.
- 카탈로그 URL로 스택을 바로 설치합니다.
- 카탈로그를 새로 고쳐 새로 올라온 스택을 봅니다.

설치 순서는 다음과 같습니다.

1. Knowledge Stacks 화면을 열고, 필요하면 Next Gen으로 전환합니다.
2. **Discover**를 누릅니다.
3. 검색하거나 스택을 골라 설명과 태그를 확인합니다.
4. **Install**을 누릅니다. Msty가 스택을 내려받아 내 라이브러리에 가져옵니다.

카탈로그에는 공식 **Msty Docs** 스택이 있습니다. Msty의 설정, 기능, 작업 흐름에 관한 문서가 들어 있어 대화에서 Msty 사용법을 물어볼 때 쓸 수 있습니다.

## 새로 넣을 수 있는 자료

기존의 파일, 폴더, 텍스트는 그대로 쓸 수 있고, 다음이 추가됐습니다.

| 자료 | 설명 | 조건 |
|---|---|---|
| **Conversation Projects** | Msty Studio의 프로젝트 폴더를 통째로 올립니다. Msty가 처리하고 색인합니다 | — |
| **Chats** | 지난 대화를 추가해 AI가 참고하게 합니다 | — |
| **Web Links** | URL을 붙여 넣으면 Msty가 웹페이지 내용을 가져옵니다 | **Jina 키가 필요합니다** |

예를 들어 석 달 동안 한 프로젝트에 관해 나눈 대화가 여러 개라면, 그 대화들을 Chats로 스택에 넣어 "그때 정한 일정이 무엇이었나요" 같은 질문에 답하게 할 수 있습니다.

## Compose 일시 정지와 재개

용량이 큰 자료를 Compose하다가 멈췄다가 나중에 이어서 할 수 있습니다.

- 일시 정지하면 Compose가 멈추지만 진행 상황은 저장됩니다.
- 멈춘 상태에서도 [Chunks Visualizer와 Chunks Console](/guide/ks-chunks-visualizer-console/)을 쓸 수 있습니다.
- 재개 버튼을 누르면 이어서 진행합니다.

## 폴더 감시(Folder Watch Modes)

폴더를 올릴 때 쓸 수 있는 설정입니다. 켜면 Msty가 그 폴더에 새 문서가 생기거나 문서가 바뀌는지 감시합니다.

설정에 따라 동작은 둘 중 하나입니다.

- 폴더에 "다시 Compose 필요" 표시만 합니다.
- 자동으로 Compose합니다.

바뀐 문서는 다음 Compose 때 처리됩니다. 매주 새 회의록이 쌓이는 폴더처럼 내용이 계속 늘어나는 폴더에 맞습니다.

## Rerank Model

처음 유사도 검색으로 찾은 조각들을, 순위를 매기는 전용 모델이 다시 채점해 순서를 바꿉니다. 그 결과 가장 관련 있는 조각이 위로 올라옵니다.

켜는 방법은 다음과 같습니다.

1. 스택의 **Query Settings**로 갑니다.
2. 드롭다운에서 Rerank Model을 고릅니다.
3. **Jina API 키**를 넣습니다.

재순위에는 Jina가 필요합니다. Jina는 외부 서비스이므로, 재순위를 켜면 검색된 조각이 Jina로 전송된다고 봐야 합니다. 전송 범위에 대한 구체적인 설명은 공식 문서에 없으므로, 사내 기밀 문서가 담긴 스택에서는 켜기 전에 확인이 필요합니다.

## File (Single Chunk) 방식

파일이나 항목 하나를 나누지 않고 **통째로 한 조각**으로 다루는 방식입니다. 다음 경우에 맞습니다.

- FAQ, 짧은 메모, 참고 문서처럼 짧은 문서
- 나누면 맥락이 깨지는 내용
- 파일 전체가 한 단위로 돌아오므로 검색 결과를 예측하기 쉽게 하고 싶을 때
- 다른 방법으로 이미 조각을 나눠 둔 파일

Compose할 때 **Compose Options**에서 조각 나누기 방식으로 **File (Single Chunk)**를 고릅니다. 다른 방식과의 차이는 [Compose Options](/guide/ks-compose-options/) 글을 참고합니다.

## 로컬 모델용 Knowledge Stack 프리셋

로컬 모델 상당수는 기본 `num_ctx`(모델이 한 번에 읽을 수 있는 분량) 값이 낮습니다. 이 값이 낮으면 스택에서 찾아 넘긴 조각이 잘려 나가 모델이 읽지 못합니다. "스택을 연결했는데 모델이 내용을 모른다"는 증상의 원인이 될 수 있습니다.

프리셋은 `num_ctx`를 약 20,000토큰으로 올립니다.

사용법은 다음과 같습니다. Knowledge Stack을 연결하고 로컬 모델을 선택한 상태에서, 모델 파라미터 설정의 **Knowledge Stack preset**을 적용합니다. 컨텍스트 창과 관련 파라미터가 자동으로 설정됩니다.

`num_ctx`를 올리면 메모리를 더 쓰게 되지만, 필요한 사양에 대한 안내는 공식 문서에 없습니다.

## 트리 보기의 오른쪽 클릭 메뉴

Knowledge Stacks의 트리 보기에서 오른쪽 클릭으로 다음 작업을 할 수 있습니다.

| 메뉴 | 동작 |
|---|---|
| **Compose** | 스택 하나 또는 폴더 전체를 Compose합니다 |
| **Pause Compose** | 진행 중인 Compose를 잠시 멈춥니다 |
| **Resume Compose** | 멈춘 Compose를 이어서 합니다 |
| **Abort Compose** | 진행 중인 Compose를 완전히 취소합니다 |
| **Force Compose** | 이미 Compose된 것도 처음부터 다시 Compose합니다 |

- **스택**을 오른쪽 클릭하면 그 스택에만 적용됩니다.
- **폴더**를 오른쪽 클릭하면 그 안의 모든 스택에 적용됩니다. 실행 전에 몇 개의 스택이 영향을 받는지 확인 창이 나옵니다.

## 그 밖의 개선

자료 추가, 설정 조정, 스택 내용 관리가 더 매끄러워졌고, Compose 중에 파일과 폴더의 진행 상황이 실시간으로 더 분명하게 표시됩니다.

## 함께 읽을 글

- [Knowledge Stacks 개요](/guide/ks-overview/)
- [Query Settings](/guide/ks-query-settings/)
- [.mstyignore 파일](/guide/ks-ignore-file/)

## 참고한 문서

- [Knowledge Stacks Next Gen](https://docs.msty.ai/studio/knowledge-stacks/next-gen)
