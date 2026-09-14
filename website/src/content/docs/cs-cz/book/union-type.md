---
title: Sjednocený typ
sidebar:
  order: 32
  label: 32. Sjednocený typ
---


Sjednocený typ je typ, který představuje hodnotu, jež může být jedním z několika typů. Sjednocené typy se zapisují pomocí symbolu `|` mezi jednotlivými možnými typy.

```typescript
let x: string | number;
x = 'hello'; // Valid
x = 123; // Valid
```

