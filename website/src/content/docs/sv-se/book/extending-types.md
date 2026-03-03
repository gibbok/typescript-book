---
title: Utöka typer
sidebar:
  order: 15
  label: 15. Utöka typer
---


Det är möjligt att utöka ett `interface` (kopiera medlemmar från en annan typ):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Det är också möjligt att utöka från flera typer:

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

Nyckelordet `extends` fungerar bara på interface och klasser, för typer använd en intersektion:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Det är möjligt att utöka en typ med hjälp av en härledning men inte tvärtom:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

