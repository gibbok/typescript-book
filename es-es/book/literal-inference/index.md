# Inferencia de literales



La inferencia de literales es una característica de TypeScript que permite inferir el tipo de una variable o parámetro a partir de su valor.

En el siguiente ejemplo vemos que TypeScript considera que `x` es un tipo literal porque su valor no puede cambiar posteriormente, mientras que `y` se infiere como string porque puede modificarse.

```typescript
const x = 'x'; // Tipo literal de 'x', porque este valor no se puede cambiar
let y = 'y'; // Tipo string, ya que podemos cambiar este valor
```

En el siguiente ejemplo vemos que `o.x` se infiere como `string` (y no como el literal `a`), ya que TypeScript considera que su valor puede cambiar posteriormente.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Esta es una cadena de tipo más amplio
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // El argumento de tipo 'string' no se puede asignar al parámetro de tipo 'X'
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

