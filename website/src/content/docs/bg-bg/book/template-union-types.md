---
title: Template Union типове
sidebar:
  order: 44
  label: 44. Template Union типове
---


Template union типовете могат да се използват за комбиниране и манипулиране на текст в рамките на type системата, например:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

