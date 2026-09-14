---
title: Pojmenovaný typ n-tice (s popisky)
sidebar:
  order: 30
  label: 30. Pojmenovaný typ n-tice (s popisky)
---


Typy n-tic mohou obsahovat volitelné popisky nebo názvy pro každý prvek. Tyto popisky slouží ke zlepšení čitelnosti a usnadňují práci nástrojům a neovlivňují operace, které s nimi můžete provádět.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

