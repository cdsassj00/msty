---
title: "엑셀에서 Ollama 부르기: VBA로 AI 함수 만들기"
description: 엑셀 셀에서 =AI_SUMMARIZE(A2)처럼 로컬 모델을 부르는 사용자 정의 함수를 VBA로 만들고, 추가 기능 파일로 부서에 나누는 방법입니다.
date: 2026-10-11
series: Ollama 실전
order: 50
tags: [Ollama, 엑셀, VBA]
---

## 만들 것

엑셀 셀에 다음처럼 적으면 내 PC의 로컬 모델이 답을 채워 주는 함수를 만듭니다.

```text
=AI_SUMMARIZE(A2, 30)
=AI_CLASSIFY(A2, "환경,교통,복지,세무,기타")
```

수식을 아래로 끌면 수백 행이 차례로 처리됩니다. 자료는 엑셀과 내 PC의 Ollama 사이에서만 오갑니다. 외부 서비스의 요금도 들지 않습니다.

강의에서는 이 구조를 이렇게 설명합니다. VBA가 어려운 것이 아니라, 하는 일은 "내 PC의 주소에 JSON을 보내고 받기" 하나입니다. 다섯 가지 함수가 모두 같은 호출 하나를 감싼 것입니다.

| 함수 | 하는 일 |
|---|---|
| `AI_SUMMARIZE(글, 최대 글자 수)` | 긴 글을 짧게 요약 |
| `AI_CLASSIFY(글, 범주 목록)` | 범주 중 하나를 고름 |
| `AI_EXTRACT(글, 항목)` | 글에서 특정 항목만 뽑음 |
| `AI_TRANSLATE(글, 언어)` | 번역 |
| `AI_ASK(질문, 참고 글)` | 자유 질문 |

## 준비

1. Ollama가 떠 있고 모델을 받아 두었는지 확인합니다. 터미널에서 `ollama ls`를 실행해 모델 이름을 적어 둡니다.
2. 엑셀에서 새 통합 문서를 엽니다.
3. `Alt + F11`로 VBA 편집기를 엽니다.
4. 메뉴에서 **삽입 > 모듈**을 고릅니다.

## 코드

빈 모듈에 아래 전체를 붙여 넣습니다. `MODEL_NAME`은 내 PC에 있는 모델 이름으로 고칩니다.

```vb
Option Explicit

Private Const OLLAMA_URL As String = "http://localhost:11434/api/generate"
Private Const MODEL_NAME As String = "gemma4:e4b"

' 글 안의 따옴표와 줄바꿈을 JSON에 넣을 수 있게 바꾼다
Private Function EscapeJSON(ByVal s As String) As String
    s = Replace(s, "\", "\\")
    s = Replace(s, """", "\""")
    s = Replace(s, vbCrLf, "\n")
    s = Replace(s, vbCr, "\n")
    s = Replace(s, vbLf, "\n")
    s = Replace(s, vbTab, "\t")
    EscapeJSON = s
End Function

' 응답 JSON에서 "response" 값만 꺼낸다
Private Function ParseResponse(ByVal json As String) As String
    Dim p As Long, i As Long, ch As String, out As String
    p = InStr(json, """response"":""")
    If p = 0 Then
        ParseResponse = "#응답 없음"
        Exit Function
    End If
    i = p + Len("""response"":""")
    Do While i <= Len(json)
        ch = Mid$(json, i, 1)
        If ch = "\" Then
            i = i + 1
            Select Case Mid$(json, i, 1)
                Case "n": out = out & vbLf
                Case "t": out = out & vbTab
                Case "r"
                Case "u"
                    out = out & ChrW$(CLng("&H" & Mid$(json, i + 1, 4)))
                    i = i + 4
                Case Else: out = out & Mid$(json, i, 1)
            End Select
        ElseIf ch = """" Then
            Exit Do
        Else
            out = out & ch
        End If
        i = i + 1
    Loop
    ParseResponse = Trim$(out)
End Function

' 모든 AI 함수가 같이 쓰는 호출
Private Function OllamaCall(ByVal prompt As String) As String
    Dim http As Object, body As String
    On Error GoTo Fail
    Set http = CreateObject("MSXML2.XMLHTTP.6.0")
    http.Open "POST", OLLAMA_URL, False
    http.setRequestHeader "Content-Type", "application/json; charset=utf-8"
    body = "{""model"":""" & MODEL_NAME & """,""prompt"":""" & EscapeJSON(prompt) & _
           """,""stream"":false,""options"":{""temperature"":0.2}}"
    http.send body
    If http.Status = 200 Then
        OllamaCall = ParseResponse(http.responseText)
    Else
        OllamaCall = "#오류 " & http.Status
    End If
    Exit Function
Fail:
    OllamaCall = "#Ollama 연결 실패"
End Function

Public Function AI_SUMMARIZE(ByVal txt As String, Optional ByVal maxLen As Long = 100) As String
    AI_SUMMARIZE = OllamaCall("다음 글을 " & maxLen & "자 이내의 한국어로 요약하라. 요약만 출력한다." & _
                              vbLf & "글: " & txt)
End Function

Public Function AI_CLASSIFY(ByVal txt As String, ByVal labels As String) As String
    AI_CLASSIFY = OllamaCall("다음 글을 [" & labels & "] 중 하나로 분류하라. 범주 이름만 출력한다." & _
                             vbLf & "글: " & txt)
End Function

Public Function AI_EXTRACT(ByVal txt As String, ByVal field As String) As String
    AI_EXTRACT = OllamaCall("다음 글에서 '" & field & "'에 해당하는 값만 출력하라. 없으면 '없음'이라고 출력한다." & _
                            vbLf & "글: " & txt)
End Function

Public Function AI_TRANSLATE(ByVal txt As String, Optional ByVal lang As String = "한국어") As String
    AI_TRANSLATE = OllamaCall("다음 글을 " & lang & "로 번역하라. 번역문만 출력한다." & vbLf & "글: " & txt)
End Function

Public Function AI_ASK(ByVal prompt As String, Optional ByVal ctx As String = "") As String
    If ctx = "" Then
        AI_ASK = OllamaCall(prompt)
    Else
        AI_ASK = OllamaCall(prompt & vbLf & "참고 글: " & ctx)
    End If
End Function
```

## 저장하고 써 보기

1. `Alt + Q`로 엑셀로 돌아갑니다.
2. **다른 이름으로 저장**에서 파일 형식을 **Excel 매크로 사용 통합 문서(.xlsm)** 로 고릅니다. 일반 형식(.xlsx)으로 저장하면 코드가 사라집니다.
3. A2 셀에 시험할 글을 넣습니다.
4. B2 셀에 `=AI_`까지 입력해 함수 목록에 방금 만든 함수가 나오는지 봅니다. 나오면 등록된 것입니다.
5. `=AI_SUMMARIZE(A2, 30)`을 넣고 Enter를 누릅니다.

첫 호출은 모델을 메모리에 올리느라 몇 초에서 그 이상 걸립니다. 그동안 엑셀이 멈춘 것처럼 보이는 것은 정상입니다.

## 사용 예

| 상황 | 수식 |
|---|---|
| 민원 원문을 부서 범주로 나누기 | `=AI_CLASSIFY(A2, "환경,교통,복지,세무,안전,기타")` |
| 긴 민원에 짧은 제목 붙이기 | `=AI_SUMMARIZE(A2, 15)` |
| 계약 문장에서 금액 뽑기 | `=AI_EXTRACT(A2, "계약금액")` |
| 영문 메일을 한글로 | `=AI_TRANSLATE(B2, "한국어")` |
| 1차 응대 초안 | `=AI_ASK("다음 민원의 1차 응대안을 3줄로 작성하라", A2)` |

강의의 실습 시나리오는 이 함수들을 열마다 이어 붙입니다. A열 원문, B열 자동 분류, C열 짧은 제목, D열 응대 초안 순서로 두고, 담당자는 D열만 읽고 고칩니다.

범주가 3~5개면 3B급 모델로도 분류가 됩니다. 범주가 10개를 넘으면 흔들리므로 더 큰 모델로 바꿉니다.

## 여러 행을 돌릴 때

- **적은 행으로 먼저 시험합니다.** 다섯 행에서 결과가 맞는지 본 뒤 전체로 넓힙니다.
- **한 번에 다 끌지 않습니다.** 건당 몇 초씩 걸리므로 수백 행을 한꺼번에 끌면 엑셀이 그동안 응답하지 않습니다. 50행씩 나누어 끕니다.
- **결과를 값으로 바꿉니다.** 수식인 채로 두면 파일을 열거나 다시 계산할 때마다 모델을 다시 부릅니다. 결과가 나오면 그 범위를 복사한 뒤 **선택하여 붙여넣기 > 값**으로 덮어씁니다.
- **자동 계산을 잠시 끕니다.** **수식 > 계산 옵션 > 수동**으로 두면 원치 않는 재계산을 막을 수 있습니다.

## 자주 나는 오류

강의에서 꼽는 빈출 오류와 대응입니다.

| 증상 | 원인 | 대응 |
|---|---|---|
| 답이 첫 한두 글자만 나옴 | `stream`이 빠져 응답이 여러 조각으로 옴 | 요청 본문에 `"stream":false`가 있는지 확인 |
| `#응답 없음` 또는 빈 칸 | 응답의 모양이 예상과 다름 | 터미널에서 같은 요청을 보내 응답 원문을 확인 |
| 따옴표가 든 글에서만 실패 | 따옴표가 JSON을 깨뜨림 | `EscapeJSON`을 거쳤는지 확인 |
| `#Ollama 연결 실패` | Ollama가 꺼져 있음 | 브라우저에서 `http://localhost:11434` 열어 보기 |
| `#오류 404` | 모델 이름이 다름 | `ollama ls`의 이름과 `MODEL_NAME` 대조 |
| 답이 영어로 나옴 | 지시에 언어가 없음 | 프롬프트에 "한국어로"를 넣음 |
| 한글이 깨짐 | 인코딩 지정 누락 | 요청 헤더에 `charset=utf-8` 유지 |
| 첫 호출만 유독 느림 | 모델을 메모리에 올리는 시간 | 파일을 열 때 짧은 호출을 한 번 보내 미리 올림 |
| `#NAME?` | 매크로가 꺼져 있음 | 파일을 열 때 매크로 사용을 허용 |

## 부서에 나누기: 추가 기능(.xlam)

.xlsm 파일은 그 파일 안에서만 함수가 됩니다. 추가 기능으로 만들면 어떤 엑셀 파일에서든 함수를 쓸 수 있습니다.

1. **다른 이름으로 저장**에서 파일 형식을 **Excel 추가 기능(.xlam)** 으로 고릅니다.
2. 만들어진 .xlam 파일을 부서 공용 폴더에 둡니다. 파일 이름에 버전을 적습니다.
3. 받는 사람은 엑셀에서 **파일 > 옵션 > 추가 기능**으로 가서 아래쪽의 **Excel 추가 기능 > 이동**을 누르고, **찾아보기**로 그 파일을 고른 뒤 체크합니다.
4. 받는 사람의 PC에도 Ollama와 같은 이름의 모델이 있어야 합니다.

운영을 위해 두 가지를 더 넣어 두면 좋습니다.

- **Ollama 실행 확인**: 추가 기능이 열릴 때 `http://localhost:11434`에 요청을 보내 보고, 답이 없으면 "Ollama를 먼저 실행하세요"라고 안내합니다.
- **모델 이름과 프롬프트를 시트에서 읽기**: 설정용 시트를 하나 두고 거기서 모델 이름과 프롬프트 문장을 읽게 하면, 코드를 고치지 않고도 바꿀 수 있습니다.

조직의 보안 정책이 매크로가 든 파일을 막는 경우가 있습니다. 나누기 전에 전산 담당 부서와 신뢰할 수 있는 위치 지정이나 서명 절차를 먼저 의논합니다.

## 코드를 고치고 싶을 때

VBA는 엑셀 안에서만 도는 언어라서, 강의에서는 코딩 도구보다 대화형 AI와 주고받으며 고치는 방식을 권합니다. 요청할 때 다음을 적습니다.

```text
엑셀 VBA 사용자 정의 함수를 고치려 합니다.
- Ollama 주소: http://localhost:11434/api/generate, stream은 false
- 지금 코드는 아래와 같습니다. (코드 붙여넣기)
바꾸고 싶은 것: 모델 이름을 "_CONFIG" 시트의 B1 셀에서 읽도록
```

시트의 실제 자료는 붙여 넣지 않습니다.

## 같은 구조로 다른 모델 부르기

이 함수들은 주소와 요청 형식만 바꾸면 다른 모델도 부를 수 있습니다. 조직 안에 따로 운영하는 모델 서버가 있으면 그 주소로 바꿉니다. 온라인 모델로 바꾸는 것도 가능하지만, 그 순간 셀의 내용이 외부로 전송된다는 점을 확인하고 정해야 합니다.

## 다음에 읽을 글

- [Ollama가 느리거나 안 될 때 점검 순서](/learn/ollama-troubleshooting/)
- [사무실 네트워크에서 한 대의 모델 같이 쓰기](/learn/ollama-share-on-network/)
