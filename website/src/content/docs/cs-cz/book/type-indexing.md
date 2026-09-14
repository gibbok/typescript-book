---
title: Indexování typů
sidebar:
  order: 34
  label: 34. Indexování typů
---


Indexování typů označuje možnost definovat typy, které lze indexovat předem neznámým klíčem, s využitím indexové signatury k určení typu vlastností, které nejsou explicitně deklarovány.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

