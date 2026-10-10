---
title: Linux 설치, Studio Web 시작, 예전 Msty 앱에서 넘어오기
description: Linux에 Msty Studio Desktop을 설치하는 명령, 브라우저에서 쓰는 Studio Web을 시작하는 순서, 예전 Msty 앱(1.x) 사용자가 알아 둘 점을 정리합니다.
date: 2026-10-11
section: 시작하기
order: 60
verified: 2026-10-11
tags: [Msty, 설치, Linux, Studio Web]
---

## 이 글이 다루는 범위

Windows와 Mac 설치, 첫 실행은 다른 글에서 다뤘습니다([Windows 설치](/guide/install-windows/), [Mac 설치](/guide/install-mac/), [첫 실행과 모델 받기](/guide/first-run-and-models/)). 이 글은 그 글들에 없는 세 가지를 다룹니다.

- Linux에 설치하는 방법
- 브라우저에서 쓰는 Msty Studio Web을 시작하는 방법
- 예전 Msty 앱(1.x)을 쓰던 사람이 알아 둘 점

## Desktop과 Web 중 무엇으로 시작하나

| 경로 | 설명 |
|---|---|
| **Desktop** (권장) | 대부분의 새 사용자에게 맞는 경로입니다. 로컬 모델을 쓸 수 있고 무료로 시작할 수 있습니다 |
| **Web** (Aurum) | 브라우저에서 Msty Studio를 씁니다. 원격 제공업체를 연결하거나 Desktop 또는 Sidecar에 연결해 씁니다 |

Aurum 구독자는 Studio Web과 Studio Desktop을 모두 쓸 수 있습니다.

어느 쪽이든 데이터는 기기 사이에 동기화되지 않습니다. Desktop은 내 기기에 저장하고, Studio Web은 브라우저의 로컬 저장소에 직접 저장합니다. 웹 앱이지만 데이터가 서버가 아니라 내 브라우저에 남는 구조입니다.

## Linux에 설치하기

Linux용은 x64 AppImage와 deb 패키지 두 가지입니다. 설치 파일은 공식 문서의 [다운로드 페이지](https://docs.msty.ai/studio/getting-started/download)에서 받습니다. Linux는 내려받은 뒤 직접 해야 하는 단계가 몇 가지 있습니다.

### AppImage로 실행하기

1. x64 AppImage 파일을 받습니다.
2. 터미널에서 파일에 실행 권한을 줍니다.

```bash
chmod a+x ./<받은파일이름>.AppImage
```

3. 실행합니다.

```bash
./<받은파일이름>.AppImage --no-sandbox
```

시스템에 `libfuse2` 같은 패키지가 없다면 AppImage를 실행하기 위해 먼저 설치해야 할 수 있습니다.

실행할 때 "Using GTK 2/3 and GTK 4 in the same process is not supported" 오류가 나오면 다음처럼 실행해 봅니다.

```bash
./MstyStudio_x86_64.AppImage --gtk-version=3
```

### deb 패키지로 설치하기

1. x64 deb 파일을 받습니다.
2. 설치합니다.

```bash
sudo apt install ./<받은파일이름>.deb
```

3. 설치가 끝나면 다음 명령으로 실행합니다.

```bash
MstyStudio
```

설치 중에 `_apt` 사용자의 권한이 부족해 권한 문제가 생기는 경우가 있습니다. 그럴 때는 아래 두 명령을 실행한 뒤 Msty를 다시 실행합니다.

```bash
sudo chown root:root /opt/MstyStudio/chrome-sandbox
sudo chmod 4755 /opt/MstyStudio/chrome-sandbox
```

### Linux 문제 해결 요약

| 증상 | 공식 문서의 안내 |
|---|---|
| AppImage가 실행되지 않음 | 실행 권한을 줬는지 확인하고, `libfuse2` 같은 필요한 패키지를 설치합니다 |
| GTK 2/3와 GTK 4 관련 오류 | `--gtk-version=3` 옵션을 붙여 실행합니다 |
| deb 설치 후 권한 문제 | `chrome-sandbox` 파일의 소유자와 권한을 위 두 명령으로 바꿉니다 |

## 첫 실행에서 고를 수 있는 시작 작업

첫 실행 때 모델을 연결하고 나면 무엇부터 할지 고르는 화면이 나옵니다. [첫 실행과 모델 받기](/guide/first-run-and-models/)에서는 일반 대화를 여는 경우만 다뤘습니다. 선택지는 모두 네 가지입니다.

| 선택지 | 내용 |
|---|---|
| 일반 대화 열기 | 표준 대화 화면으로 들어갑니다 |
| 이미지 모델을 연결하고 Media Studio 열기 | 이미지 작업부터 시작합니다 |
| Msty Studio Docs Knowledge Stack을 가져오고 **Msty Clippy** 페르소나 만들기 | Msty Studio 공식 문서를 Knowledge Stack으로 가져오고 Msty Clippy 페르소나를 만듭니다 |
| 추천 페르소나 설치 | 처음에 고른 사용 목적에 맞춘 페르소나를 설치합니다 |

고른 뒤에는 모델과 시작 자료가 준비된 상태로 해당 작업 화면이 열립니다.

## 로컬 엔진은 Msty가 관리합니다

Msty Studio는 로컬 모델을 위한 Ollama, MLX, Llama.cpp 서비스를 직접 설치하고 관리할 수 있습니다. 어떤 엔진을 추천하는지는 운영체제와 하드웨어에 따라 달라집니다. 엔진별 차이는 [로컬 모델 설치와 관리](/guide/models-local-models/)에서 설명합니다.

### 기본 설치가 안 될 때 — 압축 파일로 설치

기본 서비스 설치 프로그램이 내 시스템에 맞지 않으면, 서비스 설정에서 호환되는 압축 파일을 지정해 설치할 수 있습니다. Ollama의 경우 순서는 이렇습니다.

1. Ollama Releases(GitHub의 ollama/ollama 릴리스 페이지)에서 내 운영체제에 맞는 압축 파일을 받습니다.
2. **Settings > Local AI > Service Version**을 열고 압축 파일 옵션을 고릅니다.
3. 받은 압축 파일을 지정합니다.

공식 문서는 기본 설치 프로그램으로 Local AI 설정이 실패할 때 이 방법을 대안으로 쓰라고 안내합니다.

## Msty Studio Web 시작하기

공식 문서는 Studio Web에 **Aurum Perk** 표시를 붙여 두었습니다. Aurum 라이선스가 있어야 씁니다.

1. Aurum 라이선스를 구매하고 라이선스 키를 준비합니다.
2. 브라우저에서 `https://msty.studio`를 엽니다.
3. 라이선스 키를 넣고 **Next**를 누릅니다.
4. 모델 제공업체를 추가합니다. 방법은 두 가지입니다.
   - 원격 제공업체(OpenAI, Anthropic, Gemini 등)를 추가합니다.
   - 또는 Studio Web을 Msty Studio Desktop이나 Msty Sidecar에 연결합니다.
5. 설정을 마치고, 시작 작업을 고르고, 첫 프롬프트를 보냅니다.

### Studio Web에서 알아 둘 점

- Studio Web은 핵심 기능 대부분을 브라우저에서 지원합니다. 다만 **로컬 모델, Toolbox, Real-Time Data**를 쓰려면 Studio Web을 Msty Studio Desktop 또는 Msty Sidecar에 연결해야 합니다.
- **Safari는 직접 지원하지 않습니다.** 공식 문서는 Remote Connections에서 터널링을 써서 연결하는 방법은 가능하다고 안내합니다.

## 예전 Msty 앱(1.x)을 쓰던 사람에게

공식 문서가 예전 사용자에게 알리는 내용입니다.

- Studio Desktop은 예전 Msty 앱(1.x)과 **따로 설치됩니다.**
- 예전 앱을 지울 필요가 없습니다. Studio Desktop과 함께 계속 쓸 수 있습니다.
- Studio Desktop에서 Aurum을 활성화하면 **Aurum 활성화 기기 수 한도에 포함됩니다.** 이미 한도에 도달했다면 기기 하나를 비활성화해야 할 수 있습니다.
- 예전 앱의 **일부 데이터**를 Studio Desktop으로 옮겨 주는 마이그레이션 도구가 있습니다.
- 예전 앱의 문서는 `docs.msty.app`에 따로 있습니다.

마이그레이션 도구가 어떤 데이터를 옮기는지, 어디서 실행하는지는 이 문서 페이지에 설명이 없습니다. 옮기기 전에 예전 앱의 데이터를 지우지 말고 그대로 두는 편이 안전합니다.

다운로드 페이지에는 Msty Studio 2.5.x부터 2.9.4까지의 이전 버전과 예전 Msty 앱 1.x를 받는 항목도 접힌 상태로 들어 있습니다.

## 다음에 읽을 글

- [첫 실행과 모델 받기](/guide/first-run-and-models/)
- [Model Hub 한눈에 보기](/guide/models-model-hub/)
- [대화 화면 살펴보기](/guide/chat-conversations/)

## 참고한 문서

- [Welcome to Msty Studio](https://docs.msty.ai/studio/getting-started)
- [Quick Start](https://docs.msty.ai/studio/getting-started/quick-start)
- [Download Msty Studio Desktop](https://docs.msty.ai/studio/getting-started/download)
