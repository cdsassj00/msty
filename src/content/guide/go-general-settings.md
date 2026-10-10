---
title: Msty Go General Settings — 앱 전체 기본값 정하기
description: Go의 Settings > General에 있는 설정 검색, 화면 모드와 테마, 기본 작업 방식, Pulse, 작업 공간 프로필 파일, 대화·폴더 옵션, 로그 경로, 버전 확인을 설명합니다.
date: 2026-10-11
section: Msty Go
order: 220
verified: 2026-10-11
tags: [Msty, Go, 설정, General Settings]
---

## General Settings란

**General Settings**는 Go의 일상적인 동작을 정하는 앱 전체 기본값입니다. 초기에 잘 맞춰 두면 대화, 에이전트, 팀 사이의 일관성이 좋아집니다.

**Settings > General**에서 엽니다.

## 한눈에 보기

| 영역 | 정하는 것 |
|---|---|
| Settings search | 설정 영역과 만들어 둔 항목으로 바로 이동 |
| Appearance | 화면 모드, 테마, 글자 크기 |
| Assistant defaults | 새 대화와 에이전트의 기본 Working Style |
| Pulse | 브리핑 기능 켜기와 모델 선택 |
| Workspace profile files | 작업 공간 루트의 프로필 파일 불러오기 |
| Chat and folder workflow | 대화와 폴더 정리 방식 |
| Data paths and diagnostics | 로그 등 앱 경로 |
| Version and updates | 버전과 업데이트 |

## 설정 검색

설정 검색을 쓰면 탭을 하나씩 넘겨 보지 않고 원하는 설정 영역으로 바로 갈 수 있습니다. 검색으로 찾을 수 있는 것은 두 종류입니다.

주요 설정 영역:

- General, Cloud, Security, Tools, Managed Services, Model Providers
- Model assignments와 working styles

사용자가 만들어 둔 항목:

- 채널 프리셋
- Sender Groups
- Rules
- MCP 서버

문서는 지원 통화나 도입 검토 회의에서 검색을 쓰라고 권합니다. 여러 사람이 같은 설정 화면에 빠르게 도달할 수 있습니다.

이 가이드의 여러 글에서 "정확한 메뉴 위치는 문서에 없다"고 적은 설정도 검색으로 찾을 수 있는 경우가 많습니다.

## 화면 모양

| 설정 | 선택지 |
|---|---|
| Mode | `Dark`, `Light`, `System` |
| Theme | 테마 선택 |
| Font size | 글자 크기 |

읽기 편한 것을 먼저 고르라고 문서는 권합니다. 안정된 화면 설정은 긴 작업에서 피로를 줄입니다. 팀이라면 최소 가독성 기준을 맞춰 두면 화면 캡처와 설명 자료를 함께 보기 쉽습니다.

테마는 [Extensions](/guide/go-extensions/)로 추가할 수도 있습니다.

## 기본 작업 방식

새 대화와 에이전트에 적용할 기본 **Working Style**을 정합니다.

이 기본값은 영향 범위가 넓습니다. 따로 덮어쓰지 않은 대화와 에이전트가 모두 이 값을 물려받기 때문입니다. 다섯 가지 방식의 차이는 [Working Styles](/guide/go-working-styles/)에 있습니다.

## Pulse

Pulse는 General Settings에서 설정합니다. Go가 최근 작업으로 비공개 브리핑을 준비해 주기를 바랄 때 켭니다. 필요한 조건은 세 가지입니다.

1. Pulse가 켜져 있다.
2. Pulse 모델이 선택되어 있다.
3. 선택한 모델을 돌릴 수 있는 제공업체가 하나 이상 보인다.

Pulse를 켜면 Go가 브리핑을 준비된 상태로 유지하기 위해 관리형 새로 고침 Task를 만듭니다. 사용법은 [Pulse](/guide/go-pulse/)에서 다룹니다.

## 작업 공간 프로필 파일

**Use workspace profile files** 설정은 현재 작업 공간의 루트에서 지원하는 파일을 불러오게 합니다.

- `SOUL.md`
- `IDENTITY.md`
- `USER.md`

작업 공간이 정체성, 문체, 사용자 선호를 파일로 명시해 두고 있을 때 씁니다. 우선순위 규칙과 주의할 점은 [작업 공간 프로필 파일](/guide/go-workspace-profile-files/)에 있습니다.

## 대화와 폴더 옵션

Go에는 진행 중인 대화를 정리된 상태로 유지하기 위한 폴더 중심 옵션이 있습니다. 폴더에 넣지 않은 대화를 다루는 옵션과, 폴더 맥락에서 새 대화나 새 에이전트 대화를 빠르게 만드는 흐름이 포함됩니다.

오래 걸리는 작업에서는 compact goal display 같은 화면 옵션으로, 실행 상태는 보이게 두면서 화면을 덜 복잡하게 할 수 있습니다.

최근 개선으로 다음도 지원합니다.

| 기능 | 설명 |
|---|---|
| 날짜별 묶음 | 대화를 Today, Yesterday, 그 이전 날짜 구간으로 묶습니다 |
| 최근 대화 표시 | 고정한 대화를 유지하면서 최근 대화가 더 잘 보입니다 |
| 접기·펼치기 | Workshop, Recents & Pinned, Folders, Unfiled 구역을 쉽게 접고 폅니다 |
| 완료 표시 점 | 다른 곳에 있는 동안 끝난 대화에 점이 표시됩니다 |
| 부분 선택 | 답변 안의 글자를 선택해 필요한 줄만 복사할 수 있습니다 |

폴더 단위로 기억을 쌓는 기능은 [Memory Bank](/guide/go-memory-bank/)의 폴더 메모리 항목에서 설명합니다.

각 옵션의 정확한 이름과 기본값은 이 문서 페이지에 나열되어 있지 않습니다.

## 데이터 경로와 진단

General Settings는 로그 같은 주요 앱 경로를 보여 줍니다. 문제 해결과 운영 지원에 씁니다.

문서는 이 경로를 지원 절차서에 적어 두라고 권합니다. 문제가 생겼을 때 대응이 빨라집니다. 사고가 나기 전에 경로가 보이는지 미리 확인해 두라는 조언도 있습니다.

운영체제별 실제 로그 폴더 위치는 공식 문서에 설명이 없습니다. 앱의 설정 화면에서 확인합니다.

## 버전과 업데이트

지원되는 경우 General Settings에서 앱 버전과 업데이트·도움말로 가는 입구를 볼 수 있습니다.

문제를 해결할 때는 버전부터 적어 둡니다. 이미 고쳐진 문제를 쫓느라 시간을 쓰는 일을 막을 수 있습니다. Go는 베타 제품이어서 버전에 따라 동작이 달라질 수 있습니다.

## 문서가 권하는 기준

1. 긴 작업에 편한 모드, 테마, 글자 크기를 고릅니다.
2. 설정을 검토할 때 설정 검색을 씁니다.
3. 팀의 기본 작업 방식 하나를 정합니다.
4. 사고가 나기 전에 진단 경로가 보이는지 확인합니다.
5. 큰 버전 업그레이드 뒤에는 기본값을 다시 확인합니다.

문서는 이 기준을 처음 한 번만 하는 설정이 아니라 주기적으로 다시 보는 운영 습관으로 다루라고 합니다.

## 관련 글

- [Msty Go 시작하기](/guide/go-getting-started/)
- [Cloud Sync](/guide/go-cloud-sync/)
- [보안 설정](/guide/go-security/)

## 참고한 문서

- [Go 문서: General Settings](https://docs.msty.ai/go/general-settings)
- [Go 문서: Pulse](https://docs.msty.ai/go/pulse)
- [Go 문서: Workspace Profile Files](https://docs.msty.ai/go/workspace-profile-files)
