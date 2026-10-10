---
title: Msty Go 시작하기 — 설치부터 첫 실행 검증까지
description: Msty Go를 설치하고 모델 제공업체 연결, 기본 작업 방식, 첫 에이전트, 보안 기준, 도구, 채널과 동기화까지 공식 Setup 문서의 순서대로 설정하는 방법을 정리합니다.
date: 2026-10-12
section: Msty Go
order: 10
verified: 2026-10-12
tags: [Msty, Go, 설치, 설정, 에이전트]
---

## 이 글에서 다루는 것

Msty Go는 에이전트에게 일을 맡기는 데스크톱 앱입니다. 제품의 성격과 기능 목록은 [Msty Go 자세히 보기](/guide/product-go/)에 정리되어 있고, 이 글은 그다음 단계인 "실제로 설치해서 처음 한 번 제대로 돌려 보기"를 다룹니다.

공식 Setup 문서의 목표는 기능을 많이 켜는 것이 아닙니다. 설정을 마쳤을 때 다음 세 가지가 갖춰져 있으면 됩니다.

- 통제된 작업 공간에서 돌아가는 에이전트 하나
- 제대로 연결된 모델 제공업체 하나
- 범위를 넓히기 전에 적용해 둔 보안 기준

## 전체 순서

문서는 아래 순서를 의도적으로 지키라고 권합니다. 앞 단계가 정상이라는 것을 확인한 뒤 다음 단계로 넘어가면, 문제가 생겼을 때 원인을 찾을 범위가 좁아지기 때문입니다.

| 순서 | 할 일 | 설정 위치 |
|---|---|---|
| 1 | Go 설치 | 제품 페이지 |
| 2 | 모델 제공업체 연결 | **Settings > Model Providers** |
| 3 | 기본 작업 방식 정하기 | **Settings > General** |
| 4 | 에이전트 하나 만들어 검증 | **Settings > Agents** |
| 5 | 보안 기준 적용 | **Settings > Security** |
| 6 | 필요한 도구만 추가 | **Settings > Tools** |
| 7 | Pulse, Rules, 작업 공간 프로필 파일은 필요할 때만 | 각 설정 |
| 8 | 채널과 Cloud Sync는 로컬 실행이 안정된 뒤 | **Settings > Remote Routes**, **Settings > Cloud** |

## 1단계: 설치

[msty.ai/products/go](https://msty.ai/products/go/)에서 내려받아 설치합니다. 문서가 밝힌 지원 운영체제는 macOS, Windows, Linux입니다.

운영체제별 설치 파일 형식은 [Msty Go 자세히 보기](/guide/product-go/)의 표를 참고합니다. 최소 하드웨어 사양은 공식 문서에 설명이 없습니다.

여러 운영체제를 섞어 쓰는 팀이라면 설정 순서와 보안 기준을 하나로 통일해 두라는 것이 Overview 문서의 조언입니다. 기기마다 동작이 달라지는 일을 줄이기 위해서입니다.

## 2단계: 모델 제공업체 연결

**Settings > Model Providers**에서 제공업체를 하나 이상 설정합니다. 대화, 에이전트 실행, Playbook, Task가 모두 이 위에서 돌아갑니다.

- 클라우드 모델을 쓴다면 인증 정보와 엔드포인트를 먼저 확인합니다.
- 로컬 런타임을 쓴다면 서비스에 접속되는지, 모델을 하나 이상 고를 수 있는지 확인합니다.

다음 세 가지가 최소 확인 항목입니다.

1. 모델을 하나 이상 선택할 수 있다.
2. 시험 대화에서 응답이 온다.
3. 응답 지연과 오류가 내 작업에 쓸 만한 수준이다.

하나라도 실패하면 멈추고 여기부터 고칩니다. 문서는 나중에 나타나는 "설정 문제"의 대부분이 실제로는 제공업체 연결 문제라고 설명합니다. 자세한 내용은 [모델 제공업체 설정](/guide/go-model-providers/)과 [Managed Services](/guide/go-managed-services/)에 있습니다.

## 3단계: 기본 작업 방식 정하기

에이전트를 만들기 전에 **Settings > General**에서 앱 기본 **Working Style**을 정합니다. 작업 방식은 Go가 계획하고, 설명하고, 실행하는 태도를 바꿉니다. 먼저 정해 두면 새 대화와 에이전트가 같은 방식으로 움직여 검증하기 쉽습니다.

문서가 제안하는 출발점은 다음과 같습니다.

- 앱 기본값: `Balanced`
- 위험이 큰 에이전트만 `Careful`로 덮어쓰기

처음에는 에이전트별 예외를 적게 두라고 합니다. 예외가 많으면 동작을 서로 비교하기 어려워집니다. 다섯 가지 방식의 차이는 [Working Styles](/guide/go-working-styles/)에서 설명합니다.

## 4단계: 에이전트 하나를 좁은 범위로 만들기

**Settings > Agents**에서 에이전트를 하나만 만듭니다. 첫 에이전트의 범위는 다음처럼 좁게 잡습니다.

- 작업 공간 하나
- 실행 방식 하나
- 경로는 `Local only`

실행 방식은 두 가지입니다. 빠르게 반복하려면 Host, 속도보다 격리가 중요하면 Container를 고릅니다. Container를 쓰려면 Docker 또는 Podman이 미리 설치되어 있어야 합니다. macOS에서는 Docker가 OrbStack 컨텍스트로 돌아가는 경우 OrbStack도 쓸 수 있습니다.

이 단계에서는 고급 옵션을 여러 개 더하지 않습니다. 목표는 최적화된 프로필이 아니라 믿을 수 있는 첫 실행입니다. 세부 항목은 [에이전트 만들기와 관리](/guide/go-agents/)를 봅니다.

## 5단계: 보안 기준 적용

통합 기능을 붙이기 전에 **Settings > Security**를 엽니다. 넓게 쓰기 전에 정해 둘 항목은 다섯 가지입니다.

- Sender Groups (누가 호출할 수 있는가)
- Allowed Folders (어느 폴더를 읽고 쓰는가)
- Blocked Patterns (허용 폴더 안에서도 막을 경로)
- Network Guard 프리셋
- 인터넷을 쓰는 컨테이너 에이전트를 위한 Airlock 정책

문서의 실용 기준은 에이전트가 실제로 필요한 프로젝트 경로만 열어 주고, 작업 흐름이 확인될 때까지 네트워크 정책을 보수적으로 두는 것입니다. 채널과 외부 도구를 많이 쓰기 시작한 뒤보다 그 전에 조정하는 편이 훨씬 쉽습니다. [보안 설정](/guide/go-security/)과 [Airlock](/guide/go-airlock/)에서 이어집니다.

## 6단계: 도구는 당장 필요한 것만

**Settings > Tools**에서 MCP 서버와 웹 검색을 설정합니다. 구체적인 작업에 필요할 때만 추가합니다. 문서가 권하는 첫 도구 구성은 이렇습니다.

1. MCP 서버를 하나만 먼저 추가합니다.
2. 도구 경로 하나를 처음부터 끝까지 검증합니다.
3. 웹 검색 키는 작업에 필요할 때만 넣습니다.
4. [Context Scout](/guide/go-context-scout/)는 작업 공간 경로와 모델 경로가 안정된 뒤에 켭니다.
5. Computer Use는 대화나 에이전트가 데스크톱 앱을 직접 조작해야 할 때만 설치합니다.
6. 운영용 에이전트에 넓은 웹 접근을 열기 전에 Airlock을 설정합니다.

도구를 추가했다면 하나씩 따로 시험합니다. 그래야 도구 문제와 에이전트·제공업체 문제를 구분할 수 있습니다. [도구 설정](/guide/go-tools/)을 참고합니다.

## 7단계: 작업 흐름 보조 기능은 신중하게

첫 에이전트가 제대로 돌아간 뒤에 다음 기능을 켤지 정합니다.

| 기능 | 켜는 경우 | 문서의 권장 순서 |
|---|---|---|
| [Pulse](/guide/go-pulse/) | 입력을 시작하기 전에 열린 작업, 정리할 것, 실패한 Task 등을 브리핑받고 싶을 때 | Pulse 모델을 먼저 지정한 뒤 켭니다 |
| [Rules](/guide/go-rules/) | 이벤트에 따른 안내, 도구 차단, 후속 조치, 자동 점검이 필요할 때 | 위험이 낮은 규칙 하나로 시작합니다 |
| [Context Scout](/guide/go-context-scout/) | 보내기 전에 관련 파일과 코드 지도를 찾아 붙이고 싶을 때 | 6단계 참고 |
| [작업 공간 프로필 파일](/guide/go-workspace-profile-files/) | 작업 공간에 `SOUL.md`, `IDENTITY.md`, `USER.md`가 이미 있고 이를 반영하고 싶을 때 | 해당 파일 내용을 먼저 검토한 뒤 켭니다 |

이 기능들은 맥락과 자동화를 더 얹습니다. 문서는 이를 첫 실행의 필수 조건이 아니라 운영 통제 수단으로 다루라고 합니다.

## 8단계: 채널과 Cloud Sync

**Settings > Remote Routes**의 채널과 **Settings > Cloud**의 Cloud Sync는 2단계 설정으로 다룹니다. 둘 다 로컬 에이전트 운영에는 선택 사항입니다.

다음 세 가지를 모두 만족할 때 넘어갑니다.

- 로컬 에이전트 실행이 안정적이다.
- 보안 기준이 이미 설정되어 있다.
- 원격 경로나 기기 간 연속성이 실제로 필요하다.

채널은 Discord, Telegram, WhatsApp으로 원격 지시를 주고받아야 할 때만 연결합니다. Cloud Sync는 기기 간 연속성이 필요하고 복구 키를 어떻게 보관할지 정해졌을 때만 켭니다. 휴대전화는 데스크톱의 동기화와 기기 설정을 마친 뒤 **Settings > Cloud**에서 연결합니다. [채널](/guide/go-channels/)과 [Cloud Sync](/guide/go-cloud-sync/)에서 자세히 다룹니다.

## 마지막: 처음부터 끝까지 한 번 돌려 보기

위험이 낮으면서 실제 업무를 대표하는 작업 하나를 첫 에이전트에 맡깁니다. 예를 들어(필자가 든 예입니다) 프로젝트 폴더의 회의록 한 개를 읽고 할 일 목록 파일을 만들게 해 봅니다. 그리고 세 가지를 확인합니다.

- 결과물의 품질
- 승인 요청이 기대한 대로 뜨는지
- 지정한 실행 방식으로 돌았는지

도구나 채널을 켰다면 경로마다 한 번씩 통제된 검증을 합니다. 각 경로가 확인되기 전에는 대량 자동화를 걸지 않습니다.

### 완료 기준 점검표

- 제공업체 하나가 연결되어 있고 모델 하나를 고를 수 있다.
- 에이전트 하나가 의도한 작업 공간에서 실행된다.
- 보안 기준(발신자, 폴더, 네트워크)이 적용되어 있다.
- 선택한 도구와 채널은 경로별로 하나씩 검증했다.
- Pulse, Rules, Computer Use, 작업 공간 프로필 파일은 필요한 곳에만 설정했다.

## 설정이 실패할 때 보는 순서

문서가 제시하는 순서는 다음과 같습니다.

1. 제공업체 연결
2. 작업 공간 권한
3. 런타임 사용 가능 여부

컨테이너 실행이 실패하면 Docker 또는 Podman 상태부터 확인합니다. macOS에서 OrbStack을 쓴다면 OrbStack이 실행 중인지, Docker가 OrbStack 컨텍스트를 쓰고 있는지도 확인합니다.

실행 중 문제가 생겼을 때는 Overview 문서의 계층 순서도 도움이 됩니다. 실행 주체와 범위(Agents), 기능 경로(Providers와 Tools), 안전장치(Security와 Settings) 순으로 봅니다.

## 다음에 읽을 글

- 처음 설정하는 사람: [보안 설정](/guide/go-security/) → [에이전트](/guide/go-agents/) → [도구](/guide/go-tools/) → [모델 제공업체](/guide/go-model-providers/)
- 팀에 배포하는 사람: [Working Styles](/guide/go-working-styles/) → [보안 설정](/guide/go-security/) → [Playbooks](/guide/go-playbooks/) → [Tasks](/guide/go-tasks/) → [채널](/guide/go-channels/)
- 운영을 다듬는 사람: [Memory Bank](/guide/go-memory-bank/) → [Pulse](/guide/go-pulse/) → [Shortcuts](/guide/go-shortcuts/)와 [Rules](/guide/go-rules/) → [Managed Services](/guide/go-managed-services/) → [Cloud Sync](/guide/go-cloud-sync/)

이 세 가지 읽기 순서는 Overview 문서가 제안한 것입니다.

## 참고한 문서

- [Go 문서: Setup](https://docs.msty.ai/go/setup)
- [Go 문서: Overview](https://docs.msty.ai/go/overview)
- [Msty Go 제품 페이지](https://msty.ai/products/go/)
