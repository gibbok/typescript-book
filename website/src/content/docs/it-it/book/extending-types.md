---
title: Estensione dei tipi
sidebar:
  order: 15
  label: 15. Estensione dei tipi
---


È possibile estendere un'`interfaccia` (copiare membri da un altro tipo):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

È anche possibile estendere da più tipi:

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

La parola chiave `extends` funziona solo su interfacce e classi; per i tipi utilizzare un'intersezione:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

È possibile estendere un tipo utilizzando un'inferenza, ma non viceversa:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

