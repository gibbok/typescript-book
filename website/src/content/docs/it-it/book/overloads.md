---
title: Sovraccarichi
sidebar:
  order: 51
  label: 51. Sovraccarichi
---


Gli overload di funzione in TypeScript consentono di definire più firme di funzione per un singolo nome di funzione, consentendo di definire funzioni che possono essere chiamate in più modi. Ecco un esempio:

```typescript
// Sovraccarichi
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implementazione
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Ciao, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Ciao, ${name}!`);
    }
    throw new Error('Valore non valido');
}

sayHi('xx'); // Valido
sayHi(['aa', 'bb']); // Valido
```

Ecco un altro esempio di utilizzo di overload di funzione all'interno di una `class`:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // Sovraccarichi
    sayHi(name: string): string;
    sayHi(name: string[]): ReadonlyArray<string>;

    // Implementazione
    sayHi(name: unknown): unknown {
        if (typeof name === 'string') {
            return `${this.message}, ${name}!`;
        } else if (Array.isArray(name)) {
            return name.map(name => `${this.message}, ${name}!`);
        }
        throw new Error('value is invalid');
    }
}
console.log(new Greeter('Hello').sayHi('Simon'));
```

