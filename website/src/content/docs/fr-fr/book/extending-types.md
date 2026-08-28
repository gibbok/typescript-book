---
title: Extension des types
sidebar:
  order: 16
  label: 16. Extension des types
---


Il est possible d’étendre une `interface` (en copiant les membres d’un autre type) :

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Il est également possible d’étendre plusieurs types :

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

Le mot-clé `extends` fonctionne uniquement avec les interfaces et les classes ; pour les types, utilisez une intersection :

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Il est possible d’étendre un type à l’aide d’une interface, mais pas l’inverse :

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

