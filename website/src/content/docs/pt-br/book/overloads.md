---
title: Sobrecargas (Overloads)
sidebar:
  order: 51
  label: 51. Sobrecargas (Overloads)
---


As sobrecargas de função (function overloads) no TypeScript permitem definir múltiplas assinaturas para um mesmo nome de função, permitindo que as funções sejam chamadas de diversas maneiras. Aqui está um exemplo:

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
    throw new Error('Valor inválido');
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
        throw new Error('o valor é inválido');
    }
}
console.log(new Greeter('Hello').sayHi('Simon'));
```

