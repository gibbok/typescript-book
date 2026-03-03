---
title: Användning av Never-typen
sidebar:
  order: 47
  label: 47. Användning av Never-typen
---


Typen `never` representerar värden som aldrig förekommer. Den används för att beteckna funktioner eller uttryck som aldrig returnerar eller kastar ett fel.

Till exempel en oändlig loop:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Kasta ett fel:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Typen `never` är användbar för att säkerställa typsäkerhet och fånga potentiella fel i din kod. Den hjälper TypeScript att analysera och härleda mer precisa typer när den används i kombination med andra typer och kontrollflödessatser, till exempel:

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

