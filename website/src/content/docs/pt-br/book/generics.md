---
title: Genéricos (Generics)
sidebar:
  order: 55
  label: 55. Genéricos (Generics)
---


Os genéricos permitem que você crie componentes e funções reutilizáveis que podem trabalhar com múltiplos tipos. Com os genéricos, você pode parametrizar tipos, funções e interfaces, permitindo que operem em diferentes tipos sem especificá-los explicitamente de antemão.

Os genéricos permitem tornar o código mais flexível e reutilizável.

### Tipo Genérico

Para definir um tipo genérico, você usa colchetes angulares (`<>`) para especificar os parâmetros de tipo, por exemplo:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Classes Genéricas

Os genéricos também podem ser aplicados a classes, permitindo que trabalhem com múltiplos tipos por meio de parâmetros de tipo. Isso é útil para criar definições de classe reutilizáveis que podem operar em diferentes tipos de dados mantendo a segurança de tipo.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### Restrições Genéricas (Generic Constraints)

Parâmetros genéricos podem ser restringidos usando a palavra-chave `extends` seguida por um tipo ou interface que o parâmetro de tipo deve satisfazer.

No exemplo a seguir, T deve conter uma propriedade `length` para ser válido:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Inválido
```

Um recurso interessante de genéricos introduzido na versão 3.4 RC é a inferência de tipo de função de ordem superior, que introduziu argumentos de tipo genérico propagados:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

Essa funcionalidade permite uma programação de estilo sem pontos (pointfree) com segurança de tipo mais fácil, o que é comum na programação funcional.

### Estreitamento Contextual Genérico

O estreitamento contextual (contextual narrowing) para genéricos é o mecanismo no TypeScript que permite ao compilador estreitar o tipo de um parâmetro genérico com base no contexto em que é usado. É útil ao trabalhar com tipos genéricos em declarações condicionais:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // O valor é estreitado para o tipo 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // O valor é estreitado para o tipo 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

