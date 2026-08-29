---
title: 선택적 프로퍼티
sidebar:
  order: 13
  label: 13. 선택적 프로퍼티
---


객체는 프로퍼티 이름 끝에 물음표 `?`를 추가하여 선택적 프로퍼티를 지정할 수 있습니다.

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

프로퍼티가 선택 사항인 경우 기본값을 지정할 수 있습니다.

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

