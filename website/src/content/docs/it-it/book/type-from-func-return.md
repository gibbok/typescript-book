---
title: Tipo da Ritorno Funzione
sidebar:
  order: 35
  label: 35. Tipo da Ritorno Funzione
---


Il tipo da Ritorno Funzione si riferisce alla possibilità di inferire automaticamente il tipo di ritorno di una funzione in base alla sua implementazione. Ciò consente a TypeScript di determinare il tipo del valore restituito dalla funzione senza annotazioni di tipo esplicite.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript può dedurre che il tipo restituito dalla funzione sia un numero
```

