---
title: Never тип
sidebar:
  order: 48
  label: 48. Never тип
---


Типът `never` представлява стойности, които никога не се появяват. Той се използва за обозначаване на функции или изрази, които никога не връщат стойност или хвърлят грешка.

Например безкраен цикъл:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Хвърляне на грешка:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Типът `never` е полезен за гарантиране на type безопасност и откриване на потенциални грешки във вашия код. Той помага на TypeScript да анализира и извежда по-прецизни типове, когато се използва в комбинация с други типове и конструкции за control flow, например:

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

