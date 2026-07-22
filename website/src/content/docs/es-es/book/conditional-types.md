---
title: Tipos condicionales
sidebar:
  order: 42
  label: 42. Tipos condicionales
---


Los tipos condicionales permiten crear un tipo que depende de una condición, cuyo resultado determina el tipo que se creará. Se definen mediante la palabra clave `extends` y un operador ternario para elegir entre dos tipos.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

