---
title: Modificateurs de types mappés
sidebar:
  order: 39
  label: 39. Modificateurs de types mappés
---


En TypeScript, les modificateurs de types mappés permettent de transformer les propriétés d'un type existant :

* `readonly` ou `+readonly` : rend une propriété du type mappé accessible en lecture seule.
* `-readonly` : rend une propriété du type mappé modifiable.
* `?` : désigne une propriété du type mappé comme facultative.

Exemples :

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

