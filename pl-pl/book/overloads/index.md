# Przeciążenia



Przeciążenia funkcji w TypeScript pozwalają zdefiniować wiele sygnatur funkcji dla jednej nazwy, umożliwiając tworzenie funkcji, które można wywoływać na wiele sposobów. Oto przykład:

```typescript
// Przeciążenia
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implementacja
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Poprawne
sayHi(['aa', 'bb']); // Poprawne
```

Oto kolejny przykład użycia przeciążeń funkcji wewnątrz deklaracji `class`:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // przeciążenie
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // implementacja
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

