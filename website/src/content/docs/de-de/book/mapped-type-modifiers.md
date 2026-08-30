---
title: Modifizierer gemappter Typen
sidebar:
  order: 39
  label: 39. Modifizierer gemappter Typen
---


Modifizierer gemappter Typen ermöglichen in TypeScript die Transformation von Eigenschaften innerhalb eines vorhandenen Typs:

* `readonly` oder `+readonly`: Dadurch wird eine Eigenschaft im gemappten Typ schreibgeschützt.
* `-readonly`: Dadurch wird eine Eigenschaft im gemappten Typ veränderbar.
* `?`: Dadurch wird eine Eigenschaft im gemappten Typ als optional gekennzeichnet.

Beispiele:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

