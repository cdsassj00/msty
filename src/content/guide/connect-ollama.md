---
title: Msty에서 Ollama 모델 쓰기
description: Msty Studio가 Ollama를 어떻게 다루는지, Ollama 모델을 받고 가져오는 방법을 정리합니다.
date: 2026-10-10
section: 시작하기
order: 5
verified: 2026-10-10
tags: [Msty, Ollama]
---

## Msty가 Ollama를 직접 관리합니다

Msty Studio는 로컬 엔진 세 가지를 지원합니다. Ollama, MLX, Llama.cpp입니다. 이 가운데 Ollama는 Msty가 첫 설정 때 내려받아 직접 관리하며, 설정 화면에서는 **Local AI**라는 이름으로 나옵니다. Ollama를 따로 설치하지 않아도 Msty에서 Ollama 모델을 쓸 수 있습니다.

## Ollama 모델 받기

1. **Model Hub > Local Models**로 갑니다.
2. **Model Search** 탭을 엽니다.
3. 모델 이름을 검색합니다. Ollama 레지스트리와 Hugging Face를 함께 찾습니다.
4. 필터에서 Ollama를 골라 결과를 좁히고 설치합니다.

내려받기는 뒤에서 계속되며, Model Hub 사이드바의 배지에서 진행 중인 설치를 볼 수 있습니다.

## 이미 가진 모델 파일 가져오기

GGUF 파일을 가지고 있으면 다시 받지 않아도 됩니다. **Model Hub > Local Models > Import**에서 **Select GGUF File**을 눌러 파일을 고릅니다.

## 서비스 상태 확인하기

**Settings > Local AI**에서 서비스 상태, 주소, 버전, 로그를 보고 서비스를 켜고 끌 수 있습니다. 그래픽카드 가속 옵션도 여기에 있습니다.

## 따로 설치한 Ollama가 있을 때

공식 문서의 Local Models와 Remote Connections 항목을 확인했지만, PC에 따로 설치한 Ollama를 Msty에 연결하는 절차는 나와 있지 않습니다. Remote Connections는 다른 기기의 Msty Studio에 연결하는 기능입니다. 확인된 방법은 위의 두 가지, 곧 Model Search에서 같은 모델을 받거나 GGUF 파일을 가져오는 것입니다.

Ollama를 명령줄로 쓰는 방법은 [Ollama 처음 시작하기](/learn/ollama-first-steps/)에서 다룹니다.

## 참고한 문서

- [Local Models](https://docs.msty.ai/studio/managing-models/local-models)
- [Remote Connections](https://docs.msty.ai/studio/settings/remote-connections)
