# Surcharges



En TypeScript, les surcharges de fonction permettent de définir plusieurs signatures de fonction pour un seul nom de fonction, ce qui permet de définir des fonctions pouvant être appelées de plusieurs manières. En voici un exemple :

```typescript
// Surcharges
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implémentation
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Valide
sayHi(['aa', 'bb']); // Valide
```

Voici un autre exemple d'utilisation de surcharges de fonction au sein d'une `class` :

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // surcharge
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // implémentation
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

