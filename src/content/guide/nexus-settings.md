---
title: Nexus Settings 항목별 안내
description: Nexus Console의 Settings에 있는 Runtime and Gateway, Network Access, Runtime Data, Local AI Performance, Start at Login, Gauge, Notifications, Diagnostics 항목이 각각 무엇을 바꾸는지 정리합니다.
date: 2026-10-11
section: Msty Nexus
order: 160
verified: 2026-10-11
tags: [Msty, Nexus, Settings, 네트워크]
---

## Settings가 다루는 범위

Settings는 세 가지를 정합니다. 앱이 Runtime에 어떻게 연결되는지, 다른 클라이언트가 게이트웨이에 어떻게 연결되는지, 로컬 런타임이 어떻게 동작하는지입니다.

Console **Administer** 묶음의 **Settings**에 다음 항목이 있습니다.

| 항목 | 한 줄 요약 |
|---|---|
| Runtime and Gateway | 연결 상태 확인, 주소 복사, 복구 |
| Network Access | LAN 공개 여부와 브라우저 출처 허용 |
| Client Tokens | 앱용 토큰. 지금은 별도 페이지로 안내됩니다 |
| Runtime Data | 저장 위치와 설치 정책의 상태 |
| Local AI Performance | Ollama와 llama.cpp의 성능 값 |
| Start at Login | 로그인할 때 자동 시작 |
| Gauge | Gauge 켜기와 보관 기간 |
| Notifications | 작업 완료 알림 |
| Diagnostics | 지원 요청에 써도 안전한 상태 요약 |

화면은 Console 맨 위에서 고른 기기에 적용됩니다. 바꾸기 전에 어느 기기가 선택되어 있는지 확인합니다.

## Runtime and Gateway

앱의 현재 Runtime 연결과 게이트웨이 주소를 보여 줍니다. 여기서 할 수 있는 일입니다.

- Runtime 버전과 상태 확인
- OpenAI 호환 주소 복사
- 모델 값이나 프리셋 값 복사(있는 경우)
- 로컬 앱 연결 복구
- 필요할 때 Msty Nexus Runtime 다시 시작
- 창을 항상 위에 두고 싶을 때 앱 조작부에서 Always on Top 켜기

앱이 인증하지 못하면 제공업체, 모델, 네트워크 설정을 바꾸기 전에 로컬 연결부터 복구합니다. 연결이 안 된 상태에서 다른 설정을 건드려도 해결되지 않습니다.

## Client Tokens

클라이언트 토큰은 승인된 앱과 서비스가 Nexus를 부르게 해 줍니다. 문서는 Console이 이제 토큰에 별도의 **Client Tokens** 페이지를 준다고 적었습니다. 역할, 요금제 한도, 교체, 요청 한도, 접속 주소, 폐기는 [Client Tokens로 앱별 접근 관리하기](/guide/nexus-client-tokens/)에서 다룹니다.

Settings 문서가 남겨 둔 권장 사항은 다섯 가지입니다.

- 클라이언트마다 토큰을 하나씩 만듭니다.
- `Desktop Client`, `Raycast`, `Internal Dashboard`처럼 알아볼 수 있는 이름을 붙입니다.
- 원문은 한 번만 표시되므로 바로 저장합니다.
- 담당이 바뀌면 토큰 이름을 고칩니다.
- 쓰지 않는 토큰은 폐기합니다.

## Network Access

Runtime이 접속을 받는 방식과 브라우저 출처 허용을 다룹니다.

| 조작 항목 | 내용 |
|---|---|
| 접근 방식 | 로컬 전용 또는 네트워크 공개 |
| 현재 bind 주소와 포트 | Runtime이 지금 듣고 있는 곳 |
| 적용 대기 중인 bind 변경 | 다시 시작하면 반영될 변경 |
| CORS allowed origins | 호출이 허용된 브라우저 출처 |

적용 시점이 서로 다릅니다.

| 바꾼 것 | 적용 시점 |
|---|---|
| 네트워크 공개 여부 | Runtime을 다시 시작해야 적용 |
| CORS | 바로 적용. bind 주소는 바꾸지 않음 |

"다른 기기에서 접속이 안 된다"와 "브라우저 페이지에서 호출이 안 된다"는 서로 다른 문제입니다. 앞의 것은 네트워크 공개, 뒤의 것은 CORS입니다. 판단 기준은 [Nexus 보안 모델](/guide/nexus-security/)에 있습니다.

## Runtime Data

저장과 설치에 관한 상태를, 공개해도 안전한 범위에서 보여 줍니다.

- 관리 런타임 위치가 설정되어 있는지
- 모델 캐시가 설정되어 있는지
- Models directory
- 알려진 로컬 모델 저장소
- 보관 중인 관리 런타임 버전
- 설치 정책
- 게시자(publisher) 내려받기 상태
- PATH 설치 상태

실제 저장 경로는 서버 쪽에만 있습니다. 공개 설정 화면은 데이터베이스 경로, 런타임 위치, 자격 증명 참조, 생성된 파일 경로를 그대로 보여 주지 않습니다.

## Local AI Performance

로컬 런타임의 동작에 영향을 주는 값입니다. 문서가 든 예시입니다.

| 런타임 | 설정 |
|---|---|
| Ollama | context length (컨텍스트 길이) |
| Ollama | parallel requests (동시 요청 수) |
| Ollama | max loaded models (메모리에 올려 둘 최대 모델 수) |
| Ollama | queue size (대기열 크기) |
| Ollama | keep-ready duration (준비 상태 유지 시간) |
| llama.cpp | context length |
| llama.cpp | parallel requests |
| llama.cpp | CPU threads (CPU 스레드 수) |
| llama.cpp | batch, micro-batch size (배치 크기) |
| 공통 | 지원되는 경우 가속 엔진 선택 |

값을 높이면 메모리를 더 쓸 수 있습니다. 저장한 뒤 앱이 다시 시작이 필요하다고 알리면 해당 런타임을 다시 시작합니다.

각 값의 기본값과 권장 범위는 공식 문서에는 설명이 없습니다. 이 값들은 [Smart Balancer](/guide/nexus-smart-balancer/)의 용량 가중치와도 이어집니다. 그 문서는 풀의 용량을 로컬 런타임의 동시 처리 수보다 높게 잡지 말라고 안내합니다.

## Start at Login

운영체제에 로그인한 뒤 Msty Nexus를 자동으로 띄웁니다. 연결된 로컬 앱이 Nexus를 직접 열지 않아도 바로 쓸 수 있어야 할 때 켭니다.

보안과 소유권에 관한 규칙이 있습니다.

- Nexus는 자기 자신의 시작 등록만 관리합니다.
- Nexus가 관리하지 않는 운영체제 시작 항목을 덮어쓰지 않습니다.
- 자동 시작은 트레이·메뉴 형태로 뜹니다. 설정 창이 앞에 뜨지 않습니다.
- Nexus가 시작 등록을 안전하게 관리할 수 없는 빌드나 운영체제에서는 이 조작 항목이 없을 수 있습니다.

## Gauge

Gauge 기능을 켜고 끄는 설정과 보관 기간을 다룹니다.

Gauge는 기본적으로 꺼져 있습니다. 설정된 출처에서 로컬·외부의 사용량과 용량 신호를 Nexus가 모으기를 바랄 때만 켭니다. Gauge를 켠 뒤에도 외부 계정 출처는 하나하나 따로 동의해야 합니다. 사용법은 [Usage, Gauge, Activity](/guide/nexus-usage-gauge-activity/)에 있습니다.

## Notifications

앱 메뉴가 닫혀 있는 동안 백그라운드 작업이 끝나면 알려 줍니다. 모델 내려받기처럼 오래 걸리는 작업을 걸어 두고 다른 일을 할 때 쓸모가 있습니다.

제한이 두 가지 있습니다.

- 앱이 열려 있는 동안 시작한 작업만 알림을 낼 수 있습니다.
- 운영체제의 알림 권한이 거부되어 있으면, 시스템 설정에서 Msty Nexus의 알림을 허용한 뒤 앱으로 돌아옵니다.

## Diagnostics

지원 요청에 써도 안전한 상태 요약을 만듭니다.

| 들어갈 수 있는 것 | 들어가지 않는 것 |
|---|---|
| Runtime 버전과 플랫폼 | 제공업체 키 |
| 최근 작업 수 | 토큰 값 |
| 런타임 서비스 상태 | 로컬 경로 |
| 설치됨·실행 중·설치 가능 서비스 수 | 프롬프트 글, 응답 글 |
| 게이트웨이 요청 로깅 상태 | 요청 본문 원본 |
| 네트워크와 CORS 상태 | 제공업체 출력 원본 |

Troubleshooting 문서는 지원 요청을 보낼 때 **Settings > Diagnostics**를 쓰고, 다음은 붙여 넣지 말라고 당부합니다. 제공업체 키, 로컬 Nexus 토큰 값, 토큰 접두어, 로컬 경로, 프롬프트, 응답, 요청 본문 원본, 제공업체 출력, 명령줄, 프로세스 ID, 제공업체 오류 원문입니다.

게이트웨이 요청 로깅에 대해 Security 문서는 켜기 전에 검토하라고 적었습니다. 메타데이터만 기록하지만, 그래도 의도적으로 선택해야 한다는 것입니다. 이 로깅을 어느 화면에서 켜는지는 공식 문서에는 설명이 없습니다.

## 참고한 문서

- [Nexus 문서: Settings](https://docs.msty.ai/nexus/settings)
- [Nexus 문서: Security](https://docs.msty.ai/nexus/security)
- [Nexus 문서: Troubleshooting](https://docs.msty.ai/nexus/troubleshooting)
