---
title: Tipo de tupla con nombres (etiquetada)
sidebar:
  order: 30
  label: 30. Tipo de tupla con nombres (etiquetada)
---


Los tipos de tupla pueden incluir etiquetas o nombres opcionales para cada elemento. Estas etiquetas mejoran la legibilidad y la asistencia de las herramientas, pero no afectan a las operaciones que pueden realizarse.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

