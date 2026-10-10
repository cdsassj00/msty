---
title: 온라인 모델 API 키 찾기
description: Anthropic, OpenAI, Gemini 등 열한 개 온라인 제공업체의 API 키 발급 주소, 접속 주소, 사용량 확인 주소를 공식 문서 기준으로 표로 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 120
verified: 2026-10-11
tags: [Msty, Studio, API 키, 온라인 모델]
---

## API 키가 왜 필요한가

Msty Studio는 내 컴퓨터의 로컬 모델뿐 아니라 온라인 모델도 연결합니다. 온라인 모델을 쓰려면 그 회사가 발급하는 API 키가 필요합니다. API 키는 "이 요청은 이 계정에서 보낸 것"임을 증명하는 값이며, 사용한 만큼 그 계정에 요금이 청구됩니다.

알아 둘 점이 두 가지 있습니다.

- **구독과 API는 따로입니다.** 챗 서비스의 월 구독을 하고 있어도 API 사용 요금은 별도로 청구되는 것이 일반적입니다. 각 회사의 요금 안내를 확인하세요.
- **온라인 모델로 보낸 내용은 내 컴퓨터를 떠납니다.** 그 뒤의 처리는 제공업체의 정책에 따릅니다. 내용이 밖으로 나가면 안 되는 작업은 로컬 모델로 합니다. [보안과 거버넌스](/guide/security-governance/)를 참고하세요.

## 키 표시 방식 두 가지

공식 문서는 제공업체마다 키를 다시 볼 수 있는지를 구분해 적었습니다.

| 표기 | 뜻 | 할 일 |
|---|---|---|
| Only Once | 키 원문을 만들 때 한 번만 보여 줍니다 | 바로 안전한 곳에 복사해 둡니다. 잃어버리면 지우고 새로 만들어야 합니다 |
| Anytime | 키 원문을 언제든 다시 볼 수 있습니다 | 필요할 때 다시 복사하면 됩니다 |

대부분이 Only Once입니다. 키를 만든 창을 닫기 전에 반드시 복사하세요.

## 제공업체별 주소

공식 문서에 나온 열한 곳입니다. 주소는 2026-10-11에 문서에서 확인한 것이며, 각 회사가 바꿀 수 있습니다.

### 키 발급 주소와 표시 방식

| 제공업체 | API 키 발급 주소 | 키 표시 |
|---|---|---|
| Anthropic | https://console.anthropic.com/settings/keys | Only Once |
| Cohere | https://dashboard.cohere.com/api-keys | Trial 계정은 Anytime, Production 계정은 Only Once |
| Gemini | https://aistudio.google.com/app/apikey | Anytime |
| Groq | https://console.groq.com/keys | Only Once |
| Mistral AI | `https://console.mistral.ai/api-keys/` | Only Once |
| OpenAI | https://platform.openai.com/api-keys | Only Once |
| OpenRouter | https://openrouter.ai/settings/keys | Only Once |
| Perplexity | https://www.perplexity.ai/settings/api | Anytime |
| Together.ai | https://api.together.ai/settings/api-keys | Anytime |
| SambaNova | https://cloud.sambanova.ai/apis | Only Once |
| xAI | https://console.x.ai | Only Once |

### API 접속 주소

제공업체를 직접 설정해야 할 때 쓰는 주소입니다.

| 제공업체 | API 접속 주소(endpoint) |
|---|---|
| Anthropic | `https://api.anthropic.com/v1` |
| Cohere | `https://api.cohere.ai/v1` |
| Gemini | `https://generativelanguage.googleapis.com/v1` |
| Groq | `https://api.groq.com/v1` |
| Mistral AI | `https://api.mistral.ai/v1` |
| OpenAI | `https://api.openai.com/v1/` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| Perplexity | `https://api.perplexity.ai` |
| Together.ai | `https://api.together.xyz/v1` |
| SambaNova | `https://api.sambanova.ai/v1` |
| xAI | `https://api.x.ai/v1` |

### 사용량과 가격 확인 주소

| 제공업체 | 사용량 확인 | 토큰 가격 |
|---|---|---|
| Anthropic | https://console.anthropic.com/settings/usage | https://www.anthropic.com/pricing#anthropic-api |
| Cohere | https://dashboard.cohere.com/billing | https://cohere.com/pricing |
| Gemini | https://console.cloud.google.com/billing/ | https://ai.google.dev/pricing |
| Groq | https://console.groq.com/settings/usage | 사용량 화면 아래쪽 |
| Mistral AI | `https://console.mistral.ai/usage/` | https://mistral.ai/technology/ 맨 아래의 종량제 가격 부분 |
| OpenAI | https://platform.openai.com/usage | https://openai.com/api/pricing/ |
| OpenRouter | https://openrouter.ai/activity | https://openrouter.ai/models |
| Perplexity | https://www.perplexity.ai/settings/api | `https://docs.perplexity.ai/docs/pricing` |
| Together.ai | https://api.together.xyz/settings/billing | https://api.together.xyz/models |
| SambaNova | `https://cloud.sambanova.ai/usage` | https://cloud.sambanova.ai/pricing |
| xAI | https://console.x.ai/ | `https://docs.x.ai/models-and-pricing` |

문서는 이 목록이 Discord 커뮤니티 구성원이 정리한 것이라고 밝힙니다. 각 회사의 화면과 주소는 수시로 바뀌므로, 주소가 열리지 않으면 해당 회사의 개발자 콘솔에서 "API keys" 메뉴를 찾으세요.

## 키를 받아 Studio에 넣기까지

1. 위 표에서 쓰려는 제공업체의 키 발급 주소로 갑니다.
2. 계정을 만들거나 로그인합니다. 결제 수단 등록이 필요한 곳이 많습니다.
3. 새 API 키를 만들고 바로 복사합니다.
4. Msty Studio에서 **Model Hub**를 엽니다.
5. **Add Provider**를 누르고 제공업체를 고릅니다.
6. API 키를 붙여 넣고, 쓸 모델을 골라 저장합니다.
7. 새 대화를 열어 짧은 인사를 보내 응답이 오는지 확인합니다.

4~6단계의 화면 이름은 공식 문서의 Azure OpenAI와 Amazon Bedrock 안내에 나온 순서를 따랐습니다. 제공업체에 따라 입력 칸이 조금씩 다릅니다.

## 어느 제공업체를 고를까

문서는 제공업체를 추천하지 않습니다. 문서에 적힌 참고 사항은 두 가지입니다.

- Gemini는 무료 사용량이 넉넉하다고 적혀 있습니다. 처음 시험해 보기에 부담이 적습니다. 무료 범위와 조건은 Google의 안내를 확인하세요.
- OpenRouter는 모델 목록이 매우 많다고 적혀 있습니다. 키 하나로 여러 회사의 모델을 써 보고 싶을 때 맞습니다.

여러 모델을 나란히 비교하려면 Studio의 Split Chats를 쓰면 됩니다. 기능 소개는 [Msty Studio 자세히 보기](/guide/product-studio/)에 있습니다.

## 키를 안전하게 다루기

API 키가 새면 다른 사람이 내 계정 요금으로 모델을 쓸 수 있습니다.

| 할 일 | 이유 |
|---|---|
| 비밀번호 관리 프로그램에 보관 | 메모장이나 메신저에 두면 새기 쉽습니다 |
| 용도별로 키를 따로 만들기 | Msty용 키를 따로 두면 문제가 생겼을 때 그 키만 지우면 됩니다 |
| 사용 한도 설정 | 제공업체 콘솔에 월 한도 기능이 있으면 걸어 둡니다 |
| 사용량 정기 확인 | 위 표의 사용량 주소에서 예상 밖의 사용이 없는지 봅니다 |
| 의심되면 즉시 폐기 | 키를 지우고 새로 만든 뒤 Studio에 다시 넣습니다 |

키를 여러 벌 쓰거나 화면에 키가 직접 보이지 않게 하려면 Environments의 변수로 관리할 수 있습니다. Aurum 기능이며 [환경과 변수](/guide/workspace-environments/)에서 설명합니다. 앱을 열 때 키를 숨기려면 [작업 공간 잠금과 비밀값 암호화](/guide/workspace-lock-encryption/)를 봅니다.

## 회사에서 쓸 때

- 개인 카드로 받은 키를 업무에 쓰기 전에 회사 규정을 확인합니다.
- Enterprise 요금제에서는 관리자가 팀이 쓸 수 있는 온라인 제공업체를 정합니다. 문서에 따르면 그 경우에도 팀원은 해당 제공업체의 API 키를 각자 넣어야 합니다. 관리자가 미리 설정한 제공업체와 모델을 팀에 공유하는 방법도 있습니다. [팀 관리](/guide/enterprise-teams/)를 보세요.
- 여러 앱이 같은 키를 나눠 쓰는 상황이라면 키를 한곳에 두고 앱별 토큰을 발급하는 Nexus를 검토할 만합니다. [Msty Nexus 자세히 보기](/guide/product-nexus/)를 보세요.

## 이 목록에 없는 제공업체

Azure OpenAI와 Amazon Bedrock은 API 키 하나로 끝나지 않고 설정 단계가 더 있습니다. 따로 정리했습니다.

- [Azure OpenAI 연결하기](/guide/settings-azure-openai/)
- [Amazon Bedrock 연결하기](/guide/settings-amazon-bedrock/)

## 참고한 문서

- [Find Online Model API Keys](https://docs.msty.ai/studio/how-tos/find-api-keys)
- [Azure OpenAI](https://docs.msty.ai/studio/how-tos/azure-openai)
- [Amazon Bedrock](https://docs.msty.ai/studio/how-tos/aws-bedrock)
- [Manage Teams](https://docs.msty.ai/studio/enterprise/teams)
