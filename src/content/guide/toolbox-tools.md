---
title: Toolbox의 Tools — MCP 도구를 Msty에 연결하기
description: Msty Studio의 MCP 구현인 Toolbox에서 도구를 추가하고, 기본 파라미터를 정하고, 필요한 프로그램을 설치하는 방법입니다.
date: 2026-10-11
section: 도구와 부가 기능
order: 10
verified: 2026-10-11
tags: [Msty, Toolbox, MCP]
---

## Toolbox가 하는 일

모델은 기본적으로 글만 씁니다. 내 PC의 파일을 읽거나, 데이터베이스를 조회하거나, GitHub 저장소를 살펴보는 일은 하지 못합니다. **Toolbox**는 모델이 이런 일을 할 수 있도록 내 PC나 원격 서버에 있는 도구와 Msty Studio를 연결합니다.

공식 문서는 Toolbox를 Msty Studio의 MCP(Model Context Protocol) 구현이라고 설명합니다. MCP는 AI 앱과 외부 도구를 잇는 공통 규격으로, 이 규격을 따르는 도구(MCP 서버)라면 Toolbox에 등록해 쓸 수 있습니다.

예를 들어 사내 재고 데이터베이스에 연결하는 도구를 등록해 두면, 대화에서 "A 품목 현재 재고가 얼마인가요"라고 물었을 때 모델이 도구를 호출해 실제 값을 조회한 뒤 답합니다.

## 지원하는 연결 방식

| 방식 | 지원 여부 |
|---|---|
| 내 PC에서 실행되는 로컬 MCP 서버 | 지원 |
| Streamable HTTP로 연결하는 원격 MCP 서버 | 지원 |
| SSE | **지원하지 않음** |

공식 문서는 SSE가 Streamable HTTP로 대체되어 폐기된 방식이라고 설명합니다. SSE 방식의 서버를 써야 한다면 mcp-remote 같은 로컬 프록시를 거치는 우회 방법이 안내되어 있습니다.

Msty Studio Web에서 Toolbox를 쓰려면, Studio Web이 Remote Connections 또는 Sidecar로 Studio Desktop에 연결되어 있어야 합니다.

## 기본 도구 가져오기

처음 시작할 때는 **Import Default Tools**를 눌러 기본 도구 모음을 가져올 수 있습니다.

공식 문서는 이 기본 도구에 대해 분명한 주의를 적어 두었습니다.

- 기본 도구는 Msty가 만들거나 시험하거나 유지 관리하는 것이 아닙니다. 편의를 위한 출발점으로 제공됩니다.
- 사용에 따른 위험은 사용자가 집니다. 도구로 인한 문제에 Msty는 책임지지 않습니다.
- 도구에 관한 문의는 해당 도구의 제작자에게 합니다.

도구는 내 파일과 시스템에 접근할 수 있으므로, 업무용 PC에서는 무엇을 하는 도구인지 확인한 뒤 가져옵니다.

## 새 도구 추가하기

1. **Add New Tool**을 누릅니다. 도구의 이름, 설정, 메모를 입력하는 창이 열립니다.
2. 연결 방식을 고릅니다.

| 연결 방식 | 쓰는 경우 | 입력할 내용 |
|---|---|---|
| **HTTP** | Streamable HTTP를 쓰는 원격 MCP 서버 | **MCP Server URL**(접속 주소), 필요하면 **Authentication**과 **Headers** |
| **STDIO / JSON** | 로컬 MCP 서버와 도구 | **Tool Configuration**에 올바른 JSON 객체 |

3. (선택) **Notes**에 도구의 용도를 적습니다.
4. 다른 도구와 겹치지 않는 **Name**을 입력합니다.
5. **Add**를 누릅니다.

### STDIO / JSON 설정 예시

공식 문서는 MySQL 도구를 예로 듭니다.

```json
{
  "command": "uv",
  "args": [
    "--directory",
    "{dbPath:Database Path:/path/to/database.db}",
    "run",
    "mysql_mcp_server"
  ],
  "env": {
    "MYSQL_HOST": "{Database Host}",
    "MYSQL_PORT": "{Database Port}",
    "MYSQL_USER": "{Database User}",
    "MYSQL_PASS": "{Database Password}",
    "MYSQL_DB": "{Database Name}"
  }
}
```

이 설정에서 알아 둘 점은 두 가지입니다.

- `command`에는 도구를 실행하는 프로그램 이름이 들어갑니다. Python, UV, Node, NPX 등이 여기에 해당하며, **이 프로그램이 내 PC에 설치되어 있어야** 도구가 실행됩니다.
- 중괄호로 감싼 값은 변수입니다. 도구를 실행할 때 실제 값으로 바뀌며, 값은 다음 단계에서 정합니다. `{dbPath:Database Path:/path/to/database.db}`처럼 `이름:화면에 보일 라벨:기본값` 형식으로 쓸 수도 있습니다.

변수를 쓰면 비밀번호 같은 값을 설정 JSON에 직접 적지 않아도 됩니다.

## 도구의 기본 파라미터 정하기

도구 이름 옆의 별표(**\***) 아이콘을 누르면 파라미터 창이 열립니다.

| 항목 | 설명 |
|---|---|
| **Custom Arguments** | 추가 인자를 넣습니다 |
| **Environment Variables** | 도구에 필요한 값을 정합니다. 폴더 경로, 접속 주소, API 키 등입니다 |
| **Tool Console** | 여러 파라미터로 도구를 시험해 봅니다 |

대화에서 쓰기 전에 **Tool Console**에서 도구가 실제로 동작하는지 먼저 확인합니다.

## 필요한 프로그램 설치

대부분의 도구는 Node, NPX, Python 중 하나가 내 PC에 설치되어 있어야 합니다. 공식 문서의 Node 관련 권장 사항은 다음과 같습니다.

- Node와 NPX는 **Volta**로 설치하는 방법을 권장합니다.
- Mac 사용자는 **Homebrew**를 써도 됩니다.
- NVM은 권장하지 않습니다. NVM을 쓰고 있다면 제거하고 Volta로 바꾸라고 안내합니다.

Node가 어떤 방법으로 설치됐는지 확인하려면 터미널에서 `which node`를 실행해 경로를 봅니다. 경로가 NVM 폴더 아래라면 권장하는 방법으로 다시 설치합니다.

Python과 uv 설치, Windows에서의 경로 설정은 [Tool Dependencies](/guide/toolbox-tool-dependencies/) 글에서 자세히 다룹니다.

## 문제가 생길 때

필요한 프로그램이 사용 가능한 것으로 표시되지 않으면 **Sidecar**를 열고 **View Logs**를 눌러 오류 메시지를 확인합니다.

## 다음 단계

도구를 등록한 것만으로는 대화에서 쓸 수 없습니다. 도구를 **툴셋**으로 묶어 대화에서 켜야 합니다. [Toolsets](/guide/toolbox-toolsets/) 글로 이어집니다.

## 함께 읽을 글

- [Toolsets: 도구를 묶어 대화에서 쓰기](/guide/toolbox-toolsets/)
- [Live Contexts: API 데이터를 대화에 넣기](/guide/toolbox-live-contexts/)
- [Tool Dependencies: 도구 실행에 필요한 프로그램 설치](/guide/toolbox-tool-dependencies/)

## 참고한 문서

- [Tools](https://docs.msty.ai/studio/toolbox/tools)
