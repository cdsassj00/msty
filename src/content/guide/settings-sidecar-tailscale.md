---
title: Sidecar와 Tailscale로 Studio Web 연결하기
description: Msty Studio Web에 로컬 기능을 더해 주는 보조 앱 Sidecar의 설치와 연결 방법, 그리고 Tailscale로 다른 기기에서 안전하게 접속하는 순서를 정리합니다.
date: 2026-10-11
section: 워크스페이스와 설정
order: 150
verified: 2026-10-11
tags: [Msty, Studio, Sidecar, Tailscale, Aurum]
---

## Sidecar란

Sidecar는 Msty Studio의 보조 데스크톱 앱입니다. 브라우저에서 돌아가는 Studio Web은 보통의 웹 앱이라서 내 컴퓨터의 프로그램이나 로컬 모델을 직접 다룰 수 없습니다. Sidecar가 그 사이에서 중계해 줍니다.

공식 문서는 Sidecar를 Studio 웹 앱과 내 컴퓨터(또는 원격 컴퓨터) 사이의 프록시라고 설명합니다. 아래 기능을 쓰려면 Sidecar가 연결된 상태로 있어야 합니다.

Sidecar를 연결하면 Studio Web에서 쓸 수 있게 되는 것은 세 가지입니다.

- 인터넷에서 실시간 데이터 가져오기 (Real-Time Data)
- 내 컴퓨터에 도구 설치해 쓰기 (Tools)
- 로컬 AI 모델 관리

## 먼저 확인할 것: 대부분은 Remote Connections가 낫습니다

문서는 Sidecar를 쓰기 전에 Msty Studio Desktop과 Remote Connections로 연결하는 방법을 먼저 시도하라고 권합니다. 대부분의 사용자에게 더 매끄럽고 통합된 방법이라는 이유입니다. [Remote Connections](/guide/settings-remote-connections/)를 먼저 읽어 보세요.

Sidecar가 맞는 경우는 Studio Desktop을 설치하지 않고 Studio Web만 쓰면서 로컬 기능이 필요할 때입니다.

## 요금제 조건

문서에서 이 구성은 "Studio Web Plus Sidecar"라는 제목 아래 "Aurum Perk"로 표시되어 있습니다. 원격으로 연결할 때는 유효한 Aurum 라이선스 키를 넣어야 합니다. [요금제 자세히 보기](/guide/pricing/)를 보세요.

## 설치 파일

문서의 내려받기 목록입니다.

| 운영체제 | 파일 |
|---|---|
| Windows | Msty Sidecar (x64) exe |
| Mac | Apple Silicon(M1~M4)용 dmg, Intel Mac용 dmg |
| Linux | x64 AppImage, x64 deb |

## 처음 실행하기

설치하면 로컬 AI를 어떻게 준비할지 묻습니다. 선택지는 세 가지입니다.

1. Gemma 내려받기
2. Msty App에 연결 (이미 설치되어 실행 중일 때)
3. Ollama에 연결

문서는 새 사용자에게 Gemma를 내려받으라고 권합니다. 받은 뒤 Msty Studio로 돌아가면 로컬 모델을 쓸 수 있습니다. 이미 Ollama를 쓰고 있다면 3번을 고르면 됩니다. Ollama 자체에 대해서는 [배우기](/learn/)의 글을 참고하세요.

## Studio Web을 Sidecar에 연결하기

Sidecar는 뒤에서 실행되며, 실행 중에는 컴퓨터의 도구 막대(메뉴 막대나 시스템 트레이)에 아이콘이 나옵니다.

### 가장 쉬운 방법

Sidecar 메뉴에서 **Open Msty Studio**를 고릅니다. 기본 브라우저에서 Studio가 열리고 Sidecar와 이미 연결된 상태가 됩니다.

### 직접 연결하기

1. 브라우저에서 Msty Studio로 갑니다.
2. 연결 정보가 바뀌었다면 Sidecar 메뉴에서 **Copy Local Connection Info**를 고릅니다.
3. 복사한 정보를 Msty Studio에 붙여 넣어 다시 연결합니다.

## 브라우저별 주의점

| 브라우저 | 문서의 안내 |
|---|---|
| Safari | Studio Desktop이나 Sidecar에 직접 닿을 수 없습니다. 터널링을 켠 Remote Connections(권장), Sidecar의 터널링, Tailscale 가운데 하나를 씁니다 |
| Brave | Msty Studio에 대해 방패(Shield)를 꺼야 합니다. 켜져 있으면 연결이 막힙니다 |

## 다른 기기에서 접속하기 (실험 기능)

휴대전화를 포함한 다른 기기에서 접속하는 기능입니다. 문서는 실험 기능이라고 표시합니다.

1. Sidecar 메뉴에서 **Enable Tunneling With Local AI**를 고릅니다. 준비에 몇 초 걸릴 수 있습니다.
2. **Copy Tunnel Connection Info**를 골라 주소를 접속할 기기로 보냅니다.
3. 그 기기의 브라우저에서 msty.studio를 엽니다.
4. 유효한 Aurum 라이선스 키를 넣습니다.
5. 다음 화면에서 **Add Provider**를 누릅니다.
6. 제공업체로 **Msty Sidecar Local AI Proxy**를 고릅니다.
7. 2단계에서 복사한 프록시 주소를 넣고 **Add Provider**를 누릅니다.

터널 주소로 오가는 데이터가 어떤 경로를 지나는지는 이 문서 항목에 설명이 없습니다. 민감한 내용을 다룬다면 아래의 Tailscale 방식처럼 경로를 직접 통제하는 방법이 더 맞습니다.

## 그 밖의 설정

### 명령줄에서 시작하기

Mac에서는 다음 명령으로 Sidecar를 시작할 수 있습니다.

```
open -a MstySidecar
```

문서는 Sidecar가 NPM이나 Python 같은 로컬 서비스를 찾지 못할 때 쓸모가 있다고 설명합니다. 터미널에서 시작하면 터미널의 경로 설정을 물려받기 때문입니다.

### 토큰 직접 정하기

연결에 쓰는 토큰을 직접 정하려면 Sidecar 앱 데이터 폴더에 `.token` 파일을 둡니다.

| 운영체제 | 폴더 |
|---|---|
| Mac | `~/Library/Application Support/MstySidecar` |
| Windows | `%APPDATA%\MstySidecar` |

문서는 무작위 값을 만드는 명령의 예로 다음을 들었습니다.

```
echo -n $(openssl rand -hex 40) > ~/path/to/MstySidecar/.token
```

토큰을 적용하려면 Sidecar를 다시 시작합니다. 이 토큰은 로컬 연결과 터널을 통한 원격 연결 모두에 쓰입니다.

## Tailscale이란

Tailscale은 내 기기들 사이에 사설 네트워크를 만들어 주는 서비스입니다. 집에 있는 컴퓨터와 밖에 있는 휴대전화가 같은 네트워크에 있는 것처럼 서로 닿게 합니다. 문서는 Tailscale로 Sidecar에, 그리고 Sidecar가 돌리는 로컬 모델과 도구에 어디서든 안전하게 접속할 수 있다고 설명합니다.

문서의 경고도 함께 적습니다. Tailscale의 일부 기능은 아직 알파나 베타 단계이며, Tailscale이 업데이트되면 아래 순서가 맞지 않게 될 수 있습니다.

## Tailscale 설정 순서

### 1. 계정 만들기

tailscale.com에서 가입합니다. 문서에 따르면 무료로 시작할 수 있고 개인용 무료 범위가 넉넉합니다. 조건은 Tailscale의 안내를 확인하세요.

### 2. 설치하기

Tailscale 내려받기 페이지에서 운영체제에 맞는 판을 받습니다. 연결하려는 모든 기기에 설치해야 합니다. Sidecar를 돌리는 컴퓨터와 접속할 기기 모두입니다. 설치한 뒤 각 기기에서 같은 Tailscale 계정으로 로그인합니다.

### 3. Tailscale Serve 켜기

Sidecar가 있는 컴퓨터에서 실행합니다. Tailscale Serve는 내 컴퓨터의 로컬 서비스로 가는 통신을 중계합니다.

Mac에서는 먼저 명령어 별칭을 만듭니다.

```
alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"
```

그다음 Serve를 켭니다.

```
tailscale serve
```

명령이 주소를 하나 돌려줍니다. 브라우저에서 그 주소를 열고 **Enable HTTPS**를 누릅니다.

### 4. Sidecar 포트로 가는 경로 정하기

Sidecar의 포트는 보통 11932입니다. 실제 포트는 Sidecar를 실행한 상태에서 **Copy Local Connection Info**를 고르면 그 안에 들어 있습니다.

```
tailscale serve --set-path=sidecar 11932
```

성공하면 `https://<기기 식별자>.<tailnet 이름>.ts.net/sidecar` 모양의 주소가 나옵니다.

### 5. 연결 주소 만들기

4단계에서 받은 주소 뒤에 Sidecar의 토큰을 붙입니다. 토큰은 **Copy Local Connection Info**에 들어 있습니다.

```
https://<기기 식별자>.<tailnet 이름>.ts.net/sidecar?token=<토큰>
```

### 6. 다른 기기에서 연결하기

1. 접속할 기기에서도 Tailscale을 실행합니다.
2. 브라우저에서 msty.studio를 엽니다.
3. 그 기기에서 처음이라면 Aurum 라이선스 키를 넣습니다.
4. Msty Studio 왼쪽 메뉴에서 **Modes**를 누릅니다.
5. **Edit** 아이콘을 눌러 Sidecar 연결을 고칩니다.
6. 5단계에서 만든 주소를 붙여 넣습니다.
7. **Save and Connect**를 누릅니다.

연결되면 다른 기기에서 Sidecar의 로컬 모델을 쓸 수 있습니다.

## 세 가지 접속 방법 비교

| 방법 | 필요한 것 | 성격 |
|---|---|---|
| Remote Connections | Studio Desktop | 문서가 대부분의 사용자에게 권장 |
| Sidecar 터널링 | Sidecar, Aurum | 설정이 가장 간단. 실험 기능 |
| Sidecar와 Tailscale | Sidecar, Aurum, Tailscale 계정 | 설정 단계가 많지만 사설 네트워크 안에서만 닿음 |

## 안전하게 쓰기

- 토큰이 붙은 주소는 비밀번호처럼 다룹니다.
- 쓰지 않을 때는 터널링을 끕니다.
- Tailscale 계정에는 2단계 인증을 걸어 둡니다. 그 계정에 들어가면 내 기기들에 닿을 수 있기 때문입니다.

## 참고한 문서

- [Sidecar](https://docs.msty.ai/studio/how-tos/sidecar)
- [Setup Tailscale for Sidecar](https://docs.msty.ai/studio/how-tos/setup-tailscale-for-sidecar)
- [Remote Connections](https://docs.msty.ai/studio/settings/remote-connections)
