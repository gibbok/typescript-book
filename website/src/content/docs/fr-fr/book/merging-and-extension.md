---
title: Fusion et extension
sidebar:
  order: 53
  label: 53. Fusion et extension
---


La fusion et l'extension désignent deux concepts différents liés à l'utilisation des types et des interfaces.

La fusion permet de combiner plusieurs déclarations portant le même nom en une seule définition, par exemple lorsque vous définissez plusieurs fois une interface portant le même nom :

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

L'extension désigne la possibilité d'étendre des types ou interfaces existants, ou d'en hériter, afin d'en créer de nouveaux. Il s'agit d'un mécanisme permettant d'ajouter des propriétés ou des méthodes supplémentaires à un type existant sans modifier sa définition d'origine. Exemple :

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

