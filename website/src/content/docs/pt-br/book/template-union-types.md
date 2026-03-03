---
title: Tipos de União de Template (Template Union Types)
sidebar:
  order: 43
  label: 43. Tipos de União de Template (Template Union Types)
---


Tipos de união de template podem ser usados para mesclar e manipular texto dentro do sistema de tipos, por exemplo:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

