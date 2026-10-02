# Outros



### Erros e Tratamento de Exceções

O TypeScript permite capturar e tratar erros usando os mecanismos padrão de tratamento de erros do JavaScript:

Blocos Try-Catch-Finally:

```typescript
try {
    // Código que pode lançar um erro
} catch (error) {
    // Trata o erro
} finally {
    // Código que sempre é executado, finally é opcional
}
```

Você também pode tratar diferentes tipos de erro:

```typescript
try {
    // Código que pode lançar diferentes tipos de erros
} catch (error) {
    if (error instanceof TypeError) {
        // Trata TypeError
    } else if (error instanceof RangeError) {
        // Trata RangeError
    } else {
        // Trata outros erros
    }
}
```

Tipos de Erro Personalizados:

É possível definir erros mais específicos estendendo a classe `Error`:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Classes Mixin (Mixin classes)

As classes mixin permitem combinar e compor comportamentos de múltiplas classes em uma única classe. Elas fornecem uma maneira de reutilizar e estender funcionalidades sem a necessidade de cadeias de herança profundas.

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

// Estende MyClass para incluir o comportamento de Identifiable e Selectable
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

// Aplica os mixins a MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Recursos Assíncronos da Linguagem

Como o TypeScript é um superconjunto do JavaScript, ele inclui os recursos assíncronos integrados da linguagem, como:

Promises:

Promises são uma maneira de lidar com operações assíncronas e seus resultados usando métodos como `.then()` e `.catch()` para tratar condições de sucesso e erro.

Para saber mais: [https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

As palavras-chave async/await permitem usar uma sintaxe mais próxima da síncrona para trabalhar com Promises. A palavra-chave `async` é usada para definir uma função assíncrona, e a palavra-chave `await` é usada dentro de uma função assíncrona para pausar a execução até que uma Promise seja resolvida ou rejeitada.

Para saber mais:
[https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/await)

As seguintes APIs são bem suportadas no TypeScript:

Fetch API:
[https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/pt-BR/docs/Web/API/SharedWorker](https://developer.mozilla.org/pt-BR/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API)

### Iteradores e Geradores

O TypeScript oferece bom suporte tanto a iteradores quanto a geradores.

Iteradores são objetos que implementam o protocolo de iterador, fornecendo uma maneira de acessar elementos de uma coleção ou sequência um por um. Um iterador é uma estrutura que contém um ponteiro para o próximo elemento na iteração. Ele possui um método `next()` que retorna o próximo valor na sequência junto com um booleano indicando se a sequência terminou (`done`).

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

Geradores são funções especiais definidas usando a sintaxe `function*` que simplifica a criação de iteradores. Eles usam a palavra-chave `yield` para definir a sequência de valores e pausar e retomar automaticamente a execução quando os valores são solicitados.

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

O TypeScript também suporta iteradores assíncronos e geradores assíncronos.

Para saber mais:

[https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Referência JSDoc TsDocs

Ao trabalhar com uma base de código JavaScript, é possível ajudar o TypeScript a inferir o tipo correto usando comentários JSDoc com anotações adicionais para fornecer informações de tipo.

Exemplo:

```typescript
/**
 * Computa a potência de um dado número
 * @constructor
 * @param {number} base – O valor da base da expressão
 * @param {number} exponent – O valor do expoente da expressão
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

A documentação completa é fornecida neste link:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

A partir da versão 3.7, é possível gerar definições de tipo .d.ts a partir da sintaxe JSDoc do JavaScript.
Mais informações podem ser encontradas aqui:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Os pacotes da organização @types seguem uma convenção especial de nomenclatura e são usados para fornecer definições de tipo para bibliotecas ou módulos JavaScript existentes. Por exemplo:

```shell
npm install --save-dev @types/lodash
```

Esse comando instalará as definições de tipo de `lodash` em seu projeto atual.

Para contribuir com as definições de tipo de um pacote @types, envie um pull request para [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) é uma extensão da sintaxe da linguagem JavaScript que permite escrever código semelhante a HTML em seus arquivos JavaScript ou TypeScript. É comumente usado no React para definir a estrutura HTML.

O TypeScript estende as capacidades do JSX fornecendo verificação de tipos e análise estática.

Para usar JSX, você precisa definir a opção do compilador `jsx` em seu arquivo `tsconfig.json`. Duas opções de configuração comuns:

* "preserve": emite arquivos .jsx com o JSX inalterado. Esta opção diz ao TypeScript para manter a sintaxe JSX como está e não transformá-la durante o processo de compilação. Você pode usar esta opção se tiver uma ferramenta separada, como o Babel, que lida com a transformação.
* "react": habilita a transformação JSX integrada do TypeScript. `React.createElement` será usado.

Todas as opções estão disponíveis aqui:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Módulos ES6

O TypeScript suporta ES6 (ECMAScript 2015) e muitas versões subsequentes. Isso significa que você pode usar a sintaxe ES6, como funções de seta, literais de template, classes, módulos, desestruturação e muito mais.

Para habilitar recursos do ES6 em seu projeto, você pode especificar a propriedade `target` no tsconfig.json.

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

O operador de exponenciação (`**`) calcula o valor obtido elevando o primeiro operando à potência do segundo operando. Ele funciona de forma semelhante a `Math.pow()`, mas com a capacidade adicional de aceitar BigInts como operandos.
O TypeScript suporta totalmente este operador definindo `target` como `es2016` ou superior no arquivo tsconfig.json.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### A Instrução for-await-of

Este é um recurso do JavaScript totalmente suportado no TypeScript que permite iterar sobre objetos iteráveis assíncronos com es2018 como versão de destino.

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

### Metapropriedade new.target

Você pode usar no TypeScript a metapropriedade `new.target`, que permite determinar se uma função ou construtor foi invocado usando o operador `new`. Ela permite detectar se um objeto foi criado como resultado de uma chamada de construtor.

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

É possível carregar módulos condicionalmente ou carregá-los sob demanda (lazy load) usando a proposta do ECMAScript para importação dinâmica, que é suportada no TypeScript.

A sintaxe para expressões de importação dinâmica no TypeScript é a seguinte:

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

Este comando inicia o compilador TypeScript com o parâmetro `--watch`, com a capacidade de recompilar automaticamente os arquivos TypeScript sempre que forem modificados.

```shell
tsc --watch
```

A partir da versão 4.9 do TypeScript, o monitoramento de arquivos depende principalmente de eventos do sistema de arquivos, recorrendo automaticamente à sondagem (polling) se um observador baseado em eventos não puder ser criado.

### Operador de Asserção de Não Nulidade (Non-null Assertion Operator)

O operador de asserção de não nulidade (! pós-fixado), também chamado de asserção de atribuição definitiva (definite assignment assertion), é um recurso do TypeScript que permite afirmar que uma variável ou propriedade não é null nem undefined, mesmo que a análise estática de tipos do TypeScript sugira que ela possa ser. Com esse recurso, é possível eliminar verificações explícitas.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Declarações com Valor Padrão (Defaulted declarations)

Declarações com valor padrão são usadas quando uma variável ou parâmetro recebe um valor padrão. Isso significa que, se nenhum valor for fornecido para essa variável ou parâmetro, o valor padrão será usado em seu lugar.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Saída: Hello, Anonymous!
greet('John'); // Saída: Hello, John!
```

### Encadeamento Opcional (Optional Chaining)

O operador de encadeamento opcional `?.` funciona como o operador de ponto comum (`.`) para acessar propriedades ou métodos. No entanto, ele lida com valores null ou undefined encerrando a expressão e retornando `undefined`, em vez de lançar um erro.

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

### Operador de Coalescência Nula (Nullish coalescing operator)

O operador de coalescência nula `??` retorna o valor do lado direito se o lado esquerdo for `null` ou `undefined`; caso contrário, retorna o valor do lado esquerdo.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Tipos de Literais de Template (Template Literal Types)

Tipos de literais de template permitem manipular valores de string em nível de tipo e gerar novos tipos de string a partir de tipos existentes. Eles são úteis para criar tipos mais expressivos e precisos a partir de operações baseadas em string.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Sobrecarga de Função (Function overloading)

A sobrecarga de função permite definir múltiplas assinaturas de função para o mesmo nome de função, cada uma com diferentes tipos de parâmetros e de retorno.
Quando você chama uma função sobrecarregada, o TypeScript usa os argumentos fornecidos para determinar a assinatura de função correta:

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

Um tipo recursivo é um tipo que pode se referir a si mesmo. Isso é útil para definir estruturas de dados que possuem uma estrutura hierárquica ou recursiva (aninhamento potencialmente infinito), como listas encadeadas, árvores e grafos.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Tipos Condicionais Recursivos

É possível definir relações complexas entre tipos usando lógica e recursão no TypeScript.
Vamos detalhar em termos simples:

Tipos condicionais permitem definir tipos baseados em condições booleanas:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // Tipo: 'Number'
type B = CheckNumber<'abc'>; // Tipo: 'Not a number'
```

Recursão significa uma definição de tipo que se refere a si mesma dentro de sua própria definição:

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

Tipos condicionais recursivos combinam lógica condicional e recursão. Isso significa que uma definição de tipo pode depender de si mesma por meio da lógica condicional, criando relações complexas e flexíveis entre tipos.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Suporte a Módulos ECMAScript no Node

O Node.js adicionou suporte a módulos ECMAScript a partir da versão 15.3.0, e o TypeScript tem suporte a módulos ECMAScript para Node.js desde a versão 4.7. Esse suporte pode ser habilitado usando a propriedade `module` com o valor `nodenext` no arquivo tsconfig.json. Aqui está um exemplo:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

O Node.js suporta duas extensões de arquivo para módulos: `.mjs` para módulos ES e `.cjs` para módulos CommonJS. As extensões de arquivo equivalentes no TypeScript são `.mts` para módulos ES e `.cts` para módulos CommonJS. Quando o compilador TypeScript transpila esses arquivos para JavaScript, ele criará arquivos `.mjs` e `.cjs`.

Se você quiser usar módulos ES em seu projeto, você pode definir a propriedade `type` como "module" em seu arquivo package.json. Isso instrui o Node.js a tratar o projeto como um projeto de módulo ES.

Além disso, o TypeScript também suporta declarações de tipo em arquivos .d.ts. Esses arquivos de declaração fornecem informações de tipo para bibliotecas ou módulos escritos em TypeScript, permitindo que outros desenvolvedores os utilizem com a verificação de tipos e os recursos de preenchimento automático do TypeScript.

### Funções de Asserção (Assertion Functions)

No TypeScript, funções de asserção são funções que indicam a verificação de uma condição específica com base em seu valor de retorno. Em sua forma mais simples, uma função assert examina um predicado fornecido e lança um erro quando o predicado é avaliado como falso.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Ou pode ser declarada como uma expressão de função:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Funções de asserção compartilham semelhanças com guardas de tipo (type guards). As guardas de tipo foram inicialmente introduzidas para realizar verificações em tempo de execução e garantir o tipo de um valor dentro de um escopo específico.
Especificamente, uma guarda de tipo é uma função que avalia um predicado de tipo e retorna um valor booleano indicando se o predicado é verdadeiro ou falso. Isso difere ligeiramente das funções de asserção, nas quais a intenção é lançar um erro em vez de retornar falso quando o predicado não for satisfeito.

Exemplo de guarda de tipo:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Tipos de Tuplas Variádicas (Variadic Tuple Types)

Tipos de tuplas variádicas são um recurso introduzido na versão 4.0 do TypeScript. Vamos começar revisando o que é uma tupla:

Um tipo de tupla é um array que possui um tamanho definido e no qual o tipo de cada elemento é conhecido:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

O termo "variádico" significa aridade indefinida (aceita um número variável de argumentos).

Uma tupla variádica é um tipo de tupla que possui todas as propriedades anteriores, mas o formato exato ainda não está definido:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

No código anterior, podemos ver que o formato da tupla é definido pelo parâmetro genérico `T` fornecido.

Tuplas variádicas podem aceitar múltiplos genéricos, tornando-as muito flexíveis:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Com as novas tuplas variádicas, podemos usar:

* A sintaxe spread em tipos de tupla agora pode ser genérica, permitindo representar operações de ordem superior em tuplas e arrays mesmo quando não conhecemos os tipos concretos sobre os quais operamos.
* Os elementos rest podem ocorrer em qualquer posição de uma tupla.

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

### Tipos Boxed (Boxed types)

Tipos boxed referem-se aos objetos wrapper usados para representar tipos primitivos como objetos. Esses objetos wrapper fornecem funcionalidades e métodos adicionais que não estão disponíveis diretamente nos valores primitivos.

Quando você acessa um método como `charAt` ou `normalize` em um primitivo `string`, o JavaScript o encapsula em um objeto `String`, chama o método e depois descarta o objeto.

Demonstração:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

O TypeScript representa essa diferenciação fornecendo tipos separados para os primitivos e seus objetos wrapper correspondentes:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Os tipos boxed geralmente não são necessários. Evite usar tipos boxed e, em vez disso, use os tipos primitivos, por exemplo, `string` em vez de `String`.

### Covariância e Contravariância no TypeScript

Covariância e contravariância descrevem como as relações de tipo se comportam em tipos genéricos.

Em TypeScript:

* Arrays são **covariantes**, mas isso não é totalmente seguro em termos de tipos.
* Os tipos de parâmetros de funções são:
  * **contravariantes** quando `strictFunctionTypes` está habilitado
  * **bivariantes** caso contrário

Covariância significa que a relação é preservada: se o tipo A é um subtipo de B, então `F<A>` também é um subtipo de `F<B>`. Em TypeScript, isso aparece comumente em tipos de retorno e em arrays (embora a covariância de arrays não seja totalmente segura em termos de tipos).

Contravariância significa que a relação é invertida: se o tipo A é um subtipo de B, então `F<B>` é um subtipo de `F<A>`. Em TypeScript, os tipos de parâmetros de funções são projetados para serem contravariantes, o que significa que uma função que aceita um tipo mais amplo pode ser usada onde um tipo mais restrito é esperado.

No entanto, na prática, o TypeScript frequentemente permite bivariância para parâmetros de função (a menos que `strictFunctionTypes` esteja habilitado), o que significa que ambas as direções podem ser aceitas mesmo quando isso não é estritamente seguro em termos de tipos.

Exemplo: Imagine um espaço para todos os animais e um espaço separado apenas para cães.

* **Covariância**:  
  Você pode usar um “espaço de cães” onde um “espaço de animais” é esperado, porque todos os cães são animais.  
  Mas você não pode usar um “espaço de animais” onde um “espaço de cães” é esperado, porque ele pode conter animais que não são cães.

* **Contravariância** (pense em termos de funções):  
  Se você tem algo que pode lidar com **qualquer animal**, você pode usá-lo onde algo que lida **apenas com cães** é esperado.  
  Mas não o contrário.

Exemplo de covariância:

<!-- skip -->
```typescript
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

// Arrays são covariantes no TypeScript (mas não preservam a segurança de tipos)
animals = dogs; // Permitido
dogs = animals; // Erro
```

Exemplo de contravariância:

<!-- skip -->
```typescript
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

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Contravariância pretendida:
feedDog = feedAnimal; // Seguro

// Isso depende das opções do compilador:
feedAnimal = feedDog; // erro apenas com strictFunctionTypes
```

#### Anotações de Variância Opcionais para Parâmetros de Tipo

A partir do TypeScript 4.7.0, podemos usar as palavras-chave `out` e `in` para especificar anotações de variância.

Para covariância, use a palavra-chave `out`:

```typescript
type AnimalCallback<out T> = () => T; // T é Covariante aqui
```

E para contravariância, use a palavra-chave `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T é Contravariante aqui
```

### Assinaturas de Índice com Padrões de Strings de Template (Template String Pattern Index Signatures)

Assinaturas de índice com padrões de strings de template permitem definir assinaturas de índice flexíveis usando esses padrões. Esse recurso permite criar objetos que podem ser indexados com padrões específicos de chaves do tipo string, fornecendo mais controle e especificidade ao acessar e manipular propriedades.

A partir da versão 4.4, o TypeScript permite assinaturas de índice para símbolos e padrões de strings de template.

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

console.log(obj[uniqueSymbol]); // Saída: Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### O Operador satisfies

O operador `satisfies` permite verificar se um determinado tipo satisfaz uma interface ou condição específica. Em outras palavras, ele garante que um tipo possui todas as propriedades e métodos exigidos de uma interface específica. É uma maneira de garantir que uma variável se encaixe na definição de um tipo.
Aqui está um exemplo:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Anotação de Tipo usando `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// Nas linhas seguintes, o TypeScript não conseguirá inferir corretamente
user.attributes?.map(console.log); // A propriedade 'map' não existe no tipo 'string | string[]'. A propriedade 'map' não existe no tipo 'string'.
user.nickName; // string | string[] | undefined

// Asserção de tipo usando `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Aqui também, o TypeScript não conseguirá inferir corretamente
user2.attributes?.map(console.log); // A propriedade 'map' não existe no tipo 'string | string[]'. A propriedade 'map' não existe no tipo 'string'.
user2.nickName; // string | string[] | undefined

// Usando o operador `satisfies`, podemos inferir os tipos corretamente agora
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infere corretamente: string[]
user3.nickName; // TypeScript infere corretamente: undefined
```

### Importações e Exportações Apenas de Tipo (Type-Only Imports and Export)

Importações e exportações apenas de tipo permitem importar ou exportar tipos sem importar ou exportar os valores ou funções associados a esses tipos. Isso pode ser útil para reduzir o tamanho do seu bundle.

Para usar importações apenas de tipo, você pode usar a palavra-chave `import type`.

O TypeScript permite usar extensões de arquivo de declaração e implementação (.ts, .mts, .cts e .tsx) em importações apenas de tipo, independentemente das configurações de `allowImportingTsExtensions`.

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

### Declaração using e Gerenciamento Explícito de Recursos (Explicit Resource Management)

Uma declaração `using` é um vínculo imutável com escopo de bloco, semelhante ao `const`, usado para gerenciar recursos descartáveis (disposable). Quando o vínculo é inicializado com um valor, o método `Symbol.dispose` desse valor é registrado e executado posteriormente ao sair do escopo do bloco que o contém.

Isso se baseia no recurso de gerenciamento de recursos do ECMAScript, que é útil para realizar tarefas essenciais de limpeza após a criação do objeto, como fechar conexões, excluir arquivos e liberar memória.

Notas:

* Devido à sua introdução recente na versão 5.2 do TypeScript, a maioria dos ambientes de execução não tem suporte nativo. Você precisará de polyfills para: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
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
} // Recurso é descartado (ex: `work[Symbol.dispose]()` é avaliado)

console.log(3);
```

O código exibirá:

```shell
1
2
disposed
3
```

Um recurso elegível para descarte deve estar em conformidade com a interface `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

As declarações `using` registram as operações de descarte de recursos em uma pilha, garantindo que os recursos sejam descartados na ordem inversa à de declaração:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // descarta `C`, depois `B`, depois `A`.
```

Os recursos têm garantia de serem descartados, mesmo que haja código subsequente ou ocorram exceções. O descarte pode lançar uma exceção, possivelmente suprimindo outra. Para manter informações sobre erros suprimidos, uma nova exceção nativa, `SuppressedError`, é introduzida.

#### Declaração await using

Uma declaração `await using` lida com um recurso que pode ser descartado de forma assíncrona. O valor deve ter um método `Symbol.asyncDispose`, que será aguardado ao final do bloco.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Recurso é declarado
} // Recurso é descartado (ex: `await work[Symbol.asyncDispose]()` é avaliado)
```

Um recurso descartável de forma assíncrona deve estar em conformidade com a interface `Disposable` ou `AsyncDisposable`:

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
        // Fecha a conexão e retorna uma Promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Cria uma nova conexão e a descarta assincronamente quando ela sair do escopo
    await using connection = new DatabaseConnection(); // Recurso é declarado
    console.log('Doing some work...');
} // Recurso é descartado (ex: `await connection[Symbol.asyncDispose]()` é avaliado)

doWork();
```

O código exibe:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

As declarações `using` e `await using` são permitidas nas instruções: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Atributos de Importação (Import Attributes)

Os atributos de importação do TypeScript 5.3 (rótulos para importações) informam ao ambiente de execução como lidar com módulos (JSON, etc.). Isso melhora a segurança ao garantir importações claras e se alinha com a Política de Segurança de Conteúdo (CSP) para um carregamento de recursos mais seguro. O TypeScript garante que eles sejam válidos, mas deixa sua interpretação a cargo do ambiente de execução para o tratamento específico dos módulos.

Exemplo:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

Com importação dinâmica:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Verificação de Sintaxe de Expressões Regulares

A partir da versão 5.5.4, o TypeScript verifica literais de expressões regulares em busca de erros comuns em tempo de compilação (por exemplo, sintaxe inválida, retroreferências incorretas, recursos não suportados pela sua versão de destino do JavaScript). Isso ajuda a detectar erros mais cedo, mas não verifica strings passadas a new RegExp("...").

<!-- skip -->
```typescript
let r = /(a)\2/; // Erro: Esta retroreferência se refere a um grupo que não existe.
```

### import defer

`import defer` permite carregar um módulo, mas adiar sua execução até que você realmente use algo dele. Isso ajuda a evitar trabalho desnecessário e efeitos colaterais.

* Funciona apenas com: `import defer * as name from "module"`
* O código é executado somente quando você acessa uma exportação
