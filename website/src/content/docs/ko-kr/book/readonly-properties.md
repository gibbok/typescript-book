---
title: 읽기 전용 프로퍼티
sidebar:
  order: 14
  label: 14. 읽기 전용 프로퍼티
---


`readonly` 수정자를 사용하면 프로퍼티에 값을 쓰지 못하게 할 수 있습니다. 이 수정자는 프로퍼티를 다시 쓸 수 없도록 보장하지만 완전한 불변성을 보장하지는 않습니다.

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

