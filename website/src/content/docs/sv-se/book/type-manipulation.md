---
title: Typmanipulation
sidebar:
  order: 60
  label: 60. Typmanipulation
---


### Skapa typer från typer

Det är möjligt att skapa nya typer genom att komponera, manipulera eller transformera befintliga typer.

Intersektionstyper (`&`):

Gör det möjligt att kombinera flera typer till en enda typ:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Skärning av A och B
const obj: C = { foo: 42, bar: 'hello' };
```

Unionstyper (`|`):

Gör det möjligt att definiera en typ som kan vara en av flera typer:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Mappade typer:

Gör det möjligt att transformera egenskaperna hos en befintlig typ för att skapa en ny typ:

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // Egenskaper blir skrivskyddade
```

Villkorliga typer:

Gör det möjligt att skapa typer baserat på vissa villkor:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### Indexerade åtkomsttyper

I TypeScript är det möjligt att komma åt och manipulera typerna av egenskaper inom en annan typ med hjälp av ett index, `Type[Key]`.

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

### Verktygstyper

Flera inbyggda verktygstyper kan användas för att manipulera typer. Nedan följer en lista över de mest använda:

#### Awaited\<T\>

Konstruerar en typ som rekursivt packar upp Promise-typer.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

Konstruerar en typ där alla egenskaper i T är satta som valfria.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

Konstruerar en typ där alla egenskaper i T är satta som obligatoriska.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

Konstruerar en typ där alla egenskaper i T är satta som skrivskyddade.

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // Ogiltig
```

#### Record\<K, T\>

Konstruerar en typ med en uppsättning egenskaper K av typen T.

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

Konstruerar en typ genom att välja ut de angivna egenskaperna K från T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

Konstruerar en typ genom att utelämna de angivna egenskaperna K från T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

Konstruerar en typ genom att exkludera alla värden av typen U från T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

Konstruerar en typ genom att extrahera alla värden av typen U från T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

Konstruerar en typ genom att exkludera null och undefined från T.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

Extraherar parametertyperna för en funktionstyp T.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

Extraherar parametertyperna för en konstruktorfunktionstyp T.

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

Extraherar returtypen för en funktionstyp T.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

Extraherar instanstypen för en klasstyp T.

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

Extraherar typen av 'this'-parametern från en funktionstyp T.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

Tar bort 'this'-parametern från en funktionstyp T.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Fungerar som en markör för en kontextuell `this`-typ.

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // Giltig eftersom "log" är en del av "this".
        this.update(); // Ogiltig
    },
};
```

#### Uppercase\<T\>

Gör namnet på indatatypen T till versaler.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Gör namnet på indatatypen T till gemener.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Gör första bokstaven i namnet på indatatypen T till versal.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Gör första bokstaven i namnet på indatatypen T till gemen.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer är en verktygstyp utformad för att blockera automatisk typinferens inom ramen för en generisk funktion.

Exempel:

```typescript
// Automatisk härledning av typer inom omfattningen av en generisk funktion.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

Med NoInfer:

<!-- skip -->
```typescript
// Exempelfunktion som använder NoInfer för att förhindra typhärledning
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Fel: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

