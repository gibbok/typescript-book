---
title: Type any
sidebar:
  order: 45
  label: 45. Type any
---


Le type `any` est un type spécial (supertype universel) qui peut représenter tout type de valeur (primitives, objets, tableaux, fonctions, erreurs, symboles). Il est souvent utilisé lorsque le type d'une valeur n'est pas connu au moment de la compilation, ou lorsque vous travaillez avec des valeurs provenant d'API ou de bibliothèques externes dépourvues de typages TypeScript.

En utilisant le type `any`, vous indiquez au compilateur TypeScript que les valeurs doivent être représentées sans aucune restriction. Pour optimiser la sûreté des types dans votre code, tenez compte des recommandations suivantes :

* Limitez l'utilisation de `any` aux cas précis où le type est réellement inconnu.
* Ne renvoyez pas de types `any` depuis une fonction, car cela réduit la sûreté des types dans le code qui l'utilise.
* À la place de `any`, utilisez `@ts-ignore` si vous devez faire taire le compilateur.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

