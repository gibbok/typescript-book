---
title: Erweitern von Typen
sidebar:
  order: 16
  label: 16. Erweitern von Typen
---


Ein `interface` kann erweitert werden (Member eines anderen Typs werden kopiert):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Es ist auch möglich, mehrere Typen zu erweitern:

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

Das Schlüsselwort `extends` funktioniert nur bei Interfaces und Klassen; verwenden Sie für Typen eine Schnittmenge:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Ein Typ kann mit einem Interface erweitert werden, umgekehrt ist dies jedoch nicht möglich:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

