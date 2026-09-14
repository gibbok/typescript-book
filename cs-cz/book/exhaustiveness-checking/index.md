# Kontrola úplnosti



Kontrola úplnosti je funkce TypeScriptu, která zajišťuje, že jsou v příkazu `switch` nebo `if` ošetřeny všechny možné případy diskriminovaného sjednocení.

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

Typ `never` slouží k zajištění úplnosti výchozí větve a toho, že TypeScript vyvolá chybu, pokud je do typu Direction přidána nová hodnota, která není ošetřena v příkazu switch.

