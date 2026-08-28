---
title: Types d'objets
sidebar:
  order: 28
  label: 28. Types d'objets
---


En TypeScript, les types d'objet décrivent la forme d'un objet. Ils précisent les noms et les types des propriétés de l'objet, ainsi que le caractère obligatoire ou facultatif de ces propriétés.

En TypeScript, vous pouvez définir les types d'objet de deux manières principales :

Une interface définit la forme d'un objet en précisant les noms, les types et le caractère facultatif de ses propriétés.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Un alias de type, tout comme une interface, définit la forme d'un objet. Cependant, il peut également créer un nouveau type personnalisé fondé sur un type existant ou sur une combinaison de types existants. Cela inclut la définition de types union, de types intersection et d'autres types complexes.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Il est également possible de définir un type de manière anonyme :

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

