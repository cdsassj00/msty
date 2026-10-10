---
title: 첫 실행과 모델 받기
description: Msty Studio를 처음 켠 뒤 로컬 모델을 받아 첫 대화를 하기까지입니다.
date: 2026-10-10
order: 4
verified: 2026-10-10
tags: [Msty, 모델]
---

## 처음 켜면 보이는 화면

Msty Studio를 처음 열면 어떻게 쓸 계획인지 묻습니다. 다음 셋 중 하나를 고릅니다.

- **Just exploring**
- **For work**
- **I'm a developer**

고른 답에 따라 추천 모델과 시작 자료가 달라집니다.

## 로컬 모델 받기

다음 화면에서 첫 모델을 연결합니다. 방법은 두 가지입니다.

**추천 로컬 모델을 받는 방법.** Msty가 내 하드웨어를 확인해 로컬 엔진과 모델을 추천합니다. 받기 전에 추천 수준을 **Light**와 **Powerful** 사이에서 조절할 수 있습니다. 사양이 낮은 PC라면 Light 쪽으로 둡니다.

**온라인 제공업체를 연결하는 방법.** OpenAI, Claude, xAI, Gemini, OpenRouter 같은 제공업체를 연결하고 모델을 하나 이상 추가합니다. 이 경우 질문이 해당 업체 서버로 전송됩니다.

로컬 모델을 고르면 서비스와 모델을 내려받는 진행 상황이 표시됩니다. 내려받는 동안에도 앱에 들어갈 수 있습니다.

## 첫 대화

모델을 연결하면 시작할 작업을 고릅니다. 일반 대화를 하려면 **Open a normal conversation**을 고릅니다. 대화 화면이 열리면 질문을 입력합니다.

## 모델을 더 받으려면

**Model Hub > Local Models**로 갑니다. 탭이 네 개 있습니다.

| 탭 | 하는 일 |
|---|---|
| Featured | 추천 모델 목록. 크기와 내 하드웨어에 맞는지를 보고 설치합니다 |
| Installed | 받은 모델을 확인하고 이름을 바꾸거나 지웁니다 |
| Model Search | Ollama 레지스트리와 Hugging Face에서 모델을 검색해 설치합니다 |
| Import | 이미 가진 GGUF 파일이나 모델 폴더를 가져옵니다 |

## 온라인 모델도 함께 쓰려면

**Model Hub > Model Providers**에서 **Add Provider**를 누르고 제공업체를 고른 뒤 API 키를 넣습니다. 로컬 모델과 온라인 모델을 대화마다 골라 쓸 수 있습니다.

## 로컬 AI 설치가 실패할 때

공식 문서는 **Settings > Local AI > Service Version**에서 압축 파일 옵션을 고르고, 내 운영체제용으로 직접 받은 파일을 지정하는 방법을 안내합니다.

## 다음에 읽을 글

- [내 PC 사양으로 돌릴 수 있는 모델 고르기](/learn/choose-model-for-your-pc/)
- [모델 찾기](/models/)

## 참고한 문서

- [Quick Start](https://docs.msty.ai/studio/getting-started/quick-start)
- [Local Models](https://docs.msty.ai/studio/managing-models/local-models)
- [Online Providers](https://docs.msty.ai/studio/managing-models/online-providers)
