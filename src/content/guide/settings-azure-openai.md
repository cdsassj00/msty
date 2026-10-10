---
title: Azure OpenAI 연결하기
description: Azure 포털에서 모델을 배포해 Target URI와 Key를 얻고, Msty Studio의 Model Hub에 Azure OpenAI 제공업체로 추가하는 순서를 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 130
verified: 2026-10-11
tags: [Msty, Studio, Azure OpenAI, 온라인 모델]
---

## Azure OpenAI란

Azure OpenAI는 Microsoft의 클라우드인 Azure를 통해 GPT 같은 OpenAI 모델을 쓰는 서비스입니다. 공식 문서는 기업용 보안, 규정 준수, 연동 도구를 함께 제공하는 서비스라고 소개합니다.

회사가 이미 Azure를 쓰고 있다면 OpenAI와 따로 계약하지 않고 기존 Azure 계약과 보안 체계 안에서 모델을 쓸 수 있습니다. 그래서 개인보다 조직에서 주로 씁니다.

## 요금제 조건

Azure OpenAI 문서 항목 자체에는 요금제 조건이 적혀 있지 않습니다. 그러나 요금 페이지는 "Azure and Bedrock Providers"를 Aurum과 Teams에서 제공하고 Free에서는 제공하지 않는 것으로 표시합니다. Aurum 카드에도 Azure와 Bedrock 제공업체가 들어 있습니다. [요금제 자세히 보기](/guide/pricing/)를 보세요.

Azure 쪽 사용 요금은 Msty 요금과 별개로 Azure 계정에 청구됩니다.

## 준비물

- Azure 계정
- Azure OpenAI 서비스를 쓸 수 있는 권한
- Aurum 이상의 Msty Studio 라이선스

회사 Azure라면 리소스를 만들 권한이 없을 수 있습니다. 그 경우 전산 담당자에게 배포를 요청하고 Target URI와 Key만 받으면 됩니다.

## 1부: Azure에서 할 일

문서의 순서를 따릅니다. Azure 화면은 Microsoft가 수시로 바꾸므로 메뉴 이름이 조금 다를 수 있습니다.

1. Azure Portal(portal.azure.com)로 갑니다.
2. 위쪽 검색 창에서 **Azure OpenAI**를 찾습니다.
3. Azure OpenAI 리소스가 없으면 새로 만드는 항목을 고릅니다.
4. 새로 만든다면 리소스 생성 단계를 끝까지 진행합니다.
5. 리소스가 만들어지면 리소스 목록에서 고릅니다.
6. 리소스 화면 위쪽의 **Go to Azure AI Foundry Portal**을 누릅니다.
7. 왼쪽 메뉴에서 **Deployments**를 고릅니다.
8. 위쪽 메뉴에서 **Deploy Model**을 누르고, 기본 모델 또는 미세 조정한 모델을 고릅니다.
9. 창에서 배포할 모델을 고르고 **Confirm**, 이어서 **Confirm and Continue**를 누릅니다.
10. 배포가 끝나면 배포 상세 화면에 **Target URI**가 나옵니다. 복사합니다.
11. Target URI 아래에 **Key**가 있습니다. 이것도 복사합니다.

여기서 "배포(deployment)"란 Azure 리소스 안에 특정 모델을 쓸 수 있게 올려 두는 일입니다. Azure OpenAI에서는 모델을 배포해야 호출할 수 있습니다.

## Target URI 읽는 법

Target URI는 다음과 같은 모양입니다.

```
https://<리소스 이름>.cognitiveservices.azure.com/openai/deployments/<모델 이름> ... ?api-version=<API 버전>
```

이 주소에서 세 가지를 읽어 낼 수 있습니다.

| 부분 | 위치 | Studio에서 쓰는 곳 |
|---|---|---|
| 리소스 이름 | 주소 맨 앞 | **Resource name** 칸 (선택 B) |
| 모델 이름 | `deployments/` 뒤 | 모델 선택 |
| API 버전 | `api-version=` 뒤 | **API Version** 칸 (선택 사항) |

## 2부: Msty Studio에서 할 일

Target URI와 Key를 준비한 뒤 시작합니다.

1. msty.studio를 열거나 Studio Desktop을 엽니다.
2. 왼쪽 메뉴에서 **Model Hub**를 고릅니다.
3. **Add Provider**를 누릅니다.
4. 제공업체 목록에서 **Azure OpenAI**를 고릅니다.
5. **API Key** 칸에 Azure에서 복사한 **Key**를 넣습니다.
6. 접속 주소를 두 방법 가운데 하나로 설정합니다.

| 선택 | 방법 |
|---|---|
| A | **Base URL** 칸에 Target URI를 넣되, `/openai/`까지만 넣습니다. 모양은 `https://<리소스 이름>.cognitiveservices.azure.com/openai/` 입니다. `/openai/` 뒤는 필요 없습니다 |
| B | Base URL을 건너뛰고 **Resource name** 칸에 리소스 이름을 넣습니다 |

7. 필요하면 **API Version**을 넣습니다. 문서는 Azure의 최신 API 버전에서는 보통 필요 없다고 적었습니다.
8. Azure에서 배포한 **Model(s)**을 고릅니다.
9. **Add Provider**를 눌러 저장합니다.

## 모델 선택에서 틀리기 쉬운 점

8단계에서 Studio는 모든 모델을 목록에 보여 줍니다. 그러나 실제로 작동하는 것은 이 리소스에 배포한 모델뿐입니다. 목록에 있다고 다 쓸 수 있는 것이 아닙니다.

Azure에서 배포하지 않은 모델을 고르면 대화할 때 오류가 납니다. 배포한 모델 이름을 미리 적어 두고 그것만 고르세요.

## 연결 확인

새 대화를 열고 Azure OpenAI 모델을 고른 뒤 짧은 인사를 보냅니다. 응답이 오면 연결된 것입니다.

## 오류가 날 때 볼 곳

문서에 문제 해결 항목은 따로 없습니다. 설정 구조로 보아 확인할 곳은 다음과 같습니다.

| 증상 | 확인할 것 |
|---|---|
| 인증 오류 | Key를 끝까지 복사했는가. 앞뒤에 빈칸이 들어가지 않았는가 |
| 주소를 찾을 수 없음 | Base URL이 `/openai/`에서 끝나는가. 그 뒤의 `deployments/...`를 지웠는가 |
| 모델을 찾을 수 없음 | 고른 모델이 이 리소스에 실제로 배포되어 있는가 |
| 버전 관련 오류 | **API Version** 칸에 Target URI의 `api-version` 값을 넣어 본다 |
| 제공업체 목록에 Azure OpenAI가 없음 | 라이선스가 Aurum 이상인가 |

앱 쪽 오류 내용은 Log Viewer에서 볼 수 있습니다. [설정 화면 둘러보기](/guide/settings-overview/)의 Desktop Extras 부분을 참고하세요.

## 키를 변수로 넣기

Azure Key를 화면에 직접 두고 싶지 않다면 Environments의 변수로 넣을 수 있습니다. 변수는 모델 제공업체의 API 키 칸에 쓸 수 있습니다. 시험용 리소스와 운영용 리소스를 환경으로 나눠 두면 환경만 바꿔 오갈 수 있습니다. [환경과 변수](/guide/workspace-environments/)를 보세요.

## 조직에서 쓸 때

- Enterprise 요금제에서는 관리자가 설정한 제공업체와 모델을 팀에 공유할 수 있습니다. 그러면 팀원이 Key를 각자 넣지 않아도 됩니다. User 역할의 팀원은 공유된 모델을 쓸 수 있지만 제공업체 설정을 고칠 수는 없습니다. [팀 관리](/guide/enterprise-teams/)를 보세요.
- Azure로 보낸 대화는 Azure에서 처리됩니다. 데이터 처리 조건은 회사의 Azure 계약과 Microsoft의 정책에 따릅니다.
- Azure 리소스의 지역(region)과 데이터 보관 설정은 Azure 쪽에서 정합니다. Msty 문서는 이 부분을 다루지 않습니다.

## 관련 글

- [온라인 모델 API 키 찾기](/guide/settings-online-api-keys/)
- [Amazon Bedrock 연결하기](/guide/settings-amazon-bedrock/)

## 참고한 문서

- [Azure OpenAI](https://docs.msty.ai/studio/how-tos/azure-openai)
- [Manage Teams](https://docs.msty.ai/studio/enterprise/teams)
- [Msty 요금](https://msty.ai/pricing/)
