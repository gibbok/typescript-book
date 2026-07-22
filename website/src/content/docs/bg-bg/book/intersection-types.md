---
title: Intersection типове
sidebar:
  order: 33
  label: 33. Intersection типове
---


Intersection тип е тип, който представлява стойност, която има всички свойства на два или повече типа. Intersection типовете се обозначават със символа `&` между всеки тип.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

