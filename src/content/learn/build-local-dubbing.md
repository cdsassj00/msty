---
title: 영상·음성 더빙 파이프라인 만들기
description: 음성 인식(faster-whisper), 로컬 모델 번역(Ollama), 음성 합성, ffmpeg를 이어 붙여 영상의 말을 다른 언어 음성으로 바꾸는 명령줄 도구를 만듭니다.
date: 2026-10-11
series: 만들어 보기
order: 80
tags: [Whisper, Ollama, 번역, 음성]
---

## 무엇을 만드나

영상이나 음성 파일을 넣으면 말을 받아 적고, 번역하고, 번역문을 음성으로 만들어 원래 시간 위치에 얹는 명령줄 도구입니다.

```bash
python dub_cli.py lecture.mp4 -o lecture_ko.mp4
```

이럴 때 쓸모가 있습니다.

- 외국어 강의 영상을 한국어 음성으로 듣고 싶을 때
- 회의나 강의 녹음을 문장 단위로 받아 적고 번역해야 할 때
- 여러 로컬 부품을 한 줄로 잇는 방법을 익히고 싶을 때

## 먼저 알아 둘 점

이 도구는 단계마다 처리 위치가 다릅니다.

| 단계 | 도구 | 처리 위치 |
|---|---|---|
| 음성 추출 | ffmpeg | 내 PC |
| 음성 인식 | faster-whisper | 내 PC |
| 번역 | Ollama | 내 PC |
| 음성 합성 | edge-tts | **온라인 호출** |
| 합치기 | pydub, ffmpeg | 내 PC |

기본 음성 합성 부품인 edge-tts는 설치가 가볍지만 인터넷으로 번역문을 보냅니다. 원본 음성과 받아 적은 글은 밖으로 나가지 않지만 번역된 문장은 나갑니다. 문장 하나도 밖으로 나가면 안 되는 자료라면 음성 합성 부품을 로컬 것으로 바꿔야 합니다. 코드는 그 교체를 염두에 두고 부품을 갈아 끼울 수 있게 짜여 있습니다.

## 준비물

| 항목 | 내용 |
|---|---|
| ffmpeg | 설치되어 있고 터미널에서 `ffmpeg` 명령이 실행되어야 합니다 |
| Ollama | 실행 중, 번역에 쓸 모델 하나 (예시: `gemma3:4b`) |
| Python 패키지 | `faster-whisper`, `ollama`, `edge-tts`, `pydub` |
| 그래픽카드 | 있으면 음성 인식이 빠릅니다. 없으면 CPU로 돌아갑니다 |

OCR 도구와 같은 폴더에서 만들 때는 패키지 버전이 부딪칠 수 있으니 가상환경을 따로 둡니다.

## 구조

```
입력 파일
 1) ffmpeg         : 16kHz 모노 WAV 추출
 2) faster-whisper : 문장 조각(시작 시각, 끝 시각, 글)
 3) Ollama         : 조각마다 번역 (앞 문장을 문맥으로 함께 전달)
 4) TTS            : 조각마다 음성 파일
 5) pydub          : 빈 음성 트랙 위에 조각을 시작 시각에 맞춰 얹기
 6) ffmpeg         : 영상이면 원래 화면에 새 음성 입히기
```

| 파일 | 역할 |
|---|---|
| `dubbing/config.py` | 모델 이름, 목표 언어, 음성 종류. 환경변수로 바꿀 수 있습니다 |
| `dubbing/media.py` | ffmpeg 호출 |
| `dubbing/stt.py` | 음성 인식 |
| `dubbing/translate.py` | 번역 |
| `dubbing/tts.py` | 음성 합성. 부품 교체 지점 |
| `dubbing/pipeline.py` | 여섯 단계를 순서대로 실행 |
| `dub_cli.py` | 명령줄 입구 |

## 에이전트에게 줄 요청

```text
영상/음성 더빙 명령줄 도구를 만들어 줘. 단계별로 파일을 나눈다.
1. media.py: ffmpeg로 16kHz 모노 WAV 추출, 길이 확인, 영상에 새 음성 입히기.
2. stt.py: faster-whisper로 (시작, 끝, 글) 조각 목록을 만든다.
   GPU가 있으면 쓰고, GPU에서 실패하면 CPU로 다시 시도한다.
3. translate.py: Ollama(http://127.0.0.1:11434)로 조각마다 번역한다.
   바로 앞 조각의 원문을 문맥으로 함께 준다. 번역문만 출력하게 한다.
4. tts.py: 음성 합성 부품을 같은 인터페이스(synth(글, 저장 경로))로 감싸 나중에 바꿀 수 있게 한다.
5. pipeline.py: 전체 길이만큼 빈 트랙을 만들고 조각 음성을 시작 시각에 얹는다.
   입력이 영상이면 화면은 그대로 두고 음성만 바꾼다.
6. dub_cli.py: 입력, -o 출력, --target 언어, --whisper 모델, --model 번역 모델.
   단계가 바뀔 때마다 진행 상황을 한 줄씩 출력한다.
단계마다 따로 실행해 볼 수 있는 짧은 음성 파일 테스트도 만들어 줘.
```

## 핵심 코드

음성 인식은 조각마다 시각을 함께 돌려줍니다. 말이 없는 구간은 거르도록 옵션을 켭니다.

```python
segments, info = self._model.transcribe(
    audio_path, language=language, vad_filter=True, beam_size=5,
)
segs = [Segment(s.start, s.end, s.text.strip()) for s in segments if s.text.strip()]
return info.language, segs
```

그래픽카드에서 모델을 올리다 실패하면 CPU로 바꿔 다시 올립니다.

```python
try:
    self._model = WhisperModel(self.model_name, device=device, compute_type=compute)
except Exception:
    # cuDNN 등 GPU 문제 시 CPU(int8)로 폴백
    self._model = WhisperModel(self.model_name, device="cpu", compute_type="int8")
    self.device = "cpu"
```

번역 지시문은 더빙에 맞춰 길이를 지키라고 요구합니다. 번역문이 원문보다 훨씬 길면 다음 문장과 겹치기 때문입니다.

```python
sys = (
    f"당신은 영상 더빙용 전문 번역가입니다. 입력 문장을 자연스러운 {self.target_name}로 "
    f"번역하세요. 설명·따옴표 없이 번역문만 출력하고, 말풍선/구어체 길이를 원문과 비슷하게 유지하세요."
)
user = (f"[앞 문맥: {context}]\n원문: {text}" if context else f"원문: {text}")
resp = self.client.chat(
    model=self.model,
    messages=[{"role": "system", "content": sys}, {"role": "user", "content": user}],
    options={"temperature": 0.2, "num_ctx": 4096, "num_predict": 512, "repeat_penalty": 1.1},
)
```

조각 음성은 전체 길이의 빈 트랙 위에 시작 시각에 맞춰 얹습니다.

```python
total_ms = int(duration * 1000) + 500
track = AudioSegment.silent(duration=total_ms)
for start, path in clips:
    clip = AudioSegment.from_file(path)
    track = track.overlay(clip, position=int(start * 1000))
track.export(out_wav, format="wav")
```

마지막으로 영상의 화면은 다시 만들지 않고 음성만 바꿉니다.

```python
_run([
    "ffmpeg", "-y", "-i", video_path, "-i", audio_path,
    "-map", "0:v:0", "-map", "1:a:0",
    "-c:v", "copy", "-c:a", "aac", "-shortest", out_path,
])
```

## 실행하고 확인하기

1. 30초쯤 되는 짧은 음성 파일로 시작합니다.

```bash
python dub_cli.py sample.mp3 -o sample_ko.mp3 --target ko
```

2. 터미널에 "오디오 추출 중", "음성 인식(STT) 중", "번역 중", "음성 합성(TTS) 중" 순서로 진행이 찍히는지 봅니다.
3. 끝나면 원본 언어, 목표 언어, 조각 수가 출력됩니다.
4. 결과를 들어 보고 문장이 원래 위치에서 시작하는지, 서로 겹치지 않는지 확인합니다.
5. 영상 파일로 바꿔 화면과 음성이 어긋나지 않는지 봅니다.

단계마다 품질이 따로 결정됩니다. 결과가 이상하면 받아 적은 글, 번역문, 합성 음성 중 어디서 틀렸는지부터 가립니다.

## 자주 생기는 문제

| 증상 | 원인과 해결 |
|---|---|
| `ffmpeg`를 찾을 수 없음 | 설치되지 않았거나 PATH에 없습니다 |
| "음성에서 인식된 내용이 없습니다" | 말이 없거나 소리가 너무 작은 파일입니다 |
| 문장이 겹쳐 들림 | 번역문이 원문보다 길어 다음 조각을 침범했습니다. 아래 확장 항목을 봅니다 |
| 고유명사가 틀리게 번역됨 | 번역 지시문에 용어 목록을 넣습니다 |
| 받아 적기가 부정확함 | 음성 인식 모델을 키웁니다(`--whisper large-v3`). 느려집니다 |
| 음성 합성에서 멈춤 | 인터넷 연결이 필요합니다. 연결이 없는 환경이면 로컬 부품으로 바꿔야 합니다 |

## 확장하기

- **길이 맞추기**: 합성 음성이 조각 길이보다 길면 말 속도를 올려 다시 만들거나, 번역을 더 짧게 다시 요청합니다. 음성 합성 함수에는 속도 인수가 이미 있습니다.
- **자막 파일 만들기**: 조각의 시각과 번역문이 있으므로 SRT 자막을 함께 내보낼 수 있습니다.
- **로컬 음성 합성**: `tts.py`에 같은 인터페이스로 로컬 음성 합성 부품을 추가하면 전 과정이 내 PC에서 끝납니다.
- **받아 적기만 쓰기**: 번역과 합성을 빼고 1~2단계만 쓰면 회의 녹음을 받아 적는 도구가 됩니다. 받아 적은 글은 [요약 창 프로그램](/learn/build-tkinter-summarizer/)에 넣어 정리합니다.
