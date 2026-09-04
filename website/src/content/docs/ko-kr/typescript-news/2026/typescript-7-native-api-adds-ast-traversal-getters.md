---
title: TypeScript 7 네이티브 API에 AST 자식 및 토큰 getter 추가
description: TypeScript 네이티브 API에 Node 자식과 토큰을 순회하는 메서드가 추가되어 구문 트리 도구를 위한 JavaScript API와의 차이가 줄었습니다.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**게시일:** 2026년 9월 3일

TypeScript 네이티브 API는 이제 자식 노드와 토큰을 순회하기 위한 다섯 가지 `Node` 도우미인 `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()`, `getLastToken()`을 제공합니다.

## 변경 사항

PR #63893은 JavaScript 기반 TypeScript API에 이미 존재하는 나머지 자식 및 토큰 getter를 추가합니다. 위치와 텍스트 getter가 이미 추가된 뒤, 이번 변경으로 네이티브 `Node` API의 자식/토큰 관련 기능이 보완됩니다.

## 중요한 이유

이 메서드들은 구문 트리를 순회하는 API 소비자, 특히 토큰과 자식 노드를 모두 검사해야 하는 도구에 유용합니다. 이제 네이티브 API에서도 이러한 경우 동일한 `Node` 순회 도우미를 사용할 수 있습니다.

## 출처

[PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) 및 [추적 이슈](https://github.com/microsoft/TypeScript/issues/63892)를 확인하세요.
