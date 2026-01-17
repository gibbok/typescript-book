---
title: Tipos Mapeados
sidebar:
  order: 37
  label: 37. Tipos Mapeados
---


Tipos Mapeados no TypeScript permitem que você crie novos tipos baseados em um tipo existente, transformando cada propriedade usando uma função de mapeamento. Ao mapear tipos existentes, você pode criar novos tipos que representam a mesma informação em um formato diferente. Para criar um tipo mapeado, você acessa as propriedades de um tipo existente usando o operador `keyof` e então as altera para produzir um novo tipo.
No exemplo a seguir:

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

definimos MyMappedType para mapear as propriedades de T, criando um novo tipo com cada propriedade como um array de seu tipo original. Usando isso, criamos MyNewType para representar a mesma informação que MyType, mas com cada propriedade como um array.

