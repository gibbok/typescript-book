---
title: Türleri Genişletme
sidebar:
  order: 16
  label: 16. Türleri Genişletme
---


Bir `interface`'i genişletmek (üyeleri başka bir türden kopyalamak) mümkündür:

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Birden fazla türü genişletmek de mümkündür:

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

`extends` anahtar sözcüğü yalnızca arayüzlerde ve sınıflarda çalışır; türler için kesişim kullanın:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Bir türü arayüz kullanarak genişletmek mümkündür, ancak bunun tersi mümkün değildir:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

