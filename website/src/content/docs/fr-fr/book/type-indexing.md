---
title: Indexation de type
sidebar:
  order: 34
  label: 34. Indexation de type
---


L'indexation de type désigne la possibilité de définir des types pouvant être indexés par une clé qui n'est pas connue à l'avance, en utilisant une signature d'index pour préciser le type des propriétés qui ne sont pas déclarées explicitement.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

