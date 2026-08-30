---
title: Krotka o stałej długości
sidebar:
  order: 31
  label: 31. Krotka o stałej długości
---


Krotka o stałej długości to szczególny rodzaj krotki, który wymusza stałą liczbę elementów określonych typów i zabrania modyfikowania długości krotki po jej zdefiniowaniu.

Krotki o stałej długości są przydatne, gdy trzeba reprezentować kolekcję wartości o określonej liczbie elementów i określonych typach oraz zapewnić, że długość i typy krotki nie zostaną przypadkowo zmienione.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

