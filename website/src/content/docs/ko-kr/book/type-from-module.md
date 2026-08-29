---
title: 모듈에서 타입 얻기
sidebar:
  order: 37
  label: 37. 모듈에서 타입 얻기
---


모듈로부터 타입 얻기는 모듈에서 내보낸 값을 사용하여 해당 타입을 자동으로 추론하는 기능을 의미합니다. 모듈이 특정 타입의 값을 내보내면 TypeScript는 그 정보를 사용하여 해당 값을 다른 모듈로 가져올 때 값의 타입을 자동으로 추론할 수 있습니다.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

