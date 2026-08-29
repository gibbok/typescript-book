---
title: 인터섹션 타입
sidebar:
  order: 33
  label: 33. 인터섹션 타입
---


인터섹션 타입은 둘 이상의 타입이 가진 모든 프로퍼티를 포함하는 값을 나타내는 타입입니다. 인터섹션 타입은 각 타입 사이에 `&` 기호를 사용하여 표기합니다.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

