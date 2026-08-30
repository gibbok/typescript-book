---
title: Dystrybucyjne typy warunkowe
sidebar:
  order: 41
  label: 41. Dystrybucyjne typy warunkowe
---


Dystrybucyjne typy warunkowe to funkcja, która umożliwia rozdzielenie typu na unię typów przez zastosowanie przekształcenia osobno do każdego elementu unii.
Może to być szczególnie przydatne podczas pracy z typami mapowanymi lub typami wyższego rzędu.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

