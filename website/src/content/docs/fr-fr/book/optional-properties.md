---
title: Propriétés facultatives
sidebar:
  order: 13
  label: 13. Propriétés facultatives
---


Un objet peut spécifier des propriétés facultatives en ajoutant un point d’interrogation `?` à la fin du nom de la propriété :

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Il est possible de spécifier une valeur par défaut lorsqu’une propriété est facultative :

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

