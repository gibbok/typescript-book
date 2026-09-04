---
title: TypeScript 7.1이 ambient 모듈에 import attributes를 추가했습니다
description: TypeScript 7.1은 import attributes를 기준으로 패턴 ambient 모듈 선언을 매칭할 수 있습니다.
lastUpdated: 2026-09-01
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-01'
---

**게시일:** 2026년 9월 1일

TypeScript의 네이티브 컴파일러는 이제 패턴 ambient 모듈 선언에서 import attributes 타입을 지원합니다. 따라서 선언은 `type: 'css'` 또는 `type: 'text'` 같은 속성으로 import를 구분할 수 있습니다.

## 변경 사항

import에 속성이 있으면 TypeScript는 일치하는 패턴 ambient 모듈로 해석할 수 있습니다. 매칭에는 할당 가능성이 사용되며, 여러 선언이 일치하면 TypeScript는 가장 구체적인 속성 타입을 가진 선언을 선택합니다.

현재 이러한 선언의 속성 타입은 값이 문자열 리터럴 타입인 일반 프로퍼티로 제한됩니다. 같은 패턴과 동일한 속성 타입을 가진 선언은 병합할 수 있지만, 서로 다른 속성 타입은 분리됩니다.

## 호환성

이 변경은 TypeScript 7.1.0 Beta 마일스톤에 병합되었습니다. 표준 라이브러리에 CSS 또는 텍스트 import 선언을 내장하는 것은 아니므로 프로젝트와 도구는 필요한 ambient 모듈을 계속 정의해야 합니다.

## 출처

병합된 TypeScript pull request를 확인하세요: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
