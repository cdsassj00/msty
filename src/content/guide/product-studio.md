---
title: Msty Studio 자세히 보기
description: 공식 제품 페이지가 설명하는 Msty Studio의 여덟 가지 기능, 지원 운영체제, 데스크톱과 웹의 차이, 팀 통제 기능을 정리합니다.
date: 2026-10-11
section: Msty 제품과 요금
order: 10
verified: 2026-10-11
tags: [Msty, Studio, 제품]
---

## Studio는 무엇인가

Msty Studio는 Msty의 네 제품 가운데 사람이 직접 쓰는 작업 공간입니다. 공식 제품 페이지는 Studio를 "Private AI workspace"라고 부르며, 모델과 대화하고, 지식을 정리하고, 미디어를 만들고, 프롬프트를 다시 쓰는 일을 한곳에서 하게 해 준다고 설명합니다.

페이지의 "What it does" 부분은 세 가지를 말합니다.

- 로컬 모델과 온라인 모델을 한 작업 공간에 모읍니다. 개인이 써도 되고 팀이 써도 됩니다.
- 대화, 파일, 프롬프트, 페르소나, Knowledge Stacks부터 시작합니다.
- 사용 범위가 커지면 승인된 자료를 공유하고 통제 기능을 더할 수 있습니다.

## 누구를 위한 제품인가

제품 페이지의 요약 표("At a glance")는 사용 범위를 "Personal and team"이라고 적었습니다. 정리하면 다음과 같습니다.

| 항목 | 사이트의 표기 |
|---|---|
| Platforms | Desktop and web |
| Models | Local and online |
| Use | Personal and team |
| Pricing | Free to start |

개인은 데스크톱 앱을 무료로 내려받아 바로 씁니다. 팀은 웹 버전과 팀 배포 옵션으로 공유 접근과 고객이 관리하는 저장소를 더합니다. 요금제별 차이는 [요금제 자세히 보기](/guide/pricing/)에 정리했습니다.

## 여덟 가지 기능

제품 페이지는 기능을 여덟 가지로 소개합니다. 각 기능이 실제로 무엇을 하는지 풀어서 설명합니다.

### 1. Model choice

로컬 추론 엔진과 온라인 제공업체를 한 화면에서 연결합니다. 페이지가 이름을 든 로컬 엔진은 MLX, llama.cpp, Ollama입니다. 예를 들어 사내 문서 요약은 내 PC의 로컬 모델로 하고, 긴 보고서 초안은 온라인 모델로 하는 식으로 같은 앱 안에서 바꿔 쓸 수 있습니다. 모델을 받는 방법은 [첫 실행과 모델 받기](/guide/first-run-and-models/)에서 다룹니다.

### 2. Reusable workspaces

프롬프트, 페르소나, 재사용할 수 있는 스킬을 만들어 두고 고쳐 가며 씁니다. 만드는 과정에서 AI의 도움을 받을 수 있다고 페이지는 설명합니다. 매번 같은 지시문을 다시 쓰는 일을 줄이는 기능입니다.

### 3. Split Chats

여러 모델을 나란히 놓고 같은 질문을 던져 어조, 깊이, 정확도를 비교합니다. 맥락은 유지됩니다. 어느 모델이 내 업무에 맞는지 고를 때 쓰기 좋습니다.

### 4. Agent Mode

도구를 쓰는 여러 단계 작업을 실행합니다. 페이지의 설명은 짧으며, 어떤 도구를 쓸 수 있는지는 제품 페이지에 적혀 있지 않습니다. 자세한 내용은 Studio 문서의 Agent Mode 항목에 있습니다.

### 5. Crew Conversations

여러 페르소나가 한 대화 안에서 함께 일합니다. 예를 들어 기획자 역할과 검토자 역할의 페르소나를 한 대화에 넣고 문서를 번갈아 보게 할 수 있습니다.

### 6. Knowledge Stacks

내 문서와 노트를 근거로 답하게 합니다. 페이지는 출처를 인식하는 검색(source-aware retrieval)이라고 표현합니다. 흔히 RAG라고 부르는 방식이며, 개념은 [용어집](/glossary/)을 참고하세요.

### 7. Media Studio

이미지를 만들고 영상 구상을 다듬습니다. 어떤 이미지 모델을 지원하는지는 제품 페이지에 구체적으로 나와 있지 않습니다.

### 8. Team controls

SSO, 역할 기반 접근 제어, 모델과 기능 통제, 관리 감사 로그입니다. 이 기능은 Enterprise & Teams 요금제에 속합니다.

## 지원 운영체제와 설치 파일

제품 페이지의 **Download Studio** 버튼 옆 **Choose installer**를 누르면 설치 파일 목록이 나옵니다. 2026-10-11에 확인한 목록입니다.

| 운영체제 | 조건 | 파일 형식 |
|---|---|---|
| macOS (Apple Silicon) | macOS 11 이상, M1~M4 칩 | dmg |
| macOS (Intel) | macOS 11 이상, Intel 프로세서 | dmg |
| Windows | Windows 10/11 (x64) | exe |
| Linux (AppImage) | x64 | AppImage |
| Linux (deb) | Debian/Ubuntu (x64) | deb |

확인 당시 페이지에 표시된 버전은 Studio 2.9.11이었고, Amazon Bedrock API 키 인증과 Anthropic 제공업체 수정이 들어갔다고 안내하고 있었습니다. 버전은 수시로 바뀝니다.

설치 과정은 [Windows 설치](/guide/install-windows/)와 [Mac 설치](/guide/install-mac/) 글을 보세요.

## 데스크톱과 웹의 차이

제품 페이지는 데스크톱을 개인 작업용, 웹과 팀 배포를 공유 접근과 고객 관리 저장소용이라고 구분합니다. Studio 문서의 Quick Start는 이를 더 분명하게 적었습니다.

| 구분 | Msty Studio Desktop | Msty Studio Web |
|---|---|---|
| 실행 위치 | 내 컴퓨터에 설치한 앱 | 브라우저 (msty.studio) |
| 요금 | Free부터 사용 | Aurum 이상 라이선스 필요 |
| 로컬 모델 | 앱이 직접 실행 | Desktop 또는 Sidecar에 연결해야 사용 |
| 문서의 권고 | 대부분의 새 사용자에게 권장 | 원격 제공업체 또는 Desktop·Sidecar 연결과 함께 사용 |

웹 버전을 쓸 때 알아 둘 점이 세 가지 있습니다.

- 웹 버전도 데이터를 브라우저 저장소에 로컬로 보관합니다. 브라우저 캐시나 사이트 데이터를 지우면 데이터가 사라지므로 백업이 필요합니다. [데이터 백업과 복구](/guide/settings-backup-lost-found/)를 참고하세요.
- 기기 사이에 데이터가 자동으로 동기화되지 않습니다.
- Safari는 직접 지원되지 않습니다. 문서에 따르면 터널링을 켠 Remote Connections로는 연결할 수 있습니다. 방법은 [Remote Connections](/guide/settings-remote-connections/)에 있습니다.

## 팀 통제 기능

제품 페이지가 든 팀 통제 기능은 네 가지입니다.

| 기능 | 뜻 |
|---|---|
| SSO | 회사의 계정 관리 시스템으로 로그인 |
| Role-based access | 역할(Owner, Admin, User)에 따라 권한을 나눔 |
| Model and feature controls | 팀별로 쓸 수 있는 모델과 기능을 정함 |
| Administrative audit logs | 사용자·팀 관리 행위를 기록 |

실제 화면에서 사용자를 초대하고 팀을 만드는 방법은 [Enterprise 개요](/guide/enterprise-overview/), [사용자 관리](/guide/enterprise-users/), [팀 관리](/guide/enterprise-teams/)에 정리했습니다.

## 페이지에 없는 내용

제품 페이지에는 FAQ가 없습니다. 요금제 이름과 가격도 "Free to start"라는 표현만 있고, 자세한 내용은 요금 페이지에 있습니다. 최소 메모리나 그래픽카드 같은 하드웨어 요구 사양도 이 페이지에는 적혀 있지 않습니다. 로컬 모델에 필요한 메모리는 모델 크기에 따라 달라지며, [모델 고르기](/models/)에서 참고할 링크를 볼 수 있습니다.

## 참고한 문서

- [Msty Studio 제품 페이지](https://msty.ai/products/studio/)
- [Msty 요금](https://msty.ai/pricing/)
- [Studio 문서: Quick Start](https://docs.msty.ai/studio/getting-started/quick-start)
- [Privacy & Security Q&A](https://msty.ai/resources/privacy-faq/)
