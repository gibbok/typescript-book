---
title: Indicizzazione dei tipi
sidebar:
  order: 33
  label: 33. Indicizzazione dei tipi
---


L'indicizzazione dei tipi si riferisce alla capacità di definire tipi che possono essere indicizzati da una chiave non nota in anticipo, utilizzando una firma di indice per specificare il tipo per le proprietà che non sono dichiarate esplicitamente.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };

console.log(myDict['a']); // Restituisce un
```

