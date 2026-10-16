# Tipos literales



Un tipo literal es un conjunto de un solo elemento dentro de un tipo colectivo; define un valor muy concreto que es un primitivo de JavaScript.

Los tipos literales de TypeScript son números, cadenas y booleanos.

Ejemplos de literales:

```typescript
const a = 'a'; // Tipo literal de cadena
const b = 1; // Tipo literal numérico
const c = true; // Tipo literal booleano
```

Los tipos literales de cadena, numéricos y booleanos se utilizan en uniones, guardas de tipo y alias de tipo.
En el siguiente ejemplo puedes ver un alias de tipo de unión. `O` consta únicamente de los valores especificados; ninguna otra cadena es válida:

```typescript
type O = 'a' | 'b' | 'c';
```

