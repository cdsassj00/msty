---
title: .mstyignore 파일로 Compose 대상 걸러 내기
description: 폴더를 Knowledge Stack에 넣을 때 특정 파일과 하위 폴더를 건너뛰게 하는 .mstyignore 파일의 작성법과 예시입니다.
date: 2026-10-11
section: Knowledge Stacks
order: 60
verified: 2026-10-11
tags: [Msty, Knowledge Stacks, mstyignore]
---

## .mstyignore가 하는 일

Knowledge Stack에 폴더를 통째로 넣으면 그 안의 파일이 모두 Compose 대상이 됩니다. 그런데 업무 폴더에는 로그 파일, 임시 파일, 오래된 초안처럼 답변 근거로 쓰면 안 되는 파일이 섞여 있기 마련입니다.

`.mstyignore`는 Msty에게 "Compose할 때 이 파일과 폴더는 건너뛰라"고 알려 주는 파일입니다. 불필요한 파일을 빼 두면 스택이 가벼워지고, 오래된 초안이 검색에 걸려 잘못된 답이 나오는 일도 줄어듭니다.

## 문법

`.mstyignore`는 `.gitignore`와 같은 문법을 씁니다. Git을 써 본 사람이라면 그대로 쓰면 되고, 처음이라도 아래 여섯 가지 규칙만 알면 충분합니다.

## 만드는 순서

1. Knowledge Stack에 넣을 폴더의 **최상위 위치**에 `.mstyignore`라는 이름의 새 파일을 만듭니다.
2. 텍스트 편집기로 엽니다.
3. 건너뛸 파일과 폴더의 패턴을 한 줄에 하나씩 적습니다.
4. 저장합니다.

파일 이름은 점(.)으로 시작하고 확장자가 없습니다. Windows 메모장으로 저장하면 `.mstyignore.txt`가 되기 쉬우므로, 저장한 뒤 이름을 확인합니다.

## 패턴 규칙

| 하려는 일 | 패턴 예시 |
|---|---|
| 특정 파일 하나 건너뛰기 | `example.txt` |
| 특정 확장자의 파일 모두 건너뛰기 | `*.log` |
| 특정 폴더 안의 파일 모두 건너뛰기 | `folder_name/` |
| 특정 폴더와 그 안의 모든 내용 건너뛰기 | `folder_name/**` |
| 어느 위치에 있든 패턴에 맞는 파일·폴더 건너뛰기 | `**/temp_*` |
| 건너뛰기에서 예외로 두기(다시 포함) | `!important.txt` |

`*`는 "아무 글자나"를 뜻하고, `**`는 "어느 깊이의 폴더든"을 뜻합니다. 줄 맨 앞의 `!`는 앞에서 건너뛰기로 한 것 중 일부를 다시 포함시킵니다.

## 예시 파일

공식 문서가 제시하는 예시입니다. `#`으로 시작하는 줄은 설명용 주석이며 동작에 영향을 주지 않습니다.

```
# Ignore all .log files
*.log

# Ignore the entire 'temp' folder
temp/

# Ignore all .tmp files in any directory
**/*.tmp

# Ignore all files in the 'drafts' folder
drafts/

# But don't ignore important drafts
!drafts/important_draft.md

# Ignore all files starting with 'temp_'
temp_*

# Ignore all files ending with '_old'
*_old
```

한 줄씩 풀면 다음과 같습니다.

| 줄 | 뜻 |
|---|---|
| `*.log` | 확장자가 .log인 파일을 모두 건너뜁니다 |
| `temp/` | temp 폴더 전체를 건너뜁니다 |
| `**/*.tmp` | 어느 폴더에 있든 .tmp 파일을 건너뜁니다 |
| `drafts/` | drafts 폴더의 파일을 모두 건너뜁니다 |
| `!drafts/important_draft.md` | 단, drafts 폴더의 important_draft.md는 포함합니다 |
| `temp_*` | 이름이 temp_로 시작하는 파일을 건너뜁니다 |
| `*_old` | 이름이 _old로 끝나는 파일을 건너뜁니다 |

## 업무 폴더에 적용해 보기

부서 공유 폴더를 스택에 넣는다고 가정하고, 같은 문법으로 한국 사무 환경에 맞게 써 본 예입니다.

```
# 백업과 임시 파일
*.bak
*.tmp

# 폐기된 자료 폴더
폐기/

# 초안 폴더는 빼되 확정본은 포함
초안/
!초안/2026_운영계획_확정.md
```

이 예시는 위 여섯 가지 규칙을 조합한 것입니다. 한글 파일 이름이나 폴더 이름에서 패턴이 문제없이 동작하는지는 공식 문서에 설명이 없으므로, Compose한 뒤 스택의 자료 목록에서 원하는 파일이 빠졌는지 확인합니다.

## 공식 문서가 권하는 사용법

1. `.mstyignore`는 Knowledge Stack 폴더의 최상위 위치에 둡니다.
2. 복잡한 패턴에는 `#` 주석으로 이유를 적어 둡니다.
3. 패턴은 구체적으로 씁니다. 범위를 넓게 잡으면 필요한 파일까지 빠질 수 있습니다.
4. 스택이 바뀌면 `.mstyignore`도 주기적으로 검토하고 고칩니다.

3번이 특히 중요합니다. `*보고*`처럼 넓은 패턴을 쓰면 꼭 필요한 보고서까지 빠집니다. 패턴을 추가한 뒤에는 중요한 파일이 스택에 남아 있는지 한 번 확인합니다.

## 문서에 없는 내용

`.mstyignore`를 고친 뒤 이미 Compose된 파일이 스택에서 자동으로 빠지는지, 다시 Compose해야 하는지는 공식 문서에 설명이 없습니다. 파일을 고친 뒤에는 다시 Compose하고 결과를 확인하는 편이 안전합니다.

## 함께 읽을 글

- [Compose Options](/guide/ks-compose-options/)
- [Knowledge Stack 공유·관리와 Analytics](/guide/ks-share-and-manage/)
- [Knowledge Stacks Next Gen](/guide/ks-next-gen/)

## 참고한 문서

- [Ignore File](https://docs.msty.ai/studio/knowledge-stacks/ignore-file)
