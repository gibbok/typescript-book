---
title: Type Indexing
sidebar:
  order: 33
  label: 33. Type Indexing
---


Type indexing refers to the ability to define types that can be indexed by a key that is not known in advance, using an index signature to specify the type for properties that are not explicitly declared.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

