---
title: Amazon Bedrock 연결하기
description: AWS에서 모델 접근을 신청하고 접근 키를 준비한 뒤, Msty Studio의 Model Hub에 Amazon Bedrock 제공업체로 추가하는 순서를 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 140
verified: 2026-10-11
tags: [Msty, Studio, Amazon Bedrock, 온라인 모델]
---

## Amazon Bedrock이란

Amazon Bedrock은 AWS가 운영하는 관리형 서비스로, 여러 AI 회사와 Amazon의 기반 모델을 AWS 안에서 쓸 수 있게 해 줍니다. 공식 문서는 모델을 배포하고 관리하고 미세 조정하는 안전하고 확장 가능한 환경이라고 소개합니다.

회사가 이미 AWS를 쓰고 있다면 기존 AWS 계정과 권한 체계 안에서 모델을 쓸 수 있다는 점이 장점입니다.

## 요금제 조건

Bedrock 문서 항목 자체에는 요금제 조건이 적혀 있지 않습니다. 요금 페이지는 "Azure and Bedrock Providers"를 Aurum과 Teams에서 제공하고 Free에서는 제공하지 않는 것으로 표시합니다. [요금제 자세히 보기](/guide/pricing/)를 보세요.

Bedrock 사용 요금은 Msty 요금과 별개로 AWS 계정에 청구됩니다.

## 준비물

- AWS 계정
- Amazon Bedrock을 쓸 수 있는 권한
- Aurum 이상의 Msty Studio 라이선스

## 1부: AWS에서 할 일

문서의 순서를 정리했습니다. AWS 화면은 바뀔 수 있습니다.

1. AWS Management Console로 갑니다.
2. 위쪽 검색 창에서 **Amazon Bedrock**을 찾아 들어갑니다.
3. **Model Catalog**에서 쓸 수 있는 모델을 살펴봅니다.
4. **Model Access**에서 쓰려는 모델의 접근을 신청합니다. 승인까지 몇 분 걸릴 수 있습니다.
5. 모델이 켜진 **AWS Region**을 적어 둡니다. Msty에 넣어야 합니다.
6. **API Keys**로 갑니다. 두 가지를 만들 수 있습니다.
   - 단기 API 키 (AWS가 권장)
   - 장기 API 키
7. 단기 키를 쓴다면 AWS CLI에서 `aws sts get-session-token` 명령으로 임시 세션 토큰을 만들고 **session token**을 저장합니다.
8. **IAM**에서 사용자에게 알맞은 권한이 있는지 확인합니다.
9. IAM 사용자의 **Access Key ID**와 **Secret Access Key**를 복사합니다.
10. Bedrock으로 돌아가 신청한 모델마다 접근이 승인되었는지 확인합니다.

8단계에서 어떤 IAM 권한이 필요한지는 Msty 문서에 구체적으로 나와 있지 않습니다. AWS의 Bedrock 문서를 참고하거나 회사의 AWS 관리자에게 확인하세요.

## 인증 방식 두 가지

| 방식 | 필요한 값 | 특징 |
|---|---|---|
| 장기 | Access Key ID, Secret Access Key, Region | 한 번 넣으면 계속 씁니다. 키가 새면 위험이 큽니다 |
| 단기 | Access Key ID, Secret Access Key, Session Token, Region | 일정 시간 뒤 만료됩니다. AWS가 권장합니다 |

단기 방식은 더 안전하지만 토큰이 만료되면 새로 만들어 다시 넣어야 합니다. 만료 시간은 Msty 문서에 적혀 있지 않으며 AWS 설정에 따릅니다.

한 가지 덧붙이면, Studio 제품 페이지는 확인 당시 버전 2.9.11의 변경 사항으로 Amazon Bedrock API 키 인증을 안내하고 있었습니다. 그런데 문서의 설정 순서는 Access Key ID와 Secret Access Key를 넣는 방식으로 적혀 있습니다. 최신 버전에서는 입력 칸이 문서와 다를 수 있으니 화면을 확인하세요.

## 2부: Msty Studio에서 할 일

시작하기 전에 다음 값을 모아 둡니다.

- Access Key ID
- Secret Access Key
- AWS Region ID
- Session Token (단기 방식일 때만)

순서는 다음과 같습니다.

1. msty.studio를 열거나 Studio Desktop을 엽니다.
2. 왼쪽 메뉴에서 **Model Hub**를 고릅니다.
3. **Add Provider**를 누릅니다.
4. 제공업체 목록에서 **Amazon Bedrock**을 고릅니다.
5. **Access Key ID**를 넣습니다.
6. **Secret Access Key**를 넣습니다.
7. 단기 방식이라면 **Session Token**을 넣습니다.
8. **AWS Region**을 넣습니다. 예: `us-east-1`
9. **Models** 목록에서 Bedrock에서 켜 둔 모델 가운데 Msty에서 쓸 것을 고릅니다.
10. **Add Provider**를 누릅니다.

## 연결 확인

새 대화를 열고 Bedrock 모델을 고른 뒤 짧은 질문을 보냅니다. 응답이 오면 연결된 것입니다.

## 틀리기 쉬운 곳

| 실수 | 결과와 해결 |
|---|---|
| Region을 잘못 넣음 | 모델 접근은 Region별로 승인됩니다. 접근을 신청한 Region과 같은 값을 넣습니다 |
| 접근 승인 전에 연결 | 몇 분 기다린 뒤 Bedrock에서 승인 상태를 확인하고 다시 시도합니다 |
| 승인받지 않은 모델을 고름 | Bedrock에서 켠 모델만 고릅니다 |
| 단기 방식인데 Session Token을 빼먹음 | 세 값이 모두 있어야 합니다 |
| Session Token 만료 | 새 토큰을 만들어 제공업체 설정을 고칩니다 |
| IAM 권한 부족 | AWS 관리자에게 Bedrock 호출 권한을 확인합니다 |

문서도 Msty에 제공업체를 추가하기 전에 Bedrock에서 모델 접근이 승인되었는지 먼저 확인하라고 권합니다.

## Azure OpenAI와 비교

두 제공업체 모두 Aurum 이상에서 쓰는 기업용 경로입니다.

| 항목 | Azure OpenAI | Amazon Bedrock |
|---|---|---|
| 넣는 값 | API Key, Base URL 또는 Resource name | Access Key ID, Secret Access Key, Region, 필요하면 Session Token |
| 미리 할 일 | 모델 배포 | 모델 접근 신청 |
| 쓸 수 있는 모델 | 리소스에 배포한 모델 | 접근을 승인받은 모델 |

Azure 쪽은 [Azure OpenAI 연결하기](/guide/settings-azure-openai/)에 정리했습니다.

## 키를 안전하게 다루기

AWS 접근 키는 권한에 따라 Bedrock 외의 AWS 자원에도 닿을 수 있습니다. 일반 API 키보다 더 조심해야 합니다.

- **전용 IAM 사용자를 만듭니다.** Msty용으로 Bedrock 호출에 필요한 권한만 가진 사용자를 따로 두면, 키가 새더라도 피해 범위가 좁습니다.
- **관리자 권한 키를 넣지 않습니다.**
- **가능하면 단기 방식을 씁니다.**
- **쓰지 않는 키는 AWS에서 비활성화합니다.**

키를 화면에 직접 두지 않으려면 Environments의 변수를 쓸 수 있습니다. [환경과 변수](/guide/workspace-environments/)를 보세요. 앱을 열 때 키를 숨기려면 [작업 공간 잠금과 비밀값 암호화](/guide/workspace-lock-encryption/)를 봅니다.

## 조직에서 쓸 때

- Enterprise 요금제에서는 관리자가 설정한 제공업체와 모델을 팀에 공유할 수 있습니다. 팀원이 AWS 키를 각자 갖지 않아도 됩니다. [팀 관리](/guide/enterprise-teams/)를 보세요.
- 여러 앱이 Bedrock을 함께 쓴다면 Nexus를 거치는 방법도 있습니다. 다만 Nexus 요금 비교표에서 AWS Bedrock과 Azure AI 제공업체는 Enterprise 항목으로 표시되어 있습니다. [Msty Nexus 자세히 보기](/guide/product-nexus/)를 보세요.
- Bedrock으로 보낸 대화는 AWS에서 처리됩니다. 데이터 처리 조건은 회사의 AWS 계약과 AWS 정책에 따릅니다.

## 참고한 문서

- [Amazon Bedrock](https://docs.msty.ai/studio/how-tos/aws-bedrock)
- [Msty Studio 제품 페이지](https://msty.ai/products/studio/)
- [Manage Teams](https://docs.msty.ai/studio/enterprise/teams)
- [Msty 요금](https://msty.ai/pricing/)
- [Msty Nexus 요금](https://nexus.msty.ai/pricing)
