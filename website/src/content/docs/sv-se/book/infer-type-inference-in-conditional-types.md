---
title: infer-typinferens i villkorliga typer
sidebar:
  order: 41
  label: 41. infer-typinferens i villkorliga typer
---


Nyckelordet `infer` används i villkorliga typer för att härleda (extrahera) typen av en generisk parameter från en typ som beror på den. Detta gör att du kan skriva mer flexibla och återanvändbara typdefinitioner.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

