---
title: Modifierare för mappade typer
sidebar:
  order: 38
  label: 38. Modifierare för mappade typer
---


Modifierare för mappade typer i TypeScript möjliggör transformation av egenskaper inom en befintlig typ:

* `readonly` eller `+readonly`: Detta gör en egenskap i den mappade typen skrivskyddad.
* `-readonly`: Detta gör att en egenskap i den mappade typen kan ändras.
* `?`: Detta gör en egenskap i den mappade typen valfri.

Exempel:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked eftersom read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked eftersom mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked eftersom optional
```

