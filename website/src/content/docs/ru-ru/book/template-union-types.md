---
title: Шаблонные типы объединений
sidebar:
  order: 44
  label: 44. Шаблонные типы объединений
---


Шаблонные типы объединений можно использовать для объединения текста и работы с ним внутри системы типов, например:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

