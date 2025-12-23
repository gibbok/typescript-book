---
title: Controllo di esaustività
sidebar:
  order: 26
  label: 26. Controllo di esaustività
---


Il controllo di esaustività è una funzionalità di TypeScript che garantisce che tutti i possibili casi di unione discriminata vengano gestiti in un'istruzione `switch` o in un'istruzione `if`.

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log("Spostamento verso l'alto");
            break;
        case 'down':
            console.log('Spostamento verso il basso');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // Questa riga non verrà mai eseguita
    }
};
```

Il tipo `never` viene utilizzato per garantire che il caso predefinito sia esaustivo e che TypeScript generi un errore se un nuovo valore viene aggiunto al tipo Direction senza essere gestito nell'istruzione switch.

