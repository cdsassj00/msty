---
title: 단축키와 Command Palette
description: Msty Studio의 기본 단축키, Shift를 두 번 누르는 Shiftcuts, 그리고 무엇이든 검색해 실행하는 Command Palette 사용법을 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 70
verified: 2026-10-11
tags: [Msty, Studio, Settings, 단축키]
---

## 두 가지 빠른 길

Msty Studio에서 마우스 없이 움직이는 방법은 두 가지입니다.

- **단축키**: 정해진 키 조합으로 한 가지 동작을 바로 실행합니다.
- **Command Palette**: 검색 창을 열어 하고 싶은 일을 입력하고 실행합니다.

단축키를 다 외울 필요는 없습니다. Command Palette를 여는 `Cmd/Ctrl + K` 하나만 외우면 나머지는 검색해서 찾을 수 있습니다.

## 기본 단축키

공식 문서는 단축키를 `Cmd/Ctrl` 표기로 적습니다. Mac에서는 Cmd, Windows와 Linux에서는 Ctrl을 누른다는 뜻입니다.

| 동작 | Mac | Windows / Linux |
|---|---|---|
| Command Palette 열기 | `Cmd + K` | `Ctrl + K` |
| 새 대화 시작 | `Cmd + N` | `Ctrl + N` |
| 분할 대화(split chat) 추가 | `Cmd + T` | `Ctrl + T` |
| 사이드바 여닫기 | `Cmd + 1` | `Ctrl + 1` |
| 작업 공간 영역 여닫기 | `Cmd + 8` | `Ctrl + 8` |
| 설정 열기 | `Cmd + ,` | `Ctrl + ,` |
| 대화 검색 열기 | `Cmd + Shift + F` | `Ctrl + Shift + F` |
| 분할 제거 모드 들어가기 | `Cmd + W` | `Ctrl + W` |

분할 대화는 여러 모델을 나란히 놓고 비교하는 Split Chats 기능입니다. `Cmd/Ctrl + T`로 칸을 더하고, `Cmd/Ctrl + W`로 제거 모드에 들어가 칸을 없앱니다.

## Shiftcuts

Shiftcuts는 Shift 키를 두 번 누른 다음 글자 키 하나를 누르는 방식입니다. 조합 키를 동시에 누르기 어려운 사람에게 편합니다.

| 동작 | 누르는 순서 |
|---|---|
| 새 분할 대화 탭 만들기 | `Shift`, `Shift`, `t` |
| 새 대화 만들기 | `Shift`, `Shift`, `n` |
| 사이드바 여닫기 | `Shift`, `Shift`, `1` |
| 환경 변수 빠른 선택 | `Shift`, `Shift`, `e` |

마지막 줄의 환경 변수 선택 창은 [환경과 변수](/guide/workspace-environments/)에서 쓰는 것입니다.

글을 쓰다가 Shift를 연달아 누르는 버릇이 있어 Shiftcuts가 방해된다면 끌 수 있습니다. **Settings > Keyboard Shortcuts** 화면 맨 위의 Shiftcuts 스위치를 끕니다.

## Agent Mode의 Vim 이동

Agent Mode에서 Vim 방식 이동을 쓸 수 있습니다. 먼저 **Settings > Agent Mode**에서 Vim Mode를 켜야 합니다.

| 동작 | 키 |
|---|---|
| 맨 처음으로 이동 | `gg` |
| 맨 끝으로 이동 | `G` |

문서에 나온 Vim 이동은 이 두 가지입니다.

## 단축키 바꾸기

**Settings > Keyboard Shortcuts**에서 단축키를 바꿉니다. Command Palette를 여는 단축키도 여기서 바꿀 수 있습니다.

다른 프로그램과 단축키가 겹칠 때 바꾸면 됩니다. 예를 들어 화면 캡처 프로그램이 같은 조합을 먼저 가로챈다면 Studio 쪽을 다른 조합으로 옮깁니다.

## Studio Web에서의 주의점

문서는 Studio Web에서 단축키 동작이 브라우저 자체의 단축키 규칙에 따라 달라질 수 있다고 적었습니다. 예를 들어 `Ctrl + T`는 대부분의 브라우저에서 새 탭을 여는 키이고 `Ctrl + W`는 탭을 닫는 키입니다. 웹 버전에서 단축키가 기대대로 움직이지 않으면 Shiftcuts나 Command Palette를 쓰는 편이 안전합니다.

## Command Palette란

Command Palette는 이동, 만들기, 설정, 데스크톱 동작을 한곳에서 검색해 실행하는 창입니다. `Cmd/Ctrl + K`로 엽니다.

### 쓰는 순서

1. `Cmd/Ctrl + K`를 누릅니다.
2. 하고 싶은 일을 입력합니다. 문서가 든 예는 `new`, `persona`, `settings`입니다.
3. 화살표 키나 `Tab`으로 결과를 오갑니다.
4. `Enter`로 고른 명령을 실행합니다.
5. `Esc`로 닫습니다.

명령 이름이 영어이므로 검색어도 영어로 넣습니다.

### 명령의 네 종류

| 종류 | 할 수 있는 일 |
|---|---|
| 만들기 | 새 대화, 분할 대화, persona 또는 crew 대화, Forge 캔버스, 작업 공간 |
| 이동 | Model Hub, Toolbox, Persona Studio, Prompt Studio, Turnstiles, Knowledge Stacks, Environments, Notifications 등으로 바로 가기 |
| 설정과 모양 | 설정 항목 열기, 미니맵 켜고 끄기, Theme·Mode·분할 너비·강조색·기본색 바꾸기 |
| 데스크톱 | 업데이트 확인, Log Viewer 열기. 데스크톱 앱에서만 나옵니다 |

요금제에 따라 쓸 수 없는 기능으로 가는 명령은 실행해도 그 기능을 쓸 수 없습니다. 예를 들어 Turnstiles와 Forge Mode는 요금 비교표에서 Aurum 이상 기능입니다.

### 다른 화면이 열려 있어도 됩니다

Command Palette는 다음 화면이 열려 있는 동안에도 쓸 수 있습니다.

- Model Hub
- Settings
- Toolbox
- Persona Studio, Prompt Studio
- Turnstiles
- Knowledge Stacks
- Environments
- Notifications, Insights, Log Viewer

지금 열린 화면을 먼저 닫을 필요가 없습니다. 이동 명령을 실행하면 Msty가 열려 있던 화면을 닫고 고른 곳을 엽니다. 예를 들어 Settings를 보다가 `Cmd/Ctrl + K`, `knowledge`, `Enter`를 누르면 바로 Knowledge Stacks로 넘어갑니다.

### 열리지 않을 때

문서에 따르면 다음 상황에서는 Command Palette를 쓸 수 없을 수 있습니다.

- 확인을 기다리는 대화 상자가 떠 있을 때
- 편집 서랍(editor drawer)이 열려 있을 때
- 라이선스 안내 창이 떠 있을 때
- 그 밖에 사용자의 응답이 필요한 창이 떠 있을 때

먼저 그 창을 처리한 뒤 다시 누릅니다.

## 익혀 두면 좋은 조합

문서에 권장 목록은 없습니다. 자주 하는 일에 맞춰 골라 본 다섯 가지입니다.

| 하려는 일 | 누르는 키 |
|---|---|
| 새 질문을 시작한다 | `Cmd/Ctrl + N` |
| 다른 모델의 답도 보고 싶다 | `Cmd/Ctrl + T` |
| 예전 대화를 찾는다 | `Cmd/Ctrl + Shift + F` |
| 화면을 넓게 쓴다 | `Cmd/Ctrl + 1` |
| 나머지 전부 | `Cmd/Ctrl + K` |

화면을 더 넓게 쓰는 방법은 [작업 모드](/guide/settings-modes/)의 Focus 모드를 보세요. Settings 화면 전체 구성은 [설정 화면 둘러보기](/guide/settings-overview/)에 있습니다.

## 참고한 문서

- [Keyboard Shortcuts](https://docs.msty.ai/studio/settings/keyboard-shortcuts)
- [Command Palette](https://docs.msty.ai/studio/settings/command-palette)
- [Msty 요금](https://msty.ai/pricing/)
