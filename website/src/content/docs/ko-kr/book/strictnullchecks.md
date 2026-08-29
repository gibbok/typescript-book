---
title: strictNullChecks
sidebar:
  order: 19
  label: 19. strictNullChecks
---


`strictNullChecks`는 엄격한 null 검사를 적용하는 TypeScript 컴파일러 옵션입니다. 이 옵션을 활성화하면 유니온 타입 `null` | `undefined`를 사용해 해당 타입으로 명시적으로 선언한 변수와 매개변수에만 `null` 또는 `undefined`를 할당할 수 있습니다. 변수나 매개변수를 nullable로 명시적으로 선언하지 않으면 잠재적인 런타임 오류를 방지하기 위해 TypeScript가 오류를 생성합니다.

