---
title: Ollama 처음 시작하기
description: Ollama를 설치하고 명령 한 줄로 모델을 받아 대화합니다.
date: 2026-10-10
tags: [Ollama, 입문]
---

## Ollama란

Ollama는 언어 모델을 내 컴퓨터에 받아 실행하는 오픈소스 도구입니다. 터미널에서 명령 한 줄로 모델을 받고 바로 대화할 수 있습니다. Msty를 비롯한 여러 로컬 AI 앱이 Ollama를 엔진으로 씁니다.

## 설치

[Ollama 다운로드 페이지](https://ollama.com/download)에서 운영체제에 맞는 설치 파일을 받습니다. 터미널로 설치할 수도 있습니다.

macOS와 Linux:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Windows (PowerShell):

```powershell
irm https://ollama.com/install.ps1 | iex
```

## 모델 받아 실행하기

터미널에서 다음을 입력합니다. 모델이 없으면 먼저 내려받고, 끝나면 대화가 시작됩니다.

```bash
ollama run gemma4
```

Gemma 4는 구글 딥마인드의 공개 모델입니다. 기본 태그는 내려받는 크기가 6.6GB 이상이므로 디스크와 메모리 여유를 먼저 확인합니다. 어떤 크기를 골라야 할지는 [내 PC 사양으로 돌릴 수 있는 모델 고르기](/learn/choose-model-for-your-pc/)를 참고하세요.

받기만 하고 실행하지 않으려면 `pull`을 씁니다.

```bash
ollama pull gemma4
```

## 받은 모델 보고 지우기

받아 둔 모델 목록:

```bash
ollama ls
```

지금 메모리에 올라와 있는 모델:

```bash
ollama ps
```

실행 중인 모델 멈추기:

```bash
ollama stop gemma4
```

모델 지우기:

```bash
ollama rm gemma4
```

## 다른 프로그램에서 쓰기

Ollama는 내 PC에서 API를 제공합니다. 공식 예시는 `http://localhost:11434/api/chat` 주소를 씁니다. 다른 프로그램이 이 주소로 모델을 불러 쓸 수 있습니다.

## 화면에서 쓰려면

명령줄이 불편하면 Msty Studio를 씁니다. Msty는 Ollama를 앱 안에 포함하고 있어 화면에서 모델을 검색하고 받을 수 있습니다. 방법은 [Msty에서 Ollama 모델 쓰기](/guide/connect-ollama/)에 있습니다.

## 참고한 문서

- [Ollama README](https://github.com/ollama/ollama)
- [Ollama CLI reference](https://docs.ollama.com/cli)
- [Ollama 라이브러리: gemma4](https://ollama.com/library/gemma4)
