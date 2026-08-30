---
title: Modyfikatory typów mapowanych
sidebar:
  order: 39
  label: 39. Modyfikatory typów mapowanych
---


Modyfikatory typów mapowanych w TypeScript umożliwiają przekształcanie właściwości w istniejącym typie:

* `readonly` lub `+readonly`: Powoduje, że właściwość w typie mapowanym jest tylko do odczytu.
* `-readonly`: Pozwala modyfikować właściwość w typie mapowanym.
* `?`: Oznacza właściwość w typie mapowanym jako opcjonalną.

Przykłady:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

