---
title: Indexação de Tipo
sidebar:
  order: 33
  label: 33. Indexação de Tipo
---


Indexação de tipo (type indexing) refere-se à capacidade de definir tipos que podem ser indexados por uma chave não conhecida antecipadamente, usando uma assinatura de índice para especificar o tipo para propriedades que não são declaradas explicitamente.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Retorna a
```

