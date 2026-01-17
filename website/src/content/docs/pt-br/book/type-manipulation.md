---
title: Manipulação de Tipos
sidebar:
  order: 60
  label: 60. Manipulação de Tipos
---


### Criando Tipos a partir de Tipos

É possível criar novos tipos compondo, manipulando ou transformando tipos existentes.

Tipos de Interseção (`&`):

Permitem combinar múltiplos tipos em um único tipo:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Interseção de A e B
const obj: C = { foo: 42, bar: 'hello' };
```

Tipos de União (`|`):

Permitem definir um tipo que pode ser um de vários tipos:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Tipos Mapeados:

Permitem transformar as propriedades de um tipo existente para criar um novo tipo:

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // Propriedades se tornam somente leitura
```

Tipos Condicionais:

Permitem criar tipos baseados em algumas condições:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### Tipos de Acesso Indexado

No TypeScript é possível acessar e manipular os tipos de propriedades dentro de outro tipo usando um índice, `Type[Key]`.

```typescript
type Person = {
    name: string;
    age: number;
};

type AgeType = Person['age']; // number
```

```typescript
type MyTuple = [string, number, boolean];
type MyType = MyTuple[2]; // boolean
```

### Tipos Utilitários

Vários tipos utilitários integrados podem ser usados para manipular tipos. Abaixo, uma lista dos mais comumente usados:

#### Awaited\<T\>

Constrói um tipo que desembrulha recursivamente tipos Promise.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

Constrói um tipo com todas as propriedades de T definidas como opcionais.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

Constrói um tipo com todas as propriedades de T definidas como obrigatórias.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

Constrói um tipo com todas as propriedades de T definidas como somente leitura.

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // Inválido
```

#### Record\<K, T\>

Constrói um tipo com um conjunto de propriedades K do tipo T.

```typescript
type Product = {
    name: string;
    price: number;
};

const products: Record<string, Product> = {
    apple: { name: 'Apple', price: 0.5 },
    banana: { name: 'Banana', price: 0.25 },
};

console.log(products.apple); // { name: 'Apple', price: 0.5 }
```

#### Pick\<T, K\>

Constrói um tipo selecionando as propriedades especificadas K de T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

Constrói um tipo omitindo as propriedades especificadas K de T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

Constrói um tipo excluindo todos os valores do tipo U de T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

Constrói um tipo extraindo todos os valores do tipo U de T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

Constrói um tipo excluindo null e undefined de T.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

Extrai os tipos de parâmetros de um tipo de função T.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

Extrai os tipos de parâmetros de um tipo de função construtora T.

```typescript
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}
type PersonConstructorParams = ConstructorParameters<typeof Person>; // [name: string, age: number]
const params: PersonConstructorParams = ['John', 30];
const person = new Person(...params);
console.log(person); // Person { name: 'John', age: 30 }
```

#### ReturnType\<T\>

Extrai o tipo de retorno de um tipo de função T.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

Extrai o tipo de instância de um tipo de classe T.

```typescript
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}!`);
    }
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person('John');

person.sayHello(); // Hello, my name is John!
```

#### ThisParameterType\<T\>

Extrai o tipo do parâmetro 'this' de um tipo de função T.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

Remove o parâmetro 'this' de um tipo de função T.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Serve como um marcador para um tipo `this` contextual.

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // Válido pois "log" é parte de "this".
        this.update(); // Inválido
    },
};
```

#### Uppercase\<T\>

Transforma em maiúsculas o nome do tipo de entrada T.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Transforma em minúsculas o nome do tipo de entrada T.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Capitaliza o nome do tipo de entrada T.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Remove a capitalização do nome do tipo de entrada T.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer é um tipo utilitário projetado para bloquear a inferência automática de tipos dentro do escopo de uma função genérica.

Exemplo:

```typescript
// Inferência automática de tipos dentro do escopo de uma função genérica.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // O tipo aqui é ("a" | "b" | "c")[]
```

Com NoInfer:

<!-- skip -->
```typescript
// Exemplo de função que usa NoInfer para prevenir inferência de tipos
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Erro: Argumento do tipo '"c"' não é atribuível ao parâmetro do tipo '"a" | "b"'.
```
