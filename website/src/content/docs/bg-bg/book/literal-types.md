---
title: Literal Types
sidebar:
  order: 17
  label: 17. Literal Types
---


Literal type е множество с един елемент от по-общ тип, което дефинира много конкретна стойност, представляваща JavaScript примитив.

Literal types в TypeScript са числа, низове и булеви стойности.

Пример за literal стойности:

```typescript
const a = 'a'; // Низов литерален тип
const b = 1; // Числов литерален тип
const c = true; // Булев литерален тип
```

String, Numeric и Boolean literal types се използват в unions, type guards и type aliases.
В следния пример е показан union type alias. `O` се състои само от посочените стойности — други низове не са валидни:

```typescript
type O = 'a' | 'b' | 'c';
```

