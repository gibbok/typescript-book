---
title: Tipo di tupla denominato (etichettato)
sidebar:
  order: 29
  label: 29. Tipo di tupla denominato (etichettato)
---


I tipi di tupla possono includere etichette o nomi opzionali per ciascun elemento. Queste etichette servono per migliorare la leggibilità e facilitare l'utilizzo degli strumenti e non influiscono sulle operazioni che è possibile eseguire con esse.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Tupla con nome più Tupla anonima
```

