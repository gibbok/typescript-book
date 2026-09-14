---
title: Odvozování typů pomocí infer v podmíněných typech
sidebar:
  order: 42
  label: 42. Odvozování typů pomocí infer v podmíněných typech
---


Klíčové slovo `infer` se v podmíněných typech používá k odvození (extrakci) typu generického parametru z typu, který na něm závisí. To umožňuje psát flexibilnější a opakovaně použitelné definice typů.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

