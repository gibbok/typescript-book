---
title: Uttömmande kontroll
sidebar:
  order: 26
  label: 26. Uttömmande kontroll
---


Uttömmande kontroll är en funktion i TypeScript som säkerställer att alla möjliga fall av en diskriminerad union hanteras i en `switch`-sats eller en `if`-sats.

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

`never`-typen används för att säkerställa att default-fallet är uttömmande och att TypeScript kommer att ge ett fel om ett nytt värde läggs till i Direction-typen utan att det hanteras i switch-satsen.

