---
title: Literal Types
sidebar:
  order: 16
  label: 16. Literal Types
---


A Literal Type is a single element set from a collective type, it defines a very exact value that is a JavaScript primitive.

Literal Types in TypeScript are numbers, strings, and booleans.

Example of literals:

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

String, Numeric, and Boolean Literal Types are used in unions, type guards, and type aliases.
In the following example, you can see a union type alias. `O` consists of only the specified values, no other string is valid:

```typescript
type O = 'a' | 'b' | 'c';
```

