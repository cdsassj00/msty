---
title: Models에서 모델 카탈로그 관리하기
description: Nexus의 Models 화면에서 모델을 검색, 설치, 가져오기 하고 별칭과 숨김을 설정하며, 메모리에 올라간 모델과 보관 상태, GPU 배치를 점검하는 방법을 정리합니다.
date: 2026-10-11
section: Msty Nexus
order: 50
verified: 2026-10-11
tags: [Msty, Nexus, Models, GPU]
---

## Nexus에서 모델이란

Nexus에서 모델은 앱이 게이트웨이를 통해 부를 수 있는 항목입니다. 모델 하나는 제공업체 하나에 속하고, 어떤 종류의 요청을 받을 수 있는지(엔드포인트 계열)를 밝히며, 별칭, 보임·숨김 상태, 런타임 정보, 로컬 성능 설정을 가질 수 있습니다.

Console **Library** 묶음의 **Models**에서 검색, 설치, 가져오기, 동기화, 숨기기, 별칭 붙이기, 메모리에 올리기와 내리기, 성능 조정을 합니다.

## 카탈로그에 담기는 정보

| 항목 | 설명 |
|---|---|
| Model ID | 모델을 가리키는 값. 흔히 제공업체 접두어가 붙습니다 |
| Provider ID | 속한 제공업체 |
| Display name | 화면에 보이는 이름 |
| Scope | 범위 |
| Endpoint families | 받을 수 있는 요청 종류 |
| Input / output modalities | 입력과 출력의 형태 |
| Local / online state | 로컬인지 온라인인지 |
| Aliases | 별칭 |
| Hidden / visible state | 숨김 여부 |
| Safe runtime metadata | 공개해도 안전한 런타임 정보 |

문서가 든 모델 ID 예시는 `openai/gpt-test`, `ollama/llama3.1:8b`, `llamacpp/qwen3.gguf`입니다.

## 엔드포인트 계열

엔드포인트 계열은 그 모델이 게이트웨이의 어느 경로를 쓸 수 있는지를 정합니다.

| 계열 ID | 쓰임 |
|---|---|
| `openai.chat_completions` | 대화 |
| `openai.embeddings` | 임베딩 |
| `openai.responses` | Responses API |
| `openai.images` | 이미지 |
| `openai.audio_speech` | 음성 합성 |
| `openai.audio_transcriptions` | 음성 받아쓰기 |
| `anthropic.messages` | Anthropic Messages |
| `rerank.documents` | 문서 재순위 |

Nexus는 카탈로그에 기록할 때 한 번, 요청을 보낼 때 한 번 더 이 값을 확인합니다. 한 가지 방식으로만 승인된 모델이 다른 방식으로 불리는 일을 막기 위해서입니다.

## 입력·출력 형태(modalities)

- `inputModalities`: `text`, `image`, `audio`, `video`, `pdf`
- `outputModalities`: `text`, `image`, `audio`, `embedding`

Nexus는 이 값을 검색 필터, 모델 카드의 배지, route pack에 넣을 수 있는지에 대한 힌트, SDK의 기능 판별에 씁니다. 다만 이 값만으로 게이트웨이 요청을 막지는 않습니다. 실제로 되는지는 제공업체와 런타임 API가 최종 판단합니다.

## 별칭과 숨김

**별칭**은 앱에 `default-chat`, `coding-local`처럼 바뀌지 않는 모델 이름을 줍니다. 같은 이름이 실제 모델 ID로도 있으면 모델 ID가 항상 우선합니다.

**숨김**은 `/v1/models` 목록에 나오면 안 되고, 모델 ID나 별칭으로 불려서도 안 되는 모델에 씁니다.

- 숨긴 모델도 신뢰된 관리 화면에서는 계속 관리할 수 있습니다.
- 숨긴 모델은 Smart Route와 프리셋·route 선택 목록에서도 빠집니다. 운영자가 숨긴 모델이 다른 경로로 연결된 앱에 다시 나타나지 않게 하려는 것입니다.

업무 예를 들면(설명을 위한 예입니다), 시험 삼아 받은 모델을 직원들이 쓰는 챗 앱 목록에 띄우고 싶지 않을 때 숨김을 씁니다.

## 로컬 모델 검색과 설치

로컬 모델 검색은 설치된 Nexus 런타임에 바로 설치할 수 있는 후보만 돌려줍니다. 런타임이 없으면 후보도 없습니다.

| 출처 | 대상 런타임 |
|---|---|
| Ollama registry | Ollama |
| Hugging Face snapshot 모델 | MLX |
| Hugging Face GGUF 파일 | llama.cpp |

한 출처가 응답하지 않아도 다른 출처가 성공하면 검색 전체가 실패하지는 않습니다. 이때 일부 출처를 쓸 수 없었다는 경고가 결과에 붙습니다.

## 모델에 할 수 있는 동작

모델 동작은 작업(job)으로 실행됩니다. 동작 이름은 `pull`, `import`, `delete`, `load`, `unload`, `sync` 여섯 가지입니다.

| 런타임 | 지원하는 동작 |
|---|---|
| Ollama | Ollama 자체 API로 pull, delete, load, unload, sync |
| llama.cpp | Hugging Face GGUF pull, 로컬 GGUF import, 관리 대상 delete, sync, 자체 라우터의 load와 unload |
| MLX | Hugging Face snapshot pull, 관리 캐시 delete, sync. macOS에서만 |
| 온라인 제공업체 | 제공업체 API가 모델 목록을 내놓는 경우의 모델 sync |

같은 런타임이나 제공업체를 대상으로 하는 작업이 이미 돌고 있으면, Nexus는 `RESOURCE_IN_USE`와 함께 진행 중인 작업의 안전한 정보를 돌려줍니다.

## GGUF 가져오기와 삭제의 안전 장치

llama.cpp로 GGUF 파일을 가져올 때는 데스크톱 앱에서 로컬 파일의 절대 경로를 받습니다. 이 경로는 입력으로만 쓰이고, Nexus는 파일을 자기가 관리하는 저장소로 복사한 뒤 상대 경로 형태의 모델 정보만 남깁니다.

삭제는 범위를 일부러 좁게 잡았습니다.

- Nexus가 관리하는 모델 파일만 지웁니다.
- 절대 경로는 화면이나 API 클라이언트로 돌려주지 않습니다.
- 경로를 거슬러 올라가는 시도, 심볼릭 링크로 빠져나가는 시도, 관리 대상이 아닌 파일, GGUF가 아닌 대상은 거부합니다.
- 멀티모달 프로젝터 파일은 같은 카탈로그 모델에 붙어 있고, 그 모델을 지울 때 함께 지워집니다.

## 메모리에 올라간 모델 보기

loaded models 화면은 지금 로컬 런타임 메모리에 올라가 있는 모델을 보여 줍니다. Ollama의 프로세스 목록, llama.cpp 라우터의 모델 목록처럼 런타임이 직접 제공하는 정보를 읽습니다.

표시되는 항목은 서비스 ID, 제공업체 ID, 카탈로그 모델 ID, 런타임상의 모델 이름, 올라감·올리는 중 상태, 모델 크기, VRAM 사용량, keep-alive 만료 시각입니다.

이 화면으로 답할 수 있는 질문은 이렇습니다.

- 어떤 모델이 올라가 있거나 올라가는 중인가
- 어느 서비스가 그 모델을 갖고 있는가
- 런타임이 보고하는 메모리 또는 VRAM은 얼마인가
- keep-alive 만료가 가까운가
- 런타임이 닿지 않는 것인가, 그냥 비어 있는 것인가

카탈로그에 짝이 되는 기록이 없는 모델도 그대로 표시됩니다. 카탈로그와 어긋났다는 이유로 메모리 사용이 가려지지 않게 하려는 것입니다.

## Library health (보관 상태 점검)

Library health는 관리 대상 모델 저장소와 런타임이 보고하는 모델 상태를 훑어, 게이트웨이 호출이 실패하기 전에 어긋난 곳을 찾아냅니다.

| 찾아내는 문제 | 뜻 |
|---|---|
| Missing files | 있어야 할 파일이 없음 |
| File-size mismatches | 파일 크기가 기록과 다름 |
| Orphan files / Stray files | 어디에도 속하지 않는 파일 |
| Runtime models missing from the catalog | 런타임에는 있는데 카탈로그에 없음 |
| Catalog models missing from the runtime | 카탈로그에는 있는데 런타임에 없음 |

이 점검은 읽기만 합니다. 제안되는 조치는 `sync`, `pull`, `delete` 같은 기존 동작으로 연결됩니다. 밖에서 모델을 바꿨거나 내려받기가 중간에 끊긴 뒤에 돌려 보면 좋다고 문서는 권합니다.

## GPU & Performance

GPU 배치는 로컬 모델마다 따로 저장됩니다. **GPU & Performance**에서 할 수 있는 일은 다음과 같습니다.

- 배치 목표 고르기: balanced(균형), max-speed(속도 우선), max-context(컨텍스트 우선), CPU-only, custom
- 지원되는 경우 GPU 배치를 자동 또는 수동으로 선택
- 적용하기 전에 메모리 영향 미리 보기
- 적용하고 검증하기
- 검증이 끝났던 이전 설정으로 되돌리기
- 범위가 정해진 로컬 벤치마크 실행

경고가 뜨면 설정은 끝났지만 검토가 필요하다는 뜻입니다.

| 경고 코드 | 뜻 |
|---|---|
| `GPU_FALLBACK_TO_CPU` | 런타임이 계획한 GPU 배치 대신 시스템 메모리를 썼습니다 |
| `GPU_PLACEMENT_VERIFICATION_LIMITED` | 모델은 올라갔지만 실제 GPU 배치를 Runtime이 끝까지 확인하지 못했습니다 |

Troubleshooting 문서가 권하는 대응 순서는 하드웨어 새로 고침, 해당 모델의 GPU & Performance 검토, 계획 미리 보기, 다시 적용하고 검증, 지금 설정이 더 나쁘면 되돌리기입니다. CPU-only는 일부러 그렇게 쓰려는 경우에만 고릅니다.

## 문서가 권하는 운영 순서

1. 믿을 수 있는, 보이는 대화 모델 하나로 시작합니다.
2. 앱이 고정된 이름을 필요로 할 때만 별칭을 붙입니다.
3. 되풀이해 쓸 기본값은 [프리셋](/guide/nexus-presets/)으로 만듭니다.
4. 모델 값 하나가 여러 대상 가운데서 골라야 하면 route pack을 씁니다.
5. GPU 조정은 모델이 설치되고 부를 수 있게 된 뒤에 합니다.

## 참고한 문서

- [Nexus 문서: Models](https://docs.msty.ai/nexus/models)
- [Nexus 문서: Troubleshooting](https://docs.msty.ai/nexus/troubleshooting)
