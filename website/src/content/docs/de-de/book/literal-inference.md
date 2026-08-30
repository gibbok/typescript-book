---
title: Literaltypinferenz
sidebar:
  order: 18
  label: 18. Literaltypinferenz
---


Die Literaltypinferenz ist eine Funktion von TypeScript, mit der der Typ einer Variablen oder eines Parameters anhand seines Werts abgeleitet werden kann.

Im folgenden Beispiel sehen wir, dass TypeScript `x` als Literaltyp betrachtet, da der Wert später nicht geändert werden kann. `y` wird dagegen als String abgeleitet, da der Wert später jederzeit geändert werden kann.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

Im folgenden Beispiel sehen wir, dass `o.x` als `string` (und nicht als Literal von `a`) abgeleitet wurde, da TypeScript davon ausgeht, dass der Wert später jederzeit geändert werden kann.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

Wie Sie sehen, gibt der Code beim Übergeben von `o.x` an `fn` einen Fehler aus, da X ein engerer Typ ist.

Dieses Problem kann durch eine Typassertion mit `const` oder dem Typ `X` gelöst werden:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

oder:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

