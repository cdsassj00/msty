---
title: 로컬 OCR 문서 도구 만들기
description: 스캔 PDF와 사진을 내 PC에서 마크다운으로 바꾸고, 이어서 Ollama 모델로 요약·질문·항목 추출까지 하는 도구를 만듭니다.
date: 2026-10-11
series: 만들어 보기
order: 70
tags: [OCR, Ollama, PDF]
---

## 무엇을 만드나

스캔한 PDF나 문서 사진을 넣으면 두 단계를 거치는 도구입니다.

1. **OCR**: 이미지 속 글자와 표를 읽어 마크다운 텍스트로 바꿉니다.
2. **파싱**: 그 텍스트를 Ollama의 대화용 모델에 넘겨 요약, 질문 답변, 항목 추출을 합니다.

명령줄과 웹 화면 두 가지로 쓸 수 있게 만듭니다. 두 단계 모두 내 PC에서 돌아가므로 문서 이미지가 밖으로 나가지 않습니다.

이럴 때 쓸모가 있습니다.

- 글자를 복사할 수 없는 스캔 PDF를 텍스트로 바꿔야 할 때
- 영수증이나 신청서 사진에서 날짜, 금액 같은 항목만 뽑아 표로 만들 때
- [문서 질문 도구](/learn/build-doc-question-tool/)에 넣을 텍스트를 준비할 때

## 준비물

이 시리즈에서 사양을 가장 많이 타는 도구입니다.

| 항목 | 내용 |
|---|---|
| 그래픽카드 | NVIDIA GPU를 권합니다. 만든 코드는 VRAM 8GB를 기준으로 짰습니다. GPU가 없어도 돌도록 되어 있지만 느립니다 |
| OCR 모델 | DeepSeek-OCR. Hugging Face에서 처음 실행할 때 내려받습니다 |
| Ollama | 실행 중, 대화용 모델 하나 (예시: `gemma3:4b`) |
| Python 패키지 | `torch`, `transformers`, `PyMuPDF`, `ollama`, 웹 화면을 쓰면 `fastapi`, `uvicorn` |

OCR 모델은 Ollama가 아니라 Python의 `transformers`로 직접 올립니다. 그래서 모델 서버가 둘인 셈입니다.

## 구조

```
입력(PDF·이미지)
  → pdf_utils   : PDF를 페이지별 PNG로 변환
  → ocr_engine  : DeepSeek-OCR로 페이지마다 마크다운 추출
  → (OCR 모델을 메모리에서 내림)
  → llm_parser  : Ollama로 요약 / 질문 / 항목 추출
```

| 파일 | 역할 |
|---|---|
| `app/config.py` | 모델 이름, Ollama 주소, OCR 해상도 모드, OCR 프롬프트 |
| `app/pdf_utils.py` | PDF를 이미지로 바꿉니다 |
| `app/ocr_engine.py` | OCR 모델을 올리고 내리고 실행합니다 |
| `app/llm_parser.py` | Ollama 호출 세 가지(요약, 질문, 추출) |
| `app/pipeline.py` | 위 단계를 순서대로 잇습니다 |
| `cli.py`, `server.py` | 명령줄과 웹 화면 |

## 에이전트에게 줄 요청

한 번에 다 시키지 말고 세 번으로 나눕니다.

```text
[1단계] DeepSeek-OCR 모델(transformers)로 이미지 한 장을 마크다운으로 바꾸는
OcrEngine 클래스를 만들어 줘. 모델은 처음 호출할 때 올리고, unload()로 GPU 메모리에서 내릴 수 있게 해 줘.
결과에서 레이아웃 표시 토큰은 지워 줘. 이미지 한 장으로 확인하는 테스트 스크립트도 만들어 줘.

[2단계] PDF를 PyMuPDF로 페이지별 PNG(기본 200dpi)로 바꾸고, 페이지마다 OCR해서
"<!-- page N -->" 구분과 함께 하나의 마크다운으로 합치는 Pipeline을 만들어 줘.

[3단계] OCR 결과를 Ollama(http://127.0.0.1:11434)에 넘겨 summary / ask / extract를 하는
LlmParser를 만들어 줘. extract는 JSON 형식으로만 받고, 문서에 없는 값은 null로 둔다.
OCR과 LLM이 GPU 메모리를 동시에 쓰지 않게, LLM을 부르기 전에 OCR 모델을 내린다.
끝으로 cli.py(ocr, summary, ask, extract 명령)와 FastAPI 웹 화면(127.0.0.1:8000)을 붙여 줘.
```

## 핵심 코드

PDF는 페이지마다 그림으로 바꿉니다.

```python
zoom = dpi / 72.0
matrix = fitz.Matrix(zoom, zoom)
with fitz.open(pdf_path) as doc:
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=matrix, alpha=False)
        out = os.path.join(out_dir, f"page_{i + 1:04d}.png")
        pix.save(out)
```

OCR 해상도는 미리 정해 둔 모드에서 고릅니다. 문서에는 큰 이미지를 조각내어 읽는 `gundam` 모드를 기본으로 두었습니다.

| 모드 | 크기 | 용도 |
|---|---|---|
| `tiny` | 512 | 가장 빠름, 저화질 |
| `small` | 640 | |
| `base` | 1024 | 균형 |
| `large` | 1280 | 고화질 |
| `gundam` | 1024 + 조각 640 | 문서용 기본값 |

파이프라인에서 눈여겨볼 부분은 OCR이 끝난 뒤 모델을 내리는 줄입니다. 그래픽카드 메모리가 넉넉하지 않으면 OCR 모델과 대화용 모델을 동시에 올릴 수 없습니다.

```python
ocr_result = self.ocr_document(input_path, mode=mode, dpi=dpi, progress=progress)

if free_ocr_vram:
    self.ocr.unload()  # LLM 로드 전에 8GB VRAM 확보

parser = self._new_parser(llm_model)
doc = ocr_result.markdown
```

Ollama 호출에는 시스템 지시와 옵션을 고정합니다. 온도는 낮게, 출력 길이에는 상한을 둡니다.

```python
_SYSTEM = (
    "당신은 한국어 문서 분석 도우미입니다. 주어진 문서 내용에만 근거해 "
    "정확하고 간결하게 답하세요. 문서에 없는 내용은 추측하지 말고 모른다고 답하세요."
)

resp = self.client.chat(
    model=self.model,
    messages=[
        {"role": "system", "content": _SYSTEM},
        {"role": "user", "content": user_prompt},
    ],
    format="json" if json_mode else None,
    options={"temperature": 0.2, "num_ctx": self.num_ctx,
             "num_predict": self.num_predict, "repeat_penalty": 1.1},
)
```

항목 추출은 JSON 형식을 켜고, 그래도 해석에 실패하면 원문을 그대로 돌려주어 프로그램이 죽지 않게 합니다.

```python
raw = self._chat(prompt, json_mode=True)
try:
    return json.loads(raw)
except json.JSONDecodeError:
    return {"_raw": raw, "_error": "JSON 파싱 실패"}
```

웹 서버에서는 요청이 겹쳐도 GPU 작업이 한 번에 하나만 돌도록 잠금을 겁니다.

```python
_gpu_lock = threading.Lock()

with _gpu_lock:
    result = _pipe.ocr_document(path, mode=mode, prompt_key=prompt, dpi=dpi)
```

## 실행하고 확인하기

명령줄에서 단계별로 확인합니다. 파일 이름은 예시입니다.

```bash
python cli.py ocr sample.png -o result.md
python cli.py ocr sample.pdf --mode base
python cli.py summary sample.pdf
python cli.py ask sample.pdf "합계 금액이 얼마야?"
python cli.py extract receipt.jpg --fields 상호,날짜,금액
```

1. 먼저 글자가 선명한 이미지 한 장으로 `ocr`만 돌려 봅니다. 첫 실행은 모델을 내려받느라 오래 걸립니다.
2. 결과 마크다운을 원본과 나란히 놓고 숫자, 고유명사, 표의 칸을 대조합니다.
3. 여러 쪽 PDF로 페이지 구분이 맞는지 봅니다.
4. `extract`로 받은 JSON에서 문서에 없는 항목이 `null`로 나오는지 확인합니다.
5. 웹 화면은 `python server.py` 뒤 `http://127.0.0.1:8000`에서 엽니다.

## 자주 생기는 문제

| 증상 | 원인과 해결 |
|---|---|
| 메모리 부족 오류 | OCR 모델과 대화용 모델이 함께 올라갔습니다. OCR 뒤 `unload()`가 불리는지 확인하고, 모드를 `base`나 `small`로 낮춥니다 |
| 결과에 꺾쇠로 둘러싼 `ref`, `det` 표시가 섞임 | 레이아웃 토큰을 지우는 처리가 빠졌습니다 |
| 글자가 뭉개져 읽힘 | PDF 변환 해상도를 올립니다(`--dpi 300`) |
| 표가 어긋남 | 모드를 `large`나 `gundam`으로 바꿉니다 |
| 요약이 앞부분만 다룸 | 문서가 대화용 모델이 한 번에 읽는 길이를 넘었습니다. 페이지 단위로 나누어 요약합니다 |
| 설치 중 오류 | 패키지 버전이 맞지 않습니다. OCR 모델 안내문의 버전에 맞추고, 가상환경을 따로 만듭니다 |

OCR 모델을 올릴 때 코드에 `trust_remote_code=True`가 들어갑니다. 모델 저장소에 든 코드를 내 PC에서 실행한다는 뜻이므로, 출처가 분명한 모델에만 씁니다.

## 확장하기

- **폴더 일괄 처리**: 폴더 안의 파일을 차례로 돌려 같은 이름의 `.md`로 저장합니다.
- **추출 결과를 표로**: 여러 장의 영수증에서 뽑은 JSON을 모아 CSV 한 장으로 만듭니다.
- **가벼운 OCR로 바꾸기**: 글자만 필요하고 표 구조가 필요 없다면 PaddleOCR 같은 가벼운 OCR 엔진으로 바꿀 수 있습니다. PDF를 이미지로 바꿔 한국어 모델로 읽고 페이지별로 텍스트 파일에 쓰는 스크립트 한 개로 충분합니다.
- **질문 도구로 넘기기**: 결과 마크다운을 [문서 질문 도구](/learn/build-doc-question-tool/)에 넣어 조항을 찾습니다.
