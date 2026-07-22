---
title: Tipos literales
sidebar:
  order: 19
  label: 19. Tipos literales
---


Un tipo literal es un conjunto de un solo elemento dentro de un tipo colectivo; define un valor muy concreto que es un primitivo de JavaScript.

Los tipos literales de TypeScript son números, cadenas y booleanos.

Ejemplos de literales:

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

Los tipos literales de cadena, numéricos y booleanos se utilizan en uniones, guardas de tipo y alias de tipo.
En el siguiente ejemplo puedes ver un alias de tipo de unión. `O` consta únicamente de los valores especificados; ninguna otra cadena es válida:

```typescript
type O = 'a' | 'b' | 'c';
```

