# Проверка исчерпываемости



Проверка исчерпываемости — это возможность TypeScript убедиться, что в инструкции `switch` или `if` обработаны все возможные варианты дискриминируемого объединения.

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

Тип `never` используется для обеспечения исчерпывающего охвата в ветви по умолчанию: TypeScript выдаст ошибку, если в тип Direction будет добавлено новое значение, которое не обрабатывается в инструкции switch.

