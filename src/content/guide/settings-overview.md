---
title: 설정(Settings) 화면 둘러보기
description: Msty Studio의 Settings 화면이 어떤 항목으로 나뉘는지, 각 항목에서 무엇을 바꿀 수 있는지 공식 문서 기준으로 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 50
verified: 2026-10-11
tags: [Msty, Studio, Settings]
---

## 설정 화면 열기

Settings는 Msty Studio의 모양과 동작, 내장 서비스를 바꾸는 곳입니다. 여는 방법은 다음과 같습니다.

- 단축키: Mac에서 `Cmd + ,`, Windows와 Linux에서 `Ctrl + ,`
- Command Palette(`Cmd/Ctrl + K`)에 `settings`를 입력

공식 문서는 Settings를 아홉 묶음으로 설명합니다.

| 묶음 | 하는 일 |
|---|---|
| General | 화면 모양, 앱 정보 |
| Agent Mode | 에이전트 모드의 편집기와 표시 방식 |
| Local AI Service | 내장 로컬 모델 서비스 관리 |
| MLX Service | Apple Silicon용 MLX 서비스 관리 |
| Vibe CLI Proxy | CLI 프록시 서비스 관리 |
| Remote Service and Data | 원격 연결, 백업, 데이터 이전 |
| Keyboard Shortcuts | 단축키 |
| Desktop Extras | 로그 보기, 알림, 창 고정 |
| License and Access | 라이선스 키, 로그인 |

## General: Appearance

화면의 모양을 바꿉니다.

| 설정 | 내용 |
|---|---|
| Theme | Light, Dark, System 가운데 선택 |
| 분위기와 색 | 인터페이스 분위기, 강조색(accent), 기본색(base color) |
| Mode | Vapor, Focus, Zen. [작업 모드](/guide/settings-modes/) 참고 |
| 글꼴 | 글자 크기와 글꼴 모양 |
| Code theme | 코드 블록의 색 구성 |
| 렌더링 모듈 | Markdown, Mermaid, Math, GFM, 코드 강조, 접을 수 있는 블록, 링크 |
| RTL | 오른쪽에서 왼쪽으로 쓰는 언어 지원 |

렌더링 모듈은 모델의 답을 화면에 어떻게 그릴지 정합니다. 예를 들어 Mermaid를 켜면 모델이 쓴 도식 코드가 그림으로 보이고, Math를 켜면 수식이 수식 모양으로 보입니다.

한글을 오래 읽는다면 글자 크기를 한 단계 키우는 것만으로도 편해집니다.

## General: App Info

| 항목 | 내용 |
|---|---|
| 버전과 업데이트 | 앱 버전을 보고 업데이트를 실행 |
| 데이터 경로 | 앱 데이터와 로그가 저장되는 위치 |
| 설정 초기화 | 앱 설정을 처음 상태로 되돌림 |
| 도움말 | 도움말과 지원 링크 |
| 웹 보안 해제 옵션 | 특정 CORS 문제를 해결할 때 쓰는 선택 옵션 |

데이터 경로는 백업 위치를 확인하거나 문제를 신고할 때 로그를 찾는 데 씁니다. 웹 보안 해제 옵션은 문서가 문제 해결용이라고 설명하므로, 평소에는 켜지 않는 것이 좋습니다.

## Agent Mode

Agent Mode에서 쓰는 설정입니다.

- 어댑터 업데이트 확인
- 선호하는 편집기 선택
- Vim mode 켜고 끄기
- 변경 내용 비교(diff) 표시 방식
- 로컬 제공업체 켜고 끄기

Vim mode를 켜면 Agent Mode에서 `gg`(맨 처음으로), `G`(맨 끝으로) 같은 Vim 방식 이동을 쓸 수 있습니다.

## Local AI Service

Msty가 관리하는 로컬 모델 서비스입니다. 이 항목은 Local AI Service가 설치되어 있을 때만 보입니다.

| 구분 | 내용 |
|---|---|
| 상태 | 모델 경로, 상태(health), 접속 주소(endpoint), 서비스 버전 |
| 동작 | Start, Stop, Restart, Update, Remove |
| 서비스 설정 | 포트, 동시 대화 수, 올려 둘 모델 수, 네트워크 접근, 로그 |
| 모델별 설정 | keep-alive, 고급 JSON 옵션 |

실무에서 자주 만지는 것은 세 가지입니다.

- **모델 경로**: 모델 파일이 저장되는 곳입니다. 디스크 공간이 부족하면 여기를 확인합니다.
- **네트워크 접근**: 다른 기기에서 이 PC의 모델을 쓰게 할 때 켭니다. [Remote Connections](/guide/settings-remote-connections/)에서 설명합니다.
- **keep-alive**: 모델을 메모리에 얼마나 오래 올려 둘지 정합니다. 길게 두면 다음 질문에 빨리 답하지만 메모리를 계속 차지합니다.

Ollama 모델을 받는 방법은 [Msty에서 Ollama 모델 쓰기](/guide/connect-ollama/)를 보세요.

## MLX Service

Apple Silicon 기기에서만 나옵니다. MLX는 Apple 칩에 맞춘 실행 방식입니다.

- 상태: 모델 경로, 상태, 접속 주소, 서비스 버전
- 동작: Update, Remove
- 옵션: 네트워크, 로그

## Vibe CLI Proxy

- 상태: 서비스 상태, 접속 주소, 버전
- 설정: 네트워크 접근, 로그, 포트, 재시도
- 인증 폴더 정보
- 제공업체 인증 관리

제공업체별 세부 사항은 Studio 문서의 Vibe CLI Proxy 항목에 있습니다. 이 글에서는 다루지 않습니다.

## Remote Service and Data

세 가지 기능으로 이어집니다.

| 기능 | 정리한 글 |
|---|---|
| Remote connections | [Remote Connections](/guide/settings-remote-connections/) |
| Backups and restore | [데이터 백업과 복구](/guide/settings-backup-lost-found/) |
| Data migration | Studio 문서 Quick Start의 데이터 이전 부분 |

## Keyboard Shortcuts

**Settings > Keyboard Shortcuts**에서 단축키를 관리합니다. Command Palette 단축키와 Shiftcuts 동작도 여기서 바꿉니다. [단축키와 Command Palette](/guide/settings-shortcuts-command-palette/)에 정리했습니다.

## Desktop Extras

데스크톱 앱에 있는 부가 기능입니다.

| 기능 | 내용 |
|---|---|
| Log Viewer | 로그를 보고, 걸러 보고, 복사합니다. 실시간으로 흘러가는 로그도 볼 수 있습니다 |
| Notifications | 앱에서 생긴 일과 오류를 한곳에서 봅니다 |
| Always On Top | 대화 창을 항상 맨 위에 둡니다. 데스크톱 전용이며 대화의 작업 메뉴에서 켭니다 |

모델이 응답하지 않거나 도구 실행이 실패하면 Log Viewer부터 열어 보는 것이 순서입니다. Always On Top은 다른 문서를 보면서 대화 창을 옆에 띄워 둘 때 편합니다.

## License and Access

유료 기능을 쓰려면 여기에 라이선스 키를 넣습니다. Enterprise 사용자는 여기서 **Enterprise Login**으로 로그인합니다. [라이선스 관리하기](/guide/settings-manage-license/)와 [사용자 관리](/guide/enterprise-users/)를 보세요.

## 그 밖의 설정 위치

문서의 다른 항목에 나오는 Settings 경로도 모았습니다.

| 경로 | 기능 |
|---|---|
| **Settings > General > Conversations** | 오래된 대화 보관. [프로젝트와 대화 정리하기](/guide/workspace-organize/) |
| **Settings > General** 의 Workspace Lock & Secrets Encryption | [작업 공간 잠금](/guide/workspace-lock-encryption/) |
| **Settings > Default Prompts** | [기본 프롬프트 고치기](/guide/settings-default-prompts/) |
| **Settings > Data > Lost & Found** | [데이터 백업과 복구](/guide/settings-backup-lost-found/) |
| **Settings > Teams** | Enterprise 관리. [Enterprise 개요](/guide/enterprise-overview/) |

## 처음 손볼 만한 설정

문서에 권장 순서는 없습니다. 처음 설치한 사람에게 쓸모 있는 순서를 적어 봅니다.

1. **Theme**와 글자 크기를 눈에 맞게 바꿉니다.
2. Local AI Service의 모델 경로를 확인하고, 디스크 여유를 봅니다.
3. 백업 알림 주기를 정하고 한 번 백업해 봅니다.
4. 자주 쓰는 단축키 서너 개를 익힙니다.

## 참고한 문서

- [Settings](https://docs.msty.ai/studio/settings/settings)
- [Keyboard Shortcuts](https://docs.msty.ai/studio/settings/keyboard-shortcuts)
- [Organize](https://docs.msty.ai/studio/workspaces/organize)
- [Manage Users](https://docs.msty.ai/studio/enterprise/users)
