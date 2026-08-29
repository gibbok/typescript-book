---
title: 유니온 타입
sidebar:
  order: 32
  label: 32. 유니온 타입
---


유니온 타입은 여러 타입 중 하나일 수 있는 값을 나타내는 타입입니다. 유니온 타입은 가능한 각 타입 사이에 `|` 기호를 사용하여 표기합니다.

```typescript
let x: string | number;
x = 'hello'; // Valid
x = 123; // Valid
```

