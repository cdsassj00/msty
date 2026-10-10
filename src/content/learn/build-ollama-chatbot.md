---
title: 로컬 채팅 웹앱 만들기
description: FastAPI와 WebSocket으로 Ollama의 답을 글자 단위로 받아 보여 주는 채팅 웹 페이지를 만듭니다.
date: 2026-10-11
series: 만들어 보기
order: 10
tags: [Ollama, FastAPI, 챗봇]
---

## 무엇을 만드나

브라우저에서 여는 채팅 화면입니다. 질문을 보내면 내 PC의 Ollama가 답하고, 답이 만들어지는 대로 글자가 화면에 이어서 나타납니다. 화면 위쪽에서 받아 둔 모델을 골라 쓸 수 있습니다.

이럴 때 쓸모가 있습니다.

- 명령줄 대신 화면에서 로컬 모델과 대화하고 싶을 때
- 다른 로컬 도구를 만들기 전에 기본 뼈대를 익히고 싶을 때
- 내 용도에 맞게 화면과 프롬프트를 고친 전용 채팅 화면이 필요할 때

## 준비물

| 항목 | 내용 |
|---|---|
| Ollama | 실행 중이어야 하고, 모델이 하나 이상 있어야 합니다 |
| Python | 3.8 이상 |
| 패키지 | `fastapi`, `uvicorn`, `websockets`, `httpx` |

## 구조

파일은 두 개입니다.

| 파일 | 역할 |
|---|---|
| `app.py` | 화면 파일을 보내 주고, 모델 목록을 알려 주고, 채팅을 중계합니다 |
| `static/index.html` | 채팅 화면. 입력창, 모델 선택 상자, 연결 상태 표시 |

```
브라우저 ──(WebSocket /ws)── app.py ──(HTTP 스트리밍)── Ollama /api/generate
브라우저 ──(GET /api/models)── app.py ──(GET /api/tags)── Ollama
```

브라우저와 백엔드 사이는 WebSocket으로 묶습니다. 한 번 연결해 두면 백엔드가 받은 글자 조각을 바로바로 밀어 줄 수 있습니다.

## 에이전트에게 줄 요청

```text
내 PC의 Ollama(http://localhost:11434)와 대화하는 채팅 웹앱을 만들어 줘.
- 백엔드: FastAPI. 파일은 app.py 하나.
- GET /api/models: Ollama의 /api/tags 결과를 그대로 돌려준다.
- WebSocket /ws: {"message", "model"}을 받아 Ollama /api/generate를
  stream=true로 호출하고, 조각마다 {"type":"assistant_chunk"}로 보낸다.
  끝나면 {"type":"assistant_done"}, 실패하면 {"type":"error"}를 보낸다.
- 화면: static/index.html 한 파일. 외부 CDN을 쓰지 않는다.
  모델 선택 상자, 연결 상태 표시, 답변 대기 표시, 엔터로 전송.
- 연결이 끊기면 3초 뒤 다시 연결한다.
- 실행: python app.py, 주소는 http://localhost:8000
```

## 핵심 코드

백엔드의 중심은 Ollama의 답을 한 줄씩 읽어 그대로 넘기는 부분입니다. Ollama는 스트리밍일 때 JSON을 한 줄에 하나씩 보내고, 마지막 줄에 `done: true`를 넣습니다.

```python
async with httpx.AsyncClient(timeout=120.0) as client:
    async with client.stream(
        "POST", f"{OLLAMA_URL}/api/generate",
        json={"model": model, "prompt": user_message, "stream": True},
    ) as response:
        full_response = ""
        async for line in response.aiter_lines():
            if line:
                chunk = json.loads(line)
                if "response" in chunk:
                    text = chunk["response"]
                    full_response += text
                    await manager.send_personal_message(
                        json.dumps({"type": "assistant_chunk", "content": text}),
                        websocket,
                    )
                if chunk.get("done", False):
                    break
```

화면 쪽은 받은 메시지의 `type`에 따라 처리합니다. 첫 조각이 오면 말풍선을 새로 만들고, 그 뒤 조각은 같은 말풍선에 이어 붙입니다.

```javascript
} else if (data.type === 'assistant_chunk') {
    if (!currentAssistantMessage) {
        hideTypingIndicator();
        currentAssistantMessage = addMessage('', 'assistant');
    }
    currentAssistantMessage.textContent += data.content;
    scrollToBottom();
} else if (data.type === 'assistant_done') {
    currentAssistantMessage = null;
}
```

답을 `innerHTML`이 아니라 `textContent`로 넣는 점을 확인합니다. 모델이 만든 글이 화면에서 HTML로 실행되지 않습니다.

모델 선택 상자는 화면이 열릴 때 `/api/models`를 불러 채웁니다.

```javascript
const response = await fetch('/api/models');
const data = await response.json();
data.models.forEach(model => {
    const option = document.createElement('option');
    option.value = model.name;
    option.textContent = model.name;
    modelSelector.appendChild(option);
});
```

## 실행하고 확인하기

1. 패키지를 설치합니다.

```bash
pip install fastapi uvicorn websockets httpx
```

2. 모델을 받아 둡니다. 이름은 예시입니다.

```bash
ollama pull gemma3:4b
```

3. 서버를 켭니다.

```bash
python app.py
```

4. 브라우저에서 `http://localhost:8000`을 엽니다.

확인할 것은 네 가지입니다.

- 연결 상태가 "연결됨"으로 바뀌는가
- 모델 선택 상자에 `ollama ls`와 같은 이름이 나오는가
- 답이 한꺼번에가 아니라 조금씩 나타나는가
- Ollama를 끄고 질문하면 오류 말풍선이 나오는가

## 자주 생기는 문제

| 증상 | 원인과 해결 |
|---|---|
| 모델 목록이 비어 있음 | Ollama가 꺼져 있거나 받은 모델이 없습니다. `ollama ls`로 확인합니다 |
| "연결 끊김"이 반복됨 | 8000번 포트를 다른 프로그램이 쓰고 있거나 서버가 죽었습니다. 터미널의 오류를 봅니다 |
| 첫 답이 한참 뒤에 나옴 | 모델을 메모리에 올리는 시간입니다. 두 번째 질문부터 빨라집니다 |
| 긴 답이 중간에 끊김 | 호출 제한 시간이 120초입니다. 더 작은 모델을 쓰거나 시간을 늘립니다 |
| 앞에서 한 말을 기억하지 못함 | 아래 설명을 봅니다 |

이 구현은 질문 한 개만 `/api/generate`로 보냅니다. 앞선 대화를 함께 보내지 않으므로 질문마다 새 대화가 됩니다.

서버 주소도 확인합니다. 원래 코드는 `uvicorn.run(app, host="0.0.0.0", port=8000)`으로 되어 있어 같은 네트워크의 다른 PC에서도 접속됩니다. 혼자 쓴다면 `127.0.0.1`로 바꿉니다.

## 확장하기

- **대화 기억**: 대화 목록을 배열로 쌓아 `/api/chat`에 `messages`로 보냅니다. 대화가 길어지면 오래된 것부터 덜어 냅니다.
- **역할 지정**: 시스템 프롬프트 입력란을 두어 "보고서 문체로 답하세요" 같은 지시를 고정합니다.
- **대화 저장**: 끝난 대화를 텍스트 파일로 내려받는 버튼을 붙입니다.
- **마크다운 표시**: 답이 끝난 뒤(`assistant_done`) 한 번만 마크다운으로 바꿔 보여 줍니다. 이때는 HTML을 걸러 내는 처리가 필요합니다.

같은 일을 창 프로그램으로 만드는 방법은 [요약 창 프로그램 만들기](/learn/build-tkinter-summarizer/)에서 다룹니다.
