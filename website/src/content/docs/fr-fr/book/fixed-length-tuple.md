---
title: Tuple de longueur fixe
sidebar:
  order: 31
  label: 31. Tuple de longueur fixe
---


Un tuple de longueur fixe est un type particulier de tuple qui impose un nombre fixe d'éléments de types précis et interdit toute modification de la longueur du tuple une fois celui-ci défini.

Les tuples de longueur fixe sont utiles lorsque vous devez représenter une collection de valeurs comportant un nombre précis d'éléments de types précis, et que vous souhaitez garantir que la longueur et les types du tuple ne puissent pas être modifiés par inadvertance.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

