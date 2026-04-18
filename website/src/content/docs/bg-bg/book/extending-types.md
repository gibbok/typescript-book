---
title: Разширяване на типове
sidebar:
  order: 15
  label: 15. Разширяване на типове
---


Възможно е да се разшири `interface` (да се копират елементи от друг тип):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Възможно е също така да се разшири от няколко типа:

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

Ключовата дума `extends` работи само с interfaces и класове; при types се използва сечение (intersection):

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Възможно е type да бъде разширен чрез interface, но не и обратното:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

