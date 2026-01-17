---
title: Propriedades Opcionais
sidebar:
  order: 12
  label: 12. Propriedades Opcionais
---


Um objeto pode especificar Propriedades Opcionais adicionando um ponto de interrogação `?` ao final do nome da propriedade:

```typescript
type X = {
    a: number;
    b?: number; // Opcional
};
```

É possível especificar um valor padrão quando uma propriedade é opcional:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

