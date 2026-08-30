# Vollständigkeitsprüfung



Die Vollständigkeitsprüfung ist eine Funktion von TypeScript, die sicherstellt, dass alle möglichen Fälle einer diskriminierten Union in einer `switch`- oder `if`-Anweisung behandelt werden.

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

Der Typ `never` wird verwendet, um sicherzustellen, dass der Standardfall vollständig ist und TypeScript einen Fehler ausgibt, wenn dem Typ Direction ein neuer Wert hinzugefügt wird, ohne dass dieser in der switch-Anweisung behandelt wird.

