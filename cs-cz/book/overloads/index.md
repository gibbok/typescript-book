# Přetížení



Přetížení funkcí v TypeScriptu umožňuje definovat více signatur pro jeden název funkce, takže ji lze volat různými způsoby. Zde je příklad:

```typescript
// Přetížení
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implementace
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Platné
sayHi(['aa', 'bb']); // Platné
```

Zde je další příklad použití přetížení funkcí ve třídě (`class`):

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // přetížení
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // implementace
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

