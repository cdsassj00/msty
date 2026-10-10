---
title: Ollama API를 Python에서 부르기
description: 내 PC의 Ollama 주소로 요청을 보내 답을 받는 구조를 curl로 확인하고, Python으로 한 건 처리와 여러 건 일괄 처리를 만듭니다.
date: 2026-10-11
series: Ollama 실전
order: 30
tags: [Ollama, API, Python]
---

## API가 있으면 달라지는 것

대화창에서 쓰는 Ollama는 사람이 한 건씩 묻고 답을 읽습니다. API를 쓰면 프로그램이 대신 묻고 답을 받아 저장합니다. 수백 건을 분류하거나, 엑셀과 연결하거나, 내 화면을 만들 수 있습니다.

강의에서는 이 구조를 한 줄로 정리합니다. AI 함수의 본질은 "내 PC의 주소에 JSON을 보내고 JSON을 받는 일"입니다. 언어가 Python이든 VBA든 JavaScript든 이 구조는 같습니다.

## 주소 세 가지

Ollama 서버는 기본으로 `http://localhost:11434`에서 요청을 받습니다. 자주 쓰는 주소는 세 가지입니다.

| 주소 | 방식 | 하는 일 |
|---|---|---|
| `/api/tags` | GET | 받아 둔 모델 목록 |
| `/api/generate` | POST | 프롬프트 하나를 주고 답 하나를 받음 |
| `/api/chat` | POST | 역할이 붙은 대화 목록을 주고 다음 답을 받음 |

한 건씩 독립된 작업(요약, 분류)은 `/api/generate`가 간단합니다. 시스템 프롬프트를 따로 주거나 앞선 대화를 이어 가려면 `/api/chat`을 씁니다.

## 먼저 curl로 확인하기

코드를 쓰기 전에 터미널에서 주소가 살아 있는지 봅니다.

```bash
curl http://localhost:11434/api/tags
```

받아 둔 모델 목록이 JSON으로 나오면 정상입니다. 이어서 질문을 하나 보냅니다. macOS, Linux, Git Bash 기준입니다.

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "gemma4:e4b",
  "prompt": "다음을 한 문장으로 요약하라: 회의는 3시에 시작해 예산안을 검토했고 다음 주에 다시 모이기로 했다.",
  "stream": false
}'
```

Windows PowerShell에서는 따옴표 처리 방식이 달라 위 명령이 그대로 되지 않습니다. PowerShell 사용자는 curl 단계를 건너뛰고 아래 Python 예제로 바로 가도 됩니다.

모델 이름은 예시입니다. `ollama ls`에 나오는 이름으로 바꿉니다.

## stream 값이 중요합니다

Ollama는 기본적으로 답을 조각조각 나누어 보냅니다(스트리밍). 대화 화면에서 글자가 흘러나오는 것처럼 보이게 하는 방식입니다. 프로그램에서 답 전체를 한 번에 받으려면 `"stream": false`를 넣습니다.

이 값을 빠뜨리면 응답이 JSON 여러 줄로 쪼개져 오고, 이를 하나의 JSON으로 읽으려던 코드는 오류를 냅니다. 강의에서 가장 자주 나오는 오류로 꼽는 항목입니다.

## Python 준비

Python이 설치되어 있어야 합니다. HTTP 요청을 보내는 `requests` 라이브러리를 설치합니다.

```bash
pip install requests
```

## 예제 1: 한 건 요약하기

`summarize.py`로 저장합니다.

```python
import requests

URL = "http://localhost:11434/api/generate"

def ask(prompt, model="gemma4:e4b"):
    body = {"model": model, "prompt": prompt, "stream": False}
    r = requests.post(URL, json=body, timeout=300)
    r.raise_for_status()
    return r.json()["response"]

text = "회의는 3시에 시작해 예산안을 검토했고, 수정 사항을 반영해 다음 주에 다시 모이기로 했다."
print(ask("다음을 한 문장으로 한국어로 요약하라: " + text))
```

실행합니다.

```bash
python summarize.py
```

`timeout=300`은 5분까지 기다린다는 뜻입니다. 로컬 모델은 첫 호출에서 모델을 메모리로 올리느라 오래 걸릴 수 있으므로 넉넉하게 둡니다.

## 예제 2: 시스템 프롬프트와 설정값을 주고 분류하기

`/api/chat`을 씁니다. `messages`에 역할(`system`, `user`)을 붙여 넣고, `options`에 설정값을 줍니다.

```python
import requests

URL = "http://localhost:11434/api/chat"

SYSTEM = """너는 민원 분류 담당자다.
범주: 환경, 교통, 복지, 세무, 안전, 기타
범주 이름만 한 단어로 출력한다. 설명을 붙이지 않는다."""

def classify(text, model="gemma4:e4b"):
    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": "민원: " + text},
        ],
        "options": {"temperature": 0.1, "seed": 42},
        "stream": False,
    }
    r = requests.post(URL, json=body, timeout=300)
    r.raise_for_status()
    return r.json()["message"]["content"].strip()

print(classify("골목에 쓰레기가 방치되어 악취가 심합니다"))
```

응답에서 답이 들어 있는 자리가 다릅니다. `/api/generate`는 `response`, `/api/chat`은 `message` 안의 `content`입니다.

역할과 설정을 Modelfile로 미리 저장해 두었다면 코드가 더 짧아집니다. `model`에 그 이름만 적으면 됩니다. 방법은 [Modelfile과 파라미터로 업무용 모델 만들기](/learn/ollama-modelfile-parameters/)에 있습니다.

## 예제 3: CSV 파일 여러 건 처리하기

`input.csv`의 `내용` 열을 한 줄씩 분류해 `output.csv`에 저장합니다. 예제 2의 `classify` 함수를 같은 파일에 두고 아래를 붙입니다.

```python
import csv

with open("input.csv", encoding="utf-8-sig") as f:
    rows = list(csv.DictReader(f))

for i, row in enumerate(rows, 1):
    try:
        row["분류"] = classify(row["내용"])
    except Exception as e:
        row["분류"] = "오류"
        print(i, "번째 실패:", e)
    print(i, "/", len(rows))

with open("output.csv", "w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, fieldnames=rows[0].keys())
    w.writeheader()
    w.writerows(rows)
```

- `utf-8-sig`는 엑셀에서 한글이 깨지지 않게 여는 인코딩입니다.
- 한 건이 실패해도 멈추지 않도록 `try`로 감쌌습니다. 실패한 줄은 "오류"로 표시되어 나중에 다시 돌릴 수 있습니다.
- 처음에는 다섯 줄짜리 파일로 시험하고, 결과가 맞으면 전체를 돌립니다.
- 건당 몇 초씩 걸리므로 1,000건이면 수십 분에서 그 이상이 걸립니다. 진행 상황을 찍어 두면 멈춘 것인지 도는 중인지 알 수 있습니다.

## OpenAI 방식 코드로 부르기

OpenAI의 API 형식에 맞춰 만든 프로그램과 라이브러리가 많습니다. Ollama는 같은 형식의 주소(`/v1`)도 함께 제공하므로, 주소만 내 PC로 바꾸면 그런 코드를 로컬 모델로 돌릴 수 있습니다.

```bash
pip install openai
```

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

r = client.chat.completions.create(
    model="gemma4:e4b",
    messages=[{"role": "user", "content": "로컬 AI의 장점을 두 줄로 설명하라."}],
    temperature=0.3,
)
print(r.choices[0].message.content)
```

`api_key`는 라이브러리가 빈 값을 허용하지 않아 아무 글자나 넣은 것입니다. 내 PC의 Ollama는 이 값을 확인하지 않습니다.

이 방식의 쓸모는 바꿔 끼우기입니다. 온라인 모델로 만든 코드를 로컬로 옮기거나 그 반대로 할 때, 주소와 모델 이름 두 줄만 바꾸면 됩니다. 지원하는 기능의 범위는 Ollama 버전에 따라 다르므로 공식 문서에서 확인합니다.

## 코드는 AI에게 받고, 요청은 정확히 합니다

강의에서는 이런 코드를 직접 외워 쓰게 하지 않습니다. 온라인 AI에게 요청해 받습니다. 그때 다음을 빠짐없이 적으면 한 번에 돌아가는 코드가 나옵니다.

```text
내 PC에 Ollama가 설치되어 있습니다.
- 호출 주소: http://localhost:11434/api/chat
- 모델 이름: gemma4:e4b
- stream은 false로 합니다.
- 시스템 프롬프트: (역할과 규칙)
input.csv의 "내용" 열을 한 줄씩 보내 분류 결과를 "분류" 열에 넣고
output.csv로 저장하는 Python 코드를 작성해 주세요.
한 건이 실패해도 멈추지 않게 하고, 진행 상황을 출력해 주세요.
```

실제 자료는 붙여 넣지 않습니다. 열 이름과 형태만 알려 주면 됩니다.

## 흔한 실수

- **`stream` 누락**: JSON 해석 오류가 납니다.
- **모델 이름 불일치**: `ollama ls`에 나오는 이름과 글자 하나까지 같아야 합니다.
- **서버가 꺼져 있음**: 연결 거부 오류가 납니다. 브라우저에서 `http://localhost:11434`를 열어 확인합니다.
- **타임아웃이 짧음**: 첫 호출이 오래 걸려 실패합니다.
- **응답 자리 혼동**: `generate`는 `response`, `chat`은 `message.content`입니다.
- **코드 안의 주소가 외부 주소임**: AI가 만들어 준 코드에 온라인 서비스 주소가 들어 있지 않은지 확인합니다. 로컬에서만 돌릴 코드라면 주소는 `localhost`여야 합니다.

## 참고한 문서

- [Ollama 저장소](https://github.com/ollama/ollama)

## 다음에 읽을 글

- [HTML 파일 하나로 Ollama 챗봇 만들기](/learn/ollama-html-chatbot/)
- [엑셀에서 Ollama 부르기: VBA로 AI 함수 만들기](/learn/ollama-excel-vba/)
