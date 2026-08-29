---
title: 인덱스 시그니처
sidebar:
  order: 15
  label: 15. 인덱스 시그니처
---


TypeScript에서는 `string`, `number`, `symbol`을 인덱스 시그니처로 사용할 수 있습니다.

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

JavaScript는 `number` 인덱스를 자동으로 `string` 인덱스로 변환하므로 `k[1]`과 `k["1"]`은 같은 값을 반환합니다.

