---
title: Compose Options — 문서를 나누고 임베딩하는 설정
description: Knowledge Stack을 Compose할 때 정하는 임베딩 모델, 조각 나누기 방식, 파일별 불러오기 방식과 잠금 옵션을 설명합니다.
date: 2026-10-11
section: Knowledge Stacks
order: 20
verified: 2026-10-11
tags: [Msty, Knowledge Stacks, 청킹, 임베딩]
---

## Compose가 하는 일

**Compose**는 등록한 자료를 검색할 수 있는 상태로 준비하는 작업입니다. 세 단계로 진행됩니다.

1. 각 자료를 읽어 조각(chunk)으로 나눕니다.
2. 임베딩 모델이 각 조각을 벡터(숫자 묶음)로 바꿉니다.
3. 벡터를 검색 가능한 색인에 저장합니다.

조각을 어떻게 나누느냐에 따라 검색 품질이 달라집니다. 배경 설명은 [문서 청킹](/learn/chunking-documents/)과 [임베딩이란](/learn/what-is-embedding/)을 참고합니다.

Compose 설정은 두 층으로 나뉩니다. 자료 하나하나에 거는 설정과, Compose 과정 전체에 거는 설정입니다.

## 자료별 고급 옵션

자료(파일, 폴더, 노트, YouTube 링크)를 추가할 때 말줄임표 메뉴에서 설정합니다. 쓸 수 있는 옵션은 자료 종류에 따라 다릅니다. 공식 문서에서 이 항목에는 **Aurum Perk** 표시가 붙어 있습니다.

### Load Modes (파일에만 해당)

원본 파일이 바뀌었을 때 어떻게 반영할지를 정합니다.

| 모드 | 동작 | 맞는 경우 |
|---|---|---|
| **Static Mode** (기본값) | 파일을 추가할 때 저장해 둔 사본을 씁니다. 빠르고 결과가 일정하지만 이후 변경은 반영되지 않습니다 | 바뀔 일이 거의 없는 파일 |
| **Dynamic Mode** | Compose할 때마다 파일의 최신 내용을 읽습니다. 조금 느리지만 항상 최신입니다 | 원본을 고치기는 하지만 Compose는 직접 다시 실행해도 괜찮은 경우 |
| **Sync Mode** | 파일 변경을 감시하다가 자동으로 다시 Compose합니다 | 작고 자주 바뀌는 파일 |

Sync Mode를 쓰려면 파일을 sync 대상으로 표시한 뒤, Knowledge Stack 메뉴에서 **Start Sync Mode**를 눌러 감시를 시작합니다. sync 대상 파일이 바뀐 것을 감지하면 Msty는 앱을 실행할 때에도 자동으로 다시 Compose합니다.

공식 문서는 Sync Mode가 비용이 클 수 있다고 경고합니다. 파일이 자주 바뀌면 그때마다 내 PC의 자원과 처리 시간을 쓰기 때문입니다.

### Mark for Reprocessing

**Compose**를 눌렀을 때 이 표시가 된 자료만 다시 처리합니다. 자료 100개 중 3개만 고쳤다면 그 3개에만 표시해 시간을 아낍니다.

### Ignore for Retrieval

해당 자료를 검색 대상에서 뺍니다. 스택을 다듬는 동안 특정 자료를 잠시 제외해 보고 결과가 어떻게 달라지는지 확인할 때 씁니다.

### Lock a Resource

| 잠금 종류 | 동작 |
|---|---|
| 임시 잠금 | 다시 Compose할 때 이 파일은 건너뜁니다. 마지막으로 Compose된 내용은 검색 결과에 계속 나옵니다 |
| 영구 잠금 | **되돌릴 수 없습니다.** 삭제할 때까지 잠긴 상태로 남습니다. 원본 파일이 앞으로 바뀔 일이 전혀 없을 때만 씁니다 |

가져온(import) Knowledge Stack의 자료는 기본으로 영구 잠금 상태입니다. 가져온 스택에는 벡터 데이터베이스만 들어 있고 원본 파일은 내 PC에 없다고 보기 때문입니다.

## Compose Settings

**Compose Settings** 영역에서 스택 전체에 적용되는 설정을 정합니다.

### Embedding Model

기본값은 gte-tiny입니다. Msty 앱에 있는 임베딩 모델이라면 어느 것이든 고를 수 있으며, 모델은 **Model Hub > Local Models**에서 찾습니다.

공식 문서는 임베딩 모델을 고를 때 다음을 따져 보라고 합니다.

- 검색 성능
- 다루는 분야와의 관련성
- 효율(크기와 속도)
- 내 환경과의 호환성

모델이 선택지에 나타나려면 그 모델의 용도(purpose)에 **Embedding**이 켜져 있어야 합니다. 모델 선택 목록이나 Model Hub의 설치된 로컬 모델 영역에서 모델 수정 아이콘을 눌러 확인합니다. 받아 둔 임베딩 모델이 목록에 안 보인다면 이 설정부터 확인합니다.

### Chunking Method

조각은 보통 몇백 단어 분량이며, 맥락을 유지하면서 토큰 한도 안에 들어가도록 크기를 잡습니다.

| 방식 | 나누는 기준 |
|---|---|
| **Recursive Character** | 글자 수를 기준으로 나눕니다 |
| **Sentence** | 문장 경계에서 나눕니다 |

Next Gen 스택에서는 여기에 **File (Single Chunk)** 방식이 추가됩니다. [Knowledge Stacks Next Gen](/guide/ks-next-gen/) 글에서 다룹니다.

### 그 밖의 조각 설정

| 설정 | 설명 |
|---|---|
| **Overlapping** | 이웃한 조각끼리 얼마나 겹치게 할지 정합니다. Chunking Method가 Recursive Character일 때만 쓸 수 있습니다 |
| **Chunk Size** | 조각 하나의 최대 크기입니다. 작게 잡으면 검색 정확도가 좋아질 수 있지만 처리 시간과 토큰 사용량이 늘어납니다 |
| **Chunk Size to Ignore** | 지정한 크기의 조각(예: 지나치게 작거나 큰 조각)을 처리에서 제외합니다 |

각 설정의 권장 숫자는 공식 문서에 설명이 없습니다. 설정을 바꾼 뒤 [Chunks Visualizer](/guide/ks-chunks-visualizer-console/)에서 조각이 어떻게 나뉘었는지 직접 확인하는 방법이 안내되어 있습니다.

## Compose 실행

- **Compose** 버튼을 누르면 시작합니다.
- Compose 설정을 바꾸지 않은 채 다시 Compose하려면 **Force Compose**를 누릅니다.

## 함께 읽을 글

- [Knowledge Stacks 개요](/guide/ks-overview/)
- [Query Settings](/guide/ks-query-settings/)
- [Chunks Visualizer와 Chunks Console](/guide/ks-chunks-visualizer-console/)

## 참고한 문서

- [Compose Options](https://docs.msty.ai/studio/knowledge-stacks/compose-options)
