---
title: Propriedades Opcionais
sidebar:
  order: 12
  label: 12. Propriedades Opcionais
---


Um tipo de objeto pode ter zero ou mais propriedades opcionais adicionando um `?` após o nome da propriedade:

```typescript
type X = {
    a: string;
    b?: string; // Opcional
};
```

