---
title: Typ z návratové hodnoty funkce
sidebar:
  order: 36
  label: 36. Typ z návratové hodnoty funkce
---


Typ z návratové hodnoty funkce označuje možnost automaticky odvodit návratový typ funkce na základě její implementace. TypeScript tak může určit typ hodnoty vrácené funkcí bez explicitních typových anotací.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

