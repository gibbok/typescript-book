---
title: Modifikátory mapovaných typů
sidebar:
  order: 39
  label: 39. Modifikátory mapovaných typů
---


Modifikátory mapovaných typů v TypeScriptu umožňují transformovat vlastnosti v existujícím typu:

* `readonly` nebo `+readonly`: Nastaví vlastnost v mapovaném typu jako pouze pro čtení.
* `-readonly`: Umožní měnit vlastnost v mapovaném typu.
* `?`: Označí vlastnost v mapovaném typu jako volitelnou.

Příklady:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

