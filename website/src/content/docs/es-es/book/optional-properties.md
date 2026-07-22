---
title: Propiedades opcionales
sidebar:
  order: 13
  label: 13. Propiedades opcionales
---


Un objeto puede especificar propiedades opcionales añadiendo un signo de interrogación `?` al final del nombre de la propiedad:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Es posible especificar un valor predeterminado cuando una propiedad es opcional:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

