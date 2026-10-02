---
title: Inferência Literal
sidebar:
  order: 18
  label: 18. Inferência Literal
---


A inferência literal é um recurso do TypeScript que permite que o tipo de uma variável ou parâmetro seja inferido com base em seu valor.

No exemplo a seguir, podemos ver que o TypeScript considera `x` um tipo literal, pois o valor não pode ser alterado posteriormente, enquanto `y` é inferido como string, pois pode ser modificado posteriormente.

```typescript
const x = 'x'; // Tipo literal de 'x', porque este valor não pode ser alterado
let y = 'y'; // Tipo string, pois podemos alterar este valor
```

No exemplo a seguir, podemos ver que `o.x` foi inferido como uma `string` (e não um literal de `a`), pois o TypeScript considera que o valor pode ser alterado posteriormente.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Este é um tipo string mais amplo (wider string)
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Um argumento do tipo 'string' não é atribuível a um parâmetro do tipo 'X'
```

Como você pode observar, o código gera um erro ao passar `o.x` para `fn`, pois X é um tipo mais estreito.

Podemos resolver este problema usando uma asserção de tipo com `const` ou o tipo `X`:

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

