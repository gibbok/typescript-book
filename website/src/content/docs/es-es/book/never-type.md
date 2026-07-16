---
title: Tipo never
sidebar:
  order: 47
  label: 47. Tipo never
---


El tipo `never` representa valores que nunca se producen. Se utiliza para indicar funciones o expresiones que nunca devuelven un valor o que lanzan un error.

Por ejemplo, un bucle infinito:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Lanzar un error:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

El tipo `never` ayuda a garantizar la seguridad de tipos y detectar posibles errores. Permite que TypeScript analice e infiera tipos más precisos al combinarlo con otros tipos y sentencias de flujo de control. Por ejemplo:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // move up
            break;
        case 'down':
            // move down
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

