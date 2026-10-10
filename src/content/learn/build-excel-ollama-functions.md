---
title: 엑셀에서 로컬 모델을 함수로 부르기
description: 엑셀 VBA로 Ollama를 호출하는 사용자 정의 함수를 만들어 셀에서 요약·분류·번역을 실행하는 방법입니다.
date: 2026-10-11
series: 만들어 보기
order: 30
tags: [Ollama, 엑셀, VBA]
---

## 무엇을 만드나

엑셀 셀에 `=AI_요약(C2)`처럼 쓰면 내 PC의 모델이 C2 셀의 글을 요약해 그 셀에 돌려주는 함수입니다. 요약, 분류, 감정 판단, 번역, 문체 교정을 함수로 만들어 두고, 수식을 아래로 끌어 여러 행에 적용합니다.

이럴 때 쓸모가 있습니다.

- 설문 주관식 답, 문의 내용, 회의 메모처럼 행마다 글이 들어 있는 표를 정리할 때
- 표 안의 내용을 외부 서비스에 올릴 수 없을 때
- 엑셀 밖의 다른 프로그램을 익히기 어려운 사람에게 도구를 줄 때

## 준비물

| 항목 | 내용 |
|---|---|
| Ollama | 실행 중, 모델 하나 이상 |
| 엑셀 | Windows용 데스크톱 엑셀. 매크로를 쓸 수 있어야 합니다 |
| 파일 형식 | 매크로 사용 통합 문서(`.xlsm`) 또는 추가 기능(`.xlam`) |

추가로 설치할 것은 없습니다. VBA가 Windows에 들어 있는 HTTP 기능으로 Ollama를 부릅니다.

## 구조

```
셀 수식 =AI_요약(C2)
   → VBA 함수가 프롬프트를 만듦
   → HTTP POST http://localhost:11434/api/generate (stream=false)
   → 응답 JSON에서 답만 꺼냄
   → 셀에 표시
```

| 부품 | 역할 |
|---|---|
| 호출 함수 | 프롬프트를 JSON으로 감싸 Ollama에 보내고 답을 꺼냅니다 |
| 셀 함수들 | 작업별 프롬프트를 만들어 호출 함수에 넘깁니다 |
| 모델 설정 | 어떤 모델을 쓸지 시트의 셀 하나 또는 설정 창에서 정합니다 |

## 에이전트에게 줄 요청

```text
엑셀 VBA 모듈(.bas)을 만들어 줘. 내 PC의 Ollama(http://localhost:11434)를 부른다.
- OllamaCall(prompt): /api/generate에 stream=false로 POST하고 response 값만 돌려준다.
  프롬프트의 따옴표, 역슬래시, 줄바꿈을 JSON 규칙에 맞게 바꾼다. 외부 JSON 라이브러리는 쓰지 않는다.
- 셀 함수: AI(질문), AI_요약(글), AI_분류(글), AI_감정(글), AI_번역(글, 언어)
- 분류와 감정은 정해진 후보 중 하나만 답하게 하고, 답에 후보가 들어 있는지 코드에서 확인한다.
- 모델 이름은 "사용법" 시트의 B3 셀에서 읽는다.
- FetchModels 매크로: /api/tags로 모델 목록을 받아 B3 셀의 드롭다운으로 만든다.
- 빈 셀이면 빈 값을, 실패하면 #ERR을 돌려준다.
```

## 핵심 코드

호출 함수입니다. 프롬프트 안의 특수 문자를 바꾼 뒤 JSON 문자열을 직접 조립해 보냅니다.

```vb
Private Function OllamaCall(prompt As String) As String
    On Error GoTo ErrHandler
    Dim model As String
    model = GetModel()

    Dim esc As String
    esc = Replace(prompt, "\", "\\")
    esc = Replace(esc, """", "\""")
    esc = Replace(esc, vbCr, "\n")
    esc = Replace(esc, vbLf, "\n")

    Dim http As Object
    Set http = CreateObject("MSXML2.XMLHTTP.6.0")
    http.Open "POST", "http://localhost:11434/api/generate", False
    http.setRequestHeader "Content-Type", "application/json"
    http.send "{""model"":""" & model & """,""prompt"":""" & esc & """,""stream"":false}"

    If http.Status <> 200 Then OllamaCall = "#ERR": Exit Function
    ' (응답 문자열에서 "response" 값만 잘라 내는 부분 생략)
```

분류 함수는 프롬프트에 후보와 짧은 예시를 넣습니다. 작은 모델은 설명을 덧붙여 답하는 일이 잦으므로, 답 안에서 후보 낱말을 찾아 그것만 돌려줍니다.

```vb
Public Function AI_감정(content As String) As String
    Application.Volatile False
    If Trim(content) = "" Then AI_감정 = "": Exit Function
    Dim p As String
    p = "감정 하나만 답하세요: 긍정,부정,중립" & vbLf & _
        "감사합니다->긍정" & vbLf & "불편합니다->부정" & vbLf & "알려주세요->중립" & vbLf & content & "->"
    AI_감정 = ExtractMatch(OllamaCall(p), Array("긍정", "부정", "중립"))
End Function

Private Function ExtractMatch(result As String, candidates As Variant) As String
    Dim c As Variant
    For Each c In candidates
        If InStr(result, CStr(c)) > 0 Then ExtractMatch = CStr(c): Exit Function
    Next c
    ExtractMatch = result
End Function
```

`Application.Volatile False`는 시트가 다시 계산될 때마다 함수가 다시 호출되는 것을 줄여 줍니다.

## 설치하고 확인하기

1. 새 통합 문서를 **Excel 매크로 사용 통합 문서(\*.xlsm)** 로 저장합니다.
2. `Alt + F11`로 VBA 편집기를 엽니다.
3. **삽입 > 모듈**을 누르고, 만든 `.bas` 파일의 내용을 전부 붙여 넣습니다.
4. **디버그 > VBA 프로젝트 컴파일**로 오류가 없는지 확인합니다.
5. 시트 이름을 "사용법"으로 바꾸고 B3 셀에 모델 이름을 적습니다. 또는 `Alt + F8`에서 `FetchModels`를 실행해 드롭다운으로 고릅니다.
6. 빈 셀에 `=AI("한 문장으로 인사해 줘")`를 넣어 답이 나오는지 봅니다.
7. 글이 들어 있는 열 옆에 `=AI_요약(C2)`를 넣고 몇 행만 끌어 내려 봅니다.

## 자주 생기는 문제

| 증상 | 원인과 해결 |
|---|---|
| 수식이 `#NAME?` | 모듈이 들어가지 않았거나 매크로가 차단되었습니다. 파일을 열 때 **콘텐츠 사용**을 누릅니다 |
| `#ERR` | Ollama가 꺼져 있거나 모델 이름이 틀렸습니다. `ollama ls`의 이름과 맞춥니다 |
| 엑셀이 멈춘 것처럼 보임 | 답을 받을 때까지 엑셀이 기다립니다. 수백 행에 한꺼번에 넣지 말고 수십 행씩 나눕니다 |
| 파일을 열 때마다 다시 계산됨 | 결과가 나온 뒤 복사해서 **값 붙여넣기**로 고정합니다 |
| 분류 결과에 설명이 섞임 | 후보 확인 함수(`ExtractMatch`)를 거치게 하고, 예시를 더 넣습니다 |
| 답에 `\n`이나 `\"`가 그대로 보임 | 응답에서 답을 잘라 낸 뒤 이스케이프 문자를 되돌리는 처리가 빠졌습니다 |

## 확장하기: 리본 메뉴가 있는 추가 기능

함수를 여러 문서에서 쓰려면 추가 기능(`.xlam`)으로 만듭니다. 같은 방식으로 만든 추가 기능은 다음을 갖추었습니다.

| 기능 | 내용 |
|---|---|
| 함수 묶음 | `g_text`, `g_edit`, `g_translate`, `g_summarize`, `g_classify`, `g_extract`, `g_tag`, `g_qa` 등 |
| 서버 점검 | 호출 전에 `/api/tags`를 2초 제한으로 불러 Ollama가 켜져 있는지 확인합니다 |
| 모델 선택 창 | 받아 둔 모델 목록을 보여 주고 기본 모델을 저장합니다 |
| 리본 탭 | "모델 선택", "요약", "번역" 같은 버튼을 엑셀 위쪽 메뉴에 올립니다 |
| 온도 인수 | `=g_text("...", 0.2)`처럼 함수마다 온도를 줄 수 있습니다 |

서버 점검 함수는 짧습니다.

```vb
Public Function OllamaServerUp() As Boolean
    On Error GoTo EH
    Dim http As Object: Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
    http.Open "GET", OLLAMA_BASE_URL & "/api/tags", False
    http.setTimeouts 2000, 2000, 2000, 2000
    http.Send
    OllamaServerUp = (http.Status >= 200 And http.Status < 300)
    Exit Function
EH:
    OllamaServerUp = False
End Function
```

리본 탭은 `customUI.xml` 파일로 정의합니다. `.xlam` 파일은 ZIP 형식이므로, 압축을 풀어 이 XML을 넣고 다시 묶는 Python 스크립트를 에이전트에게 함께 만들게 합니다. 그 뒤 VBA 모듈을 붙여 넣고 엑셀을 다시 켜면 탭이 나타납니다.

주의할 점이 하나 있습니다. 이 추가 기능에는 외부 AI 서비스로 전환하는 선택지도 들어 있었습니다. 그 경우 API 키가 PC 설정에 저장되고 셀 내용이 외부로 나갑니다. 내부 자료를 다루는 표라면 로컬 모델만 쓰도록 해당 부분을 빼 달라고 요청합니다.

표 파일을 통째로 넣어 한 줄씩 분류하는 방법은 [CSV를 한 줄씩 분류하는 도구 만들기](/learn/build-csv-classifier/)에서 다룹니다.
