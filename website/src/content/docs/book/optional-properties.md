---
title: Optional Properties
sidebar:
  order: 13
  label: 13. Optional Properties
---


An object can specify Optional Properties by adding a question mark `?` to the end of the property name:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

It is possible to specify a default value when a property is optional:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

