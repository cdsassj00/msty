---
title: Msty Go Managed Services — 로컬 AI와 부가 서비스를 앱이 대신 준비하기
description: Go가 설치·시작·모델 내려받기·상태 점검을 안내하는 Managed Services의 범위, 관리형 로컬 AI(Ollama, MLX), 1-click 서비스, 운영체제별 컨테이너 런타임 조건을 설명합니다.
date: 2026-10-11
section: Msty Go
order: 50
verified: 2026-10-11
tags: [Msty, Go, Managed Services, Ollama, MLX, Docker]
---

## Managed Services란

로컬에서 AI를 돌리려면 보통 런타임을 설치하고, 서비스를 띄우고, 모델을 내려받고, 제대로 도는지 확인해야 합니다. **Managed Services**는 지원되는 구성 요소에 대해 이 과정을 Go가 안내해 주는 기능입니다. 새 컴퓨터에서 처음 성공하기까지의 시간을 줄이는 것이 목적입니다.

지원되는 서비스에 대해 Go가 안내하는 일은 네 가지입니다.

- 설치
- 시작
- 모델 내려받기
- 상태 점검과 사용 가능 여부 확인

문서가 꼽는 가장 큰 이점은 운영의 일관성입니다. 컴퓨터마다 설정이 조금씩 어긋나는 일이 줄고, 첫 실행에서 생긴 문제를 더 빨리 찾을 수 있습니다.

예를 들어(필자가 든 예입니다) 팀원 다섯 명이 각자 노트북에 로컬 모델을 준비해야 할 때, 각자 터미널로 따로 설치하는 대신 모두 Go 안의 같은 설정 흐름을 따르게 하면 환경 차이로 생기는 문제를 줄일 수 있습니다.

## 관리형 로컬 AI

현재 관리형 로컬 구성에 포함된 것은 두 가지입니다.

| 런타임 | 관리형 설정 지원 범위 |
|---|---|
| Ollama | macOS, Windows, Linux |
| MLX | 호환되는 Apple Silicon 환경으로 한정 |

일반적인 흐름은 다음과 같습니다.

1. 제공업체 설정을 저장합니다.
2. 앱 안의 설정·시작 버튼을 씁니다.
3. 지원되는 모델을 내려받거나 고릅니다.
4. 상태와 모델 준비 여부를 확인합니다.

운영용 에이전트를 만들기 전에 이 흐름을 끝까지 마치라고 문서는 권합니다. 뒤에서 생기는 실행 문제는 나중에 고치는 것보다 미리 피하는 쪽이 쉽기 때문입니다.

제공업체 쪽 설정은 [모델 제공업체 설정](/guide/go-model-providers/)에서 다룹니다.

## 1-click 서비스

Go는 작업 흐름을 통제하는 서비스도 한 번에 설정할 수 있게 해 줍니다. 문서가 든 서비스는 세 가지입니다.

| 서비스 | 설명 |
|---|---|
| Data Protection | 문서는 이름만 들고 있습니다. 다른 페이지에서는 Playbook 실행과 Context Scout가 이 기능과 함께 동작한다고 설명합니다 |
| Web Search | 웹 검색 기능. [도구 설정](/guide/go-tools/) 참고 |
| Airlock | 에이전트의 네트워크 접근에 대해 웹사이트 단위 허용·차단 정책을 적용합니다. 컨테이너 런타임이 있어야 합니다. [Airlock](/guide/go-airlock/) 참고 |

Data Protection이 구체적으로 무엇을 가리고 어떻게 설정하는지는 Go 공식 문서에 별도 페이지가 없습니다.

## 컨테이너 런타임 조건

컨테이너 기반 기능은 컴퓨터에 설치된 로컬 런타임을 씁니다.

| 운영체제 | 쓸 수 있는 런타임 |
|---|---|
| macOS | Docker, Podman, OrbStack |
| Windows | Docker, Podman |
| Linux | Docker, Podman |

macOS의 OrbStack 지원은 Docker 호환 명령을 통해 이루어집니다. OrbStack이 실행 중인데 Go가 찾지 못한다면, 에이전트 설정을 바꾸기 전에 Docker가 OrbStack 컨텍스트를 쓰고 있는지부터 확인합니다.

## 플랫폼별 참고

- Ollama 관리형 설정은 macOS, Windows, Linux를 지원합니다.
- MLX 관리형 설정과 모델 관리는 호환되는 Apple Silicon 환경으로 한정됩니다.
- Computer Use는 macOS와 Windows에서 쓸 수 있고, 로컬 도우미 프로그램을 씁니다. 이 도우미는 Tools 설정 영역에서 설치하거나 업데이트합니다.

여러 운영체제를 쓰는 팀이라면 주 제공업체 경로 하나를 먼저 표준으로 정하고, 다른 경로는 명시적인 예외로 다루라고 문서는 권합니다.

## 운영 요령

- 각 컴퓨터의 첫 배포에는 관리형 설정을 씁니다.
- 에이전트를 넓게 쓰기 전에 모델을 쓸 수 있는지 확인합니다.
- 제공업체 설정과 상태 점검을 정기 유지보수에 넣습니다.
- 업데이트나 컴퓨터 재시작 뒤에는 관리형 서비스 상태를 다시 확인합니다.

## 함께 쓰는 설정 영역

| 설정 | 용도 |
|---|---|
| **Settings > Model Providers** | 모델과 런타임 설정 |
| **Settings > Tools** | 검색과 도구 기능 |
| **Settings > Security** | 네트워크 정책과 실행 통제 |

General Settings 문서에 따르면 설정 검색으로 Managed Services 영역으로 바로 이동할 수 있습니다. 설정 화면 안에서 Managed Services가 놓인 정확한 메뉴 이름은 이 문서 페이지에 적혀 있지 않습니다.

## 알아 둘 점

- 관리형으로 내려받을 수 있는 모델 목록과 필요한 저장 공간은 공식 문서에 설명이 없습니다.
- LLaMA.cpp는 모델 제공업체 문서의 로컬 모델 검색 항목에 나오지만, 이 페이지의 "관리형 로컬 구성" 목록에는 Ollama와 MLX만 적혀 있습니다.

## 참고한 문서

- [Go 문서: Managed Services](https://docs.msty.ai/go/managed-services)
- [Go 문서: Model Providers](https://docs.msty.ai/go/model-providers)
- [Go 문서: General Settings](https://docs.msty.ai/go/general-settings)
