---
title: Wnioskowanie typów literałowych
sidebar:
  order: 18
  label: 18. Wnioskowanie typów literałowych
---


Wnioskowanie typów literałowych to funkcja TypeScript, która pozwala wywnioskować typ zmiennej lub parametru na podstawie jego wartości.

W poniższym przykładzie widać, że TypeScript traktuje `x` jako typ literałowy, ponieważ jego wartości nie można później zmienić, natomiast `y` jest wnioskowane jako `string`, ponieważ można je później zmodyfikować.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

W poniższym przykładzie widać, że `o.x` zostało wywnioskowane jako `string` (a nie literał `a`), ponieważ TypeScript zakłada, że wartość może zostać później zmieniona.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

Jak widać, kod zgłasza błąd podczas przekazywania `o.x` do `fn`, ponieważ X jest węższym typem.

Ten problem można rozwiązać, używając asercji typu z `const` lub typem `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

lub:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

