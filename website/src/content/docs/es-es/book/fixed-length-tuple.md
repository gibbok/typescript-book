---
title: Tupla de longitud fija
sidebar:
  order: 31
  label: 31. Tupla de longitud fija
---


Una tupla de longitud fija impone un número fijo de elementos de tipos concretos e impide modificar su longitud una vez definida.

Las tuplas de longitud fija resultan útiles para representar una colección con una cantidad y unos tipos de elementos concretos, garantizando que la longitud y los tipos no se cambien accidentalmente.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

