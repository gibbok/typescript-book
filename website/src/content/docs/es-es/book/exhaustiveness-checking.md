---
title: Comprobación exhaustiva
sidebar:
  order: 27
  label: 27. Comprobación exhaustiva
---


La comprobación exhaustiva garantiza que todos los casos posibles de una unión discriminada se gestionen en una sentencia `switch` o `if`.

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

El tipo `never` garantiza que el caso predeterminado sea exhaustivo y que TypeScript genere un error si se añade un nuevo valor al tipo Direction sin gestionarlo en la sentencia switch.

