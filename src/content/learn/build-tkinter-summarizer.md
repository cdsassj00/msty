---
title: 요약 창 프로그램 만들기
description: Python 기본 내장 tkinter로 브라우저 없이 뜨는 요약 창을 만들고, 같은 뼈대로 번역·문서 작성 도구로 바꾸는 방법입니다.
date: 2026-10-11
series: 만들어 보기
order: 20
tags: [Ollama, tkinter, 요약]
---

## 무엇을 만드나

더블클릭하면 뜨는 작은 창 프로그램입니다. 위 칸에 글을 붙여 넣거나 텍스트 파일을 불러오고 **요약하기**를 누르면, 아래 칸에 요약이 나옵니다. 결과는 파일로 저장하거나 복사할 수 있습니다.

웹 서버도 브라우저도 쓰지 않습니다. 파일은 `main.py` 하나입니다. 이럴 때 맞습니다.

- 브라우저 주소를 열고 닫는 과정 없이 바로 쓰는 도구가 필요할 때
- 패키지 설치가 어려운 PC에 옮겨야 할 때
- 요약, 번역, 초안 작성처럼 "넣고, 누르고, 받는" 일이 반복될 때

## 준비물

| 항목 | 내용 |
|---|---|
| Ollama | 실행 중, 모델 하나 이상 |
| Python | 3.x. tkinter는 Python에 기본으로 들어 있습니다 |
| 패키지 | `requests` 하나 |

## 구조

```
tkinter 창 ──(GET /api/tags)──→ Ollama : 모델 목록
tkinter 창 ──(POST /api/generate, stream=false)──→ Ollama : 요약
```

백엔드가 따로 없습니다. 창 프로그램이 Ollama를 직접 부릅니다. 브라우저가 아니므로 브라우저 보안 정책에 걸릴 일도 없습니다.

화면은 네 부분입니다.

| 부분 | 내용 |
|---|---|
| 설정 줄 | 모델 선택 상자, 모델 새로고침 버튼, 요약 길이(간단히·보통·자세히) |
| 원본 칸 | 파일에서 불러오기, 지우기 |
| 결과 칸 | 결과 저장, 복사 |
| 상태 줄 | "준비", "요약 중...", "요약 완료" 같은 안내 |

## 에이전트에게 줄 요청

```text
tkinter로 텍스트 요약 창 프로그램을 만들어 줘. 파일은 main.py 하나.
- Ollama(http://localhost:11434)를 requests로 호출한다. 다른 패키지는 쓰지 않는다.
- 시작할 때 /api/tags로 모델 목록을 받아 선택 상자에 넣는다.
  모델이 없거나 서버가 꺼져 있으면 안내 창을 띄운다.
- 요약 길이는 간단히 / 보통 / 자세히 중에서 고른다.
- 원본은 직접 입력하거나 .txt 파일에서 불러온다.
- 결과는 .txt로 저장하거나 클립보드에 복사한다.
- 아래쪽 상태 줄에 진행 상황을 보여 준다.
```

## 핵심 코드

모델 목록은 프로그램이 켜질 때 한 번 가져옵니다. 받아 둔 모델이 없으면 무엇을 해야 하는지 알려 줍니다.

```python
response = requests.get(self.ollama_tags_url, timeout=5)
if response.status_code == 200:
    data = response.json()
    self.available_models = [model['name'] for model in data.get('models', [])]
    if self.available_models:
        self.model_combo['values'] = self.available_models
        self.model_var.set(self.available_models[0])
    else:
        self.status_var.set("경고: 설치된 모델이 없습니다.")
```

요약 길이는 프롬프트 문장만 바꿔서 처리합니다. 프롬프트는 짧게 둡니다.

```python
if length == "간단히":
    prompt = f"다음 텍스트를 한 문단으로 간단히 요약해주세요:\n\n{text}"
elif length == "보통":
    prompt = f"다음 텍스트를 2-3문단으로 요약해주세요:\n\n{text}"
else:
    prompt = f"다음 텍스트를 자세히 요약해주세요:\n\n{text}"
```

호출은 스트리밍 없이 한 번에 받습니다. 응답 코드에 따라 안내를 나눕니다.

```python
data = {"model": model, "prompt": prompt, "stream": False}
response = requests.post(self.ollama_url, json=data, timeout=120)

if response.status_code == 200:
    summary = response.json().get('response', '요약을 생성할 수 없습니다.')
    self.output_text.delete("1.0", tk.END)
    self.output_text.insert("1.0", summary)
    self.status_var.set("요약 완료")
elif response.status_code == 404:
    error_msg = f"모델 '{model}'을 찾을 수 없습니다. 모델이 설치되어 있는지 확인하세요."
```

## 실행하고 확인하기

1. `pip install requests`
2. `python main.py`
3. 모델 선택 상자에 받아 둔 모델이 보이는지 확인합니다.
4. 뉴스 기사 한 편 분량의 글을 붙여 넣고 **요약하기**를 누릅니다.
5. 요약 길이를 바꿔 결과 분량이 달라지는지 봅니다.
6. **결과 저장**으로 만든 파일을 메모장에서 열어 한글이 깨지지 않는지 봅니다.

## 자주 생기는 문제

| 증상 | 원인과 해결 |
|---|---|
| 요약하는 동안 창이 멈춘 것처럼 보임 | 답을 기다리는 동안 창이 다른 일을 하지 못하는 구조입니다. 고장이 아닙니다. 아래 확장 항목의 스레드 처리로 풉니다 |
| "연결 오류" 창이 뜸 | Ollama가 꺼져 있습니다. 켠 뒤 **모델 새로고침**을 누릅니다 |
| 파일을 불러오면 오류 | UTF-8이 아닌 텍스트 파일입니다. 메모장에서 UTF-8로 다시 저장합니다 |
| 긴 글에서 오류 | 제한 시간 120초를 넘겼습니다. 글을 나누어 요약합니다 |
| 요약이 원문과 다른 내용을 말함 | 모델이 한 번에 읽을 수 있는 길이를 넘으면 앞부분이 잘립니다. 글을 나누고, 중요한 숫자는 원문과 대조합니다 |

## 같은 뼈대로 다른 도구 만들기

이 구조에서 바뀌는 것은 프롬프트뿐입니다. 같은 방식으로 만든 도구가 네 개 더 있습니다.

| 도구 | 고르는 항목 | 프롬프트 |
|---|---|---|
| 번역 | 번역 방향 | `Translate to Korean: {text}` |
| 문서 작성 | 문서 종류(이메일, 보고서, 계획서) | `Write a report about: {topic}` |
| 코드 도우미 | 작업(작성, 검토, 오류 수정, 설명) | `Explain this code:\n\n{text}` |
| 채팅 | 없음 | 입력한 글 그대로 |

에이전트에게는 "요약 도구의 `main.py`를 복사해서 번역 도구로 바꿔 줘. 요약 길이 대신 번역 방향을 고르게 해 줘"라고 하면 됩니다.

## 확장하기

- **창이 멈추지 않게**: 모델 호출을 `threading`으로 따로 돌리고, 끝나면 결과를 창에 넣습니다.
- **긴 문서 나눠 요약**: 글을 일정 길이로 잘라 조각마다 요약하고, 조각 요약을 모아 한 번 더 요약합니다.
- **실행 파일로 묶기**: PyInstaller로 exe 하나로 만들면 Python이 없는 PC에서도 실행됩니다. Ollama와 모델은 그 PC에 따로 있어야 합니다.
- **한국어 지시문**: 번역·문서 작성 도구의 프롬프트를 한국어로 바꾸고 "번역문만 답하세요"처럼 출력 범위를 정해 줍니다.

엑셀 안에서 같은 일을 하려면 [엑셀에서 로컬 모델을 함수로 부르기](/learn/build-excel-ollama-functions/)를 봅니다.
