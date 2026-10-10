---
title: Mac에 Msty Studio 설치하기
description: Apple Silicon과 Intel Mac에 Msty Studio를 설치하는 순서입니다.
date: 2026-10-10
section: 시작하기
order: 3
verified: 2026-10-10
tags: [Msty, 설치, Mac]
---

## 내 Mac 확인하기

Mac용 설치 파일은 칩 종류에 따라 둘로 나뉩니다. 화면 왼쪽 위 Apple 메뉴에서 **이 Mac에 관하여**를 열어 확인합니다.

- "칩" 항목에 Apple M1, M2, M3, M4가 보이면 Apple Silicon입니다.
- "프로세서" 항목에 Intel이 보이면 Intel Mac입니다.

macOS는 11 이상이어야 합니다.

## 설치 파일 받기

[Msty Studio 제품 페이지](https://msty.ai/products/studio/)나 공식 문서의 다운로드 페이지에서 내 칩에 맞는 파일을 받습니다.

| 내 Mac | 파일 이름 |
|---|---|
| Apple Silicon (M1, M2, M3, M4) | `MstyStudio_arm64.dmg` |
| Intel | `MstyStudio_x64.dmg` |

## 설치하기

받은 DMG 파일을 열고, 나타나는 창에서 Msty Studio를 응용 프로그램 폴더로 옮깁니다. DMG로 배포되는 Mac 앱의 일반적인 설치 방법입니다. 공식 문서에는 Mac 전용 설치 단계가 따로 적혀 있지 않습니다.

## 처음 실행하기

응용 프로그램 폴더에서 Msty Studio를 엽니다. 처음 켜면 사용 목적을 묻고 첫 모델을 연결하는 화면이 나옵니다. 이어지는 과정은 [첫 실행과 모델 받기](/guide/first-run-and-models/)에서 설명합니다.

Apple Silicon Mac에서는 로컬 엔진으로 MLX를 쓸 수 있습니다. 공식 문서는 Apple Silicon에서 MLX 형식이 있으면 대체로 그쪽을 권장합니다.

## 참고한 문서

- [Download Msty Studio Desktop](https://docs.msty.ai/studio/getting-started/download)
- [Local Models](https://docs.msty.ai/studio/managing-models/local-models)
- [Msty Studio 제품 페이지](https://msty.ai/products/studio/)
