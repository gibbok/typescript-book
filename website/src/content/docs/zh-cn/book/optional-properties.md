---
title: 可选属性
sidebar:
  order: 12
  label: 12. 可选属性
---


对象可以通过在属性名称末尾添加问号 `?` 来指定可选属性：

```typescript
type X = {
    a: number;
    b?: number; // 可选的
};
```

当属性是可选的时，可以指定默认值

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

