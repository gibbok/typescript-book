---
title: Tipo a partir de Retorno de Função
sidebar:
  order: 35
  label: 35. Tipo a partir de Retorno de Função
---


Em TypeScript, você pode usar o tipo utilitário `ReturnType` para extrair o tipo de retorno de uma função:

```typescript
const getValue = () => ({ value: 42 });
type Value = ReturnType<typeof getValue>; // { value: number }
```

