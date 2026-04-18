---
title: Literal Types
sidebar:
  order: 16
  label: 16. Literal Types
---


Literal type е множество с един елемент от по-общ тип, което дефинира много конкретна стойност, представляваща JavaScript примитив.

Literal types в TypeScript са числа, низове и булеви стойности.

Пример за literal стойности:

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

String, Numeric и Boolean literal types се използват в unions, type guards и type aliases.
В следния пример е показан union type alias. `O` се състои само от посочените стойности — други низове не са валидни:

```typescript
type O = 'a' | 'b' | 'c';
```

