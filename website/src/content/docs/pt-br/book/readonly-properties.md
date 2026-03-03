---
title: Propriedades Somente Leitura (Readonly)
sidebar:
  order: 13
  label: 13. Propriedades Somente Leitura (Readonly)
---


É possível impedir a escrita em uma propriedade usando o modificador `readonly`, que garante que a propriedade não possa ser reescrita, mas não fornece nenhuma garantia de imutabilidade total:

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

