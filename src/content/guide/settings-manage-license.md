---
title: 라이선스 관리하기
description: Msty Studio의 Aurum 라이선스 키를 넣는 곳, 활성화된 기기를 관리하는 포털, 구독과 영수증을 확인하는 방법을 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 110
verified: 2026-10-11
tags: [Msty, Studio, 라이선스, Aurum]
---

## 누구에게 필요한 글인가

Msty Studio의 Free 요금제는 라이선스 키 없이 씁니다. 이 글은 다음에 해당하는 사람을 위한 것입니다.

- Aurum 또는 Aurum Lifetime을 샀거나 살 예정인 사람
- 컴퓨터를 바꿔서 라이선스를 옮겨야 하는 사람
- 연간 구독을 바꾸거나 영수증이 필요한 사람

요금제의 종류와 가격은 [요금제 자세히 보기](/guide/pricing/)에 있습니다. 회사에서 Enterprise 계정으로 쓰는 사람은 라이선스 키가 아니라 이메일 코드나 SSO로 로그인하므로 [사용자 관리](/guide/enterprise-users/)를 보세요.

## 라이선스 키를 넣는 곳

### Studio Desktop

**Settings > License and Access**에 라이선스 키를 넣어 유료 기능을 엽니다. Settings는 Mac에서 `Cmd + ,`, Windows와 Linux에서 `Ctrl + ,`로 엽니다.

### Studio Web

Studio Web은 Aurum 이상에서 쓸 수 있습니다. 공식 문서의 Quick Start에 나온 순서입니다.

1. 요금 페이지에서 Aurum 라이선스를 사고 라이선스 키를 준비합니다.
2. 브라우저에서 msty.studio를 엽니다.
3. 라이선스 키를 넣고 **Next**를 누릅니다.
4. 모델 제공업체를 추가합니다. 온라인 제공업체를 넣거나, **Remote Connections** 또는 Msty Sidecar로 데스크톱에 연결합니다.
5. 설정을 마치고 첫 질문을 보냅니다.

문서에 따르면 새 기기에서 Studio Web을 처음 열 때 라이선스 키를 넣어야 합니다. 휴대전화 브라우저에서 처음 열 때도 마찬가지입니다.

## 활성화된 기기 관리하기

라이선스 키가 어느 기기에 활성화되어 있는지는 **Activation Management Portal**에서 관리합니다.

1. msty.studio/activation-management 로 갑니다.
2. Aurum 라이선스를 살 때 쓴 이메일 주소와 라이선스 키를 넣습니다.
3. 로그인하면 라이선스 키가 활성화된 기기를 관리할 수 있습니다.

### 구매 시기에 따라 가는 곳이 다릅니다

로그인한 뒤 어디로 이동하는지는 라이선스를 산 시기에 따라 갈립니다.

| 구매 시기 | 이동하는 곳 | 로그인 방법 |
|---|---|---|
| 2025년 12월 21일 이후 | 새 활성화 포털 | 이메일과 라이선스 키 |
| 그 이전 | Lemon Squeezy 고객 포털 | 구매한 이메일을 넣으면 로그인 링크를 메일로 받음 |

### 컴퓨터를 바꿀 때

문서에 단계별 절차가 따로 나와 있지는 않지만, 포털의 기능으로 미루어 순서는 이렇습니다.

1. 포털에서 옛 컴퓨터의 활성화를 정리합니다.
2. 새 컴퓨터에 Studio를 설치합니다.
3. **Settings > License and Access**에 같은 라이선스 키를 넣습니다.

대화와 설정은 라이선스와 함께 따라오지 않습니다. 기기 사이에 자동 동기화가 없으므로 [데이터 백업과 복구](/guide/settings-backup-lost-found/)의 방법으로 따로 옮겨야 합니다.

## 구독 관리와 영수증

Aurum 연간 구독을 관리하거나 영수증을 볼 곳은 라이선스 키의 모양으로 구분합니다.

| 라이선스 키 | 가는 곳 |
|---|---|
| `MSTY-`로 시작 | Stripe 고객 포털 |
| 그 밖의 모든 키 | Lemon Squeezy 고객 포털 |

공식 Q&A에 따르면 계정, 구독, 결제는 Lemon Squeezy와 Stripe가 처리하며, 결제 정보도 이들이 보관합니다. Msty는 자사 서버에 결제 정보를 저장하지 않는다고 밝힙니다. 그래서 결제 수단 변경, 영수증, 계정 데이터 삭제 요청은 Msty가 아니라 이 두 곳에서 합니다.

회사 경비로 처리해야 한다면 고객 포털에서 영수증을 내려받습니다. 영수증에 회사 정보나 사업자 번호를 넣을 수 있는지는 Manage License 문서에 적혀 있지 않습니다. Enterprise 구독의 경우에는 관리 포털에서 회사 정보와 세금 번호를 넣을 수 있다고 문서에 나와 있습니다. [Enterprise 개요](/guide/enterprise-overview/)를 보세요.

## Aurum과 Aurum Lifetime의 차이

요금 페이지 기준입니다. 2026-10-11에 확인했으며 바뀔 수 있습니다.

| 구분 | Aurum | Aurum Lifetime |
|---|---|---|
| 가격 | 사용자당 연 149달러 | 사용자당 349달러 |
| 결제 | 해마다 | 한 번 |
| 기능 | Aurum 기능 전체 | Aurum과 같음 |
| 업데이트 | 구독 기간 동안 | 평생 업데이트와 접근 |

연간 구독은 고객 포털에서 관리합니다. 구독을 끊은 뒤 유료 기능이 언제까지 유지되는지는 문서에 적혀 있지 않습니다.

## 메일이 오지 않을 때

라이선스 키와 로그인 링크는 메일로 옵니다. 받지 못했다면 다음 순서로 확인합니다.

1. 구매할 때 넣은 이메일 주소가 맞는지 확인합니다.
2. 스팸함, 프로모션함, 격리함을 봅니다.
3. 메일함에서 "Msty Studio"를 검색합니다.
4. 회사 메일이라면 전산 담당자에게 차단 여부를 확인합니다.

자세한 방법은 [Msty Studio 메일 허용 설정](/guide/enterprise-whitelist-emails/)에 있습니다.

## 라이선스 키 다루기

라이선스 키는 유료 기능을 여는 값입니다. 다음을 지키세요.

- 비밀번호 관리 프로그램에 보관합니다.
- 화면 캡처나 화면 공유에 키가 나오지 않게 합니다.
- 다른 AI 도구에 붙여 넣지 않습니다. 공식 문서도 라이선스 키와 API 키를 외부 AI 도구에 붙여 넣지 말라고 적었습니다.

## 문서에 없는 내용

Manage License 문서는 짧습니다. 다음은 문서와 요금 페이지에서 확인할 수 없었습니다.

| 궁금한 점 | 확인 결과 |
|---|---|
| 라이선스 하나로 활성화할 수 있는 기기 수 | 적혀 있지 않음 |
| 환불 조건 | 적혀 있지 않음 |
| 다른 사람에게 라이선스 양도 | 적혀 있지 않음 |
| 연간 구독에서 Lifetime으로 바꾸는 방법 | 적혀 있지 않음 |
| 구독 만료 후 동작 | 적혀 있지 않음 |

필요하면 구매 전에 Msty에 문의하세요. 공식 사이트의 **Talk to us**에서 문의할 수 있습니다.

## 자주 생기는 상황

| 상황 | 할 일 |
|---|---|
| 키를 넣었는데 유료 기능이 열리지 않는다 | 포털에서 키가 이 기기에 활성화되었는지 확인합니다 |
| 포털 로그인이 안 된다 | 구매 시기를 확인합니다. 2025년 12월 21일 이전 구매는 Lemon Squeezy 포털로 갑니다 |
| 영수증을 찾을 수 없다 | 키가 `MSTY-`로 시작하면 Stripe, 아니면 Lemon Squeezy 포털에서 찾습니다 |
| 새 휴대전화에서 Studio Web이 키를 묻는다 | 정상입니다. 새 기기에서 처음 열 때 키를 넣습니다 |

## 참고한 문서

- [Manage License](https://docs.msty.ai/studio/how-tos/manage-license)
- [Settings](https://docs.msty.ai/studio/settings/settings)
- [Quick Start](https://docs.msty.ai/studio/getting-started/quick-start)
- [Setup Tailscale for Sidecar](https://docs.msty.ai/studio/how-tos/setup-tailscale-for-sidecar)
- [Use Studio Docs with AI Tools](https://docs.msty.ai/studio/how-tos/ai-tools-docs)
- [Msty 요금](https://msty.ai/pricing/)
- [Privacy & Security Q&A](https://msty.ai/resources/privacy-faq/)
