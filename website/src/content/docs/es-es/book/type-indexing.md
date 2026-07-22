---
title: Indexación de tipos
sidebar:
  order: 34
  label: 34. Indexación de tipos
---


La indexación de tipos permite definir tipos que pueden indexarse mediante una clave desconocida de antemano, utilizando una firma de índice para especificar el tipo de las propiedades no declaradas explícitamente.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

