---
title: Literaltyper
sidebar:
  order: 16
  label: 16. Literaltyper
---


En literaltyp är en enskild elementuppsättning från en kollektiv typ, den definierar ett mycket exakt värde som är en JavaScript-primitiv.

Literaltyper i TypeScript är tal, strängar och booleaner.

Exempel på literaler:

```typescript
const a = 'a'; // Sträng literal type
const b = 1; // Numerisk literal type
const c = true; // Boolean literal type
```

Sträng-, numeriska och booleska literaltyper används i unioner, typvakter och typalias.
I följande exempel kan du se ett unionstypealias. `O` består bara av de angivna värdena, ingen annan sträng är giltig:

```typescript
type O = 'a' | 'b' | 'c';
```

