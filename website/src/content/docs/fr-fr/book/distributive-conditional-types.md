---
title: Types conditionnels distributifs
sidebar:
  order: 41
  label: 41. Types conditionnels distributifs
---


Les types conditionnels distributifs permettent de distribuer un type sur une union de types en appliquant une transformation à chaque membre de l'union individuellement.
Cela peut être particulièrement utile lorsque vous travaillez avec des types mappés ou des types d'ordre supérieur.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

