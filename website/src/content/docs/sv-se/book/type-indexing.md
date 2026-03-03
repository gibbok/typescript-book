---
title: Typindexering
sidebar:
  order: 33
  label: 33. Typindexering
---


Typindexering avser möjligheten att definiera typer som kan indexeras med en nyckel som inte är känd i förväg, genom att använda en indexsignatur för att specificera typen för egenskaper som inte uttryckligen deklarerats.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

