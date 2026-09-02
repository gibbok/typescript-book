# Тип never



Тип `never` представляет значения, которые никогда не возникают. Он используется для обозначения функций или выражений, которые никогда не возвращают управление либо выбрасывают ошибку.

Например, бесконечный цикл:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Выбрасывание ошибки:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Тип `never` полезен для обеспечения типобезопасности и выявления потенциальных ошибок в коде. Он помогает TypeScript анализировать и выводить более точные типы при использовании совместно с другими типами и операторами управления потоком выполнения, например:

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

