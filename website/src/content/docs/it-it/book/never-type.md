---
title: Tipo Never
sidebar:
  order: 47
  label: 47. Tipo Never
---


Il tipo `never` rappresenta valori che non si verificano mai. Viene utilizzato per indicare funzioni o espressioni che non restituiscono mai né generano errori.

Ad esempio, un ciclo infinito:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // fai qualcosa
    }
};
```

Generazione di un errore:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Il tipo `never` è utile per garantire la sicurezza dei tipi e rilevare potenziali errori nel codice. Aiuta TypeScript ad analizzare e dedurre tipi più precisi se utilizzato in combinazione con altri tipi e istruzioni di controllo del flusso, ad esempio:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // sposta verso l'alto
            break;
        case 'down':
            // sposta verso il basso
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

