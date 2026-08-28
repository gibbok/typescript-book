---
title: Inférence de type avec infer dans les types conditionnels
sidebar:
  order: 42
  label: 42. Inférence de type avec infer dans les types conditionnels
---


Le mot-clé `infer` est utilisé dans les types conditionnels afin d'inférer (extraire) le type d'un paramètre générique depuis un type qui en dépend. Il permet ainsi d'écrire des définitions de types plus souples et réutilisables.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

