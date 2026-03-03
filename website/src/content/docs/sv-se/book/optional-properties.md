---
title: Valfria egenskaper
sidebar:
  order: 12
  label: 12. Valfria egenskaper
---


Ett objekt kan specificera valfria egenskaper genom att lägga till ett frågetecken `?` i slutet av egenskapsnamnet:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Det är möjligt att ange ett standardvärde när en egenskap är valfri:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

