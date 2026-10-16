---
title: Typ från funktionsreturvärde
sidebar:
  order: 36
  label: 36. Typ från funktionsreturvärde
---


Typ från funktionsreturvärde avser möjligheten att automatiskt härleda returtypen av en funktion baserat på dess implementation. Detta gör att TypeScript kan bestämma typen av det värde som returneras av funktionen utan explicita typannoteringar.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript kan härleda att funktionens returtyp är number
```

