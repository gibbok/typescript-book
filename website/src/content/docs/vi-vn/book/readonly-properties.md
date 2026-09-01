---
title: Thuộc tính readonly
sidebar:
  order: 14
  label: 14. Thuộc tính readonly
---


Có thể ngăn việc ghi vào một thuộc tính bằng modifier `readonly`, bảo đảm thuộc tính không thể được ghi lại nhưng không cung cấp bảo đảm về tính bất biến hoàn toàn:

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

