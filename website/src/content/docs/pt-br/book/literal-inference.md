---
title: Inferência Literal
sidebar:
  order: 17
  label: 17. Inferência Literal
---


A Inferência Literal é um recurso no TypeScript que permite que o tipo de uma variável ou parâmetro seja inferido com base em seu valor.

No exemplo a seguir, podemos ver que o TypeScript considera `x` um tipo literal, pois o valor não pode ser alterado posteriormente, quando em vez disso `y` é inferido como string, pois pode ser modificado a qualquer momento.

```typescript
const x = 'x'; // Tipo literal de 'x', porque este valor não pode ser alterado
let y = 'y'; // Tipo string, pois podemos mudar este valor
```

No exemplo a seguir, podemos ver que `o.x` foi inferido como uma `string` (e não um literal de `a`) pois o TypeScript considera que o valor pode ser alterado a qualquer momento.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Esta é uma string mais ampla
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

Como você pode ver, o código lança um erro ao passar `o.x` para `fn` pois X é um tipo mais estreito.

Podemos resolver este problema usando asserção de tipo usando `const` ou o tipo `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

ou:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

