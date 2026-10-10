---
title: Msty Go 자세히 보기
description: 범위를 정해 일을 맡기는 에이전트 앱 Msty Go의 기능, 설치 파일, 보안 설정, 권장 설정 순서를 공식 제품 페이지와 문서 기준으로 정리합니다.
date: 2026-10-11
section: Msty 제품과 요금
order: 20
verified: 2026-10-11
tags: [Msty, Go, 에이전트]
---

## Go는 무엇인가

Msty Go는 에이전트에게 일을 맡기는 데스크톱 앱입니다. 공식 제품 페이지는 "Bounded AI agents", 곧 경계가 정해진 에이전트라고 부릅니다. 에이전트가 컴퓨터 전체를 마음대로 다루는 것이 아니라, 사용자가 정해 준 폴더와 환경 안에서만 일하고 사용자가 각 단계를 검토한다는 뜻입니다.

제품 페이지는 Go를 네 가지 요소로 이루어진 자율 작업 실행기로 설명합니다. 명시적으로 지정한 폴더, 격리된 실행, 검토할 수 있는 작업, 모델 선택입니다.

요금 페이지에 따르면 Go는 예전 이름이 Claw였습니다. 2026-10-11 확인 기준으로 무료 베타이며, 제품 페이지에 표시된 버전은 Go 1.1 Beta 1입니다. 이 버전의 안내문에는 여섯 가지 코딩 하니스를 쓰는 Code Mode, 문서 작업 흐름, 내장 Living Wiki가 적혀 있습니다. 베타이므로 기능과 화면이 바뀔 수 있습니다.

## 누구에게 맞는가

- 반복되는 문서 정리, 보고서 작성, 코드 작업을 에이전트에게 맡기고 싶은 사람
- 에이전트가 건드릴 수 있는 폴더와 네트워크를 직접 정하고 싶은 사람
- 자리를 비운 동안에도 진행 상황을 확인하고 승인하고 싶은 사람

예를 들어 매주 월요일 특정 폴더의 회의록을 읽고 할 일 목록을 만드는 작업을 생각해 보겠습니다. Go에서는 에이전트에게 그 폴더만 열어 주고, 작업을 Tasks로 예약하고, 잘된 실행을 Playbooks로 저장해 다음에도 같은 방식으로 돌릴 수 있습니다.

## 여덟 가지 기능

제품 페이지가 소개하는 기능입니다.

| 기능 | 설명 |
|---|---|
| Bounded task agents | 에이전트마다 특정 프로젝트, 폴더, 격리 환경을 지정합니다. 컴퓨터 전체를 열어 주지 않습니다 |
| Reviewable execution | 빠르게 하려면 로컬에서, 경계를 더 좁히려면 Docker나 Podman 안에서 실행합니다 |
| Mission Control | 큰 작업을 여러 도우미 에이전트에게 나누고, 승인 요청을 실시간으로 보고, 결과를 한곳에서 검토합니다 |
| Memory Bank | 진행 중인 작업을 정리하고, 결정과 선호를 다음 실행까지 보관합니다 |
| Playbooks | 잘된 실행을 반복할 수 있는 절차로 바꿉니다 |
| Tasks & shortcuts | 반복 작업을 예약하고, 자주 쓰는 지시를 슬래시 명령으로 만듭니다 |
| Tools & context | MCP 서버와 외부 도구를 연결하고, 실행 전에 관련 파일을 찾아 둡니다 |
| Mobile direction | 책상을 떠나서도 진행 상황 확인, 승인, 지시를 합니다 |

제품 페이지에는 확장 기능 목록(Extensions catalog)도 있습니다. 공식 확장과 커뮤니티 확장을 검색하고, 분류별로 걸러 보고, Featured, Most downloaded, Top rated, Name 순으로 정렬할 수 있습니다.

## 설치 파일

제품 페이지의 **Download Go** 또는 **Choose installer**에서 받습니다.

| 운영체제 | 파일 형식 |
|---|---|
| macOS (Apple Silicon) | dmg |
| Windows x64 | exe |
| Linux (Debian/Ubuntu) | deb |
| Linux | AppImage |

Studio와 달리 Intel Mac용 설치 파일은 목록에 없습니다. 모바일 앱에 대해서는 공식 블로그에 iOS와 Android용 Go 앱 출시 글이 올라와 있습니다. 한편 Go 문서의 Channels 항목은 Android 앱 접근을 계정별 초대제로 적고 있어, 실제 사용 가능 여부는 계정에서 확인해야 합니다.

## 문서가 설명하는 일곱 계층

Go 문서는 제품을 일곱 계층으로 나눕니다. 문제가 생겼을 때 어디를 볼지 정하는 기준이 됩니다.

1. **Agents**: 실행 주체. 작업 공간, 실행 방식, 모델 경로, 권한을 가집니다.
2. **Briefing and chat flow**: Pulse, Side Chat, 대화 정리, 응답 제어.
3. **Mission Control**: 하위 에이전트, 승인, 인계를 다루는 실행 상황실.
4. **Memory**: 현재 상태(Working Brief)와 오래 보관하는 기억(Memory Bank).
5. **Playbooks, Tasks, Rules**: 재사용, 예약, 이벤트 기반 자동화.
6. **Providers and Tools**: 모델 경로, MCP, 검색과 도구.
7. **Security and Settings**: 발신자 정책, 폴더와 네트워크 통제, 앱 기본값.

문서의 문제 해결 순서는 Agents(주체와 범위), Providers와 Tools(기능 경로), Security와 Settings(안전장치) 순입니다.

## 권장 설정 순서

Go 문서의 Setup 항목은 다음 순서를 권합니다. 앞 단계가 뒤 단계의 바탕이 되므로 순서를 지키라고 적혀 있습니다.

1. Go를 설치합니다.
2. **Settings > Model Providers**에서 모델 제공업체를 하나 이상 연결합니다. 모델을 고를 수 있는지, 시험 대화가 되는지 확인합니다. 문서는 뒤에 생기는 오류 대부분이 여기서 비롯된다고 설명합니다.
3. **Settings > General**에서 기본 작업 방식(Working Style)을 정합니다. 문서의 제안은 기본값 `Balanced`, 위험이 큰 에이전트는 `Careful`입니다.
4. **Settings > Agents**에서 에이전트를 하나만 만듭니다. 작업 공간 하나, 실행 방식 하나, 경로는 `Local only`로 좁게 시작합니다.
5. **Settings > Security**에서 보안 기준을 적용합니다.
6. **Settings > Tools**에서 필요한 도구만 하나씩 더하고, 하나씩 시험합니다.
7. Pulse, Rules, 작업 공간 프로필 파일은 필요할 때만 켭니다.
8. Channels와 Cloud Sync는 로컬 실행이 안정된 뒤에 더합니다.

에이전트 실행 방식은 두 가지입니다.

| 방식 | 특징 | 조건 |
|---|---|---|
| Host mode | 빠르게 반복 작업 | 없음 |
| Container mode | 더 강한 격리, 속도는 느림 | Docker 또는 Podman 설치 필요. macOS에서는 OrbStack 사용 가능 |

## 보안 설정

Go 문서의 Security 항목은 여러 겹의 통제를 함께 쓰라고 권합니다. 한 겹만 믿으면 틈이 생긴다는 설명입니다.

| 통제 | 하는 일 |
|---|---|
| Sender Groups | 누가 에이전트와 채널을 호출할 수 있는지 정합니다 |
| Allowed Folders | 에이전트가 읽고 쓸 수 있는 폴더. 폴더마다 읽기·쓰기 또는 읽기 전용 |
| Blocked Patterns | 허용 폴더 안에서도 막을 경로. 문서의 예는 `.ssh`, `.aws`, `.env`, `credentials`, `id_rsa` 등 |
| Network Guard | 밖으로 나가는 네트워크 제한. 프리셋은 `Recommended`, `Privacy`, `Strict`, `Approved Only` |
| Airlock | 웹사이트 단위 허용·차단. 컨테이너 에이전트와 함께 쓸 때 효과가 큽니다 |
| Approvals | 위험한 행동 전에 확인을 요청합니다 |
| Rules | 이벤트에 따라 안내 추가, 행동 차단, 후속 점검 실행 |

문서의 권고는 좁게 시작하라는 것입니다. 홈 폴더 전체가 아니라 프로젝트 폴더만 허용하고, 참고 자료는 읽기 전용으로 두고, Network Guard는 `Recommended`에서 시작해 민감한 자동화는 더 엄격한 프리셋으로 옮깁니다. Approvals는 정책이 안정될 때까지 켜 둡니다. Rules는 강제 통제를 대신하지 못한다는 점도 문서에 적혀 있습니다.

## Mission Control과 채널

**Mission Control**은 복잡한 작업의 상황실입니다. 대화에서 작업을 시작하고, 필요한 만큼 도우미 에이전트를 띄우고, 진행 상황과 막힌 지점을 보고, 승인 요청을 처리하고, 결과를 원래 대화로 합칩니다. 작업 상태는 **Working**, **Needs you**, **Ready to review**, **Done**으로 표시됩니다. 자주 쓰는 도우미 역할은 **Settings > Task Force**에서 프리셋으로 저장할 수 있습니다.

**Channels**는 원격 메시지 플랫폼으로 Go와 주고받는 기능입니다. **Settings > Remote Routes**에서 설정하며, 문서가 든 플랫폼은 Discord, Telegram, WhatsApp, 그리고 Msty Go 모바일 경로입니다. 휴대전화는 **Settings > Cloud > Msty Go**에서 QR로 연결합니다. 채널은 선택 사항이며, 에이전트는 원격 연결 없이 **Local only**로 실행할 수 있습니다.

## 요금

2026-10-11 확인 기준입니다. 요금은 바뀔 수 있습니다.

| 요금제 | 가격 | 상태 |
|---|---|---|
| Free | 0달러 | 베타로 사용 가능 |
| Teams | 문의 | 계획 단계 |
| Enterprise | 문의 | 계획 단계 |

자세한 포함 항목은 [요금제 자세히 보기](/guide/pricing/)에 있습니다.

## 알아 둘 한계

- 베타 제품입니다.
- 제품 페이지와 문서에는 최소 하드웨어 사양이 적혀 있지 않습니다.
- 문서의 Security 항목은 각 통제의 기본값을 밝히지 않습니다. 설치 뒤 직접 확인해야 합니다.
- Mission Control에서 동시에 띄울 수 있는 도우미 수 같은 한도는 문서에 없습니다.

## 참고한 문서

- [Msty Go 제품 페이지](https://msty.ai/products/go/)
- [Go 문서: Overview](https://docs.msty.ai/go)
- [Go 문서: Setup](https://docs.msty.ai/go/setup)
- [Go 문서: Security](https://docs.msty.ai/go/security)
- [Go 문서: Mission Control](https://docs.msty.ai/go/mission-control)
- [Go 문서: Channels](https://docs.msty.ai/go/channels)
- [Msty 요금](https://msty.ai/pricing/)
- [Msty Resources](https://msty.ai/resources/)
