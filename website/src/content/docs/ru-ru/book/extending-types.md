---
title: Расширение типов
sidebar:
  order: 16
  label: 16. Расширение типов
---


Можно расширить `interface` (скопировать члены из другого типа):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Также можно расширить сразу несколько типов:

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

Ключевое слово `extends` работает только с интерфейсами и классами; для типов используйте пересечение:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Тип можно расширить с помощью интерфейса, но не наоборот:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

