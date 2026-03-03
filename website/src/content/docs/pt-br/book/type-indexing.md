---
title: Indexação de Tipo
sidebar:
  order: 33
  label: 33. Indexação de Tipo
---


Indexação de tipo em TypeScript permite acessar e extrair tipos de propriedades de outro tipo usando uma sintaxe semelhante a índice.

```typescript
type Person = {
    name: string;
    age: number;
};

type Name = Person['name']; // string
```

