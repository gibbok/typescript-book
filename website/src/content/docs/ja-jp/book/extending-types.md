---
title: 型の拡張
sidebar:
  order: 16
  label: 16. 型の拡張
---


`interface` を拡張して、別の型からメンバーをコピーできます。

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

複数の型から拡張することもできます。

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

`extends` キーワードはインターフェースとクラスでのみ機能します。型では交差型を使用します。

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

インターフェースを使用して型を拡張することはできますが、その逆はできません。

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

