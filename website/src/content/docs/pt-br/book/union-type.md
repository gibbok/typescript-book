---
title: Tipo Union
sidebar:
  order: 31
  label: 31. Tipo Union
---


Tipos union no TypeScript permitem expressar um valor que pode ser de vários tipos. Um tipo union usa o símbolo de barra vertical (`|`) para separar cada tipo.

```typescript
let value: string | number;

value = 'hello';
value = 42;
```

