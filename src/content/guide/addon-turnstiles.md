---
title: Turnstiles — 여러 단계 작업을 순서대로 자동 실행하기
description: 프롬프트와 동작을 줄 세워 실행하는 Turnstiles의 단계 종류, 변수, 오류 처리, 저장과 공유 방법을 설명합니다. Aurum 라이선스가 필요합니다.
date: 2026-10-11
section: 도구와 부가 기능
order: 50
verified: 2026-10-11
tags: [Msty, Turnstiles, 자동화, Aurum]
---

## Turnstiles가 하는 일

**Turnstiles**는 여러 단계로 된 AI 작업을 저장해 두고 다시 실행하는 기능입니다. 프롬프트와 동작을 대기열(queue)에 순서대로 넣어 실행하며, 조건에 따른 분기, 반복, 중간 점검 지점을 넣을 수 있습니다.

같은 순서의 프롬프트를 매번 손으로 입력하고 있다면 Turnstile로 만들 만합니다. 예를 들어 주간 보고 작성은 "회의록 요약 → 요약에서 결정 사항만 추출 → 임원 보고용 문체로 다시 쓰기 → 세 줄 요약"의 순서를 매주 반복합니다. 이를 Turnstile로 저장해 두면 회의록만 바꿔 넣고 한 번에 실행할 수 있습니다.

## 이용 조건

공식 문서는 Turnstiles가 **Aurum** 라이선스에서 제공된다고 밝힙니다.

## 여는 방법

| 방법 | 순서 |
|---|---|
| 동작 표시줄에서 열기 | 대화에서 **Turnstile** 아이콘을 누릅니다 |
| 지금 쓴 프롬프트를 대기열에 넣기 | 프롬프트를 쓰고 **Add to Queue**를 누릅니다. Turnstile 아이콘을 Alt+Click하면 바로 넣을 수 있습니다 |
| 저장한 Turnstile 불러오기 | **Load Saved Turnstile**로 저장된 작업 흐름을 대기열에 불러옵니다 |

## 단계의 종류(Entry Types)

대기열에 넣을 수 있는 항목은 다음과 같습니다.

| 종류 | 하는 일 |
|---|---|
| **Prompt** | 일반 프롬프트 단계입니다. 단계마다 모델, 첨부, 툴셋, Real-Time Data를 따로 지정할 수 있습니다 |
| **Persona** | 저장해 둔 페르소나로 한 단계를 실행합니다 |
| **Meta actions** | 대화 자체에 대한 동작입니다. Continue, Regenerate, Context Shield, Context Shield with Summary |
| **Conditional** | 어시스턴트나 사용자의 출력 내용에 따라 실행 경로를 나눕니다 |
| **Loop Start / Loop End** | 그 사이의 구간을 최대 반복 횟수까지 되풀이합니다. 조건을 만족하면 일찍 빠져나오게 할 수 있습니다 |
| **Checkpoint** | 실행을 멈추고 사람의 확인을 받습니다. 결과 검토, 변수 입력, 다음 경로의 수동 선택을 할 수 있습니다 |

## 단계별 고급 설정

| 설정 | 설명 |
|---|---|
| **Label**, **Note** | 단계를 구분하고 정리하기 위한 이름과 메모입니다 |
| **Delay (seconds)** | 단계 사이에 기다릴 시간(초)입니다 |
| **Pause After** | 이 단계가 끝나면 반드시 멈추고 수동 확인을 받습니다 |
| **Send as Assistant** | 응답을 생성하지 않고, 입력한 글을 어시스턴트의 메시지로 끼워 넣습니다 |

## 변수와 출력 가공

앞 단계의 결과를 뒤 단계에서 쓰려면 변수를 사용합니다. 단계의 출력을 변수로 저장하고(예: `summary`), 이후 프롬프트에서 `{{summary}}`로 불러옵니다.

출력 전체가 아니라 필요한 부분만 저장하려면 변환기(transformer)를 씁니다.

| 변환기 | 추출하는 것 |
|---|---|
| **JSON Path** | JSON 형식 출력에서 지정한 경로의 값 |
| **Regex** | 정규식에 맞는 부분(첫 번째 일치 그룹) |
| **Slice** | `start:end`로 지정한 구간 |

반복 구간 안의 프롬프트에서는 몇 번째 반복인지 알려 주는 변수를 쓸 수 있습니다.

- `{{loop.iteration}}`
- `{{yourLoopId.iteration}}` (`yourLoopId` 자리에 반복 구간의 ID를 넣습니다)

## 오류 처리와 대체 모델

단계가 실패했을 때의 기본 동작을 대기열 단위로 정합니다.

| 선택지 | 동작 |
|---|---|
| **Stop** | 실행을 멈춥니다 |
| **Retry Once** | 한 번 다시 시도합니다 |
| **Use Fallback Model** | 대체 모델로 실행합니다 |

이 동작은 단계마다 다르게 덮어쓸 수 있습니다. 기본 모델과 대체 모델을 지정해 두면 모델 구성이 다른 환경으로 Turnstile을 옮겨도 계속 쓸 수 있습니다.

## 대기열 실행하기

- 실행 제어: **Run**, **Pause**, **Continue**, **Stop**
- **Rounds**: 대기열 전체를 여러 번 반복합니다.
- 편집: 끌어다 놓아 순서 바꾸기, 항목 건너뛰기와 건너뛰기 해제, 대기열 비우기

Checkpoint에서 멈췄을 때 고를 수 있는 것은 다음과 같습니다.

- 계속 진행
- 다음 N개 단계 건너뛰기
- Label이 붙은 특정 단계로 이동
- 중단
- 계속하기 전에 변수 값을 확인하고 고치기

결과를 외부로 내보내기 전에 사람이 한 번 확인해야 하는 작업이라면, 마지막 단계 앞에 Checkpoint를 두는 식으로 씁니다.

## 저장하고 정리하기

Turnstiles 허브에서 다음 작업을 할 수 있습니다.

- Turnstile을 저장, 복제, 수정합니다.
- 폴더로 정리하고 기본 폴더를 정합니다.
- Turnstile 하나 또는 여러 개를 폴더 사이에서 옮깁니다. 끌어다 놓기도 됩니다.
- 압축 묶음(zip) 형태로 가져오고 내보냅니다.

## Discover에서 설치하기

Turnstiles 허브의 **Discover** 탭에서 만들어진 Turnstile을 찾아 설치합니다.

- 이름이나 설명으로 검색합니다.
- **Available**, **Installed**, **All**로 걸러 봅니다.
- 설치 전에 상세 내용을 확인합니다.
- 하나씩 설치하거나 여러 개를 골라 한 번에 설치합니다.
- 여러 개를 설치할 때 진행 상황을 보고, 남은 설치를 중단할 수 있습니다.

Discover에서 설치한 Turnstile은 **Misc** 폴더에 들어가며, 직접 만든 것과 똑같이 고칠 수 있습니다.

## 채팅 글에서 바로 대기열 만들기

채팅 입력란에 쓴 글을 대기열에 넣을 때, 다음 구분 기호를 넣으면 여러 단계로 나뉩니다.

| 기호 | 뜻 |
|---|---|
| `--m--` | 여기서 프롬프트 메시지를 나눕니다 |
| `--r--` | Regenerate |
| `--c--` | Continue |
| `--cs--` | Context Shield |
| `--css--` | Context Shield with Summary |

공식 문서의 예시는 다음과 같습니다.

```
Draft a short update. --m-- Rewrite it for executives. --m-- Turn it into three bullet points. --c2--
```

이 글은 "짧은 업데이트 초안 쓰기", "임원용으로 다시 쓰기", "세 개의 글머리표로 바꾸기"의 세 프롬프트로 나뉩니다. 예시 끝의 `--c2--`는 위 기호 목록에 없으며, 공식 문서에 뜻이 설명되어 있지 않습니다.

## 문서에 없는 내용

Context Shield가 정확히 어떤 동작인지는 이 페이지에 설명이 없습니다. 최대 반복 횟수의 상한, 한 대기열에 넣을 수 있는 단계 수의 제한도 언급이 없습니다.

## 함께 읽을 글

- [Toolsets](/guide/toolbox-toolsets/)
- [Real-Time Data](/guide/addon-real-time-data/)
- [Persona Studio](/guide/studio-persona/)

## 참고한 문서

- [Turnstiles](https://docs.msty.ai/studio/add-ons/turnstiles)
