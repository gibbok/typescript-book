---
title: Outros
sidebar:
  order: 61
  label: 61. Outros
---


### Erros e Tratamento de Exceções

TypeScript permite capturar e tratar erros usando mecanismos padrão de tratamento de erro JavaScript:

```typescript
try {
    throw new Error('Something went wrong');
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
} finally {
    console.log('Cleanup');
}
```

Tipos de erro personalizados:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}
```

### Classes mixin

Classes mixin permitem combinar e compor comportamento de múltiplas classes em uma única classe:

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();
    };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        isActivated = false;
        activate() {
            this.isActivated = true;
        }
    };
}

class User {
    name = '';
}

const TimestampedUser = Timestamped(User);
const TimestampedActivatableUser = Timestamped(Activatable(User));
```

### Recursos de Linguagem Assíncrona

TypeScript tem recursos assíncronos integrados do JavaScript:

#### Promises

```typescript
const fetchData = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Data fetched'), 1000);
    });
};
```

#### Async/Await

<!-- skip -->
```typescript
async function getData(): Promise<string> {
    const data = await fetchData();
    return data;
}
```

### Iteradores e Geradores

#### Iteradores

```typescript
class NumberIterator implements Iterator<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    next(): IteratorResult<number> {
        if (this.current <= this.end) {
            return { value: this.current++, done: false };
        }
        return { value: undefined, done: true };
    }
}
```

#### Geradores

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (const num of numberGenerator(1, 5)) {
    console.log(num);
}
```

### Referência JSDoc do TsDocs

TypeScript suporta anotações JSDoc para fornecer informações de tipo em código JavaScript:

<!-- skip -->
```typescript
/**
 * Adiciona dois números
 * @param {number} a - O primeiro número
 * @param {number} b - O segundo número
 * @returns {number} A soma de a e b
 */
function add(a, b) {
    return a + b;
}
```

### @types

Pacotes sob a organização @types são convenções especiais de nomenclatura de pacotes usadas para fornecer definições de tipo para bibliotecas JavaScript existentes:

```shell
npm install --save-dev @types/node
npm install --save-dev @types/react
```

### JSX

JSX é uma extensão de sintaxe para JavaScript que permite escrever código semelhante a HTML em seus arquivos TypeScript:

<!-- skip -->
```typescript
const element = <h1>Hello, world!</h1>;

type Props = {
    name: string;
};

const Greeting = ({ name }: Props) => <h1>Hello, {name}!</h1>;
```

### Módulos ES6

TypeScript suporta módulos ES6:

<!-- skip -->
```typescript
// export
export const PI = 3.14;
export function circle(radius: number) {
    return 2 * PI * radius;
}

// import
import { PI, circle } from './math';

// default export
export default class Calculator {}

// default import
import Calculator from './Calculator';
```

### Operador de Exponenciação ES7

```typescript
const result = 2 ** 3; // 8
```

### A Instrução for-await-of

Permite iterar sobre objetos iteráveis assíncronos:

```typescript
async function* asyncGenerator() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncGenerator()) {
        console.log(num);
    }
})();
```

### Meta-propriedade new target

Permite determinar se uma função ou construtor foi invocado usando o operador new:

```typescript
class Parent {
    constructor() {
        console.log(new.target);
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parent = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### Expressões de Import Dinâmico

Permite carregar módulos condicionalmente ou sob demanda:

<!-- skip -->
```typescript
async function loadModule() {
    if (condition) {
        const module = await import('./module');
        module.doSomething();
    }
}
```

### "tsc –watch"

Inicia o compilador TypeScript em modo watch:

```shell
tsc --watch
```

### Operador de Asserção Não-nulo

O operador `!` afirma que um valor não é null ou undefined:

```typescript
function getValue(value: string | null) {
    const len = value!.length; // Afirma que value não é null
}
```

### Declarações com valor padrão

Parâmetros de função podem ter valores padrão:

```typescript
function greet(name: string = 'Guest') {
    console.log(`Hello, ${name}`);
}

greet(); // Hello, Guest
greet('John'); // Hello, John
```

### Encadeamento Opcional

O operador `?.` permite acessar propriedades que podem ser null ou undefined:

```typescript
type Person = {
    name: string;
    address?: {
        street: string;
        city: string;
    };
};

const person: Person = { name: 'John' };
console.log(person.address?.city); // undefined
```

### Operador de coalescência nula

O operador `??` retorna o valor do lado direito se o lado esquerdo for null ou undefined:

```typescript
const value1 = null ?? 'default'; // 'default'
const value2 = 0 ?? 'default'; // 0
const value3 = '' ?? 'default'; // ''
```

### Tipos Literais de Template

Tipos literais de template permitem criar novos tipos string manipulando tipos string existentes:

```typescript
type World = 'world';
type Greeting = `hello ${World}`; // 'hello world'

type EmailLocaleIDs = 'welcome_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// 'welcome_email_id' | 'email_heading_id' | 'footer_title_id' | 'footer_sendoff_id'
```

### Sobrecarga de função

Permite definir múltiplas assinaturas para a mesma função:

```typescript
function parse(value: string): string[];
function parse(value: number): number;
function parse(value: string | number): string[] | number {
    if (typeof value === 'string') {
        return value.split(',');
    }
    return value;
}
```

### Tipos Recursivos

Tipos que se referem a si mesmos:

```typescript
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

const data: JSONValue = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'coding'],
    address: {
        city: 'New York',
        country: 'USA',
    },
};
```

### Tipos Condicionais Recursivos

Tipos condicionais que se referem a si mesmos:

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type Nested = [[[string]]];
type Flat = Flatten<Nested>; // string
```

### Suporte a Módulo ECMAScript no Node

TypeScript suporta módulos ECMAScript no Node.js usando a extensão `.mts` ou configurando `"type": "module"` no package.json:

<!-- skip -->
```typescript
// math.mts
export const add = (a: number, b: number) => a + b;

// app.mts
import { add } from './math.mjs';
```

### Funções de Asserção

Funções de asserção permitem expressar verificações invariantes que lançam um erro se a condição não for satisfeita:

<!-- skip -->
```typescript
function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new AssertionError(msg);
    }
}

function processValue(value: string | null) {
    assert(value !== null, 'Value cannot be null');
    console.log(value.toUpperCase()); // value é string aqui
}
```

### Tipos Tuple Variádicos

Tuples que podem ter um número variável de elementos:

```typescript
type Tuple<T extends any[]> = [string, ...T, number];

type T1 = Tuple<[boolean]>; // [string, boolean, number]
type T2 = Tuple<[boolean, string]>; // [string, boolean, string, number]
```

### Tipos boxed

Tipos primitivos têm contrapartes de objeto correspondentes (boxed types):

```typescript
// Primitivos
const str: string = 'hello';
const num: number = 42;
const bool: boolean = true;

// Boxed (geralmente não recomendado)
const strObj: String = new String('hello');
const numObj: Number = new Number(42);
const boolObj: Boolean = new Boolean(true);
```

### Covariância e Contravariância no TypeScript

Covariância e contravariância descrevem como os relacionamentos de tipos funcionam com herança:

```typescript
// Covariância (arrays)
class Animal {
    name: string = '';
}
class Dog extends Animal {
    bark() {}
}

let animals: Animal[] = [];
let dogs: Dog[] = [];
animals = dogs; // Válido: Dog[] é atribuível a Animal[]

// Contravariância (funções)
type Logger<T> = (value: T) => void;

let logAnimal: Logger<Animal> = animal => console.log(animal.name);
let logDog: Logger<Dog> = logAnimal; // Válido
```

#### Anotações de Variância Opcionais para Parâmetros de Tipo

TypeScript 4.7+ permite anotações explícitas de variância:

```typescript
type Producer<out T> = () => T; // Covariante
type Consumer<in T> = (value: T) => void; // Contravariante
type Mapper<in T, out U> = (value: T) => U; // Ambos
```

### Assinaturas de Índice de Padrão de String de Template

Permite usar padrões de template string em assinaturas de índice:

```typescript
type DataProps = {
    [key: `data-${string}`]: string;
};

const props: DataProps = {
    'data-id': '123',
    'data-name': 'John',
    // 'id': '456' // Erro
};
```

### O Operador satisfies

O operador `satisfies` permite verificar se um tipo satisfaz uma interface enquanto preserva o tipo mais específico:

<!-- skip -->
```typescript
type Color = 'red' | 'green' | 'blue';
type RGB = [number, number, number];

const color = { red: [255, 0, 0], green: '#00ff00' } satisfies Record<
    Color,
    RGB | string
>;

const redNormalized = color.red[0]; // OK: [255, 0, 0] é inferido como tuple
// const greenNormalized = color.green[0]; // Erro: string não tem índice
```

### Importações e Exportações Somente de Tipo

Permite importar e exportar apenas os tipos, não os valores:

<!-- skip -->
```typescript
// types.ts
export type User = {
    name: string;
    age: number;
};

// app.ts
import type { User } from './types';

export type { User };
```

### Declaração using e Gerenciamento Explícito de Recursos

A declaração `using` permite gerenciar recursos que precisam ser descartados:

<!-- skip -->
```typescript
{
    using resource = getResource();
    // Usa o resource
} // resource.dispose() é chamado automaticamente
```

#### Declaração await using

Para recursos assíncronos:

<!-- skip -->
```typescript
{
    await using connection = await getConnection();
    // Usa a connection
} // await connection.dispose() é chamado automaticamente
```

### Atributos de Import

Permite passar metadados adicionais para imports:

<!-- skip -->
```typescript
import data from './data.json' with { type: 'json' };
```

Atributos de Import do TypeScript 5.3 (rótulos para imports) dizem ao runtime como lidar com módulos (JSON, etc.). Isso melhora a segurança garantindo imports claros e alinha com a Content Security Policy (CSP) para carregamento de recursos mais seguro. O TypeScript garante que eles são válidos, mas deixa o runtime lidar com sua interpretação para tratamento específico de módulos.

Exemplo:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

com import dinâmico:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```
