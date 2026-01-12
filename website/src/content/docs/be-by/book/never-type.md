---
title: Never type
sidebar:
  order: 47
  label: 47. Never type
---


The `never` type represents values that never occur. It is used to denote functions or expressions that never return or throw an error.

For instance an infinite loop:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Throwing an error:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

The `never` type is useful in ensuring type safety and catching potential errors in your code. It helps TypeScript analyze and infer more precise types when used in combination with other types and control flow statements, for instance:

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

