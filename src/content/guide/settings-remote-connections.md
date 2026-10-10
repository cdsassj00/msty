---
title: Remote Connections로 다른 기기에서 연결하기
description: Msty Studio Web에서 Msty Studio Desktop이 깔린 컴퓨터의 로컬 모델과 도구를 쓰는 방법을 Local AI 직접 연결과 Remote Service 두 가지로 나누어 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 90
verified: 2026-10-11
tags: [Msty, Studio, Settings, 원격 연결]
---

## 무엇을 하는 기능인가

Remote Connections는 Msty Studio Web이 Msty Studio Desktop이 실행 중인 컴퓨터에 연결하는 기능입니다. 연결하면 그 컴퓨터의 다음 세 가지를 웹에서 쓸 수 있습니다.

- 로컬 모델
- MCP 도구
- 실시간 데이터 기능

흔한 쓰임새는 이렇습니다. 사무실 책상에 그래픽카드가 좋은 데스크톱이 있고, 회의실에서는 가벼운 노트북을 씁니다. 노트북 브라우저에서 Studio Web을 열고 책상 위 데스크톱의 모델에 연결하면, 노트북에서 질문하고 계산은 데스크톱이 합니다.

### 동기화 기능이 아닙니다

공식 문서는 분명히 적습니다. Remote Connections는 웹과 데스크톱 사이에 대화, 설정, 그 밖의 앱 데이터를 동기화하지 않습니다. 모델과 도구를 빌려 쓰는 연결일 뿐입니다. 데스크톱에서 나눈 대화가 웹에 나타나지 않습니다.

### 요금제

이 문서 항목에는 요금제 조건이 적혀 있지 않습니다. 다만 Studio Web 자체가 Aurum 이상에서 제공되고, 요금 비교표의 "Remote Tools Connector"도 Aurum 이상입니다. [요금제 자세히 보기](/guide/pricing/)를 보세요.

## 두 가지 연결 방식

데스크톱 쪽에는 서비스가 두 가지 있습니다. 무엇이 필요한지에 따라 고릅니다.

| 서비스 | 용도 | 데스크톱 설정 위치 | 웹에서 연결하는 곳 | 기본 포트 |
|---|---|---|---|---|
| Local AI | 모델 추론. Ollama의 API를 쓰며 OpenAI 호환 엔드포인트 포함 | **Settings > Local AI** | **Msty Remote** 모델 제공업체 | 11964 |
| Remote Service | MCP 도구와 그 밖의 데스크톱 기능을 위한 Msty 전용 API | **Settings > Remote Service** | **Remote Service** 사이드바 버튼 | 11932 |

고르는 기준은 간단합니다.

| 필요한 것 | 쓸 방식 |
|---|---|
| 모델만 | Local AI에 직접 연결. Remote Service는 켤 필요 없음 |
| 모델과 도구 모두 | Remote Service 하나로 둘 다 연결 가능 |

이름에 대해 한 가지 알아 둘 점이 있습니다. **Msty Remote**는 다른 컴퓨터의 Msty Local AI에 연결하는 제공업체 이름입니다. 문서에 따르면 이 이름은 Msty 1.0에서 온 것이며, Studio 앱 전체에 연결한다는 뜻이 아닙니다.

## 방식 1: Local AI 모델에 직접 연결

### 모델이 있는 컴퓨터에서

1. **Settings > Local AI > Service Configurations**를 엽니다.
2. **Enable Network Access**를 켭니다. 다른 기기의 연결을 허용합니다.
3. **Allow Access from Msty Studio**를 켭니다. 또는 **Allowed Network Origins**에 `https://msty.studio`를 추가합니다.
4. **Save Changes and Restart Service**를 누릅니다.
5. 주소를 복사합니다.
   - 다른 기기에서 연결할 때: **Copy Network URL**
   - 브라우저와 Local AI가 같은 컴퓨터에 있을 때만: **Copy Local URL**
   - 리버스 프록시를 쓴다면 Local AI를 가리키는 그 HTTPS 주소를 씁니다.

### Studio Web에서

1. **Model Hub > Model Providers > Add Provider**를 엽니다.
2. **Msty Remote**를 고릅니다.
3. **Inference Endpoint**에 Local AI 주소를 붙여 넣습니다. `http://` 또는 `https://`로 시작해야 합니다.
4. **Save**를 누릅니다.

모델 목록은 연결된 Local AI 서비스에서 옵니다. 데스크톱의 Studio 화면에 설정된 모든 모델 제공업체가 그대로 따라오는 것은 아닙니다. 즉 데스크톱에 온라인 제공업체를 등록해 두었더라도 웹에는 로컬 모델만 보입니다.

## 방식 2: Remote Service로 도구 연결

### 도구가 있는 컴퓨터에서

1. **Settings > Remote Service**를 엽니다.
2. **Connection Token**을 정합니다. 접근을 허가하는 값입니다.
3. 필요하면 **Enable Tunneling (Experimental)**을 켭니다. 접속하는 기기가 네트워크, VPN, 리버스 프록시로 이미 닿을 수 있다면 끈 채로 둡니다.
4. **Enable**을 누릅니다.
5. **Copy Local URL**을 누릅니다. 터널링을 켰다면 **Copy Tunnel URL**을 누릅니다.

### Studio Web에서

1. **Remote Service** 사이드바 버튼을 엽니다.
2. **Connect** 또는 **Edit Connection Details**를 고릅니다.
3. **Connection Info**에 토큰이 붙은 Remote Service 주소 전체를 붙여 넣습니다.
4. **Save and Connect**를 누릅니다.

이 연결로 MCP 도구와, 실시간 데이터나 데스크톱에 설치된 도구 의존 프로그램 같은 데스크톱 기능을 쓸 수 있습니다.

주의할 점이 있습니다. **Connection Info**에는 Local AI 주소를 넣을 수 없습니다. Remote Service 주소만 됩니다.

## Remote Service 하나로 모델까지 쓰기

Remote Service는 Local AI를 대신 전달해 줄 수 있습니다. 주소 하나로 모델과 도구를 모두 쓰는 방법입니다.

1. Studio Web에서 **Msty Remote** 제공업체를 추가합니다.
2. **Inference Endpoint**에 `?token=...`이 붙은 Remote Service 주소 전체를 붙여 넣습니다.
3. 데스크톱에서 Local AI가 실행 중인지 확인합니다.

Studio가 Local AI로 가는 경로를 자동으로 붙이므로, 복사한 주소 뒤에 `/localai`를 직접 덧붙이지 않습니다. 도구와 그 밖의 데스크톱 기능은 여전히 **Remote Service** 사이드바 버튼으로 연결해야 합니다.

## 주소에서 자주 틀리는 곳

문서가 여러 번 강조하는 내용입니다.

| 실수 | 올바른 방법 |
|---|---|
| 다른 기기에서 `localhost` 주소를 그대로 씀 | `localhost`는 지금 쓰는 기기 자신을 가리킵니다. 데스크톱의 실제 주소나 터널, 리버스 프록시 주소로 바꿉니다 |
| 토큰 부분을 빼고 붙여 넣음 | 복사한 주소의 `?token=` 부분을 그대로 둡니다 |
| 기본 포트를 믿고 직접 입력함 | 실제로 쓰이는 포트는 기본값과 다를 수 있습니다. 복사한 주소의 포트를 확인합니다 |
| Local URL을 다른 기기에서 씀 | Local URL은 같은 컴퓨터에서만 씁니다. 다른 기기는 Network URL, Tunnel URL, 리버스 프록시의 HTTPS 주소를 씁니다 |

## 옛 화면 이름

예전 화면 캡처나 영상에는 Remote Service가 **Remote Tools Connector**로, 입력 칸이 **Tools Connection**으로 나올 수 있습니다. 같은 기능입니다.

## Safari를 쓴다면

Studio 문서의 Quick Start는 Safari가 직접 지원되지 않는다고 적었습니다. Sidecar 문서는 Safari에서 쓸 방법으로 터널링을 켠 Remote Connections를 권장하고, 그 밖에 Sidecar의 터널링과 Tailscale을 듭니다. [Sidecar와 Tailscale](/guide/settings-sidecar-tailscale/)을 보세요.

## 안전하게 쓰기

문서에 보안 권고가 길게 나오지는 않지만, 설정의 성격상 지킬 점이 있습니다.

- **Enable Network Access**를 켜면 같은 네트워크의 다른 기기가 이 컴퓨터의 모델 서비스에 닿을 수 있습니다. 필요할 때만 켜고, 공용 와이파이에서는 끄는 것이 좋습니다.
- 토큰이 붙은 주소는 비밀번호와 같습니다. 메신저에 그대로 올리지 않습니다.
- 터널링은 문서가 실험 기능(Experimental)이라고 표시합니다. 터널 주소로 오가는 데이터가 어떤 경로를 지나는지는 이 문서 항목에 설명이 없으므로, 민감한 업무에는 사내 네트워크나 VPN을 쓰는 편이 안전합니다.

## 점검 순서

연결이 안 될 때는 다음 순서로 봅니다.

1. 데스크톱에서 Local AI 또는 Remote Service가 실행 중인가.
2. 주소가 `http://` 또는 `https://`로 시작하는가.
3. `localhost`를 데스크톱의 실제 주소로 바꾸었는가.
4. 토큰이 주소에 붙어 있는가.
5. 포트가 복사한 주소의 것과 같은가.
6. **Allowed Network Origins**에 `https://msty.studio`가 들어 있는가.
7. Brave 브라우저라면 방패(Shield)를 껐는가. Sidecar 문서에 따르면 방패가 켜져 있으면 연결이 막힙니다.

## 참고한 문서

- [Remote Connections](https://docs.msty.ai/studio/settings/remote-connections)
- [Sidecar](https://docs.msty.ai/studio/how-tos/sidecar)
- [Quick Start](https://docs.msty.ai/studio/getting-started/quick-start)
- [Msty 요금](https://msty.ai/pricing/)
