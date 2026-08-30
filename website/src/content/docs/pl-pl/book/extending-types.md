---
title: Rozszerzanie typów
sidebar:
  order: 16
  label: 16. Rozszerzanie typów
---


Można rozszerzyć `interface` (skopiować elementy składowe z innego typu):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Można również rozszerzać wiele typów:

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

Słowo kluczowe `extends` działa tylko z interfejsami i klasami; w przypadku typów należy użyć przecięcia:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Można rozszerzyć typ za pomocą interfejsu, ale nie odwrotnie:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

