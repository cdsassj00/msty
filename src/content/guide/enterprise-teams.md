---
title: 팀 관리 (Manage Teams)
description: Msty Studio Enterprise에서 팀을 만들고, 팀별로 쓸 수 있는 플랫폼, 기능, 온라인 제공업체, 공유 모델, 저장소를 정하는 방법을 정리합니다.
date: 2026-10-11
section: 기업과 팀
order: 30
verified: 2026-10-11
tags: [Msty, Studio, Enterprise, 팀 관리]
---

## 팀이 하는 일

Msty Studio Enterprise에서 팀은 사용자를 묶는 단위이자 권한을 정하는 단위입니다. 공식 문서에 따르면 팀은 사용자를 묶고, 그들이 쓸 수 있는 기능, 플랫폼, 모델, 저장소를 통제합니다.

일반 사용자(User 역할)가 Studio에서 무엇을 할 수 있는지는 소속 팀의 설정이 정합니다. 그래서 Enterprise 도입에서 가장 공을 들일 부분이 팀 설계입니다.

예를 들면 이렇게 나눌 수 있습니다.

| 팀 | 정책 |
|---|---|
| 법무팀 | 온라인 제공업체 없음. 로컬 모델만. Knowledge Stacks 허용 |
| 마케팅팀 | 승인된 온라인 제공업체 하나. Real Time Data 허용 |
| 개발팀 | 관리자가 공유한 모델. Toolbox와 Remote Service 허용 |

이 글의 기능은 Enterprise 요금제에 속합니다. [Enterprise 요금제 개요](/guide/enterprise-overview/)를 먼저 보세요.

## 팀 만들기

1. **Teams** 탭으로 갑니다.
2. **Create New Team**을 누릅니다. 새 팀을 만드는 창이 옆에서 열립니다.
3. 아래 항목을 정합니다.
4. **Create Team**을 누릅니다.

### 정하는 항목

| 항목 | 내용 |
|---|---|
| **Team Name** | 팀 이름 |
| **Platform Access** | Msty Studio Desktop, Msty Studio Web, 또는 둘 다 |
| **Users** | 이 팀에 속할 사용자 |
| **Features** | 팀원이 쓸 수 있는 기능 |
| **Model Hub** | 팀이 접근할 수 있는 온라인 제공업체 |
| **Model Providers** | 팀이 접근할 수 있는, 미리 설정된 제공업체의 모델 |
| **Storage** | 공유에 쓸 S3 호환 저장소 |

## Platform Access

팀원이 데스크톱 앱을 쓸지, 웹을 쓸지, 둘 다 쓸지 정합니다.

| 선택 | 맞는 경우 |
|---|---|
| Desktop만 | 로컬 모델 위주로 쓰고, 회사가 관리하는 PC에서만 쓰게 할 때 |
| Web만 | 앱 설치가 어려운 환경이거나 브라우저로만 쓰게 할 때 |
| 둘 다 | 제한할 이유가 없을 때 |

웹 버전은 데이터를 브라우저 저장소에 로컬로 보관한다는 점을 기억하세요. 브라우저 데이터를 지우면 사라집니다. [데이터 백업과 복구](/guide/settings-backup-lost-found/)를 팀원에게 알려 두는 것이 좋습니다.

## Features

팀원이 쓸 수 있는 기능을 고릅니다. 문서에 나온 항목은 열 가지입니다.

| 기능 | 하는 일 | 끄는 것을 고려할 경우 |
|---|---|---|
| Insights | 사용 통계 보기 | 특별한 이유 없음 |
| Knowledge Stacks | 문서를 근거로 답하게 하기 | 문서 반입을 통제해야 할 때 |
| Toolbox | MCP 도구 등 도구 사용 | 외부 서비스 연결을 막아야 할 때 |
| Personas | 페르소나 사용 | 특별한 이유 없음 |
| Prompts Library | 저장한 프롬프트 사용 | 특별한 이유 없음 |
| Real Time Data | 인터넷에서 실시간 데이터 가져오기 | 외부 검색을 막아야 할 때 |
| Attachments | 파일 첨부 | 파일 반입을 통제해야 할 때 |
| Forge Mode | Forge Mode 사용 | 특별한 이유 없음 |
| Remote Service | 원격 연결 | 다른 기기 연결을 막아야 할 때 |
| Turnstile | 작업 흐름 자동화 | 특별한 이유 없음 |

오른쪽 열은 문서에 있는 내용이 아니라 판단에 참고하라고 덧붙인 것입니다. 데이터가 밖으로 나갈 수 있는 길은 주로 Toolbox, Real Time Data, Remote Service, 그리고 아래의 온라인 제공업체입니다. 민감한 자료를 다루는 팀은 이 네 가지를 먼저 살피면 됩니다.

## Model Hub: 온라인 제공업체 허용

팀이 접근할 수 있는 온라인 제공업체를 고릅니다.

문서가 밝힌 중요한 점이 있습니다. 여기서 허용한 제공업체에 대해 팀원은 **자기 API 키를 직접 넣어야** 합니다. 관리자가 허용만 하고 키는 주지 않는 방식입니다.

아무 제공업체도 고르지 않으면 그 팀은 온라인 모델을 쓸 수 없습니다. 문서의 Enterprise 개요도 관리자가 특정 모델만 허용하거나 전혀 허용하지 않을 수 있다고 적었습니다. 내용이 회사 밖으로 나가면 안 되는 팀에 쓰는 설정입니다.

API 키를 받는 곳은 [온라인 모델 API 키 찾기](/guide/settings-online-api-keys/)에 정리했습니다.

## Model Providers: 설정한 모델을 팀에 공유

팀원이 키를 각자 갖지 않게 하려면 관리자가 설정한 제공업체와 모델을 공유합니다.

### 공유하는 방법

- 새 온라인 제공업체와 모델을 추가할 때 클라우드 동기화 선택지를 고릅니다.
- 또는 **Model Hub > Model Providers**에서 구름 아이콘을 누릅니다.

공유하면 그 제공업체와 고른 모델의 사본이 만들어지고, 다른 Admin과 계정 Owner가 쓸 수 있게 됩니다. 그다음 팀을 만들거나 고칠 때 **Model Providers** 항목에서 그 팀에 켜 줍니다.

### 팀원이 할 수 있는 일

User 역할의 팀원은 공유된 모델을 쓸 수 있습니다. 그러나 제공업체 설정을 고치거나 공유 모델을 관리할 수는 없습니다.

### 두 방식 비교

| 항목 | Model Hub로 허용 | Model Providers로 공유 |
|---|---|---|
| API 키 | 팀원이 각자 넣음 | 관리자가 설정한 것을 사용 |
| 비용 청구 | 각자의 키 계정 | 관리자가 설정한 계정 |
| 팀원이 설정 변경 | 자기 키 범위에서 | 불가 |
| 맞는 경우 | 팀원이 이미 키를 갖고 있을 때 | 회사 계약 하나로 모아 쓸 때 |

회사가 Azure OpenAI나 Amazon Bedrock을 계약해 쓰고 있다면 공유 방식이 자연스럽습니다. 설정은 [Azure OpenAI 연결하기](/guide/settings-azure-openai/)와 [Amazon Bedrock 연결하기](/guide/settings-amazon-bedrock/)를 보세요.

공유한 제공업체의 키가 어디에 어떻게 저장되는지는 이 문서 항목에 설명이 없습니다. 보안 검토에서 Msty에 확인할 항목입니다.

## Storage

Knowledge Stacks, Prompts, Personas를 팀원끼리 공유하려면 저장소가 필요합니다. 팀에 S3 호환 저장소를 지정합니다.

저장소는 먼저 **Storage**에 등록되어 있어야 이 목록에 나옵니다. 순서는 저장소 등록이 먼저, 팀 배정이 다음입니다. [저장소와 공유](/guide/enterprise-storage-sharing/)를 보세요.

## 사용자의 팀 바꾸기

한 사용자가 속한 팀은 **Teams** 탭과 **Users** 탭 어느 쪽에서든 관리할 수 있습니다.

**Users** 탭에서 하는 방법입니다.

1. 사용자 줄 오른쪽의 말줄임표를 누릅니다.
2. **Manage Team**을 고릅니다. 창이 열립니다.
3. 팀을 고르거나 해제합니다.
4. **Active Team**을 지정합니다.

### Active Team

사용자는 여러 팀에 속할 수 있습니다. **Active Team**은 그 사용자가 처음 로그인할 때 적용되는 기본 권한을 정합니다.

여러 팀에 속한 사용자가 팀 사이를 어떻게 오가는지, 여러 팀의 권한이 합쳐지는지는 문서에 구체적인 설명이 없습니다. 권한이 다른 두 팀에 한 사람을 넣을 때는 실제로 무엇이 보이는지 그 사람 계정으로 확인하세요.

## 팀 설계 순서

문서에 권장 설계는 없습니다. 도입할 때 따라 할 만한 순서를 적어 봅니다.

1. 다루는 자료의 민감도로 사람을 나눕니다. 부서 조직도와 꼭 같을 필요는 없습니다.
2. 가장 제한적인 팀부터 만듭니다. 온라인 제공업체 없음, 외부 연결 기능 꺼짐.
3. 그 팀에 시험 사용자 한 명을 넣고 로그인해 화면을 확인합니다.
4. 필요한 팀에만 기능을 하나씩 더 엽니다.
5. 공유가 필요한 팀에 저장소를 배정합니다.
6. 설정 내용을 문서로 남깁니다. 팀 설정 변경은 감사 로그의 대상입니다. [감사 로그](/guide/enterprise-audit-log/) 참고.

처음부터 다 열어 두고 나중에 닫는 것보다, 닫아 두고 필요에 따라 여는 편이 관리하기 쉽습니다.

## 문서에 없는 내용

- 만들 수 있는 팀 수의 상한
- 팀을 고치거나 지우는 절차의 상세
- 특정 모델 단위로 허용하는 방법의 상세 (제공업체 단위 선택과 공유 모델 선택은 문서에 있습니다)
- 팀별 사용량 한도

## 참고한 문서

- [Manage Teams](https://docs.msty.ai/studio/enterprise/teams)
- [Enterprise Overview](https://docs.msty.ai/studio/enterprise/overview)
- [Storage](https://docs.msty.ai/studio/enterprise/storage)
- [Manage Users](https://docs.msty.ai/studio/enterprise/users)
