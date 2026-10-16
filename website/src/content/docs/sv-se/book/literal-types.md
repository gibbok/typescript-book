---
title: Literaltyper
sidebar:
  order: 17
  label: 17. Literaltyper
---


En literaltyp är en enskild elementuppsättning från en kollektiv typ, den definierar ett mycket exakt värde som är en JavaScript-primitiv.

Literaltyper i TypeScript är tal, strängar och booleaner.

Exempel på literaler:

```typescript
const a = 'a'; // Strängliteraltyp
const b = 1; // Numerisk literaltyp
const c = true; // Boolesk literaltyp
```

Sträng-, numeriska och booleska literaltyper används i unioner, typvakter och typalias.
I följande exempel kan du se ett unionstypealias. `O` består bara av de angivna värdena, ingen annan sträng är giltig:

```typescript
type O = 'a' | 'b' | 'c';
```

