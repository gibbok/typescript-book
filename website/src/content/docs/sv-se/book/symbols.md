---
title: Symboler
sidebar:
  order: 58
  label: 58. Symboler
---


Symboler är en primitiv datatyp som representerar ett oföränderligt värde som garanterat är globalt unikt under hela programmets livstid.

Symboler kan användas som nycklar för objektegenskaper och ger ett sätt att skapa icke-uppräkningsbara egenskaper.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

I WeakMaps och WeakSets är symboler nu tillåtna som nycklar.

