---
title: 자연어로 DB를 조회하는 도구 만들기
description: 질문을 입력하면 로컬 모델이 SQL을 쓰고 SQLite에서 실행해 표로 보여 주는 도구를, 검증과 재시도 단계까지 포함해 만듭니다.
date: 2026-10-11
series: 만들어 보기
order: 60
tags: [Ollama, SQL, SQLite]
---

## 무엇을 만드나

"부서별 접수 건수 알려 줘"라고 입력하면 다음 세 단계가 화면에 차례로 나타나는 도구입니다.

1. DB의 테이블 구조를 읽어 옵니다.
2. 로컬 모델이 그 구조를 보고 SQL을 씁니다.
3. SQL을 실행해 결과를 표로 보여 줍니다.

모델이 만든 SQL이 화면에 그대로 보이므로 결과를 어떤 조건으로 뽑았는지 확인할 수 있습니다.

이럴 때 쓸모가 있습니다.

- SQL을 모르는 사람이 업무 DB의 건수와 합계를 직접 뽑아 보고 싶을 때
- 자료가 외부로 나가면 안 되는 DB일 때
- SQL을 배우는 사람이 질문과 SQL을 나란히 보고 싶을 때

## 준비물

| 항목 | 내용 |
|---|---|
| Ollama | 실행 중, 모델 하나 이상 |
| Python | 추가 패키지 없음. `http.server`, `sqlite3`, `urllib`는 기본 내장입니다 |
| DB | SQLite 파일 하나. 처음에는 지어낸 자료로 만든 시험용 DB를 씁니다 |

## 구조

이번에는 백엔드가 일을 많이 합니다. 화면은 백엔드만 부릅니다.

```
화면(index.html)
  → POST /mcp/schema        : 테이블 구조 받기
  → POST /api/generate-sql  : 질문 → SQL
        server.py가 Ollama(11434)를 호출
  → POST /api/execute-sql   : SQL 실행 → 표
```

| 파일 | 역할 |
|---|---|
| `server.py` | 구조 조회, 모델 호출, SQL 검증·재시도, 실행 |
| `index.html` | 질문 입력, 세 단계 진행 표시, 결과 표 |
| `setup_db.py` | 시험용 DB를 만드는 스크립트 |

테이블 구조를 알려 주는 함수는 MCP 도구를 흉내 낸 형태로 만들었습니다. 실제 MCP 서버는 아니고, "목록 보기, 테이블 설명, 전체 구조"를 따로 떼어 둔 함수입니다.

## 에이전트에게 줄 요청

```text
자연어 질문을 SQL로 바꿔 SQLite에서 실행하는 도구를 만들어 줘.
- server.py 하나, Python 표준 라이브러리만 사용. index.html을 함께 띄운다. 포트 8082, 주소 127.0.0.1.
- 테이블 구조는 sqlite_master의 CREATE TABLE 문을 그대로 읽어 프롬프트에 넣는다.
- Ollama(http://localhost:11434/api/generate, stream=false)에 구조 + 예시 질문/SQL + 질문을 보낸다.
- 받은 답에서 SELECT 문만 뽑는다(코드 블록, 설명 문장 제거).
- 실행해 보고 오류가 나면 오류 문구를 붙여 한 번 더 물어본다.
  그래도 실패하면 미리 써 둔 SQL 템플릿 중 질문의 낱말과 가장 잘 맞는 것을 쓴다.
- SELECT로 시작하지 않는 SQL은 실행하지 않는다.
- 화면에는 구조 조회 → SQL 생성 → 실행 세 단계를 진행 상태와 함께 보여 주고,
  어느 방식(모델 / 재시도 / 템플릿)으로 만든 SQL인지 표시한다.
- setup_db.py: 시험용 DB를 만든다. 컬럼 이름은 영어로 한다.
```

## 핵심 코드

프롬프트에는 테이블 구조와 예시를 넣고, 마지막 줄을 `SQL:`로 끝냅니다.

```python
prompt = f"""Write a SQLite SELECT query. Output ONLY raw SQL. No explanation. No markdown.
IMPORTANT: Use ONLY English column names from the schema below. Never invent Korean column names.

{schema}
Examples:
Q: complaints count by department
SQL: SELECT d.dept_name, COUNT(*) AS cnt FROM complaint c JOIN department d ON c.dept_code=d.dept_code GROUP BY d.dept_name ORDER BY cnt DESC

Q: {question}
SQL:"""
```

컬럼 이름을 영어로 둔 데에는 이유가 있습니다. 시험용 DB를 만드는 스크립트의 주석에 따르면, 컬럼 이름이 영어일 때 아주 작은 모델도 SQL을 쓸 수 있었습니다. 프롬프트에도 한국어 컬럼 이름을 지어내지 말라는 지시를 넣었습니다.

모델의 답에는 설명이나 코드 블록 표시가 섞여 나옵니다. SQL만 골라내는 함수를 둡니다.

````python
def extract_sql(raw):
    sql = raw.strip()
    if "```" in sql:
        for part in sql.split("```"):
            cl = part.strip()
            if cl.lower().startswith("sql"): cl = cl[3:].strip()
            if cl.upper().startswith("SELECT"):
                sql = cl; break
    # (주석 줄을 지우는 부분 생략)
    idx = sql.upper().find("SELECT")
    if idx > 0: sql = sql[idx:]
    return sql.rstrip(";").strip() + ";"
````

이 도구에서 가장 중요한 부분은 실행 검증입니다. 만든 SQL을 먼저 돌려 보고, 오류가 나면 오류 문구를 모델에게 돌려줍니다.

```python
conn = sqlite3.connect(DB_PATH)
try:
    conn.execute(sql)
    conn.close()
    return sql, info
except Exception as e:
    conn.close()
    info["first_error"] = str(e)

retry_prompt = f"""The SQL had an error. Fix it. Output ONLY raw SQL. Use ONLY English column names from schema.

{schema}
Question: {question}
Wrong SQL: {sql}
Error: {info['first_error']}

Corrected SQL:"""
```

두 번 다 실패하면 미리 써 둔 템플릿에서 고릅니다. 질문에 들어 있는 낱말 수로 가장 가까운 것을 찾습니다.

```python
def find_fallback(question):
    q = question.lower()
    best, best_score = None, 0
    for t in FALLBACK_TEMPLATES:
        score = sum(1 for kw in t["keywords"] if kw in q)
        if score > best_score:
            best = t; best_score = score
    return best
```

실행 단계에서는 조회문만 받습니다.

```python
if not sql.strip().upper().startswith("SELECT"):
    self._json({"success": False, "error": "SELECT 문만 실행 가능합니다."})
    return
```

## 실행하고 확인하기

1. `python setup_db.py`로 시험용 DB를 만듭니다.
2. `python server.py`를 실행합니다. 브라우저가 열립니다.
3. 화면에 테이블 목록과 행 수가 보이는지 확인합니다.
4. 쉬운 질문부터 합니다. "전체 건수", "유형별 건수".
5. 두 테이블을 묶어야 하는 질문을 합니다. "부서별 평균 처리 일수".
6. 화면에 표시된 SQL을 읽고, 조건이 질문과 맞는지 확인합니다.
7. 결과 숫자 하나를 골라 직접 쓴 SQL이나 엑셀 집계와 맞춰 봅니다.

화면에 "템플릿"으로 표시된 답은 모델이 쓴 SQL이 아닙니다. 질문과 다른 내용을 보여 줄 수 있으므로 SQL을 읽고 판단합니다.

## 자주 생기는 문제

| 증상 | 원인과 해결 |
|---|---|
| 없는 컬럼을 씀 | 구조가 프롬프트에 제대로 들어갔는지 확인하고, 예시에 그 테이블을 쓰는 질문을 넣습니다 |
| 결과가 0행 | 값 표기가 다릅니다. 예: 상태 값이 "완료"인데 "처리완료"로 조회. 테이블마다 실제 값 몇 행을 프롬프트에 넣습니다 |
| 날짜 질문이 틀림 | "이번 달"을 모델이 알 수 없습니다. 오늘 날짜를 프롬프트에 넣습니다 |
| 답이 항상 템플릿 | 모델이 SQL을 쓰지 못하는 것입니다. 더 큰 모델로 바꿔 봅니다 |
| SQL은 맞는데 숫자가 이상함 | 조인 때문에 행이 겹쳐 세어졌습니다. SQL을 읽고 확인합니다 |

## 확장하기

- **읽기 전용으로 열기**: `SELECT`로 시작하는지만 보는 검사는 단순합니다. DB를 읽기 전용 방식으로 열면 어떤 SQL이 와도 자료가 바뀌지 않습니다. 실제 업무 DB에 붙이기 전에 넣습니다.
- **결과 행 수 제한**: `LIMIT`이 없는 SQL에는 상한을 붙여 화면이 멈추지 않게 합니다.
- **한국어 설명**: 실행한 SQL을 모델에게 다시 보내 "무엇을 어떤 조건으로 뽑았는지" 한 문장으로 풀어 쓰게 합니다.
- **자주 쓰는 질문 저장**: 맞다고 확인한 질문과 SQL 쌍을 예시 목록에 더합니다. 쓸수록 정확해집니다.
- **CSV로 내려받기**: 결과 표를 CSV로 저장하는 버튼을 붙입니다.
