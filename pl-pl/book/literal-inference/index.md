# Wnioskowanie typów literałowych



Wnioskowanie typów literałowych to funkcja TypeScript, która pozwala wywnioskować typ zmiennej lub parametru na podstawie jego wartości.

W poniższym przykładzie widać, że TypeScript traktuje `x` jako typ literałowy, ponieważ jego wartości nie można później zmienić, natomiast `y` jest wnioskowane jako `string`, ponieważ można je później zmodyfikować.

```typescript
const x = 'x'; // Typ literałowy 'x', ponieważ tej wartości nie można zmienić
let y = 'y'; // Typ string, ponieważ tę wartość można zmienić
```

W poniższym przykładzie widać, że `o.x` zostało wywnioskowane jako `string` (a nie literał `a`), ponieważ TypeScript zakłada, że wartość może zostać później zmieniona.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // To szerszy typ string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument typu 'string' nie może być przypisany do parametru typu 'X'
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

