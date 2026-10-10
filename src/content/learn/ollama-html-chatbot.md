---
title: HTML 파일 하나로 Ollama 챗봇 만들기
description: 설치 없이 브라우저로 여는 HTML 파일 하나에서 JavaScript로 Ollama를 불러 대화하는 화면을 만들고, 브라우저가 막을 때의 해결 방법을 정리합니다.
date: 2026-10-11
series: Ollama 실전
order: 40
tags: [Ollama, JavaScript, HTML]
---

## 왜 HTML 파일 하나인가

강의에서 가장 먼저 권하는 형태가 HTML 파일 하나입니다. 이유는 단순합니다.

- 브라우저만 있으면 열립니다. 따로 설치할 프로그램이 없습니다.
- 파일 하나라서 USB나 공유 폴더로 옮기기 쉽습니다.
- 메모장으로 열어 무엇을 하는 파일인지 읽어 볼 수 있습니다.

여기에 Ollama를 연결하면 내 PC 안에서만 도는 부서용 대화 화면이 됩니다. 화면은 브라우저가 그리고, 답은 `http://localhost:11434`의 Ollama가 만듭니다.

## 준비

1. Ollama가 떠 있는지 확인합니다. 브라우저에서 `http://localhost:11434`를 열어 `Ollama is running`이 보이면 됩니다.
2. 쓸 모델을 받아 둡니다. `ollama ls`에 나오는 이름을 적어 둡니다.
3. 작업 폴더를 하나 만듭니다.

## 전체 코드

아래 내용을 `chat.html`로 저장합니다. 저장할 때 인코딩은 UTF-8로 합니다.

```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>부서 챗봇</title>
<style>
  body { font-family: sans-serif; max-width: 720px; margin: 24px auto; }
  #log { border: 1px solid #ccc; padding: 12px; height: 420px; overflow-y: auto; }
  .user { color: #0b57d0; margin: 8px 0; }
  .bot { margin: 8px 0; white-space: pre-wrap; }
  .info { color: #777; font-size: 12px; }
  #q { width: 80%; padding: 8px; }
</style>
</head>
<body>
<h1>부서 챗봇</h1>
<div id="log"></div>
<p>
  <input id="q" placeholder="질문을 입력하고 Enter">
  <button id="send">보내기</button>
</p>

<script>
const API_URL = "http://localhost:11434/api/chat";
const MODEL = "gemma4:e4b";   // ollama ls 에 나오는 이름으로 바꿉니다
const SYSTEM = "너는 부서 업무를 돕는 담당자다. 한국어 존댓말로 5줄 이내로 답한다. 모르면 모른다고 답한다.";

const messages = [{ role: "system", content: SYSTEM }];
const log = document.getElementById("log");
const q = document.getElementById("q");

function add(cls, text) {
  const div = document.createElement("div");
  div.className = cls;
  div.textContent = text;   // innerHTML 대신 textContent 를 씁니다
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  return div;
}

async function send() {
  const text = q.value.trim();
  if (!text) return;
  q.value = "";
  add("user", "나: " + text);
  messages.push({ role: "user", content: text });

  const wait = add("info", "답변을 만드는 중입니다...");
  const start = Date.now();
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        options: { temperature: 0.3 },
        stream: false
      })
    });
    if (!res.ok) throw new Error("응답 코드 " + res.status);
    const data = await res.json();
    const answer = data.message.content;
    messages.push({ role: "assistant", content: answer });
    wait.remove();
    add("bot", "AI: " + answer);
    add("info", ((Date.now() - start) / 1000).toFixed(1) + "초 걸림");
  } catch (e) {
    wait.textContent = "Ollama에 연결하지 못했습니다. Ollama가 켜져 있는지, 모델 이름이 맞는지 확인하세요. (" + e.message + ")";
    messages.pop();
  }
}

document.getElementById("send").onclick = send;
q.addEventListener("keydown", e => { if (e.key === "Enter") send(); });
</script>
</body>
</html>
```

## 코드에서 볼 곳

- **`API_URL`**: 내 PC의 Ollama 주소입니다. 이 파일이 통신하는 곳은 여기 하나입니다.
- **`MODEL`**: 모델 이름을 맨 위에 따로 빼 두었습니다. 모델을 바꿀 때 이 줄만 고칩니다.
- **`messages`**: 지금까지의 대화를 담는 목록입니다. 보낼 때마다 전체를 다시 보내야 모델이 앞의 대화를 기억합니다. 모델이 대화를 저장해 두는 것이 아닙니다.
- **`stream: false`**: 답 전체를 한 번에 받습니다.
- **걸린 시간 표시**: 내 PC에서 답 하나에 몇 초가 걸리는지 바로 보입니다.
- **`catch` 부분**: Ollama가 꺼져 있을 때 원인을 알 수 있는 안내를 보여 줍니다.

## 여는 방법 두 가지

### 방법 1. 내 PC에 작은 웹 서버를 띄워 열기 (권장)

Python이 설치되어 있으면 `chat.html`이 있는 폴더에서 다음을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000/chat.html`을 엽니다. 이 창은 닫지 않고 둡니다. 내 PC의 `localhost` 주소에서 연 페이지는 Ollama가 기본으로 허용합니다.

### 방법 2. 파일을 더블클릭해 열기

파일을 직접 열면 주소창이 `file://`로 시작합니다. 이 경우 브라우저가 보안 규칙(CORS) 때문에 Ollama 호출을 막는 일이 있습니다. 화면에는 "연결하지 못했습니다"가 나오고, 브라우저의 개발자 도구(F12) 콘솔에는 CORS 오류가 찍힙니다.

이때는 Ollama에 "이 출처의 요청을 받아도 된다"고 알려 주어야 합니다. 환경 변수 `OLLAMA_ORIGINS`로 정합니다. Windows PowerShell 기준입니다.

```powershell
setx OLLAMA_ORIGINS "*"
```

설정한 뒤 Ollama를 완전히 종료했다가 다시 실행해야 반영됩니다.

`*`는 모든 출처를 허용한다는 뜻입니다. 편하지만, 브라우저로 여는 다른 웹 페이지도 내 PC의 Ollama를 부를 수 있게 됩니다. 업무용 PC에서는 방법 1을 쓰거나, 허용할 출처를 좁혀 적는 편이 안전합니다. 설정 방법은 Ollama 공식 문서의 FAQ를 확인하세요.

## 시험하는 순서

1. 짧은 질문 하나를 넣습니다. 첫 답은 모델을 메모리에 올리느라 오래 걸립니다.
2. 이어지는 질문을 넣어 앞의 대화를 기억하는지 봅니다. 예: "방금 답을 한 줄로 줄여 주세요."
3. Ollama를 종료한 상태에서 질문을 넣어 안내 문구가 제대로 나오는지 봅니다.
4. 인터넷을 끊고 다시 해 봅니다. 그대로 되면 외부 통신 없이 도는 것입니다.

## 부서에 맞게 바꾸기

**역할 바꾸기.** `SYSTEM`의 문장을 고칩니다. 규칙은 다섯 개 안쪽으로 짧게 씁니다.

**참고 자료를 같이 넣기.** 짧은 안내문이나 자주 묻는 질문 목록은 시스템 프롬프트 뒤에 붙여 넣을 수 있습니다.

```javascript
const GUIDE = `
[안내 자료]
- 회의실 예약은 사용 3일 전까지 신청한다.
- 장비 대여는 총무 담당에게 요청한다.
`;
const SYSTEM = "아래 안내 자료 안에서만 답한다. 자료에 없으면 '담당자에게 확인이 필요합니다'라고 답한다." + GUIDE;
```

자료가 길어지면 이 방식은 한계가 있습니다. 문서를 쪼개 검색해서 넣는 방식(RAG)은 이 사이트의 RAG와 임베딩 시리즈에서 다룹니다.

**설정을 Modelfile로 옮기기.** 역할과 설정값을 Modelfile에 넣어 모델로 등록해 두면, HTML에서는 `MODEL` 이름만 바꾸면 됩니다. 프롬프트를 고칠 때 HTML 파일을 다시 배포하지 않아도 됩니다. 방법은 [Modelfile과 파라미터로 업무용 모델 만들기](/learn/ollama-modelfile-parameters/)에 있습니다.

## 응용: 문서 자가 점검 화면

같은 구조로 대화가 아닌 한 번짜리 도구도 만들 수 있습니다. 강의의 실습 시나리오 가운데 하나가 작성한 보고서를 붙여 넣으면 지침에 맞는지 점검해 주는 화면입니다. 바꿀 것은 두 가지입니다.

- 입력 칸을 한 줄짜리 `input`에서 여러 줄 `textarea`로 바꿉니다.
- 시스템 프롬프트를 점검 기준으로 바꿉니다. 예: "아래 글에서 한 문장이 80자를 넘는 곳, 주어가 없는 문장, 날짜 표기가 통일되지 않은 곳을 번호를 붙여 지적하라."

## 코드를 AI에게 받아 고칠 때

이 화면을 더 꾸미거나 기능을 붙일 때는 온라인 AI나 코딩 도구에 요청합니다. 요청에 다음을 적습니다.

```text
HTML 파일 하나로 된 Ollama 챗봇을 고치려 합니다.
- 외부 라이브러리와 CDN을 쓰지 않습니다. 인터넷이 없는 PC에서 엽니다.
- 호출 주소는 http://localhost:11434/api/chat 하나뿐입니다.
- 모델 이름은 파일 맨 위의 상수로 둡니다.
추가할 기능: 대화 내용을 텍스트 파일로 저장하는 버튼
```

받은 코드는 실행하기 전에 확인합니다.

- `localhost`가 아닌 주소로 보내는 `fetch`가 없는가
- 외부에서 불러오는 `<script src="https://...">`가 없는가
- 답을 화면에 넣을 때 `innerHTML` 대신 `textContent`를 쓰는가

## 흔한 실수

- **모델 이름을 고치지 않음**: 예시 이름 그대로 두어 "모델을 찾을 수 없다"는 응답이 옵니다.
- **`file://`로 열고 CORS에 막힘**: 방법 1로 엽니다.
- **인코딩이 UTF-8이 아님**: 한글이 깨져 보입니다. 메모장의 "다른 이름으로 저장"에서 인코딩을 확인합니다.
- **대화가 길어져 느려짐**: 대화 전체를 매번 보내기 때문입니다. 페이지를 새로 고쳐 대화를 비웁니다.
- **다른 PC에서 열었더니 안 됨**: `localhost`는 그 PC 자신입니다. 그 PC에도 Ollama와 모델이 있어야 합니다. 한 대의 모델을 여럿이 쓰려면 [사무실 네트워크에서 한 대의 모델 같이 쓰기](/learn/ollama-share-on-network/)를 봅니다.

## 다음에 읽을 글

- [엑셀에서 Ollama 부르기: VBA로 AI 함수 만들기](/learn/ollama-excel-vba/)
- [Ollama가 느리거나 안 될 때 점검 순서](/learn/ollama-troubleshooting/)
- [실습](/lab/)
