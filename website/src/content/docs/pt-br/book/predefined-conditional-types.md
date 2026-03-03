---
title: Tipos Condicionais Predefinidos
sidebar:
  order: 42
  label: 42. Tipos Condicionais Predefinidos
---


TypeScript fornece vários tipos condicionais predefinidos que são úteis para transformações de tipo comuns:

* `Exclude<T, U>`: Exclui de T tipos que são atribuíveis a U.
* `Extract<T, U>`: Extrai de T tipos que são atribuíveis a U.
* `NonNullable<T>`: Exclui null e undefined de T.
* `ReturnType<T>`: Obtém o tipo de retorno de uma função.
* `Parameters<T>`: Obtém os tipos de parâmetro de uma função.
* E mais...

```typescript
type A = Exclude<string | number | boolean, boolean>; // string | number
type B = Extract<string | number | boolean, boolean>; // boolean
type C = NonNullable<string | null | undefined>; // string
```

