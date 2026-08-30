---
title: Typinferenz mit infer in bedingten Typen
sidebar:
  order: 42
  label: 42. Typinferenz mit infer in bedingten Typen
---


Das Schlüsselwort `infer` wird in bedingten Typen verwendet, um den Typ eines generischen Parameters aus einem von ihm abhängigen Typ abzuleiten (zu extrahieren). Dadurch können Sie flexiblere und wiederverwendbare Typdefinitionen schreiben.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

