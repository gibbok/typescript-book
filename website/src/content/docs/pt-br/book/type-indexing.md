---
title: Indexação de Tipo
sidebar:
  order: 33
  label: 33. Indexação de Tipo
---


Indexação de tipo refere-se à capacidade de definir tipos que podem ser indexados por uma chave que não é conhecida antecipadamente, usando uma assinatura de índice para especificar o tipo para propriedades que não são explicitamente declaradas.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Retorna a
```

