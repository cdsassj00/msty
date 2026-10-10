# 로컬 모델 찾기·비교 링크 모음 (`/models` 페이지 원고)

- 접속 확인일: 2026-10-10 (아래 주소는 모두 이 날짜에 응답 200을 확인했다)
- 설명은 한 줄로 쓴다. 순위나 점수는 옮겨 적지 않고 원 사이트로 보낸다.
- "확인 필요" 표시가 있는 항목은 게시 전에 직접 열어 본다.

## 1. 모델 찾기와 받기

| 사이트 | 주소 | 한 줄 설명 |
|---|---|---|
| Ollama 라이브러리 | https://ollama.com/library | Ollama로 바로 받을 수 있는 모델 목록. Msty에서도 같은 이름으로 받는다 |
| Ollama 검색 | https://ollama.com/search | 이름·용도로 모델 검색 |
| Ollama 임베딩 모델 | https://ollama.com/search?c=embedding | 임베딩 전용 모델만 모아 보기 |
| Hugging Face GGUF 모델 | https://huggingface.co/models?library=gguf&sort=trending | 로컬 실행용 GGUF 파일을 인기순으로 보기 |
| Hugging Face 한국어 GGUF | https://huggingface.co/models?pipeline_tag=text-generation&library=gguf&language=ko&sort=trending | 한국어 태그가 붙은 GGUF 모델 |
| LM Studio 모델 카탈로그 | https://lmstudio.ai/models | LM Studio가 고른 모델 목록과 크기 |
| MLX 커뮤니티 | https://huggingface.co/mlx-community | Apple Silicon용 MLX 변환 모델 모음 |
| Unsloth 모델 카탈로그 | https://unsloth.ai/docs/get-started/unsloth-model-catalog | Unsloth가 양자화해 올린 모델 목록 |
| LLM Explorer (소형 모델) | https://llm-explorer.com/list/?small | 오픈 모델을 크기·라이선스·점수로 걸러 보는 목록 |
| Gemma 공식 페이지 | https://deepmind.google/models/gemma/ | 구글 Gemma 계열 소개 |
| EmbeddingGemma (Ollama) | https://ollama.com/library/embeddinggemma | 구글의 소형 임베딩 모델 받기 |
| EmbeddingGemma 소개 글 | https://huggingface.co/blog/embeddinggemma | Hugging Face의 EmbeddingGemma 설명 |

## 2. 전체 모델 목록과 출시 흐름

| 사이트 | 주소 | 한 줄 설명 |
|---|---|---|
| LifeArchitect 모델 표 | https://lifearchitect.ai/models-table/ | 공개된 LLM을 출시일·크기·개발사로 정리한 큰 표 |
| models.dev | https://models.dev/ | 모델별 가격·컨텍스트 길이·기능을 모은 공개 데이터베이스 |
| LLM Stats | https://llm-stats.com/ | 모델 사양과 벤치마크 점수 비교 |
| OpenRouter 모델 목록 | https://openrouter.ai/models | 클라우드로 제공되는 모델 목록. 오픈 모델도 포함 |
| OpenRouter 사용량 순위 | https://openrouter.ai/rankings | 실제로 많이 불리는 모델 순위 |

## 3. 성능 리더보드

| 사이트 | 주소 | 한 줄 설명 |
|---|---|---|
| Artificial Analysis 오픈 모델 | https://artificialanalysis.ai/models/open-source | 오픈 웨이트 모델의 품질·속도·가격 비교 |
| LMArena | https://arena.ai/leaderboard | 사람이 두 답을 비교해 투표한 결과로 매긴 순위 |
| LiveBench | https://livebench.ai/ | 문제를 주기적으로 바꿔 암기 효과를 줄인 벤치마크 |
| Open LLM Leaderboard | https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard | Hugging Face의 오픈 모델 리더보드. 확인 필요: 새 모델 갱신 여부 |
| Vellum 오픈 LLM 리더보드 | https://www.vellum.ai/open-llm-leaderboard | 오픈 모델만 모은 벤치마크 표 |
| BenchLM | https://benchlm.ai/ | 여러 벤치마크를 종합·코딩·에이전트로 나눠 보기 |
| Epoch AI 벤치마크 | https://epoch.ai/benchmarks | 주요 벤치마크의 모델별 점수와 추이 |
| Scale 리더보드 | https://labs.scale.com/leaderboard | Scale AI가 비공개 문제로 평가한 순위 |
| Kaggle 벤치마크 | https://www.kaggle.com/benchmarks | Kaggle이 모아 둔 벤치마크와 결과 |
| OpenCompass | https://rank.opencompass.org.cn/home | 중국권 모델까지 넓게 다루는 평가 순위 |
| Dubesor 벤치 표 | https://dubesor.de/benchtable | 개인이 직접 돌린 로컬·클라우드 모델 비교 표 |
| GPU Poor LLM Arena | https://huggingface.co/spaces/k-mktr/gpu-poor-llm-arena | 작은 모델끼리 겨루는 투표형 순위. 확인 필요: 스페이스 실행 상태 |

## 4. 한국어 성능

| 사이트 | 주소 | 한 줄 설명 |
|---|---|---|
| 호랑이 리더보드 | https://horangi.ai/ | W&B Korea의 한국어 LLM 리더보드. 현재 4판 보고서로 연결된다 |
| Open Ko-LLM 리더보드 | https://huggingface.co/spaces/upstage/open-ko-llm-leaderboard | 업스테이지·NIA의 한국어 리더보드. 2026-10-10 기준 실행 오류 상태라 게시 전 재확인 |

## 5. 용도별 리더보드

| 용도 | 사이트 | 주소 | 한 줄 설명 |
|---|---|---|---|
| 임베딩 | MTEB 리더보드 | https://huggingface.co/spaces/mteb/leaderboard | 임베딩 모델의 검색·분류 성능 순위. 다국어 탭이 있다 |
| 코딩 | Aider 리더보드 | https://aider.chat/docs/leaderboards/ | 코드 수정 과제로 본 모델 순위 |
| 코딩 | SWE-bench | https://www.swebench.com/ | 실제 저장소 이슈 해결 능력 평가 |
| 음성 | Hume VoiceEQ 벤치마크 | https://www.hume.ai/benchmark | 음성 AI가 말투·화자·배경을 얼마나 잘 다루는지 평가 (TTS, 음성 대 음성 등) |
| 음성 합성 | TTS Arena V2 | https://huggingface.co/spaces/TTS-AGI/TTS-Arena-V2 | 음성 합성 모델 투표형 순위 |
| 음성 인식 | Open ASR 리더보드 | https://huggingface.co/spaces/hf-audio/open_asr_leaderboard | 음성 인식 모델의 정확도·속도 순위 |
| 이미지 이해 | Open VLM 리더보드 | https://huggingface.co/spaces/opencompass/open_vlm_leaderboard | 이미지를 읽는 모델의 평가 순위 |

## 6. 내 PC에서 돌아가는지 확인

| 사이트 | 주소 | 한 줄 설명 |
|---|---|---|
| CanIRun.ai | https://www.canirun.ai/ | 내 GPU나 Mac을 감지해 돌릴 수 있는 모델을 추려 준다 |
| What Models? | https://whatmodelscanirun.com/ | GPU를 고르면 VRAM·컨텍스트·속도 기준으로 가능한 모델을 보여 준다 |
| Can it run LLM | https://huggingface.co/spaces/Vokturz/can-it-run-llm | 모델과 GPU를 넣으면 실행 가능 여부를 알려 준다 |
| APXML VRAM 계산기 | https://apxml.com/tools/vram-calculator | 모델·양자화·컨텍스트 길이로 필요한 VRAM 계산 |
| LLM VRAM 계산기 | https://huggingface.co/spaces/NyxKrage/LLM-Model-VRAM-Calculator | Hugging Face 모델 주소로 VRAM 사용량 계산 |
| LLM 하드웨어 체커 | https://mustafa.net/llm-hardware-checker/ | GPU와 RAM을 고르면 맞는 모델 크기를 추정. 커뮤니티 수치 기반이라 어림값 |

## 7. 내 장비에서 얼마나 빠른지

| 사이트 | 주소 | 한 줄 설명 |
|---|---|---|
| LocalScore | https://www.localscore.ai/ | 사용자들이 올린 장비별 로컬 LLM 속도 점수 |
| GPU별 LLM 추론 벤치마크 | https://github.com/XiongjieDai/GPU-Benchmarks-on-LLM-Inference | NVIDIA GPU와 Apple Silicon의 초당 토큰 수 측정 모음 |
| llama.cpp Apple Silicon 성능 | https://github.com/ggml-org/llama.cpp/discussions/4167 | M 시리즈 칩별 llama.cpp 속도 기록 |
| 초당 토큰 수 표 | https://mustafa.net/llm-tokens-per-second-benchmarks/ | GPU와 모델 크기별 속도 표. 출처가 커뮤니티 수치라 어림값 |

## 8. 실행 도구

| 도구 | 주소 | 한 줄 설명 |
|---|---|---|
| Msty | https://msty.ai/ | 로컬과 온라인 모델을 한 화면에서 쓰는 데스크톱 앱 |
| Ollama | https://github.com/ollama/ollama | 명령 한 줄로 모델을 받아 실행하는 런타임 |
| LM Studio | https://lmstudio.ai/ | 모델 검색과 채팅을 묶은 데스크톱 앱 |
| Jan | https://www.jan.ai/ | 오픈소스 로컬 채팅 앱 |
| Open WebUI | https://github.com/open-webui/open-webui | Ollama에 붙여 쓰는 웹 화면 |
| llama.cpp | https://github.com/ggml-org/llama.cpp | 대부분의 로컬 도구가 기반으로 쓰는 추론 엔진 |

## 9. 소식과 커뮤니티

| 사이트 | 주소 | 한 줄 설명 |
|---|---|---|
| r/LocalLLaMA | https://www.reddit.com/r/LocalLLaMA/ | 로컬 모델 소식이 가장 빨리 올라오는 영어 커뮤니티 |
| Simon Willison 로컬 LLM 글 | https://simonwillison.net/tags/local-llms/ | 새 모델을 직접 돌려 본 기록 |
| Ollama 블로그 | https://ollama.com/blog | Ollama 새 기능과 지원 모델 소식 |
| Hugging Face 블로그 | https://huggingface.co/blog | 새 모델과 도구 발표 |
| GeekNews | https://news.hada.io/ | 한국어 기술 뉴스 모음 |
| 파이토치 한국 사용자 모임 | https://discuss.pytorch.kr/ | 한국어 AI 소식과 토론 |

## 제외한 것

- `llmrun`: 검색 결과에는 있었으나 공식 주소에 접속되지 않았다.
- `eqbench.com`: 접속되지 않았다.
