---
title: Types union de littéraux de gabarit
sidebar:
  order: 44
  label: 44. Types union de littéraux de gabarit
---


Les types union de littéraux de gabarit peuvent servir à fusionner et à manipuler du texte au sein du système de types, par exemple :

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

