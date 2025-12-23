---
title: Manipolazione dei tipi
sidebar:
  order: 60
  label: 60. Manipolazione dei tipi
---


### Creazione di tipi da tipi

È possibile creare nuovi tipi componendo, manipolando o trasformando tipi esistenti.

Tipi di intersezione (`&`):

Consentono di combinare più tipi in un unico tipo:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersezione di A e B
const obj: C = { foo: 42, bar: 'hello' };
```

Tipi di unione (`|`):

Consente di definire un tipo che può essere di diversi tipi:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Tipi mappati:

Consentono di trasformare le proprietà di un tipo esistente per crearne uno nuovo:

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // Le proprietà diventano di sola lettura
```

Tipi condizionali:

Consentono di creare tipi in base ad alcune condizioni:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### Tipi di accesso indicizzati

In TypeScript è possibile accedere e manipolare i tipi di proprietà all'interno di un altro tipo utilizzando un indice, `Type[Key]`.

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

### Tipi di utilità

Diversi tipi di utilità predefiniti possono essere utilizzati per manipolare i tipi; di seguito è riportato un elenco dei più comuni:

#### Awaited\<T\>

Costruisce un tipo che esegue ricorsivamente l'unwrapping dei tipi Promise.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

Costruisce un tipo con tutte le proprietà di T impostate su optional.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?:number | undefined; }
```

#### Required\<T\>

Costruisce un tipo con tutte le proprietà di T impostate su required.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age:number; }
```

#### Readonly\<T\>

Costruisce un tipo con tutte le proprietà di T impostate su readonly.

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // Non valido
```

#### Record\<K, T\>

Costruisce un tipo con un insieme di proprietà K di tipo T.

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

Costruisce un tipo selezionando le proprietà specificate K da T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

Costruisce un tipo omettendo le proprietà specificate K da T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

Costruisce un tipo escludendo tutti i valori di tipo U da T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

Costruisce un tipo estraendo tutti i valori di tipo U da T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

Costruisce un tipo escludendo null e undefined da T.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

Estrae i tipi di parametro di una funzione di tipo T.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

Estrae i tipi di parametro di una funzione costruttore di tipo T.

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

Estrae il tipo di ritorno di una funzione di tipo T.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

Estrae il tipo di istanza di una classe di tipo T.

```typescript
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello() {
        console.log(`Ciao, mi chiamo ${this.name}!`);
    }
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person('John');

person.sayHello(); // Ciao, mi chiamo John!
```

#### ThisParameterType\<T\>

Estrae il tipo del parametro 'this' da una funzione di tipo T.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

Rimuove il parametro 'this' da una funzione di tipo T.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Funge da marcatore per un tipo `this` contestuale.

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // Valido poiché "log" è parte di "this".
        this.update(); // Non valido
    },
};
```

#### Uppercase\<T\>

Rendi maiuscolo il nome del tipo di input T.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Rendi minuscolo il nome del tipo di input T.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Inserisci in maiuscolo il nome del tipo di input T.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Inserisci in maiuscolo il nome del tipo di input T.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer è un tipo di utilità progettato per bloccare l'inferenza automatica dei tipi nell'ambito di una funzione generica.

Esempio:

```typescript
// Inferenza automatica dei tipi nell'ambito di una funzione generica.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Il tipo qui è ("a" | "b" | "c")[]
```

Con NoInfer:

<!-- skip -->
```typescript
// Funzione di esempio che utilizza NoInfer per impedire l'inferenza di tipo
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Errore: l'argomento di tipo '"c"' non è assegnabile al parametro di tipo '"a" | "b"'.
```

