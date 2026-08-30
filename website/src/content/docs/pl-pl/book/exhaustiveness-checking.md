---
title: Sprawdzanie kompletności
sidebar:
  order: 27
  label: 27. Sprawdzanie kompletności
---


Sprawdzanie kompletności to funkcja TypeScript, która zapewnia obsługę wszystkich możliwych przypadków unii dyskryminowanej w instrukcji `switch` lub instrukcji `if`.

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

Typ `never` służy do zapewnienia kompletności przypadku domyślnego oraz do zagwarantowania, że TypeScript zgłosi błąd, jeśli do typu Direction zostanie dodana nowa wartość bez jej obsługi w instrukcji `switch`.

