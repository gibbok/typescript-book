# Type never



Le type `never` représente les valeurs qui ne se produisent jamais. Il sert à désigner des fonctions ou des expressions qui ne renvoient jamais de valeur ou lèvent une erreur.

Par exemple, une boucle infinie :

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Levée d'une erreur :

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Le type `never` permet de garantir la sûreté des types et de détecter des erreurs potentielles dans votre code. Il aide TypeScript à analyser et à inférer des types plus précis lorsqu'il est utilisé avec d'autres types et des instructions de flux de contrôle, par exemple :

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

