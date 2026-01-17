---
title: Sobrecargas
sidebar:
  order: 51
  label: 51. Sobrecargas
---


Sobrecargas de função no TypeScript permitem que você defina múltiplas assinaturas de função para um único nome de função, permitindo que você defina funções que podem ser chamadas de várias maneiras. Aqui está um exemplo:

```typescript
// Sobrecargas
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implementação
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

Aqui está outro exemplo de uso de sobrecargas de função dentro de uma `class`:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // sobrecarga
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // implementação
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

