---
title: 조건부 타입
sidebar:
  order: 40
  label: 40. 조건부 타입
---


조건부 타입은 조건에 따라 타입을 만드는 방법으로, 조건의 결과에 따라 생성할 타입이 결정됩니다. `extends` 키워드와 삼항 연산자를 사용하여 두 타입 중 하나를 조건부로 선택하도록 정의합니다.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

