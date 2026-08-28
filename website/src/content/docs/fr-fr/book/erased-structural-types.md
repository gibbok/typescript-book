---
title: Types structurels effacés
sidebar:
  order: 57
  label: 57. Types structurels effacés
---


En TypeScript, les objets ne sont pas tenus de correspondre à un type spécifique et exact. Par exemple, si nous créons un objet qui satisfait aux exigences d'une interface, nous pouvons utiliser cet objet aux endroits où cette interface est requise, même s'il n'existe aucun lien explicite entre eux.
Exemple :

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

