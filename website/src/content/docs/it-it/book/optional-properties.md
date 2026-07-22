---
title: Proprietà facoltative
sidebar:
  order: 14
  label: 14. Proprietà facoltative
---


Un oggetto può specificare proprietà facoltative aggiungendo un punto interrogativo `?` alla fine del nome della proprietà:

```typescript
type X = {
    a: number;
    b?: number; // Facoltativo
};
```

È possibile specificare un valore predefinito quando una proprietà è facoltativa:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

