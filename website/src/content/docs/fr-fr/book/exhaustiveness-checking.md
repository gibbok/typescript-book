---
title: Vérification de l'exhaustivité
sidebar:
  order: 27
  label: 27. Vérification de l'exhaustivité
---


La vérification de l'exhaustivité est une fonctionnalité de TypeScript qui garantit que tous les cas possibles d'une union discriminée sont traités dans une instruction `switch` ou une instruction `if`.

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

Le type `never` permet de garantir que le cas par défaut est exhaustif et que TypeScript signalera une erreur si une nouvelle valeur est ajoutée au type Direction sans être traitée dans l'instruction switch.

