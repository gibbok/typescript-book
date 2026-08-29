---
title: Properti Readonly
sidebar:
  order: 14
  label: 14. Properti Readonly
---


Penulisan ulang suatu properti dapat dicegah dengan menggunakan modifier `readonly`, yang memastikan bahwa properti tersebut tidak dapat ditulis ulang, tetapi tidak memberikan jaminan immutability secara menyeluruh:

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

