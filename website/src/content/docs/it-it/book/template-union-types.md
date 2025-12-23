---
title: Tipi di unione di template
sidebar:
  order: 43
  label: 43. Tipi di unione di template
---


I tipi di unione di template possono essere utilizzati per unire e manipolare il testo all'interno del sistema di tipi, ad esempio:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

