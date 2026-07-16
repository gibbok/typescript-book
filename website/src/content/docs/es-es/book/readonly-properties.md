---
title: Propiedades de solo lectura
sidebar:
  order: 13
  label: 13. Propiedades de solo lectura
---


Es posible impedir la escritura en una propiedad mediante el modificador `readonly`, que garantiza que la propiedad no pueda reescribirse, pero no proporciona ninguna garantía de inmutabilidad total:

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

