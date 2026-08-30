---
title: Indeksowanie typów
sidebar:
  order: 34
  label: 34. Indeksowanie typów
---


Indeksowanie typów oznacza możliwość definiowania typów, które można indeksować za pomocą klucza nieznanego z góry, przy użyciu sygnatury indeksowej do określenia typu właściwości, które nie zostały jawnie zadeklarowane.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

