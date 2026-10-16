---
title: Literalhärledning
sidebar:
  order: 18
  label: 18. Literalhärledning
---


Literalhärledning är en funktion i TypeScript som gör att typen av en variabel eller parameter kan härledas baserat på dess värde.

I följande exempel kan vi se att TypeScript betraktar `x` som en literaltyp eftersom värdet inte kan ändras senare, medan `y` härleds som sträng eftersom det kan ändras när som helst.

```typescript
const x = 'x'; // Literaltypen 'x', eftersom värdet inte kan ändras
let y = 'y'; // Typen string, eftersom värdet kan ändras
```

I följande exempel kan vi se att `o.x` härleds som en `string` (och inte en literal av `a`) eftersom TypeScript anser att värdet kan ändras när som helst.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Detta är en bredare strängtyp
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Ett argument av typen 'string' kan inte tilldelas en parameter av typen 'X'
```

Som du kan se ger koden ett fel när `o.x` skickas till `fn` eftersom X är en smalare typ.

Vi kan lösa detta problem genom att använda typbekräftelse med `const` eller typen `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

eller:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

