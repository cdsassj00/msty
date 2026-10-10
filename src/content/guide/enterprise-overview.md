---
title: Enterprise 요금제 개요
description: Msty Studio의 Enterprise 요금제에 들어 있는 기능, 데이터가 저장되는 위치, SSO, 구독 관리 방법을 공식 문서 기준으로 정리합니다.
date: 2026-10-11
section: 기업과 팀
order: 10
verified: 2026-10-11
tags: [Msty, Studio, Enterprise, 팀]
---

## 누구를 위한 요금제인가

Msty Studio의 Enterprise 요금제는 여러 사람이 함께 쓰는 팀과 조직을 위한 것입니다. 공식 문서는 사용자 관리, 협업 도구, 감사 로그, 추가 보안 같은 기능이 필요한 조직을 대상으로 든다고 설명합니다.

개인이 혼자 쓴다면 Free나 Aurum으로 충분합니다. 다음에 해당하면 Enterprise를 검토할 만합니다.

- 직원들이 쓸 수 있는 모델과 기능을 회사가 정해야 한다.
- 잘 만든 프롬프트, 페르소나, Knowledge Stacks를 팀이 함께 써야 한다.
- 회사의 계정 관리 시스템으로 로그인하게 해야 한다.
- 누가 사용자를 추가하고 권한을 바꿨는지 기록이 남아야 한다.

요금 페이지에서 이 요금제의 이름은 "Enterprise & Teams"이며, 가격은 문의, 최소 좌석은 5석입니다. 2026-10-11 확인 기준이며 바뀔 수 있습니다. [요금제 자세히 보기](/guide/pricing/)를 보세요.

## 들어 있는 기능

문서에 따르면 Enterprise에는 Aurum 요금제의 모든 기능이 들어 있고, 다음이 더해집니다.

| 기능 | 내용 | 정리한 글 |
|---|---|---|
| User Management | 사용자 초대와 역할 관리 | [사용자 관리](/guide/enterprise-users/) |
| Team Management and Access Controls | 팀별로 기능, 플랫폼, 모델 접근 정하기 | [팀 관리](/guide/enterprise-teams/) |
| Resource Sharing | 프롬프트와 페르소나 등 자원 공유. 문서는 더 많은 자원 종류를 계획 중이라고 적음 | [저장소와 공유](/guide/enterprise-storage-sharing/) |
| Storage Options for Team Sharing | 팀 공유에 쓸 저장소 선택 | [저장소와 공유](/guide/enterprise-storage-sharing/) |
| Audit Logs | 사용자·팀 관리 행위 기록 | [감사 로그](/guide/enterprise-audit-log/) |
| Single Sign-On (SSO) | 회사 계정 시스템으로 로그인 | 이 글 아래 |

요금 페이지의 비교표는 이 밖에 Access Management와 Priority Support를 Teams 열에만 표시합니다.

## 세 가지 역할

Enterprise 계정의 사용자는 세 역할 가운데 하나를 가집니다.

| 역할 | 권한 |
|---|---|
| Owner | 계정당 한 명. 계정 정보와 결제를 포함한 모든 권한 |
| Admin | 사용자·팀 관리를 포함한 Studio의 모든 기능. 구독 관리와 결제 정보에는 접근 못 함 |
| User | 관리자가 팀에 배정한 기능만 사용 |

일반 사용자가 무엇을 쓸 수 있는지는 주로 팀 배정으로 정해집니다.

## SSO

SSO는 Microsoft Azure EntraID 같은 계정 관리 시스템에 Msty Studio를 연결하는 기능입니다. 관리자는 그 시스템에서 접근 권한을 관리하고, 허가된 사용자는 그 시스템으로 Msty Studio에 로그인합니다.

문서가 이름을 든 시스템은 Microsoft Azure EntraID 하나입니다. 다른 시스템 지원 여부와 설정 절차는 문서에 나와 있지 않으며, 문서는 자세한 내용을 Msty에 메일로 문의하라고 안내합니다. 회사에서 쓰는 계정 시스템이 지원되는지는 도입 전에 확인해야 합니다.

SSO를 쓰지 않으면 사용자는 메일로 받은 초대 링크와 인증 코드로 로그인합니다.

## 데이터는 어디에 저장되는가

도입을 검토할 때 가장 많이 묻는 부분입니다. 문서의 "Enterprise Security Information"을 정리했습니다. 문서에서 "Msty"는 제품이 아니라 회사를 가리킵니다.

### 대화

- 대화는 사용자의 기기에 남습니다. Msty 서버에 저장되지 않습니다.
- Msty는 대화를 보거나 읽지 않고, 접근할 수 없으며, 대화를 드러내는 원격 측정이 없다고 밝힙니다.
- 온라인 모델을 쓰면 대화와 맥락이 그 제공업체로 전송됩니다. 제공업체의 개인정보 처리방침을 확인해야 합니다.
- 웹 검색이나 파일 조회처럼 외부 서비스에 연결되는 MCP 도구는 필요한 데이터를 그 서비스로 보낼 수 있습니다.
- 관리자는 팀의 온라인 모델 사용을 켜고 끌 수 있습니다. 특정 모델만 허용하거나 전혀 허용하지 않을 수 있습니다.

### 공유 자원

- 관리자는 Knowledge Stacks, Prompts, Personas의 팀 공유를 켤 수 있습니다.
- 공유 자원은 고객이 제공하고 관리하는 S3 호환 저장소에 저장됩니다.
- Msty는 그 저장소와 그 안의 데이터에 접근할 수 없습니다.
- Msty는 공유 자원을 자사 서버에 저장하지 않습니다.

### Msty 서버에 저장되는 것

- 사용자, 팀, 감사 로그 데이터는 이 기능들을 제공하기 위해 Msty 서버에 저장됩니다.
- 이 데이터는 업계 관행에 따라 보호하며 민감한 데이터는 암호화한다고 설명합니다.
- Enterprise 요금제는 단일 테넌시입니다. 고객별 데이터가 다른 Enterprise 고객과 분리되어 저장됩니다.
- 사용자, 팀, 저장소 프로필, 감사 로그 데이터 외에는 Msty가 대화, 공유 자원, 그 밖의 활동에 접근할 수 없다고 밝힙니다.

### 한눈에 보기

| 데이터 | 위치 | Msty의 접근 |
|---|---|---|
| 대화 | 사용자 기기 | 없음 |
| 온라인 모델로 보낸 내용 | 해당 제공업체 | 해당 없음. 제공업체 정책에 따름 |
| 공유 자원 | 고객의 S3 호환 저장소 | 없음 |
| 사용자·팀·저장소 프로필 정보 | Msty 서버 | 있음. 기능 제공용 |

감사 로그의 저장 위치는 문서 안에서 설명이 엇갈립니다. 이 개요 항목은 Msty 서버에 저장한다고 적었고, Audit Log 항목은 각 사용자 기기에 로컬로 저장한다고 적었습니다. [감사 로그](/guide/enterprise-audit-log/)에서 다시 다룹니다.

인증 현황을 포함한 전체 보안 설명은 [보안과 거버넌스](/guide/security-governance/)에 모았습니다.

## 구독 관리

구독과 결제는 Owner만 다룰 수 있습니다.

1. **Settings > Teams > Settings**로 갑니다.
2. **Manage Subscription**을 누릅니다. 구독 관리 포털이 열립니다.

포털에서 할 수 있는 일은 다음과 같습니다.

- 결제 정보와 결제 수단 바꾸기
- 영수증에 들어갈 회사 정보 넣기
- 지난 영수증 보고 내려받기
- 구독 해지
- 사용자 좌석 늘리거나 줄이기

문서의 팁이 하나 있습니다. 세금 번호나 부가가치세 번호가 해당된다면 되도록 빨리 넣으라는 것입니다. 넣은 뒤에 발행되는 영수증부터 반영되기 때문입니다.

## 도입 순서

문서에 도입 절차가 한 줄로 정리되어 있지는 않습니다. 각 문서 항목의 내용을 순서대로 엮으면 다음과 같습니다.

1. Msty에 문의해 좌석 수와 조건을 정합니다. 최소 5석입니다.
2. Owner가 로그인합니다.
3. 공유를 쓸 계획이면 S3 호환 저장소를 준비하고 Storage Profile을 등록합니다.
4. 팀을 만들고 팀별로 기능, 플랫폼, 모델 접근을 정합니다.
5. 사용자를 초대하고 팀에 배정합니다.
6. 초대 메일이 도착하는지 한 사람으로 먼저 시험합니다. 도착하지 않으면 [메일 허용 설정](/guide/enterprise-whitelist-emails/)을 합니다.
7. 관리자를 한두 명 더 지정합니다.

공식 사이트의 기업 소개 페이지는 전사 도입보다 팀 하나와 업무 하나로 시범 운영을 먼저 하라고 권합니다. [Msty 플랫폼 한눈에 보기](/guide/platform-overview/)를 보세요.

## 문서에 없는 내용

- 가격과 좌석당 단가
- SSO에서 지원하는 시스템의 전체 목록과 설정 절차
- Msty 서버에 저장되는 사용자·팀 데이터의 저장 지역과 보관 기간
- 계약 해지 뒤 데이터 처리

이런 내용은 Msty에 직접 문의해야 합니다.

## 참고한 문서

- [Enterprise Overview](https://docs.msty.ai/studio/enterprise/overview)
- [Manage Users](https://docs.msty.ai/studio/enterprise/users)
- [Audit Log](https://docs.msty.ai/studio/enterprise/audit-log)
- [Msty 요금](https://msty.ai/pricing/)
- [Msty for enterprise](https://msty.ai/enterprise/)
