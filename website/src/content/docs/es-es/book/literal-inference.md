---
title: Inferencia de literales
sidebar:
  order: 19
  label: 19. Inferencia de literales
---


La inferencia de literales es una característica de TypeScript que permite inferir el tipo de una variable o parámetro a partir de su valor.

En el siguiente ejemplo vemos que TypeScript considera que `x` es un tipo literal porque su valor no puede cambiar posteriormente, mientras que `y` se infiere como string porque puede modificarse.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

En el siguiente ejemplo vemos que `o.x` se infiere como `string` (y no como el literal `a`), ya que TypeScript considera que su valor puede cambiar posteriormente.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

Como puedes ver, el código genera un error al pasar `o.x` a `fn`, ya que X es un tipo más restringido.

Podemos resolver este problema mediante una aserción de tipo con `const` o con el tipo `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

o:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

