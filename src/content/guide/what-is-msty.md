---
title: Msty란 무엇인가
description: 로컬 우선 AI가 무엇인지, Msty의 네 가지 제품이 각각 무슨 일을 하는지 정리합니다.
date: 2026-10-10
section: 시작하기
order: 1
verified: 2026-10-10
tags: [Msty, 입문]
---

## 로컬 우선 AI란

AI 모델을 회사 밖 서버가 아니라 내 컴퓨터에 받아서 돌리는 방식입니다. 질문과 문서가 내 PC 안에서 처리되므로 사내 자료나 개인정보를 다룰 때 부담이 줄어듭니다. 필요하면 온라인 모델을 함께 쓸 수 있습니다.

## Msty가 하는 일

Msty는 로컬 모델과 온라인 모델을 한 화면에서 쓰게 해 주는 도구입니다. 모델을 받는 일, 실행하는 일, 대화하는 일을 앱 안에서 처리하므로 명령어를 몰라도 시작할 수 있습니다.

## 네 가지 제품

Msty는 네 가지 제품으로 나뉩니다.

| 제품 | 역할 | 상태 |
|---|---|---|
| Studio | 모델과 대화하고, 자료를 정리하고, 프롬프트를 재사용하는 작업 공간 | 사용 가능 |
| Go | 범위를 정해 일을 맡기는 에이전트 | 무료 베타 |
| Nexus | 모델 연결을 관리하는 AI 제어 센터 | 사용 가능 |
| Stack | 승인된 자료를 묶어 관리하는 지식 계층 | 출시 예정 |

Studio에는 다음 기능이 있습니다.

- **모델 선택**: 로컬 엔진(MLX, llama.cpp, Ollama)과 온라인 제공업체를 한곳에서 연결합니다.
- **Split Chats**: 여러 모델을 나란히 놓고 답을 비교합니다.
- **Knowledge Stacks**: 내 문서와 노트를 근거로 답하게 합니다.
- **Agent Mode**: 도구를 쓰는 여러 단계 작업을 실행합니다.

## 무엇부터 설치하나

처음이라면 Studio 데스크톱 앱부터 설치합니다. 로컬 모델 대화와 Knowledge Stacks가 여기에 있습니다. 설치 방법은 [Windows](/guide/install-windows/)와 [Mac](/guide/install-mac/) 글에서 다룹니다. Linux는 x64용 AppImage와 deb 패키지를 제공합니다.

## 요금

2026-10-10에 확인한 Studio 요금입니다.

| 요금제 | 가격 | 내용 |
|---|---|---|
| Free | 0달러 | 로컬·온라인 모델 대화, Agent Mode, Knowledge Stacks 등 개인용 핵심 기능 |
| Aurum | 사용자당 연 149달러 | Studio Web, Azure·Bedrock 제공업체, Insights 등 추가 기능 |
| Aurum Lifetime | 사용자당 349달러 (한 번 결제) | Aurum 기능과 평생 업데이트 |
| Enterprise & Teams | 문의 (5석 이상) | SSO, 사용자·팀 관리, 감사 로그 |

요금은 바뀔 수 있으니 결제 전에 공식 요금 페이지를 확인하세요.

## 참고한 문서

- [Msty 홈](https://msty.ai/)
- [Msty Studio 제품 페이지](https://msty.ai/products/studio/)
- [Msty 요금](https://msty.ai/pricing/)
