---
title: 扩展类型
sidebar:
  order: 15
  label: 15. 扩展类型
---


可以扩展 `interface`（从另一种类型复制成员）：

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

还可以从多种 `interface` 进行扩展：

```typescript
interface A {
    a: string;
}
interface B {
    b: string;
}
interface Y extends A, B {
    y: string;
}
```

该 `extends` 关键字仅适用于 `interface`，因为 `type` 使用交集：

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

可以使用 `interface` 来扩展类 `type`，但反之则不然：

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```


