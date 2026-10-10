---
title: Knowledge Stack 공유·관리와 Analytics
description: Knowledge Stack을 폴더로 정리하고, 파일로 내보내 다른 사람과 나누고, 받은 스택을 가져오는 방법과 Analytics and Insights의 현재 상태를 정리합니다.
date: 2026-10-11
section: Knowledge Stacks
order: 50
verified: 2026-10-11
tags: [Msty, Knowledge Stacks, 공유]
---

## 이 글에서 다루는 것

공식 문서의 **Share and Manage**와 **Analytics and Insights** 두 페이지를 함께 다룹니다. 두 페이지 모두 분량이 짧아 한 글로 묶었습니다.

## 폴더로 정리하기

Knowledge Stacks 화면에서 폴더를 만들고 스택을 폴더에 넣어 관리할 수 있습니다. 공식 문서는 이 관리 기능이 Msty Studio의 다른 영역과 같은 방식이라고만 설명합니다. Prompt Studio나 Context Studio에서 폴더를 다뤄 봤다면 같은 방식으로 쓰면 됩니다.

스택은 한 주제에 하나씩 만드는 것이 권장되므로 금방 개수가 늘어납니다. "인사", "영업", "프로젝트별"처럼 폴더를 나눠 두면 대화에서 스택을 고를 때 찾기 쉽습니다.

## Knowledge Stack 내보내기

만든 스택을 파일로 저장합니다.

1. 내보낼 Knowledge Stack 옆의 말줄임표 아이콘을 누릅니다.
2. **Export**를 고릅니다.
3. 저장할 위치를 고릅니다.
4. **Save**를 누릅니다.

내보낸 파일에는 스택의 **벡터화된 데이터베이스**가 들어 있습니다. 용도는 두 가지입니다.

- 백업으로 보관하기
- 다른 사람에게 전달해 같은 스택을 쓰게 하기

예를 들어 팀에서 한 사람이 제품 매뉴얼 스택을 만들어 Compose까지 끝낸 뒤 내보내면, 다른 팀원은 원본 문서를 받아 다시 Compose하지 않고도 같은 스택을 쓸 수 있습니다.

## Knowledge Stack 가져오기

1. **Import Knowledge Stacks** 메뉴를 고릅니다.
2. 내보낸 스택 파일을 Msty Studio로 가져옵니다.

가져온 스택에는 중요한 제약이 있습니다.

- 가져온 스택은 자동으로 **잠긴 스택(locked stack)**이 됩니다.
- 잠긴 스택은 **다시 Compose할 수 없습니다.**

이유는 [Compose Options](/guide/ks-compose-options/) 글의 잠금 항목에서 설명한 대로입니다. 가져온 스택에는 벡터 데이터베이스만 있고 원본 파일은 내 PC에 없다고 보기 때문에, 그 안의 자료는 영구 잠금 상태가 됩니다.

실무에서는 다음을 기억해 둡니다.

- 받은 스택의 내용을 고치거나 문서를 추가해 다시 Compose할 수는 없습니다. 내용이 바뀌면 만든 사람이 다시 Compose해서 새로 내보내야 합니다.
- 임베딩 모델이나 조각 설정도 만든 사람이 정한 그대로입니다.

내보낸 파일에 개인정보나 사내 기밀이 담긴 문서의 내용이 포함되는지, 파일이 암호화되는지는 공식 문서에 설명이 없습니다. 벡터 데이터베이스에는 문서의 조각이 들어 있다고 보는 것이 안전하므로, 외부로 보낼 때는 원본 문서를 보낼 때와 같은 기준으로 판단합니다.

## Analytics and Insights

Knowledge Stack이 얼마나 잘 동작하는지, 어떻게 하면 결과를 개선할 수 있는지를 보여 주는 기능입니다. 공식 문서는 이를 주요 지표와 개선 권고가 담긴 상세 보고서라고 소개합니다.

다만 공식 문서는 이 기능이 **아직 작업 중**이라고 밝히고 있으며, Msty 커뮤니티 Discord에 참여해 의견을 달라고 안내합니다. 보고서에 어떤 지표가 나오는지, 어디서 여는지, 요금제 조건이 있는지는 공식 문서에 설명이 없습니다.

지금 스택의 품질을 점검하려면 다음 방법을 씁니다.

- [Chunks Visualizer와 Chunks Console](/guide/ks-chunks-visualizer-console/)에서 조각과 검색 결과를 직접 확인합니다.
- 대화에서 [Query Settings](/guide/ks-query-settings/) 글의 "무엇이 모델에 넘어갔는지 확인하기" 항목대로 Knowledge Stacks Metrics와 Query Analysis를 봅니다.

## 함께 읽을 글

- [Knowledge Stacks 개요](/guide/ks-overview/)
- [.mstyignore 파일로 Compose 대상 걸러 내기](/guide/ks-ignore-file/)

## 참고한 문서

- [Share and Manage](https://docs.msty.ai/studio/knowledge-stacks/share-and-manage)
- [Analytics and Insights](https://docs.msty.ai/studio/knowledge-stacks/analytics-insights)
