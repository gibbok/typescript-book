---
title: Analyse du flux de contrôle
sidebar:
  order: 23
  label: 23. Analyse du flux de contrôle
---


Dans TypeScript, l’analyse du flux de contrôle permet d’analyser statiquement le déroulement du code afin d’inférer les types des variables. Le compilateur peut ainsi réduire les types de ces variables selon les besoins, à partir des résultats de l’analyse.

Avant TypeScript 4.4, l’analyse du flux de code ne s’appliquait qu’au code situé dans une instruction if. Depuis TypeScript 4.4, elle peut également s’appliquer aux expressions conditionnelles et aux accès à des propriétés discriminantes référencés indirectement par des variables const.

Par exemple :

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

Quelques exemples dans lesquels la réduction ne se produit pas :

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

Remarque : jusqu’à cinq niveaux d’indirection sont analysés dans les expressions conditionnelles.

