---
title: Symboles
sidebar:
  order: 59
  label: 59. Symboles
---


Les symboles sont un type de données primitif qui représente une valeur immuable dont l'unicité globale est garantie pendant toute la durée de vie du programme.

Les symboles peuvent être utilisés comme clés de propriétés d'objet et permettent de créer des propriétés non énumérables.

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

Dans les WeakMaps et les WeakSets, les symboles peuvent désormais servir de clés.

