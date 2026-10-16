---
title: Typ never
sidebar:
  order: 48
  label: 48. Typ never
---


Typ `never` představuje hodnoty, které nikdy nenastanou. Používá se k označení funkcí nebo výrazů, které se nikdy nevrátí nebo vyhodí chybu.

Například nekonečná smyčka:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // provést nějakou akci
    }
};
```

Vyhození chyby:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Typ `never` je užitečný pro zajištění typové bezpečnosti a zachycení potenciálních chyb v kódu. V kombinaci s jinými typy a příkazy řízení toku pomáhá TypeScriptu analyzovat a odvozovat přesnější typy, například:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // posunout nahoru
            break;
        case 'down':
            // posunout dolů
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

