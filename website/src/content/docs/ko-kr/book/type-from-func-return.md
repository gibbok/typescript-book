---
title: 함수 반환값에서 타입 얻기
sidebar:
  order: 36
  label: 36. 함수 반환값에서 타입 얻기
---


함수 반환값으로부터 타입 얻기란 함수의 구현을 바탕으로 반환 타입을 자동으로 추론하는 기능을 의미합니다. 이를 통해 TypeScript는 명시적인 타입 어노테이션 없이 함수가 반환하는 값의 타입을 결정할 수 있습니다.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

