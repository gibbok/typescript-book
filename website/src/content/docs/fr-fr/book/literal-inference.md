---
title: Inférence des littéraux
sidebar:
  order: 18
  label: 18. Inférence des littéraux
---


L’inférence des littéraux est une fonctionnalité de TypeScript qui permet d’inférer le type d’une variable ou d’un paramètre à partir de sa valeur.

Dans l’exemple suivant, nous pouvons voir que TypeScript considère `x` comme un type littéral, car sa valeur ne peut plus être modifiée ultérieurement, tandis que `y` est inféré comme une chaîne puisqu’il peut être modifié ultérieurement.

```typescript
const x = 'x'; // Type littéral de 'x', car cette valeur ne peut pas être modifiée
let y = 'y'; // Type string, car cette valeur peut être modifiée
```

Dans l’exemple suivant, nous pouvons voir que `o.x` a été inféré comme un `string` (et non comme le littéral `a`), car TypeScript considère que la valeur peut être modifiée ultérieurement.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Il s'agit d'une chaîne de type plus large
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Un argument de type 'string' n'est pas assignable à un paramètre de type 'X'
```

Comme vous pouvez le constater, le code génère une erreur lors du passage de `o.x` à `fn`, car X est un type plus étroit.

Nous pouvons résoudre ce problème en utilisant une assertion de type avec `const` ou le type `X` :

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

ou :

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

