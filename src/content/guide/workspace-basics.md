---
title: 작업 공간(Workspaces) 만들고 옮기기
description: Msty Studio에서 작업 공간을 새로 만들고, 설정을 복사하고, Zip 파일로 내보내고 가져오는 방법을 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 10
verified: 2026-10-11
tags: [Msty, Studio, Workspaces]
---

## 작업 공간이란

작업 공간(Workspace)은 Msty Studio 안에서 서로 분리된 작업 영역입니다. 공식 문서에 따르면 작업 공간마다 모델, 대화, 도구 묶음(toolsets), 프롬프트 같은 설정을 따로 가질 수 있습니다.

컴퓨터의 사용자 계정을 떠올리면 쉽습니다. 같은 프로그램을 쓰지만 계정마다 바탕화면과 파일이 다른 것처럼, 같은 Studio를 쓰지만 작업 공간마다 대화 목록과 설정이 다릅니다.

요금 페이지의 비교표에서 Workspaces는 Free를 포함한 모든 요금제에 제공되는 것으로 표시되어 있습니다.

## 언제 나누면 좋은가

문서는 "프로젝트를 정리하기 위해"라고만 설명합니다. 실제로 나누기 좋은 경우를 들어 보면 다음과 같습니다.

| 나누는 기준 | 예 |
|---|---|
| 업무와 개인 | 회사 문서를 다루는 공간과 개인 공부용 공간 |
| 고객별 | 고객사 A의 자료와 고객사 B의 자료가 섞이지 않게 |
| 모델 구성별 | 로컬 모델만 쓰는 공간과 온라인 모델을 쓰는 공간 |
| 실험용 | 새 프롬프트와 도구를 시험하는 공간 |

예를 들어 컨설턴트가 고객사 두 곳의 일을 한다면 작업 공간을 둘로 나눕니다. 각 공간에 해당 고객의 대화와 프롬프트만 두면, 한쪽 대화에 다른 쪽 자료가 끼어들 일이 줄어듭니다.

작업 공간 안에서 대화를 폴더로 묶는 방법은 [프로젝트와 대화 정리하기](/guide/workspace-organize/)에서 다룹니다. 작업 공간은 큰 칸막이, 프로젝트 폴더는 그 안의 서랍이라고 보면 됩니다.

## 기본 작업 공간

Msty Studio를 처음 실행하면 기본 작업 공간이 하나 만들어집니다. 따로 손대지 않으면 모든 대화와 설정이 여기에 쌓입니다. 처음에는 이것 하나로 충분하며, 섞이면 곤란한 일이 생길 때 나누면 됩니다.

## 새 작업 공간 만들기

1. 화면 왼쪽, Msty 로고와 기본 작업 공간 아이콘 아래에 있는 **+** 기호를 누릅니다.
2. **Workspace Name**에 다른 공간과 겹치지 않는 이름을 넣습니다.
3. 필요하면 현재 작업 공간에서 새 공간으로 복사할 설정을 고릅니다.
4. **Create and Switch**를 누릅니다. 작업 공간이 만들어지고 바로 그 공간으로 넘어갑니다.

3단계의 설정 복사는 선택 사항입니다. 복사하지 않으면 빈 공간으로 시작합니다. 모델 제공업체 설정을 매번 다시 넣기 번거롭다면 복사하는 편이 편합니다. 복사할 수 있는 설정 항목의 전체 목록은 문서에 나와 있지 않으므로, 화면에 나오는 선택지를 확인하세요.

한 가지 주의할 점이 있습니다. 현재 작업 공간에 잠금이 켜져 있으면, 설정을 복사해 만든 새 작업 공간에도 같은 암호 문구로 잠금이 들어갑니다. [작업 공간 잠금과 비밀값 암호화](/guide/workspace-lock-encryption/)를 참고하세요.

## 작업 공간 사이를 오가기

왼쪽의 작업 공간 아이콘을 눌러 바꿉니다. 단축키로 작업 공간 영역(workspace tray)을 여닫을 수도 있습니다. 기본값은 Mac에서 `Cmd + 8`, Windows와 Linux에서 `Ctrl + 8`입니다. Command Palette(`Cmd/Ctrl + K`)에서도 새 작업 공간을 만들 수 있습니다. 단축키는 [단축키와 Command Palette](/guide/settings-shortcuts-command-palette/)에 정리했습니다.

## 작업 공간 내보내기

작업 공간을 파일로 저장해 두거나 다른 컴퓨터로 옮길 때 씁니다.

1. 작업 공간 아이콘을 마우스 오른쪽 버튼으로 누릅니다.
2. **Export Workspace**를 고릅니다.
3. Zip 파일이 만들어지면 내 컴퓨터에 저장합니다.

## 작업 공간 가져오기

1. **+** 기호를 누릅니다.
2. **Import Workspace**를 고릅니다.
3. 내 컴퓨터에서 Zip 파일을 골라 Msty Studio로 가져옵니다.

잠긴 작업 공간을 가져오면, 가져온 뒤에 암호 문구로 잠금을 풀어야 합니다.

## 대화를 다른 작업 공간으로 보내기

대화 하나만 다른 작업 공간으로 옮기거나 복사할 수도 있습니다. 대화의 말줄임표(…) 메뉴에 작업 공간으로 복사·이동하는 항목이 있습니다. [프로젝트와 대화 정리하기](/guide/workspace-organize/)에서 설명합니다.

## 알아 둘 점

- **기기 간 자동 동기화는 없습니다.** Studio 문서의 Quick Start는 데이터가 기기에 로컬로 저장되고 기기 사이에 자동으로 동기화되지 않는다고 밝힙니다. 다른 컴퓨터에서 같은 작업 공간을 쓰려면 내보내기와 가져오기로 옮겨야 합니다.
- **내보낸 Zip 파일은 민감한 자료입니다.** 대화와 설정이 들어 있으므로 보관 위치와 공유 대상에 주의하세요. Zip 안에 API 키가 어떤 형태로 들어가는지는 문서에 설명이 없습니다.
- **작업 공간이 보이지 않을 때**는 Lost & Found로 찾아볼 수 있습니다. [데이터 백업과 복구](/guide/settings-backup-lost-found/)를 보세요.
- 작업 공간 개수 제한, 작업 공간 삭제 방법은 이 문서 항목에 적혀 있지 않습니다.

## 다음에 읽을 글

- [프로젝트와 대화 정리하기](/guide/workspace-organize/)
- [환경과 변수(Environments)](/guide/workspace-environments/)
- [작업 공간 잠금과 비밀값 암호화](/guide/workspace-lock-encryption/)

## 참고한 문서

- [Workspaces](https://docs.msty.ai/studio/workspaces/)
- [Workspace Lock and Secrets Encryption](https://docs.msty.ai/studio/workspaces/lock-and-encryption)
- [Keyboard Shortcuts](https://docs.msty.ai/studio/settings/keyboard-shortcuts)
- [Quick Start](https://docs.msty.ai/studio/getting-started/quick-start)
- [Msty 요금](https://msty.ai/pricing/)
