---
title: Typ never
sidebar:
  order: 48
  label: 48. Typ never
---


Der Typ `never` stellt Werte dar, die niemals auftreten. Er wird verwendet, um Funktionen oder Ausdrücke zu kennzeichnen, die entweder niemals zurückkehren oder einen Fehler auslösen.

Zum Beispiel eine Endlosschleife:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // etwas tun
    }
};
```

Auslösen eines Fehlers:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Der Typ `never` ist nützlich, um Typsicherheit zu gewährleisten und potenzielle Fehler in Ihrem Code zu erkennen. In Kombination mit anderen Typen und Kontrollflussanweisungen hilft er TypeScript dabei, präzisere Typen zu analysieren und abzuleiten, zum Beispiel:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // nach oben bewegen
            break;
        case 'down':
            // nach unten bewegen
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

