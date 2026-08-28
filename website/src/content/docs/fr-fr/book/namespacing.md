---
title: Espaces de noms
sidebar:
  order: 58
  label: 58. Espaces de noms
---


En TypeScript, les espaces de noms servent à organiser le code dans des conteneurs logiques, afin d'éviter les collisions de noms et de regrouper le code associé.
L'utilisation du mot-clé `export` permet d'accéder à l'espace de noms depuis l'extérieur des modules.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

