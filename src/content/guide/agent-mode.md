---
title: Agent Mode로 코딩 에이전트 실행하기
description: Msty Studio Desktop 안에서 Codex, Claude Code, Gemini CLI 같은 코딩 에이전트를 연결하고, 계획 검토부터 커밋까지 진행하는 방법입니다.
date: 2026-10-11
section: 에이전트와 스튜디오
order: 10
verified: 2026-10-11
tags: [Msty, Agent Mode, 에이전트]
---

## Agent Mode가 하는 일

**Agent Mode**는 Msty Studio Desktop 안에서 코딩 에이전트를 실행하는 기능입니다. 에이전트와 대화하면서 에이전트가 세운 계획을 검토하고, 바뀐 파일 내용(diff)을 확인하고, 실행할 작업을 승인하는 과정을 한 화면에서 처리합니다.

일반 대화와 다른 점은 모델이 답만 쓰는 것이 아니라 내 작업 폴더의 파일을 실제로 고친다는 것입니다. 그래서 무엇을 바꿀지 먼저 계획으로 보여 주고, 사용자가 승인한 것만 실행하는 흐름으로 되어 있습니다.

예를 들어 사내 웹 페이지 저장소에서 "문의 양식에 전화번호 칸을 추가해 주세요"라고 요청하면, 에이전트가 수정할 파일과 순서를 계획으로 제시합니다. 사용자는 단계를 읽고 승인한 뒤, 바뀐 코드를 diff로 확인하고 커밋합니다.

공식 문서는 Agent Mode가 현재 **Msty Studio Desktop에서만** 제공된다고 밝힙니다.

## 준비: CLI 에이전트 연결

Agent Mode는 Msty가 직접 에이전트를 내장한 방식이 아니라, 내 PC에 설치된 CLI 에이전트를 불러와 쓰는 방식입니다. 지원하는 에이전트는 세 가지입니다.

| 에이전트 | 제공사와 계정 | 설치 명령 | 처음 실행 |
|---|---|---|---|
| **Codex** | OpenAI. ChatGPT 계정을 사용합니다 | `npm install -g @openai/codex` | `codex` 실행 후 **Sign in with ChatGPT** |
| **Gemini CLI** | Google의 오픈소스 에이전트. Google 로그인을 지원하고 무료 구간이 있습니다 | `npm install -g @google/gemini-cli` | `gemini` 실행 후 **Sign in with Google** |
| **Claude Code** | Anthropic. Claude 구독이 필요합니다 | `npm install -g @anthropic-ai/claude-code` | `claude` 실행 후 터미널 안내에 따라 로그인 |

설정 순서는 다음과 같습니다.

1. **Settings > Agent Mode**로 갑니다.
2. 위 표의 에이전트 중 하나를 설치하고, 터미널에서 한 번 실행해 로그인을 마칩니다.
3. Msty의 설정 화면으로 돌아와 **Check updates**를 눌러 사용 가능한 에이전트 목록을 새로 고칩니다.

`npm` 명령이 없다는 오류가 나오면 Node.js를 먼저 설치합니다. Linux에서는 배포판의 패키지 관리자로 설치하는 방법도 안내되어 있습니다.

### 에이전트가 감지되지 않을 때 나오는 화면

에이전트 없이 새 세션을 시작하면 Msty가 안내 화면을 보여 줍니다. 이 화면에서 에이전트별 설치 순서를 따라 한 뒤 **Re-check for agents** 또는 **Check updates**를 누릅니다.

안내 화면은 터미널 여는 방법도 알려 줍니다.

- macOS: Command + Space를 누르고 "Terminal"을 입력합니다.
- Windows: 시작 메뉴에서 Windows Terminal 또는 PowerShell을 엽니다.
- Linux: 응용 프로그램 메뉴에서 평소 쓰는 터미널을 엽니다.

## Agent Mode의 구성 요소

| 구성 요소 | 설명 |
|---|---|
| 세션과 워크스페이스 | **New** 메뉴나 Easy Access에서 세션을 시작합니다. 세션은 워크스페이스의 저장소를 대상으로 할 수도 있고, 간단한 작업이라면 폴더 없이 실행할 수도 있습니다 |
| 계획과 승인 | 에이전트가 변경을 적용하기 전에 계획을 제안할 수 있습니다. 각 단계를 검토하고 실행할 것을 승인합니다 |
| 스킬과 슬래시 명령 | 반복 작업은 슬래시 명령과 설치된 스킬로 처리합니다. 스킬은 [Skills Studio](/guide/studio-skills/)에서 관리합니다 |
| diff와 커밋 | 에이전트가 만든 파일 변경 내용을 검토한 뒤, 워크스페이스의 diff 패널에서 커밋합니다 |

## 사용 순서

1. 새 Agent 세션을 시작합니다.
2. 원하는 변경을 설명하고, 필요한 맥락을 함께 적습니다.
3. 에이전트가 제안한 계획을 검토하고 작업을 승인합니다.
4. diff를 확인하고, 부족한 부분은 추가 프롬프트로 다시 요청합니다.
5. 작업이 끝나면 커밋합니다.

2번 단계에서 맥락을 구체적으로 적을수록 계획이 정확해집니다. 어느 파일을 고칠지, 건드리면 안 되는 부분은 무엇인지 함께 적어 두면 4번의 재요청 횟수가 줄어듭니다.

## 문제가 생길 때

에이전트 목록에 아무것도 나타나지 않으면, 터미널에서 에이전트 CLI 설치와 로그인을 다시 진행한 뒤 Settings에서 에이전트 목록을 새로 고칩니다.

에이전트별 사용 요금과 사용량 한도는 공식 문서에 설명이 없습니다. 각 에이전트 제공사의 계정 안내에서 확인합니다.

## 함께 읽을 글

- [Skills Studio로 에이전트 스킬 관리하기](/guide/studio-skills/)
- [Persona Studio](/guide/studio-persona/)

## 참고한 문서

- [Agent Mode](https://docs.msty.ai/studio/agent-mode/agent-mode)
