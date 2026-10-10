---
title: 로컬 모델 설치와 관리
description: Model Hub의 Local Models에서 모델을 찾고, 설치하고, 가져오고, 엔진을 고르는 방법을 탭별로 설명합니다.
date: 2026-10-11
section: 모델 관리
order: 30
verified: 2026-10-11
tags: [Msty, 로컬 모델, Ollama, MLX, Llama.cpp]
---

## 로컬 모델이란

로컬 모델은 내 컴퓨터에 받아서 돌리는 모델입니다. 질문과 문서가 PC 밖으로 나가지 않고, 인터넷이 없어도 쓸 수 있으며, 성능을 직접 조정할 수 있습니다. 이 기능은 Msty Studio Desktop에서 씁니다.

Msty Studio는 세 가지 엔진으로 돌리는 모델을 **Local Models** 한곳에서 함께 관리합니다. 엔진은 모델을 실제로 실행하는 프로그램이며, **Ollama**, **MLX**, **Llama.cpp** 세 가지입니다.

처음 모델을 받는 과정은 [첫 실행과 모델 받기](/guide/first-run-and-models/)에서 다뤘습니다. 이 글은 그다음 단계인 탭별 기능과 엔진 선택을 설명합니다.

## 여는 방법

**Model Hub > Local Models**를 엽니다. 탭이 네 개 있습니다.

- **Featured**
- **Installed**
- **Model Search**
- **Import**

## Featured — 추천 목록에서 고르기

**Featured**는 선별된 모델 목록입니다. 한 모델에 Ollama, GGUF/Llama.cpp, MLX 형식이 있으면 한데 묶어 보여 줍니다.

- 엔진과 형식 필터로 목록을 좁힙니다.
- 모델의 용도, 크기, 내 하드웨어에 맞는지를 확인합니다.
- 추천 엔진으로 설치하거나, 다른 형식을 골라 설치합니다.
- 고른 엔진이 아직 설치되어 있지 않으면 Msty가 엔진부터 설치한 뒤 모델을 설치합니다.

Apple Silicon Mac에서는 MLX 형식이 있으면 대체로 MLX를 추천합니다. 다른 시스템에서는 하드웨어와 지원 엔진에 따라 추천이 달라집니다.

어떤 모델이 내 용도에 맞는지 모르겠다면 [Model Matchmaker](/guide/models-model-matchmaker/)를 씁니다.

## Installed — 받은 모델 관리하기

**Installed**는 모든 엔진의 모델을 하나의 목록으로 보여 줍니다. 엔진별 화면을 오갈 필요가 없습니다. 여기서 할 수 있는 일은 다음과 같습니다.

- 모델을 필터링하거나 둘러봅니다.
- 엔진, 모델 위치, 설정을 확인합니다.
- 모델 이름을 바꾸거나 용도 태그를 고칩니다.
- 지원되는 모델 설정과 채팅 템플릿 설정을 편집합니다.
- 모델을 삭제합니다.

## Model Search — 검색해서 설치하기

**Model Search**는 모델 찾기를 한 화면으로 합쳐 둔 탭입니다.

- Ollama 레지스트리와 Hugging Face를 검색합니다.
- 결과를 Ollama, GGUF, MLX 형식으로 걸러 봅니다.
- 호환되는 엔진에 바로 설치합니다.
- GGUF 모델이 Ollama와 Llama.cpp를 모두 지원하면 둘 중 어느 쪽으로 설치할지 고릅니다.

## Import — 이미 가진 모델 가져오기

다른 경로로 받아 둔 모델 파일이 PC에 있다면 다시 내려받지 않고 가져올 수 있습니다.

### GGUF 파일 가져오기

1. **Model Hub > Local Models > Import**를 엽니다.
2. **Select GGUF File**을 누릅니다.
3. `.gguf` 파일을 고릅니다.
4. Msty가 호환되는 엔진으로 가져옵니다. 쓸 수 있는 엔진이 없으면 엔진 설치를 안내합니다.

### Safetensors 또는 MLX 폴더 가져오기

1. **Model Hub > Local Models > Import**를 엽니다.
2. **Select Directory**를 누릅니다.
3. Safetensors 또는 MLX 파일이 들어 있는 모델 폴더를 고릅니다.
4. Msty가 모델 형식을 알아내고 호환되는 엔진을 사용합니다.

## 설치 진행 상황 보기

모델과 서비스 설치는 Msty Studio의 다른 화면을 쓰는 동안에도 계속됩니다.

- 사이드바의 Model Hub 배지에 진행 중인 설치 개수가 표시됩니다.
- 설치 목록 패널에서 다운로드 진행률을 봅니다.
- 같은 패널에서 다운로드를 취소할 수 있습니다.
- 설치가 끝난 모델은 **Installed** 탭에 나타납니다.

## 엔진 고르기

| 엔진 | 이럴 때 씁니다 |
|---|---|
| **Ollama** | 받을 수 있는 모델이 많고 사용 방법이 단순한 쪽을 원할 때. Msty가 관리하는 Ollama는 서비스 설정에서 **Local AI**라는 이름으로 표시됩니다 |
| **MLX** | Apple Silicon Mac에서 Apple의 통합 메모리 하드웨어에 맞춘 모델을 쓸 때 |
| **Llama.cpp** | GGUF 모델을 쓰고, 다양한 하드웨어를 지원받고, 실행 설정을 더 세밀하게 다루고 싶을 때 |

설정 화면에 Ollama라는 이름이 없어 당황할 수 있는데, **Local AI**가 곧 Msty가 관리하는 Ollama입니다. 이미 따로 설치해 둔 Ollama를 연결하는 방법은 [Ollama 연결하기](/guide/connect-ollama/)를 보세요.

## 로컬 서비스 관리하기

엔진별 서비스 제어는 Settings에 있습니다.

- **Settings > Local AI**
- **Settings > MLX Service**
- **Settings > Llama.cpp Service**

이 화면들에서 서비스 상태, 엔드포인트, 버전, 로그를 확인하고, 서비스를 시작·중지하고, 지원되는 가속 옵션을 설정합니다.

### GPU 가속

호환되는 GPU가 있다면 해당 서비스 설정에서 지원되는 가속 옵션을 켭니다. 어떤 GPU가 호환되는지에 대한 목록은 이 문서 페이지에 없습니다.

## Llama.cpp 모델의 전용 파라미터

대화에서 Llama.cpp 모델을 고른 상태로 **Model Parameters**를 열면 Llama.cpp 전용 설정이 나옵니다.

| 설정 | 하는 일 |
|---|---|
| **Num ctx** | 실행 시 컨텍스트 창 크기를 정합니다 |
| **Truncate Middle** | 대화의 앞부분과 최근 부분은 남기고 가운데를 잘라 냅니다 |
| **Truncate Old** | 가장 오래된 메시지부터 지웁니다 |
| **None** | 대화 기록을 자동으로 자르지 않습니다. 모델의 컨텍스트 한도를 넘을 수 있습니다 |

대화가 길어져 모델이 한 번에 읽을 수 있는 분량을 넘을 때 무엇을 버릴지 정하는 설정입니다. 처음에 준 지시가 중요한 작업이라면 **Truncate Middle**이, 최근 흐름만 중요하다면 **Truncate Old**가 맞습니다. 컨텍스트 창이 무엇인지는 [Context Explorer](/guide/models-context-explorer/) 글에서 다룹니다.

## 다음에 읽을 글

- [Model Hub 한눈에 보기](/guide/models-model-hub/)
- [Context Explorer로 메모리와 컨텍스트 미리 계산하기](/guide/models-context-explorer/)
- [모델 찾기](/models/)

## 참고한 문서

- [Local Models](https://docs.msty.ai/studio/managing-models/local-models)
