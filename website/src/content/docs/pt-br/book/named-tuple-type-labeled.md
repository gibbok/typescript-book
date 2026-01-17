---
title: Tipo Tupla Nomeada (Rotulada)
sidebar:
  order: 29
  label: 29. Tipo Tupla Nomeada (Rotulada)
---


Tipos de tupla podem incluir rótulos ou nomes opcionais para cada elemento. Esses rótulos são para legibilidade e assistência de ferramentas, e não afetam as operações que você pode realizar com eles.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Tupla Nomeada mais Tupla Anônima
```

