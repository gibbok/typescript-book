---
title: Tupel mit fester Länge
sidebar:
  order: 31
  label: 31. Tupel mit fester Länge
---


Ein Tupel mit fester Länge ist eine bestimmte Art von Tupel, die eine feste Anzahl von Elementen bestimmter Typen erzwingt und nach der Definition keine Änderungen an der Länge des Tupels zulässt.

Tupel mit fester Länge sind nützlich, wenn Sie eine Sammlung von Werten mit einer bestimmten Anzahl von Elementen und bestimmten Typen darstellen müssen und sicherstellen möchten, dass die Länge und die Typen des Tupels nicht versehentlich geändert werden können.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

