---
title: Tool Dependencies — 도구 실행에 필요한 프로그램 설치하기
description: Toolbox의 도구가 실행되려면 필요한 node, npx, python, uv를 운영체제별로 설치하고 Sidecar에 경로를 지정하는 방법입니다.
date: 2026-10-11
section: 도구와 부가 기능
order: 40
verified: 2026-10-11
tags: [Msty, Toolbox, 설치]
---

## 왜 따로 설치가 필요한가

[Toolbox에 등록한 도구](/guide/toolbox-tools/)는 Msty 앱 안에서 저절로 돌아가는 것이 아닙니다. 각 도구는 별도의 프로그램으로 실행되며, 실행에 필요한 기반 프로그램이 따로 있습니다. 이를 의존성(dependency)이라고 부릅니다. 대표적인 것은 다음 네 가지입니다.

- `npx`
- `node`
- `python`
- `uv`

도구 설정의 `command` 항목에 적힌 이름이 바로 이 프로그램입니다. `command`가 `uvx`인 도구는 uv가 설치되어 있어야 실행됩니다.

공식 문서가 강조하는 점은 **도구는 Sidecar가 실행되는 곳에서 실행된다**는 것입니다. 따라서 의존성도 Sidecar가 돌아가는 그 컴퓨터에 설치해야 합니다.

## 권장 설치 방법

같은 프로그램도 설치 방법이 여러 가지입니다. 공식 문서는 모든 방법을 다루는 대신 하나의 권장 방법을 제시합니다. `nvm` 같은 도구로 설치한 의존성은 쓰려는 도구와 맞지 않아 동작하지 않을 수 있다고 덧붙입니다.

| 프로그램 | 운영체제 | 권장 방법 |
|---|---|---|
| npx, node | Windows, Mac, Linux | **Volta**. 세 운영체제에서 모두 쓸 수 있습니다 |
| npx, node | macOS | **Homebrew**도 쓸 수 있습니다 |
| python, uv | Windows | **WinGet**. Sidecar 연결 창에서 의존성의 전체 경로를 지정해야 할 수 있습니다 |
| uv | Mac | `brew install uv`. `uvx`도 함께 설치됩니다 |

## Windows에서 Python과 uv 설정하기

Windows는 경로 지정 단계가 하나 더 있습니다. 순서대로 진행합니다.

1. Windows에 WinGet을 설치합니다.
2. 터미널에서 다음 두 명령으로 Python과 uv를 설치합니다.

```
winget install -e --id Python.Python.3.12 --scope machine
winget install --id=astral-sh.uv -e
```

3. Sidecar 연결 창에서 **Python이 설치된 전체 경로**를 지정합니다. `uv`는 자동으로 감지되므로 경로를 따로 지정하지 않아도 됩니다.
4. 연결한 뒤 새 도구를 하나 만들고, 도구 콘솔(tool console)에서 그 도구의 기능 목록을 불러옵니다. 기능이 나열되면 도구가 정상 동작하는 것입니다.

4번 확인에 공식 문서가 쓰는 예시 도구 설정은 다음과 같습니다.

```json
{
  "command": "uvx",
  "args": ["mcp-request"]
}
```

첫 번째 명령의 `--scope machine`은 Python을 특정 사용자가 아니라 컴퓨터 전체에 설치한다는 뜻입니다. 관리자 권한이 필요할 수 있으며, 회사 PC에서 설치가 막혀 있다면 전산 담당자에게 요청해야 합니다.

## Mac에서 설정하기

Mac은 비교적 간단합니다.

- node와 npx: Volta 또는 Homebrew로 설치합니다.
- uv: 터미널에서 `brew install uv`를 실행합니다. `uvx`가 함께 들어옵니다.

Mac에서 Python 경로를 따로 지정해야 하는지는 공식 문서에 설명이 없습니다.

## 알아 둘 점

### 처음 실행은 오래 걸릴 수 있습니다

도구를 처음 쓸 때는 도구가 자신에게 필요한 것을 내려받고 설치하느라 **몇 분**이 걸릴 수 있습니다. 걸리는 시간은 도구마다 다르고 Msty가 통제할 수 없는 부분이라고 공식 문서는 밝힙니다. 처음 실행에서 반응이 없다고 바로 실패로 판단하지 말고 기다려 봅니다.

### Sidecar 로그를 확인합니다

오류나 문제가 있는지 Sidecar의 로그를 지켜봅니다. 도구가 동작하지 않을 때 원인이 가장 먼저 나타나는 곳입니다.

## 동작하지 않을 때 확인 순서

공식 문서에 별도의 문제 해결 절은 없지만, 본문의 안내를 순서로 정리하면 다음과 같습니다.

1. Sidecar 로그에 오류 메시지가 있는지 봅니다.
2. 도구 콘솔에서 기능 목록이 나오는지 확인합니다.
3. Windows라면 Sidecar 연결 창에 Python의 전체 경로가 지정되어 있는지 확인합니다.
4. node를 `nvm`으로 설치했다면 Volta로 다시 설치합니다. 설치 경로는 터미널에서 `which node`로 확인할 수 있습니다.

## 폐쇄망에서 쓸 때

도구는 처음 실행할 때 필요한 것을 내려받습니다. 인터넷이 막힌 환경에서 이를 어떻게 처리하는지는 공식 문서에 설명이 없습니다. 폐쇄망 PC에 도구를 올리려는 경우에는 외부망에서 먼저 시험한 뒤 반입 방법을 따로 검토해야 합니다.

## 함께 읽을 글

- [Tools: MCP 도구를 Msty에 연결하기](/guide/toolbox-tools/)
- [Toolsets](/guide/toolbox-toolsets/)
- [Live Contexts](/guide/toolbox-live-contexts/)

## 참고한 문서

- [Tool Dependencies](https://docs.msty.ai/studio/toolbox/tool-dependencies)
- [Tools](https://docs.msty.ai/studio/toolbox/tools)
