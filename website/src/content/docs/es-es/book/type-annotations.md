---
title: Anotaciones de tipo
sidebar:
  order: 14
  label: 14. Anotaciones de tipo
---


En las variables declaradas mediante `var`, `let` y `const` puede añadirse un tipo de forma opcional:

```typescript
const x: number = 1;
```

TypeScript infiere bien los tipos, especialmente los sencillos, por lo que estas declaraciones no son necesarias en la mayoría de los casos.

En las funciones pueden añadirse anotaciones de tipo a los parámetros:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

El siguiente ejemplo utiliza una función anónima (también denominada función lambda):

```typescript
const sum = (a: number, b: number) => a + b;
```

Estas anotaciones pueden omitirse cuando un parámetro tiene un valor predeterminado:

```typescript
const sum = (a = 10, b: number) => a + b;
```

También pueden añadirse anotaciones del tipo de retorno a las funciones:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Esto resulta especialmente útil en funciones más complejas, ya que escribir el tipo de retorno antes de la implementación puede ayudarte a razonar sobre la función.

En general, considera anotar las firmas de tipo, pero no las variables locales del cuerpo, y añade siempre tipos a los literales de objeto.

