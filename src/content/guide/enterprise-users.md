---
title: 사용자 관리 (Manage Users)
description: Msty Studio Enterprise에서 사용자를 초대하고, 역할을 바꾸고, 정지하거나 삭제하는 방법과 초대받은 사람이 웹과 데스크톱에서 로그인하는 순서를 정리합니다.
date: 2026-10-11
section: 기업과 팀
order: 20
verified: 2026-10-11
tags: [Msty, Studio, Enterprise, 사용자 관리]
---

## 좌석과 사용자

Enterprise 계정은 정해진 수의 사용자 좌석을 삽니다. 관리자는 그 수만큼 사용자를 초대할 수 있습니다. 좌석이 모자라면 Owner가 구독 관리 포털에서 좌석을 늘립니다. 방법은 [Enterprise 요금제 개요](/guide/enterprise-overview/)에 있습니다.

이 글의 기능은 모두 Enterprise 요금제에 속합니다. 요금 비교표에서 "Manage Users and Teams"는 Teams 열에만 표시되어 있습니다.

## 세 가지 역할

| 역할 | 인원 | 할 수 있는 일 | 할 수 없는 일 |
|---|---|---|---|
| Owner | 계정당 한 명 | 계정 정보와 결제를 포함한 모든 것 | 없음 |
| Admin | 여러 명 가능 | 사용자·팀 관리를 포함한 Studio의 모든 기능 | 구독 관리, 결제 정보 보기 |
| User | 여러 명 | 관리자가 자기 팀에 배정한 기능 | 사용자·팀 관리 |

일반 사용자가 무엇을 쓸 수 있는지는 역할보다 팀 배정이 정합니다. 팀별 설정은 [팀 관리](/guide/enterprise-teams/)에서 다룹니다.

역할을 나누는 예를 들면 이렇습니다. 계약과 결제를 맡는 사람이 Owner가 되고, 실제로 사용자를 넣고 빼는 전산 담당자 두 명이 Admin이 됩니다. Admin을 한 명만 두면 그 사람이 자리를 비웠을 때 신규 입사자를 넣을 수 없으므로 두 명 이상을 권합니다.

## 사용자 초대하기

Owner와 Admin이 할 수 있습니다.

1. **Invite User**를 누릅니다.
2. 사용자의 이름과 이메일 주소를 넣습니다.

초대받은 사람은 Msty Studio에 로그인할 수 있는 일회용 링크가 담긴 메일을 받습니다. 그 사람이 Studio Desktop, Studio Web, 또는 둘 다를 쓸 수 있는지는 소속 팀의 설정에 따릅니다.

처음 로그인하면 사용자 목록에 **Active**로 표시됩니다. 목록에서 이 표시를 보고 누가 아직 로그인하지 않았는지 알 수 있습니다.

### 초대 메일이 오지 않을 때

문서의 안내는 두 가지입니다.

- 사용자에게 스팸함을 확인하게 합니다.
- 전산 담당자가 Msty Studio의 메일 발송을 허용 목록에 넣습니다. 문서는 보안에 민감한 조직과 교육 기관에서 특히 필요하다고 적었습니다.

자세한 방법은 [Msty Studio 메일 허용 설정](/guide/enterprise-whitelist-emails/)에 있습니다. 많은 사람을 한꺼번에 초대하기 전에 한 사람으로 먼저 시험해 보면, 회사 메일 보안에 막히는지 미리 알 수 있습니다.

## 사용자 관리하기

사용자 줄 오른쪽의 말줄임표를 누르면 다음 항목이 나옵니다.

| 항목 | 하는 일 | 비고 |
|---|---|---|
| **Promote to Admin** | User를 Admin으로 올립니다 | |
| **Demote to User** | Admin을 User로 내립니다 | Owner만 가능 |
| **Suspend User** | 로그인을 막습니다 | |
| **Unsuspend User** | 로그인을 다시 허용합니다 | |
| **Manage Team** | 사용자를 팀에 넣거나 뺍니다 | |
| **Edit User** | 이름과 이메일 주소를 고칩니다 | |
| **Delete User** | Enterprise 계정에서 사용자를 없앱니다 | 다시 쓰려면 새로 초대해야 함 |

사용자는 자기 이메일 주소를 직접 바꿀 수 없습니다. Admin이나 Owner가 **Edit User**로 바꿔 줘야 합니다. 개명이나 메일 도메인 변경이 있을 때 기억해 둘 점입니다.

### 정지와 삭제 가운데 무엇을 쓸까

| 상황 | 권하는 동작 | 이유 |
|---|---|---|
| 휴직, 장기 출장 | **Suspend User** | 돌아오면 **Unsuspend User**로 바로 되살릴 수 있습니다 |
| 계정 도용이 의심됨 | **Suspend User** | 먼저 막고 확인합니다 |
| 퇴사 | **Delete User** | 좌석을 비웁니다 |

정지한 사용자가 좌석을 차지하는지는 문서에 적혀 있지 않습니다.

한 가지 꼭 알아 둘 점이 있습니다. 대화는 각 사용자의 기기에 저장되며 Msty 서버에 없습니다. 따라서 사용자를 정지하거나 삭제해도 그 사람 기기에 있는 대화 데이터를 관리자가 원격으로 지우는 기능은 문서에 나와 있지 않습니다. 퇴사자의 기기 회수와 초기화는 회사의 일반 절차로 처리해야 합니다.

## 초대받은 사람의 로그인

초대 메일에는 **magic link**와 **auth code** 두 가지가 들어 있습니다.

### Studio Web

magic link를 누르면 웹 버전에 로그인됩니다. 이 링크는 한 번만 쓸 수 있습니다.

링크가 만료되었거나 이미 썼다면 다음 순서로 합니다.

1. Msty Studio Web의 첫 화면으로 갑니다.
2. **Enterprise Login**을 고릅니다.
3. 이메일 주소를 넣어 코드를 받습니다.
4. **Enter Code**를 고르고 메일로 받은 코드를 넣습니다.

### Studio Desktop

1. Desktop이 설치되어 있지 않으면 msty.ai에서 자기 운영체제에 맞는 판을 내려받습니다. [Windows 설치](/guide/install-windows/), [Mac 설치](/guide/install-mac/) 참고.
2. Msty Studio Desktop에서 **Settings > License and Access**로 갑니다.
3. **Enterprise Login**을 고르고 이메일 주소를 넣어 코드를 받습니다.
4. 받은 코드를 Desktop에 넣어 로그인합니다.

SSO를 쓰는 조직은 회사의 계정 시스템으로 로그인합니다. SSO 설명은 [Enterprise 요금제 개요](/guide/enterprise-overview/)에 있습니다.

## 신규 사용자에게 보낼 안내문

초대 메일만으로는 무엇을 해야 할지 모르는 사람이 많습니다. 관리자가 함께 보낼 안내의 뼈대를 적어 봅니다. 문서에 있는 양식은 아니며 문서의 절차를 바탕으로 만든 것입니다.

1. "Msty Studio"에서 온 메일을 찾습니다. 없으면 스팸함을 봅니다.
2. 웹으로 쓸 사람은 메일의 링크를 누릅니다. 링크는 한 번만 쓸 수 있습니다.
3. 데스크톱으로 쓸 사람은 앱을 설치한 뒤 **Settings > License and Access > Enterprise Login**에서 회사 이메일을 넣고 코드를 받습니다.
4. 로그인한 뒤 쓸 수 있는 모델과 기능은 소속 팀에 따라 다릅니다.
5. 온라인 모델을 쓰도록 허용된 팀이라면 해당 제공업체의 API 키를 각자 넣어야 할 수 있습니다. 관리자가 공유한 모델은 바로 쓸 수 있습니다.

화면이 영어이므로 메뉴 이름은 영어 그대로 알려 주는 편이 좋습니다.

## 관리 기록

사용자를 초대하고 역할을 바꾸는 행위는 감사 로그의 대상입니다. Owner와 Admin이 **Teams > Audit Trail**에서 봅니다. [감사 로그](/guide/enterprise-audit-log/)를 참고하세요.

## 정기 점검

문서에 점검 주기에 대한 권고는 없습니다. 운영하면서 챙길 만한 항목입니다.

| 점검 | 볼 것 |
|---|---|
| 미로그인 사용자 | 초대했지만 **Active**가 아닌 사람. 메일이 막혔을 수 있습니다 |
| 퇴사자 | 인사 변동과 사용자 목록을 맞춰 봅니다 |
| Admin 수 | 너무 많거나 한 명뿐이지 않은지 |
| 좌석 | 남는 좌석과 모자란 좌석 |

## 참고한 문서

- [Manage Users](https://docs.msty.ai/studio/enterprise/users)
- [Enterprise Overview](https://docs.msty.ai/studio/enterprise/overview)
- [Manage Teams](https://docs.msty.ai/studio/enterprise/teams)
- [Audit Log](https://docs.msty.ai/studio/enterprise/audit-log)
- [Msty 요금](https://msty.ai/pricing/)
