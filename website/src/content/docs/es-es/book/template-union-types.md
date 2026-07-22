---
title: Tipos de unión de plantilla
sidebar:
  order: 46
  label: 46. Tipos de unión de plantilla
---


Los tipos de unión de plantilla pueden utilizarse para combinar y manipular texto dentro del sistema de tipos. Por ejemplo:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

