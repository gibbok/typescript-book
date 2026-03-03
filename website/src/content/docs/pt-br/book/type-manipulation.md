---
title: Manipulação de Tipo
sidebar:
  order: 60
  label: 60. Manipulação de Tipo
---


### Criando Tipos a partir de Tipos

TypeScript permite criar novos tipos a partir de tipos existentes usando várias transformações.

#### Tipos de Intersecção

```typescript
type A = { a: string };
type B = { b: number };
type C = A & B; // { a: string; b: number; }
```

#### Tipos Union

<!-- skip -->
```typescript
type Status = 'success' | 'error';
type Response = SuccessResponse | ErrorResponse;
```

#### Tipos Mapeados

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

#### Tipos Condicionais

```typescript
type TypeName<T> = T extends string
    ? 'string'
    : T extends number
      ? 'number'
      : 'other';
```

### Tipos de Acesso Indexado

Tipos de acesso indexado permitem acessar os tipos de propriedades:

```typescript
type Person = {
    name: string;
    age: number;
};

type Name = Person['name']; // string
type Keys = Person['name' | 'age']; // string | number
```

### Tipos Utilitários

TypeScript fornece vários tipos utilitários integrados:

#### Awaited\<T\>

Desempacota recursivamente tipos Promise:

```typescript
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number
```

#### Partial\<T\>

Torna todas as propriedades opcionais:

```typescript
type Person = {
    name: string;
    age: number;
};

type PartialPerson = Partial<Person>;
// { name?: string; age?: number; }
```

#### Required\<T\>

Torna todas as propriedades obrigatórias:

```typescript
type Person = {
    name?: string;
    age?: number;
};

type RequiredPerson = Required<Person>;
// { name: string; age: number; }
```

#### Readonly\<T\>

Torna todas as propriedades readonly:

```typescript
type Person = {
    name: string;
    age: number;
};

type ReadonlyPerson = Readonly<Person>;
// { readonly name: string; readonly age: number; }
```

#### Record\<K, T\>

Constrói um tipo com um conjunto de propriedades K do tipo T:

```typescript
type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, boolean>;
// { admin: boolean; user: boolean; guest: boolean; }
```

#### Pick\<T, K\>

Constrói um tipo escolhendo propriedades específicas K de T:

```typescript
type Person = {
    name: string;
    age: number;
    address: string;
};

type PersonName = Pick<Person, 'name' | 'age'>;
// { name: string; age: number; }
```

#### Omit\<T, K\>

Constrói um tipo omitindo propriedades específicas K de T:

```typescript
type Person = {
    name: string;
    age: number;
    address: string;
};

type PersonWithoutAddress = Omit<Person, 'address'>;
// { name: string; age: number; }
```

#### Exclude\<T, U\>

Exclui de T tipos que são atribuíveis a U:

```typescript
type A = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
```

#### Extract\<T, U\>

Extrai de T tipos que são atribuíveis a U:

```typescript
type A = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // 'a'
```

#### NonNullable\<T\>

Exclui null e undefined de T:

```typescript
type A = NonNullable<string | null | undefined>; // string
```

#### Parameters\<T\>

Extrai os tipos de parâmetro de uma função:

```typescript
function greet(name: string, age: number) {
    console.log(`Hello ${name}, you are ${age}`);
}

type GreetParams = Parameters<typeof greet>;
// [name: string, age: number]
```

#### ConstructorParameters\<T\>

Extrai os tipos de parâmetro de um construtor:

```typescript
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}

type PersonParams = ConstructorParameters<typeof Person>;
// [name: string, age: number]
```

#### ReturnType\<T\>

Extrai o tipo de retorno de uma função:

```typescript
function getValue() {
    return { value: 42 };
}

type Value = ReturnType<typeof getValue>;
// { value: number }
```

#### InstanceType\<T\>

Extrai o tipo de instância de uma classe:

```typescript
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

type PersonInstance = InstanceType<typeof Person>;
// Person
```

#### ThisParameterType\<T\>

Extrai o tipo do parâmetro 'this' de uma função:

```typescript
function toHex(this: Number) {
    return this.toString(16);
}

type ThisType = ThisParameterType<typeof toHex>; // Number
```

#### OmitThisParameter\<T\>

Remove o parâmetro 'this' de uma função:

```typescript
function toHex(this: Number) {
    return this.toString(16);
}

type NoThisType = OmitThisParameter<typeof toHex>; // () => string
```

#### ThisType\<T\>

Serve como um marcador para um tipo 'this' contextual:

```typescript
type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>;
};
```

#### Uppercase\<T\>

Converte string literal types para maiúsculas:

```typescript
type Greeting = 'hello';
type LoudGreeting = Uppercase<Greeting>; // 'HELLO'
```

#### Lowercase\<T\>

Converte string literal types para minúsculas:

```typescript
type Greeting = 'HELLO';
type QuietGreeting = Lowercase<Greeting>; // 'hello'
```

#### Capitalize\<T\>

Capitaliza a primeira letra de string literal types:

```typescript
type Greeting = 'hello';
type CapitalizedGreeting = Capitalize<Greeting>; // 'Hello'
```

#### Uncapitalize\<T\>

Descapitaliza a primeira letra de string literal types:

```typescript
type Greeting = 'Hello';
type UncapitalizedGreeting = Uncapitalize<Greeting>; // 'hello'
```

#### NoInfer\<T\>

Bloqueia a inferência de tipos dentro do escopo de uma função genérica:

```typescript
function createArray<T>(items: T[], item: NoInfer<T>): T[] {
    return [...items, item];
}

const arr = createArray(['a', 'b'], 'c'); // OK
// const arr = createArray(['a', 'b'], 42); // Erro
```

