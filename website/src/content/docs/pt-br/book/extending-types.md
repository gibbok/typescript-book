---
title: Estendendo Tipos
sidebar:
  order: 15
  label: 15. Estendendo Tipos
---


É possível estender uma `interface` (copiar membros de outro tipo):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Também é possível estender de múltiplos tipos:

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

A palavra-chave `extends` funciona apenas em interfaces e classes, para tipos use uma interseção:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

É possível estender um tipo usando uma interface, mas não vice-versa:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

