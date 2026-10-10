---
title: Msty Nexus 설치부터 첫 요청까지
description: Msty Nexus를 내려받아 Runtime 연결을 확인하고, 모델을 하나 붙이고, 클라이언트 토큰으로 게이트웨이에 첫 요청을 보내기까지의 순서를 공식 Setup 문서 기준으로 정리합니다.
date: 2026-10-11
section: Msty Nexus
order: 10
verified: 2026-10-11
tags: [Msty, Nexus, 설치, 시작하기]
---

## 이 글의 목표

Nexus 첫 설정의 목표는 하나입니다. 모델 하나를 로컬 Nexus 게이트웨이를 거쳐, 토큰 인증을 걸고 부를 수 있게 만드는 것입니다. 공식 Setup 문서도 같은 목표를 적어 두었습니다.

Nexus가 어떤 제품인지는 [Msty Nexus 자세히 보기](/guide/product-nexus/)에 따로 정리했습니다. 이 글은 실제로 손을 움직이는 순서만 다룹니다.

## 먼저 알아 둘 구성 요소

설정 화면에 계속 나오는 이름 네 가지입니다.

| 이름 | 하는 일 |
|---|---|
| Nexus Runtime | 기기에서 실제로 일하는 부분입니다. 인증된 게이트웨이를 제공하고, 로컬 엔진을 띄우고, 제공업체 키를 보관합니다 |
| Nexus Console | 기기, 모델, 경로, 접근, 사용량을 관리하는 화면입니다. 데스크톱 앱 안에 있고, 지원되는 요금제에서는 웹에서도 열립니다 |
| 데스크톱 앱 | 로컬 Runtime을 시작하고 연결합니다. 메뉴 막대나 시스템 트레이에서 상태를 보여 주고 Console을 엽니다 |
| Client token | 다른 앱이 Runtime에 인증할 때 쓰는 토큰입니다. 앱은 제공업체 키를 직접 갖지 않습니다 |

## 설치 파일 받기

Nexus 사이트(nexus.msty.ai)의 **Download Nexus** 버튼에서 받습니다. **Choose installer**를 누르면 네 가지 가운데 고를 수 있습니다.

| 운영체제 | 파일 |
|---|---|
| macOS | Universal DMG installer |
| Windows x64 | EXE installer |
| Linux | Portable x86_64 AppImage |
| Linux (Debian/Ubuntu amd64) | .deb package |

설치 마법사의 화면별 절차, 최소 하드웨어 사양, 지원 운영체제 버전은 공식 문서에는 설명이 없습니다. 웹 Console은 같은 사이트의 **Open web app** 버튼으로 엽니다.

## 전체 순서 한눈에 보기

Setup 문서가 권하는 순서는 여덟 단계입니다.

1. Msty Nexus를 엽니다.
2. Runtime에 연결되는지 확인합니다.
3. 로컬 엔진과 클라우드 제공업체 가운데 시작할 경로를 고릅니다.
4. 모델을 동기화하거나, 설치하거나, 가져오거나, 추가합니다.
5. 로컬 엔진에 이미 모델이 있었다면 모델 보관 상태를 점검합니다.
6. 클라이언트 토큰을 만듭니다.
7. 게이트웨이를 시험합니다.
8. 다른 기기나 브라우저에서 접근해야 할 때만 네트워크와 CORS를 설정합니다.

## 1단계. Runtime 연결 확인

앱은 로컬 Runtime에 접속할 때 쓰는 토큰을 운영체제의 키체인에 보관합니다. 앱이 Runtime을 오프라인이나 인증 안 됨으로 표시하면, 제공업체나 모델을 추가하기 전에 **Repair connection**부터 실행합니다.

Nexus는 처음에 로컬 전용으로 시작합니다. 다른 믿을 만한 기기가 접속해야 하는 경우가 아니면 그대로 둡니다. 네트워크 접근을 켤 계획이라면 그 전에 범위가 정해진 클라이언트 토큰부터 만들어 두라고 문서는 권합니다.

## 2단계. 시작 경로 고르기

두 경로 가운데 하나만 끝내도 됩니다.

### 로컬 경로

내 컴퓨터에서 모델을 돌리거나, 이미 돌고 있는 모델을 재사용하려는 경우입니다.

1. **Providers**를 엽니다.
2. 호환되는 로컬 API가 이미 실행 중이면 **Find Local Runtimes**를 씁니다.
3. 로컬 런타임 카드에서 Nexus가 관리하는 Ollama, llama.cpp, MLX, CLI Proxy를 설치하거나 시작합니다. 제공되는 환경에서만 보입니다.
4. **Models**를 열어 모델을 동기화, 검색, 내려받기 또는 가져오기 합니다.
5. **Health & Memory**에서 로컬 모델 저장 상태와 메모리에 올라간 상태를 확인합니다.
6. 카탈로그에 보이는(visible) 모델이 하나 이상 있는지 확인합니다.

엔진마다 맡는 일이 다릅니다.

| 엔진 | 맡는 일 |
|---|---|
| Ollama | Ollama 카탈로그 모델, 임베딩, 자체 방식의 메모리 올리기와 내리기 |
| llama.cpp | GGUF 파일, Hugging Face의 GGUF 내려받기, 로컬 GGUF 가져오기, 라우터 방식의 올리기와 내리기 |
| MLX | Apple Silicon용 MLX 모델. 런타임 관리는 macOS에서만 됩니다 |
| CLI Proxy | 지원되는 구독 계정의 모델을 로컬 API 형태로 내놓습니다 |

### 클라우드 경로

호스팅된 제공업체로 요청을 보내되, 키는 Runtime 안에만 두려는 경우입니다.

1. **Providers**를 엽니다.
2. OpenAI, Anthropic, OpenRouter 또는 호환 엔드포인트를 추가합니다.
3. 제공업체 키를 한 번 붙여 넣습니다.
4. 저장하고 **Test**를 실행합니다.
5. 제공업체 모델을 동기화하거나 자동 제공업체 모델을 켭니다.
6. **Models**에 모델이 나타나는지 확인합니다.

제공업체 키는 쓰기 전용입니다. 한 번 넣으면 Nexus는 "자격 증명이 설정되어 있는지"만 돌려주고, 키 원문은 앱, SDK, 로그, 진단 어디에도 돌려주지 않습니다.

## 3단계. 클라이언트 토큰 만들기

Console의 **Client Tokens**에서 만듭니다. 이 토큰은 앱이 로컬 Nexus API에 접근하는 범위를 정합니다.

OpenAI 호환 또는 Anthropic 호환 클라이언트를 설정할 때 API 키 자리에 이 토큰을 넣습니다. 토큰 원문은 한 번만 표시되므로, 그 자리에서 해당 앱의 비밀 저장소에 넣어야 합니다. 자세한 내용은 [Client Tokens로 앱별 접근 관리하기](/guide/nexus-client-tokens/)를 보세요.

## 4단계. 게이트웨이 시험

앱에 있는 게이트웨이 시험 기능을 쓰거나, 터미널에서 직접 부릅니다. 기본 주소는 `http://127.0.0.1:3939`입니다.

모델 목록 확인:

```bash
curl http://127.0.0.1:3939/v1/models \
  -H "Authorization: Bearer $MSTY_NEXUS_TOKEN"
```

대화 요청:

```bash
curl http://127.0.0.1:3939/v1/chat/completions \
  -H "Authorization: Bearer $MSTY_NEXUS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-test",
    "messages": [{ "role": "user", "content": "Say hello." }]
  }'
```

`openai/gpt-test`는 문서의 예시 값입니다. 앱에 표시되는 실제 모델 ID, 별칭, `@preset/<slug>`, `@route/<slug>` 가운데 하나로 바꿔 넣습니다. 각 값의 뜻은 [게이트웨이 API로 앱 연결하기](/guide/nexus-gateway/)에 있습니다.

## 5단계. 필요할 때만 브라우저·LAN 접근 켜기

Runtime은 기본적으로 로컬 전용입니다. 다른 기기나 브라우저 페이지가 접속해야 할 때만 **Settings > Network Access**를 엽니다.

- LAN에 공개하면 Runtime이 듣는 주소가 바뀌고, Runtime을 다시 시작해야 합니다.
- CORS는 어떤 브라우저 출처가 호출할 수 있는지를 바꾸며, 실행 중에 바로 적용됩니다.
- CORS만 켠다고 Runtime이 LAN에 공개되지는 않습니다.
- 어떤 경우든 `/v1/*` 요청에는 로컬 Nexus 토큰이 필요합니다.

공개 범위에 대한 판단 기준은 [Nexus 보안 모델](/guide/nexus-security/)에서 다룹니다.

## 선택. 로그인할 때 자동 시작

운영체제에 로그인하면 Nexus 앱이 자동으로 뜨게 하려면 **Settings > Start at Login**을 켭니다. Nexus는 자기 자신의 시작 등록만 관리하고, 시스템의 다른 시작 항목을 바꾸지 않습니다.

## 설정이 끝났는지 확인하는 기준

문서가 제시하는 최소 완료 상태입니다. 일곱 가지가 모두 맞으면 다른 앱을 연결할 준비가 된 것입니다.

- Runtime이 정상이고 인증되어 있다.
- 제공업체 또는 로컬 런타임이 하나 설정되어 있다.
- **Models**에 보이는 모델이 하나 있다.
- Health & Memory에 로컬 모델을 막는 문제가 없다.
- 클라이언트 토큰이 있다.
- 게이트웨이 시험이 성공했다.
- 네트워크와 CORS 설정이 쓰려는 클라이언트에 맞다.

## 그다음에 할 일

Overview 문서는 이 기본 경로가 안정된 뒤에 기능을 늘리라고 권합니다. 순서는 대체로 이렇습니다.

1. 모델 설정을 고정해 두고 싶으면 [프리셋](/guide/nexus-presets/)을 만듭니다.
2. 실제 요청이 지나갔는지 [Activity와 Usage](/guide/nexus-usage-gauge-activity/)에서 확인합니다.
3. 작업량이 늘면 [Smart Routes](/guide/nexus-smart-routes/), [Smart Balancer](/guide/nexus-smart-balancer/), [Cluster](/guide/nexus-cluster/), Gauge, 더 강한 정책을 차례로 붙입니다.

막히는 곳이 있으면 [문제 해결](/guide/nexus-troubleshooting/)을 보세요.

## 참고한 문서

- [Nexus 문서: Setup](https://docs.msty.ai/nexus/setup)
- [Nexus 문서: Overview](https://docs.msty.ai/nexus/overview)
- [Msty Nexus](https://nexus.msty.ai)
