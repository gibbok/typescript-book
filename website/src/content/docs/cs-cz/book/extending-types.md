---
title: Rozšíření typů
sidebar:
  order: 16
  label: 16. Rozšíření typů
---


Je možné rozšířit `interface` (zkopírovat členy z jiného typu):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Je také možné dědit z více typů:

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

Klíčové slovo `extends` funguje pouze u rozhraní a tříd; u typů použijte průnik:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Typ lze rozšířit pomocí rozhraní, ale ne naopak:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

