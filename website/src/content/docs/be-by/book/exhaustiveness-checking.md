---
title: Exhaustiveness checking
sidebar:
  order: 26
  label: 26. Exhaustiveness checking
---


Exhaustiveness checking is a feature in TypeScript that ensures all possible cases of a discriminated union are handled in a `switch` statement or an `if` statement.

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log('Moving up');
            break;
        case 'down':
            console.log('Moving down');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // This line will never be executed
    }
};
```

The `never` type is used to ensure that the default case is exhaustive and that TypeScript will raise an error if a new value is added to the Direction type without being handled in the switch statement.

