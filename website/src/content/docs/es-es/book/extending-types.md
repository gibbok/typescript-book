---
title: Extensión de tipos
sidebar:
  order: 15
  label: 15. Extensión de tipos
---


Es posible extender una `interface` (copiar miembros de otro tipo):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

También es posible extender varios tipos:

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

La palabra clave `extends` solo funciona con interfaces y clases; para los tipos debe utilizarse una intersección:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Es posible extender un tipo mediante una interfaz, pero no a la inversa:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

