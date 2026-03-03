---
title: Skrivskyddade egenskaper
sidebar:
  order: 13
  label: 13. Skrivskyddade egenskaper
---


Det är möjligt att förhindra skrivning till en egenskap genom att använda modifieraren `readonly` som ser till att egenskapen inte kan skrivas om, men den ger ingen garanti för total oföränderlighet:

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

