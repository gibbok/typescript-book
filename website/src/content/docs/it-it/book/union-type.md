---
title: Tipo Unione
sidebar:
  order: 34
  label: 34. Tipo Unione
---


Un Tipo Unione è un tipo che rappresenta un valore che può essere di diversi tipi. I Tipi Unione sono indicati con il simbolo `|` tra ogni tipo possibile.

```typescript
let x: string | number;
x = 'hello'; // Valido
x = 123; // Valido
```

