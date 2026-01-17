---
title: Outros
sidebar:
  order: 61
  label: 61. Outros
---


### Erros e Tratamento de Exceções

TypeScript permite capturar e lidar com erros usando mecanismos padrão de tratamento de erros do JavaScript:

Blocos Try-Catch-Finally:

```typescript
try {
    // Código que pode lançar um erro
} catch (error) {
    // Lidar com o erro
} finally {
    // Código que sempre executa, finally é opcional
}
```

Você também pode lidar com diferentes tipos de erro:

```typescript
try {
    // Código que pode lançar diferentes tipos de erros
} catch (error) {
    if (error instanceof TypeError) {
        // Lidar com TypeError
    } else if (error instanceof RangeError) {
        // Lidar com RangeError
    } else {
        // Lidar com outros erros
    }
}
```

Tipos de Erro Personalizados:

É possível especificar erros mais específicos estendendo a `class` Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Classes Mixin

Classes mixin permitem combinar e compor comportamentos de múltiplas classes em uma única classe. Elas fornecem uma maneira de reutilizar e estender funcionalidades sem a necessidade de cadeias de herança profundas.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Estender MyClass para incluir o comportamento de Identifiable e Selectable
interface MyClass extends Identifiable, Selectable {}

// Função para aplicar mixins a uma classe
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Aplicar os mixins a MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Recursos de Linguagem Assíncronos

Como TypeScript é um superconjunto de JavaScript, ele possui recursos de linguagem assíncronos integrados do JavaScript, tais como:

Promises:

Promises são uma forma de lidar com operações assíncronas e seus resultados usando métodos como `.then()` e `.catch()` para lidar com condições de sucesso e erro.

Para saber mais: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

As palavras-chave Async/await fornecem uma sintaxe mais parecida com código síncrono para trabalhar com Promises. A palavra-chave `async` é usada para definir uma função assíncrona, e a palavra-chave `await` é usada dentro de uma função async para pausar a execução até que uma Promise seja resolvida ou rejeitada.

Para saber mais:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

As seguintes APIs são bem suportadas em TypeScript:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iteradores e Geradores

Tanto Iteradores quanto Geradores são bem suportados em TypeScript.

Iteradores são objetos que implementam o protocolo de iterador, fornecendo uma maneira de acessar elementos de uma coleção ou sequência um por um. É uma estrutura que contém um ponteiro para o próximo elemento na iteração. Eles têm um método `next()` que retorna o próximo valor na sequência junto com um booleano indicando se a sequência está `done`.

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

Geradores são funções especiais definidas usando a sintaxe `function*` que simplificam a criação de iteradores. Eles usam a palavra-chave `yield` para definir a sequência de valores e automaticamente pausam e retomam a execução quando os valores são solicitados.

Geradores facilitam a criação de iteradores e são especialmente úteis para trabalhar com sequências grandes ou infinitas.

Exemplo:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript também suporta iteradores assíncronos e Geradores assíncronos.

Para saber mais:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Referência JSDoc do TsDocs

Ao trabalhar com uma base de código JavaScript, é possível ajudar o TypeScript a inferir o tipo correto usando comentários JSDoc com anotações adicionais para fornecer informações de tipo.

Exemplo:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

A documentação completa está disponível neste link:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

A partir da versão 3.7, é possível gerar definições de tipo .d.ts a partir da sintaxe JSDoc do JavaScript.
Mais informações podem ser encontradas aqui:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Pacotes sob a organização @types são convenções especiais de nomenclatura de pacotes usadas para fornecer definições de tipo para bibliotecas ou módulos JavaScript existentes. Por exemplo, usando:

```shell
npm install --save-dev @types/lodash
```

Isso instalará as definições de tipo do `lodash` em seu projeto atual.

Para contribuir com as definições de tipo dos pacotes @types, envie um pull request para [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) é uma extensão da sintaxe da linguagem JavaScript que permite escrever código semelhante a HTML dentro de seus arquivos JavaScript ou TypeScript. É comumente usado no React para definir a estrutura HTML.

TypeScript estende as capacidades do JSX fornecendo verificação de tipo e análise estática.

Para usar JSX, você precisa definir a opção de compilador `jsx` no seu arquivo `tsconfig.json`. Duas opções de configuração comuns:

* "preserve": emite arquivos .jsx com o JSX inalterado. Esta opção diz ao TypeScript para manter a sintaxe JSX como está e não transformá-la durante o processo de compilação. Você pode usar esta opção se tiver uma ferramenta separada, como Babel, que lida com a transformação.
* "react": habilita a transformação JSX integrada do TypeScript. React.createElement será usado.

Todas as opções estão disponíveis aqui:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Módulos ES6

TypeScript suporta ES6 (ECMAScript 2015) e muitas versões subsequentes. Isso significa que você pode usar sintaxe ES6, como arrow functions, template literals, classes, módulos, desestruturação e muito mais.

Para habilitar recursos ES6 em seu projeto, você pode especificar a propriedade `target` no tsconfig.json.

Um exemplo de configuração:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### Operador de Exponenciação ES7

O operador de exponenciação (`**`) calcula o valor obtido ao elevar o primeiro operando à potência do segundo operando. Ele funciona de forma semelhante a `Math.pow()`, mas com a capacidade adicional de aceitar BigInts como operandos.
TypeScript suporta totalmente este operador usando como `target` no seu arquivo tsconfig.json `es2016` ou versão maior.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### A Instrução for-await-of

Este é um recurso do JavaScript totalmente suportado em TypeScript que permite iterar sobre objetos iteráveis assíncronos a partir da versão target es2018.

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### Nova Meta-propriedade target

Você pode usar em TypeScript a meta-propriedade `new.target` que permite determinar se uma função ou construtor foi invocado usando o operador new. Ela permite detectar se um objeto foi criado como resultado de uma chamada de construtor.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Registra a função construtora usada para criar uma instância
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### Expressões de Importação Dinâmica

É possível carregar módulos condicionalmente ou carregá-los sob demanda usando a proposta ECMAScript para importação dinâmica, que é suportada em TypeScript.

A sintaxe para expressões de importação dinâmica em TypeScript é a seguinte:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Importação dinâmica
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

Este comando inicia um compilador TypeScript com o parâmetro `--watch`, com a capacidade de recompilar automaticamente arquivos TypeScript sempre que eles são modificados.

```shell
tsc --watch
```

A partir da versão 4.9 do TypeScript, o monitoramento de arquivos depende principalmente de eventos do sistema de arquivos, recorrendo automaticamente à pesquisa se um observador baseado em eventos não puder ser estabelecido.

### Operador de Asserção Não-nula

O Operador de Asserção Não-nula (Sufixo !) também chamado de Asserções de Atribuição Definitiva é um recurso do TypeScript que permite afirmar que uma variável ou propriedade não é null ou undefined, mesmo se a análise de tipo estático do TypeScript sugerir que pode ser. Com este recurso é possível remover qualquer verificação explícita.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Declarações Padrão

Declarações padrão são usadas quando uma variável ou parâmetro recebe um valor padrão. Isso significa que se nenhum valor for fornecido para aquela variável ou parâmetro, o valor padrão será usado.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Encadeamento Opcional

O operador de encadeamento opcional `?.` funciona como o operador de ponto regular (`.`) para acessar propriedades ou métodos. No entanto, ele lida graciosamente com valores null ou undefined terminando a expressão e retornando `undefined`, em vez de lançar um erro.

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### Operador de Coalescência Nula

O operador de coalescência nula `??` retorna o valor do lado direito se o lado esquerdo for `null` ou `undefined`; caso contrário, retorna o valor do lado esquerdo.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Tipos de Template Literal

Tipos de Template Literal permitem manipular valores string no nível de tipo e gerar novos tipos string com base em tipos existentes. Eles são úteis para criar tipos mais expressivos e precisos a partir de operações baseadas em string.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Sobrecarga de Função

A sobrecarga de função permite definir múltiplas assinaturas de função para o mesmo nome de função, cada uma com diferentes tipos de parâmetros e tipo de retorno.
Quando você chama uma função sobrecarregada, TypeScript usa os argumentos fornecidos para determinar a assinatura de função correta:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### Tipos Recursivos

Um Tipo Recursivo é um tipo que pode se referir a si mesmo. Isso é útil para definir estruturas de dados que têm uma estrutura hierárquica ou recursiva (potencialmente aninhamento infinito), como listas encadeadas, árvores e grafos.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Tipos Condicionais Recursivos

É possível definir relacionamentos de tipo complexos usando lógica e recursão em TypeScript.
Vamos detalhar em termos simples:

Tipos Condicionais: permitem definir tipos com base em condições booleanas:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Recursão: significa uma definição de tipo que se refere a si mesma dentro de sua própria definição:

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

Tipos Condicionais Recursivos combinam lógica condicional e recursão. Isso significa que uma definição de tipo pode depender de si mesma através de lógica condicional, criando relacionamentos de tipo complexos e flexíveis.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Suporte a Módulos ECMAScript no Node

Node.js adicionou suporte para Módulos ECMAScript a partir da versão 15.3.0, e TypeScript tem Suporte a Módulos ECMAScript para Node.js desde a versão 4.7. Este suporte pode ser habilitado usando a propriedade `module` com o valor `nodenext` no arquivo tsconfig.json. Aqui está um exemplo:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js suporta duas extensões de arquivo para módulos: `.mjs` para módulos ES e `.cjs` para módulos CommonJS. As extensões de arquivo equivalentes em TypeScript são `.mts` para módulos ES e `.cts` para módulos CommonJS. Quando o compilador TypeScript transpila esses arquivos para JavaScript, ele criará arquivos `.mjs` e `.cjs`.

Se você quiser usar módulos ES em seu projeto, pode definir a propriedade `type` como "module" no seu arquivo package.json. Isso instrui o Node.js a tratar o projeto como um projeto de módulo ES.

Além disso, TypeScript também suporta declarações de tipo em arquivos .d.ts. Esses arquivos de declaração fornecem informações de tipo para bibliotecas ou módulos escritos em TypeScript, permitindo que outros desenvolvedores os utilizem com a verificação de tipo e recursos de auto-completar do TypeScript.

### Funções de Asserção

Em TypeScript, funções de asserção são funções que indicam a verificação de uma condição específica com base em seu valor de retorno. Na sua forma mais simples, uma função assert examina um predicado fornecido e lança um erro quando o predicado avalia como false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Ou pode ser declarada como expressão de função:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Funções de asserção compartilham semelhanças com type guards. Type guards foram inicialmente introduzidos para realizar verificações em tempo de execução e garantir o tipo de um valor dentro de um escopo específico.
Especificamente, um type guard é uma função que avalia um predicado de tipo e retorna um valor booleano indicando se o predicado é verdadeiro ou falso. Isso difere ligeiramente das funções de asserção, onde a intenção é lançar um erro em vez de retornar false quando o predicado não é satisfeito.

Exemplo de type guard:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Tipos Tupla Variádicos

Tipos Tupla Variádicos são recursos introduzidos no TypeScript versão 4.0, vamos começar a aprendê-los revisando o que é uma tupla:

Um tipo tupla é um array que tem um comprimento definido, e onde o tipo de cada elemento é conhecido:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

O termo "variádico" significa aridade indefinida (aceitar um número variável de argumentos).

Uma tupla variádica é um tipo tupla que tem todas as propriedades anteriores, mas a forma exata ainda não está definida:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

No código anterior podemos ver que a forma da tupla é definida pelo genérico `T` passado.

Tuplas variádicas podem aceitar múltiplos genéricos, tornando-as muito flexíveis:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Com as novas tuplas variádicas podemos usar:

* Os spreads em sintaxe de tipo tupla agora podem ser genéricos, então podemos representar operações de ordem superior em tuplas e arrays mesmo quando não conhecemos os tipos reais sobre os quais estamos operando.
* Os elementos rest podem ocorrer em qualquer lugar em uma tupla.

Exemplo:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### Tipos Encaixotados

Tipos encaixotados referem-se aos objetos wrapper que são usados para representar tipos primitivos como objetos. Esses objetos wrapper fornecem funcionalidade e métodos adicionais que não estão disponíveis diretamente nos valores primitivos.

Quando você acessa um método como `charAt` ou `normalize` em uma primitiva `string`, JavaScript a envolve em um objeto `String`, chama o método e então descarta o objeto.

Demonstração:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript representa essa diferenciação fornecendo tipos separados para as primitivas e seus wrappers de objeto correspondentes:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Os tipos encaixotados geralmente não são necessários. Evite usar tipos encaixotados e, em vez disso, use o tipo para as primitivas, por exemplo `string` em vez de `String`.

### Covariância e Contravariância em TypeScript

Covariância e Contravariância são usadas para descrever como os relacionamentos funcionam ao lidar com herança ou atribuição de tipos.

Covariância significa que um relacionamento de tipo preserva a direção da herança ou atribuição, então se um tipo A é um subtipo do tipo B, então um array do tipo A também é considerado um subtipo de um array do tipo B. O importante a notar aqui é que o relacionamento de subtipo é mantido, o que significa que Covariância aceita subtipo mas não aceita supertipo.

Contravariância significa que um relacionamento de tipo inverte a direção da herança ou atribuição, então se um tipo A é um subtipo do tipo B, então um array do tipo B é considerado um subtipo de um array do tipo A. O relacionamento de subtipo é invertido, o que significa que Contravariância aceita supertipo mas não aceita subtipo.

Observação: Bivariância significa aceitar tanto supertipo quanto subtipo.

Exemplo: Digamos que temos um espaço para todos os animais e um espaço separado apenas para cães.

Na Covariância, você pode colocar todos os cães no espaço dos animais porque cães são um tipo de animal. Mas você não pode colocar todos os animais no espaço dos cães porque pode haver outros animais misturados.

Na Contravariância, você não pode colocar todos os animais no espaço dos cães porque o espaço dos animais pode conter outros animais também. No entanto, você pode colocar todos os cães no espaço dos animais porque todos os cães também são animais.

<!-- skip -->
```typescript
// Exemplo de Covariância
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Covariância permite atribuir array de subtipo (Dog) a array de supertipo (Animal)
animals = dogs;
dogs = animals; // Inválido: Type 'Animal[]' is not assignable to type 'Dog[]'

// Exemplo de Contravariância
type Feed<in T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = (animal: Animal) => {
    console.log(`Animal name: ${animal.name}`);
};

let feedDog: Feed<Dog> = (dog: Dog) => {
    console.log(`Dog name: ${dog.name}, Breed: ${dog.breed}`);
};

// Contravariância permite atribuir callback de supertipo (Animal) a callback de subtipo (Dog)
feedDog = feedAnimal;
feedAnimal = feedDog; // Inválido: Type 'Feed<Dog>' is not assignable to type 'Feed<Animal>'.
```

Em TypeScript, relacionamentos de tipo para arrays são covariantes, enquanto relacionamentos de tipo para parâmetros de função são contravariantes. Isso significa que TypeScript exibe tanto covariância quanto contravariância, dependendo do contexto.

#### Anotações de Variância Opcionais para Parâmetros de Tipo

A partir do TypeScript 4.7.0, podemos usar as palavras-chave `out` e `in` para ser específico sobre anotação de Variância.

Para Covariante, use a palavra-chave `out`:

```typescript
type AnimalCallback<out T> = () => T; // T é Covariante aqui
```

E para Contravariante, use a palavra-chave `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T é Contravariância aqui
```

### Assinaturas de Índice com Padrão de Template String

Assinaturas de índice com padrão de template string nos permitem definir assinaturas de índice flexíveis usando padrões de template string. Este recurso nos permite criar objetos que podem ser indexados com padrões específicos de chaves string, fornecendo mais controle e especificidade ao acessar e manipular propriedades.

TypeScript a partir da versão 4.4 permite assinaturas de índice para símbolos e padrões de template string.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### O Operador satisfies

O `satisfies` permite verificar se um determinado tipo satisfaz uma interface ou condição específica. Em outras palavras, ele garante que um tipo tenha todas as propriedades e métodos necessários de uma interface específica. É uma maneira de garantir que uma variável se encaixe em uma definição de tipo.
Aqui está um exemplo:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Anotação de tipo usando `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// Nas linhas seguintes, TypeScript não será capaz de inferir adequadamente
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Asserção de tipo usando `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Aqui também, TypeScript não será capaz de inferir adequadamente
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Usando o operador `satisfies` agora podemos inferir os tipos adequadamente
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infere corretamente: string[]
user3.nickName; // TypeScript infere corretamente: undefined
```

### Importações e Exportações Somente de Tipo

Importações e Exportações Somente de Tipo permitem importar ou exportar tipos sem importar ou exportar os valores ou funções associados a esses tipos. Isso pode ser útil para reduzir o tamanho do seu bundle.

Para usar importações somente de tipo, você pode usar a palavra-chave `import type`.

TypeScript permite usar extensões de arquivo de declaração e implementação (.ts, .mts, .cts e .tsx) em importações somente de tipo, independentemente das configurações de `allowImportingTsExtensions`.

Por exemplo:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

As seguintes formas são suportadas:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Declaração using e Gerenciamento Explícito de Recursos

Uma declaração `using` é uma vinculação de escopo de bloco, imutável, semelhante a `const`, usada para gerenciar recursos descartáveis. Quando inicializada com um valor, o método `Symbol.dispose` desse valor é registrado e subsequentemente executado ao sair do escopo de bloco envolvente.

Isso é baseado no recurso de Gerenciamento de Recursos do ECMAScript, que é útil para realizar tarefas essenciais de limpeza após a criação de objetos, como fechar conexões, excluir arquivos e liberar memória.

Observações:

* Devido à sua introdução recente no TypeScript versão 5.2, a maioria dos runtimes não possui suporte nativo. Você precisará de polyfills para: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Além disso, você precisará configurar seu tsconfig.json da seguinte forma:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Exemplo:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Polyfill simples

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Recurso é declarado
    console.log(2);
} // Recurso é descartado (ex., `work[Symbol.dispose]()` é avaliado)

console.log(3);
```

O código registrará:

```shell
1
2
disposed
3
```

Um recurso elegível para descarte deve aderir à interface `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

As declarações `using` registram operações de descarte de recursos em uma pilha, garantindo que eles sejam descartados na ordem inversa da declaração:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // descarta `C`, depois `B`, depois `A`.
```

Os recursos têm garantia de serem descartados, mesmo se ocorrerem código subsequente ou exceções. Isso pode levar ao descarte potencialmente lançar uma exceção, possivelmente suprimindo outra. Para reter informações sobre erros suprimidos, uma nova exceção nativa, `SuppressedError`, é introduzida.

#### Declaração await using

Uma declaração `await using` lida com um recurso descartável assincronamente. O valor deve ter um método `Symbol.asyncDispose`, que será aguardado no final do bloco.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Recurso é declarado
} // Recurso é descartado (ex., `await work[Symbol.asyncDispose]()` é avaliado)
```

Para um recurso descartável assincronamente, ele deve aderir à interface `Disposable` ou `AsyncDisposable`:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Polyfill simples

class DatabaseConnection implements AsyncDisposable {
    // Um método que é chamado quando o objeto é descartado assincronamente
    [Symbol.asyncDispose]() {
        // Fechar a conexão e retornar uma promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Criar uma nova conexão e descartá-la assincronamente quando sair do escopo
    await using connection = new DatabaseConnection(); //  Recurso é declarado
    console.log('Doing some work...');
} // Recurso é descartado (ex., `await connection[Symbol.asyncDispose]()` é avaliado)

doWork();
```

O código registra:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

As declarações `using` e `await using` são permitidas em Instruções: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Atributos de Importação

Atributos de Importação do TypeScript 5.3 (rótulos para importações) dizem ao runtime como lidar com módulos (JSON, etc.). Isso melhora a segurança garantindo importações claras e se alinha com a Política de Segurança de Conteúdo (CSP) para carregamento de recursos mais seguro. TypeScript garante que eles sejam válidos, mas deixa o runtime lidar com sua interpretação para manipulação específica de módulo.

Exemplo:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

com importação dinâmica:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```
