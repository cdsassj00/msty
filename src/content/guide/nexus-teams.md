---
title: Teams로 팀별 기기 접근 정하기
description: Enterprise용 Nexus Teams에서 조직의 어느 팀이 어느 관리 기기에 닿을 수 있는지 배정하는 방법과 Fleet, Managed Guard 정책과의 관계를 정리합니다.
date: 2026-10-11
section: Msty Nexus
order: 140
verified: 2026-10-11
tags: [Msty, Nexus, Teams, Enterprise]
---

## 무엇을 하는 기능인가

문서에 Enterprise 표시가 붙은 기능입니다. Nexus 요금 비교표도 Teams / RBAC를 Enterprise에만 표시합니다.

Teams는 Msty Account의 어느 팀이 어느 관리 대상 Nexus 기기에 닿을 수 있는지를 정합니다. 역할 구분은 이렇습니다.

| 관리하는 곳 | 관리하는 것 |
|---|---|
| Msty Account | 사람, 조직 내 역할, 팀 구성 |
| Nexus의 Teams | 팀과 기기 사이의 접근 배정 |

업무 예를 들면(설명을 위한 예입니다), 연구팀에는 GPU 서버 두 대를, 영업팀에는 사무실 공용 Mac 한 대만 열어 주는 식입니다.

공식 문서의 Teams 페이지는 짧습니다. 이 글도 문서에 있는 범위만 다룹니다.

## 누가 바꿀 수 있는가

조직 소유자(owner)와 관리자(administrator)가 팀과 기기 사이의 접근을 바꿀 수 있습니다. 다른 구성원은 자기 역할이 허용하는 정보만 볼 수 있습니다.

조직 선택기가 보이면, 바꾸기 전에 올바른 조직이 선택되어 있는지 확인합니다.

## 기기 접근 배정하기

1. **Teams**를 엽니다.
2. 조직을 고릅니다.
3. 팀을 고릅니다.
4. 그 팀이 닿을 수 있어야 하는 관리 기기를 켭니다.
5. 더 이상 필요 없는 기기의 접근은 끕니다.

이 변경은 Nexus 접근에만 영향을 줍니다. 사람의 Msty Account 역할이나 소속은 바뀌지 않습니다.

## Fleet과의 관계

| 화면 | 관리하는 것 |
|---|---|
| Fleet | 기기, 연결, 엔드포인트, 기기 단위 작업 |
| Teams | 누가 그 기기에 닿을 수 있는가 |

기기는 팀 배정 없이도 Fleet에 있을 수 있습니다. 다만 Managed Guard 정책을 켰다면 사정이 달라집니다. 관리 대상 기기는 팀이 정확히 하나씩 배정되어 있어야 합니다. 그래야 control plane이 올바른 정책을 내려보낼 수 있습니다.

기기를 추가하고 연결하는 방법은 [Fleet으로 여러 기기 관리하기](/guide/nexus-fleet/)에 있습니다.

## Managed Guard

Enterprise 조직은 조직의 Guard 정책을 팀별로 게시할 수 있습니다. 흐름은 세 단계입니다.

1. control plane이 배정된 기기마다 관련된 정책만 추려 서명합니다.
2. Runtime이 그 서명을 검증합니다.
3. Runtime이 정책을 로컬에서 적용합니다.

다음 경우에는 정책 동기화가 유효한 결과를 고를 수 없습니다.

- 관리 대상 기기에 팀이 없을 때
- 팀이 여러 개 배정되어 있을 때
- 지금 유효한 팀 정책이 없을 때

문서의 지침은 자격이나 정책 점검을 우회하지 말고 배정을 바로잡으라는 것입니다.

Guard 정책에 어떤 항목이 들어가는지, 어디서 작성하고 게시하는지는 이 문서 페이지에는 설명이 없습니다. Nexus 요금 비교표는 Guardrails 행에 Pro는 "Local policies", Enterprise는 "Organization-wide policies"라고 적고, [Client Tokens](/guide/nexus-client-tokens/) 문서는 토큰 한도가 Pro의 로컬 guardrail 또는 Enterprise의 조직 정책과 합쳐진다고 설명합니다. Guard 자체를 다루는 별도 문서 페이지는 확인 당시 없었습니다.

## 보안 경계

팀을 배정한다고 제공업체 자격 증명이나 클라이언트 토큰 원문이 공유되지는 않습니다. 배정은 조직의 Nexus 자격과 정책에 따라 관리된 접근을 줄 뿐입니다.

네트워크 접근이나 호스팅 엔드포인트(Access from anywhere)가 켜진 기기에 접근을 주기 전에는 [Nexus 보안 모델](/guide/nexus-security/)을 검토하라고 문서는 권합니다.

## 문서에 없는 것

도입을 검토할 때 궁금할 만하지만 공식 문서에는 설명이 없는 항목입니다.

- 팀을 만들고 사람을 넣는 절차 (Msty Account 쪽에서 한다고만 적혀 있습니다)
- SSO 연동 방법 (요금 비교표에 Enterprise 항목으로만 나옵니다)
- 팀별·사용자별 요청 한도와 로그의 설정 화면 (요금 비교표에 Enterprise 항목으로만 나옵니다)

Studio의 팀 기능은 별개입니다. Studio 쪽은 [기업과 팀 개요](/guide/enterprise-overview/)에서 다룹니다.

## 참고한 문서

- [Nexus 문서: Teams](https://docs.msty.ai/nexus/teams)
- [Nexus 문서: Client Tokens](https://docs.msty.ai/nexus/client-tokens)
- [Msty Nexus 요금](https://nexus.msty.ai/pricing)
