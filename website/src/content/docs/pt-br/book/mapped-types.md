---
title: Tipos Mapeados
sidebar:
  order: 37
  label: 37. Tipos Mapeados
---


Tipos mapeados no TypeScript permitem criar novos tipos baseados em tipos existentes transformando as propriedades. Eles são particularmente úteis quando você deseja criar um novo tipo alterando ou estendendo as propriedades de um tipo existente.

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Person = {
    name: string;
    age: number;
};

type ReadonlyPerson = Readonly<Person>;
// { readonly name: string; readonly age: number; }
```

