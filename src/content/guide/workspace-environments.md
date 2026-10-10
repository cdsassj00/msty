---
title: 환경과 변수(Environments) 쓰기
description: Msty Studio의 Environments로 API 키와 반복되는 값을 변수로 관리하고, 환경을 바꿔 가며 쓰는 방법을 정리합니다. Aurum 기능입니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 30
verified: 2026-10-11
tags: [Msty, Studio, Environments, Aurum]
---

## Environments란

Environments(환경)는 프로젝트나 쓰임새에 따라 다른 설정값 묶음을 만들어 두고 바꿔 쓰는 기능입니다. 값을 일일이 손으로 고치지 않고 환경만 바꾸면 됩니다.

핵심은 변수입니다. 자주 바뀌거나 숨겨야 하는 값을 이름을 붙여 저장해 두고, 실제로 쓰는 자리에는 이름만 적습니다. 실행할 때 Msty가 그 이름을 현재 환경의 값으로 바꿔 넣습니다.

## 요금제 조건

공식 문서에서 이 기능에는 "Aurum Perk" 표시가 붙어 있습니다. 요금 페이지의 비교표에서도 "Environments - Variables Management"는 Free에서 미제공, Aurum과 Teams에서 제공으로 표시됩니다. 요금은 [요금제 자세히 보기](/guide/pricing/)를 보세요.

## 어떤 때 쓰는가

| 상황 | 변수로 만들 값 |
|---|---|
| 개인용 API 키와 회사용 API 키를 번갈아 쓴다 | 제공업체 API 키 |
| 고객사마다 시스템 프롬프트의 회사 이름만 다르다 | 회사 이름, 담당자 이름 |
| 시험용 서버와 운영 서버의 주소가 다르다 | 도구가 호출하는 주소 |
| 대화에 오늘 날짜를 자주 넣는다 | 동적 변수 |

예를 들어 "개인"과 "회사" 환경을 만들고 양쪽에 같은 이름의 변수 `MSTY_OPENAI_KEY`를 두되 값만 다르게 넣습니다. 모델 제공업체의 API 키 칸에는 변수 이름을 적어 둡니다. 그러면 환경을 "회사"로 바꾸는 것만으로 회사 키로 호출하게 됩니다. 문서도 이 방식을 팁으로 권합니다.

## 환경 관리 화면 열기

1. 왼쪽 메뉴에서 말줄임표 아이콘을 누릅니다.
2. **Environments**를 고릅니다.
3. **Manage Environments**를 고릅니다.

Command Palette(`Cmd/Ctrl + K`)에서도 Environments로 바로 갈 수 있습니다.

## Base Environment

**Base Environment**는 처음부터 만들어져 있는 기본 환경입니다. 모든 환경에 공통인 변수를 여기에 둡니다.

중요한 규칙이 하나 있습니다. 활성 환경에 어떤 변수가 없으면, Msty는 Base Environment에서 그 변수를 찾습니다. 그래서 다음과 같이 나누면 편합니다.

- 어느 환경에서나 같은 값: Base Environment에 둡니다.
- 환경마다 다른 값: 각 환경에 같은 이름으로 둡니다.

## 새 환경 만들기

1. **Add Environment**를 누릅니다.
2. 환경의 **Name**을 넣습니다.
3. 이 환경의 **Variables**를 넣습니다.

기존 환경을 바탕으로 만들 수도 있습니다. 환경 옆의 말줄임표 아이콘을 누르고 **Clone Environment**를 고릅니다. 변수는 나중에 고칠 수 있습니다.

## 활성 환경 정하기

방법은 두 가지입니다.

- 환경 관리 화면에서 환경의 말줄임표 아이콘을 누르고 **Make Active Environment**를 고릅니다.
- 왼쪽 주 메뉴에서 말줄임표 아이콘을 누르고, **Environments** 하위 메뉴에서 환경 아이콘을 고릅니다.

둘째 방법이 빠릅니다. 관리 화면을 열지 않고 바로 바꿀 수 있습니다.

## 변수를 쓸 수 있는 곳

문서가 든 곳은 네 가지입니다.

1. 모델 제공업체의 API 키
2. 시스템 프롬프트
3. 대화
4. 도구

쓰는 방법은 변수 이름을 그 자리에 복사해 붙여 넣는 것입니다. 변수 이름은 자동으로 `MSTY_`로 시작합니다. 예를 들면 `MSTY_MY_VARIABLE`입니다. 작업이 실행될 때 이 자리 표시가 활성 환경의 값으로 바뀝니다.

## 동적 변수

동적 변수는 값을 직접 넣지 않아도 현재 날짜와 시간으로 자동으로 채워지는 변수입니다. 환경 변수 선택 창에서 고르며, 이 창은 Shift를 두 번 누른 뒤 `e`를 눌러 엽니다.

| 변수 | 채워지는 값 |
|---|---|
| `{MSTY_LOCAL_DATE}` | 시스템의 현재 날짜 |
| `{MSTY_LOCAL_DATE_TIME}` | 시스템의 현재 날짜와 시간 |
| `{MSTY_LOCAL_TIMEZONE}` | 시스템의 현재 시간대 |

선택 창에서 변수를 고르면 클립보드에 복사됩니다. 원하는 자리에 붙여 넣으면 됩니다.

모델은 오늘이 며칠인지 모릅니다. 시스템 프롬프트에 `{MSTY_LOCAL_DATE}`를 넣어 두면 "이번 주 금요일까지" 같은 표현을 모델이 올바로 계산하는 데 도움이 됩니다.

## 백업, 복원, 삭제

- **백업과 복원**: **Add Environment** 옆의 아래쪽 화살표 아이콘을 누릅니다.
- **삭제**: 환경 옆의 말줄임표 아이콘을 누르고 **Delete Environment**를 고릅니다.

환경에는 API 키 같은 비밀값이 들어 있을 수 있으므로, 백업 파일은 안전한 곳에 보관하세요.

## 단계별 예시: 키 두 벌을 바꿔 쓰기

1. **Manage Environments**를 엽니다.
2. **Add Environment**로 "개인" 환경을 만들고 변수 `MSTY_API_KEY`에 개인 키를 넣습니다.
3. "개인" 환경을 **Clone Environment**로 복제해 "회사"로 이름을 바꾸고, `MSTY_API_KEY`의 값을 회사 키로 고칩니다.
4. 모델 제공업체 설정의 API 키 칸에 변수 이름을 붙여 넣습니다.
5. 왼쪽 메뉴의 **Environments** 하위 메뉴에서 "회사"를 골라 활성 환경으로 만듭니다.
6. 새 대화를 열어 응답이 오는지 확인합니다.

API 키를 어디서 받는지는 [온라인 모델 API 키 찾기](/guide/settings-online-api-keys/)에 정리했습니다.

## 알아 둘 점

- 환경이나 변수 개수의 상한은 문서에 없습니다.
- 변수가 어떤 방식으로 저장되고 보호되는지는 이 문서 항목에 설명이 없습니다. 비밀값을 더 보호하려면 [작업 공간 잠금과 비밀값 암호화](/guide/workspace-lock-encryption/)를 함께 보세요.
- 활성 환경에도 Base Environment에도 없는 변수를 쓰면 어떻게 되는지는 문서에 적혀 있지 않습니다. 변수 이름의 오타를 조심하세요.

## 참고한 문서

- [Environments](https://docs.msty.ai/studio/workspaces/environment)
- [Keyboard Shortcuts](https://docs.msty.ai/studio/settings/keyboard-shortcuts)
- [Msty 요금](https://msty.ai/pricing/)
