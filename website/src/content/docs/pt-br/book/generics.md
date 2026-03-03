---
title: Generics
sidebar:
  order: 55
  label: 55. Generics
---


Generics fornecem uma maneira de criar componentes reutilizáveis que funcionam com vários tipos em vez de um único tipo.

### Tipo Generic

```typescript
function identity<T>(value: T): T {
    return value;
}

const numberValue = identity<number>(42);
const stringValue = identity<string>('hello');
```

### Classes Generic

```typescript
class Box<T> {
    private content: T;

    constructor(content: T) {
        this.content = content;
    }

    getContent(): T {
        return this.content;
    }
}

const stringBox = new Box<string>('hello');
const numberBox = new Box<number>(42);
```

### Restrições Generic

Você pode restringir tipos genéricos usando extends:

```typescript
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(value: T): void {
    console.log(value.length);
}

logLength('hello'); // 5
logLength([1, 2, 3]); // 3
```

### Narrowing contextual generic

TypeScript pode estreitar tipos genéricos com base no contexto:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        console.log(value.toUpperCase()); // value é string aqui
    } else if (typeof value === 'number') {
        console.log(value.toFixed(2)); // value é number aqui
    }
}
```

