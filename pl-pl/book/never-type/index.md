# Typ never



Typ `never` reprezentuje wartości, które nigdy nie występują. Służy do oznaczania funkcji lub wyrażeń, które nigdy nie zwracają wartości albo zgłaszają błąd.

Na przykład nieskończona pętla:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Zgłaszanie błędu:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Typ `never` jest przydatny do zapewniania bezpieczeństwa typów i wykrywania potencjalnych błędów w kodzie. Pomaga TypeScript analizować i wnioskować bardziej precyzyjne typy, gdy jest używany w połączeniu z innymi typami i instrukcjami przepływu sterowania, na przykład:

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

