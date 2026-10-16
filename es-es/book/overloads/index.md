# Sobrecargas



Las sobrecargas de funciones de TypeScript permiten definir varias firmas para un mismo nombre, de modo que la función pueda llamarse de distintas formas. Este es un ejemplo:

```typescript
// Sobrecargas
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implementación
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Válido
sayHi(['aa', 'bb']); // Válido
```

Este es otro ejemplo de sobrecargas de funciones dentro de una `class`:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // Sobrecarga
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // Implementación
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

