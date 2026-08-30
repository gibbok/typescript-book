# Typmanipulation



### Erstellen von Typen aus Typen

Neue Typen können durch das Kombinieren, Manipulieren oder Transformieren vorhandener Typen erstellt werden.

Intersection Types (`&`):

Mit ihnen können Sie mehrere Typen zu einem einzigen Typ kombinieren:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersection of A and B
const obj: C = { foo: 42, bar: 'hello' };
```

Union Types (`|`):

Mit ihnen können Sie einen Typ definieren, der einem von mehreren Typen entsprechen kann:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Mapped Types:

Mit ihnen können Sie die Eigenschaften eines vorhandenen Typs transformieren, um einen neuen Typ zu erstellen:

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // Properties become read-only
```

Conditional Types:

Mit ihnen können Sie Typen auf der Grundlage bestimmter Bedingungen erstellen:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### Indexed Access Types

In TypeScript können Sie mithilfe eines Indexes, `Type[Key]`, auf die Typen von Eigenschaften innerhalb eines anderen Typs zugreifen und sie manipulieren.

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

### Utility Types

Zur Manipulation von Typen stehen mehrere integrierte Utility Types zur Verfügung. Nachfolgend finden Sie eine Liste der am häufigsten verwendeten:

#### Awaited\<T\>

Erstellt einen Typ, der Promise-Typen rekursiv entpackt.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

Erstellt einen Typ, bei dem alle Eigenschaften von T optional sind.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

Erstellt einen Typ, bei dem alle Eigenschaften von T erforderlich sind.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

Erstellt einen Typ, bei dem alle Eigenschaften von T schreibgeschützt sind.

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // Invalid
```

#### Record\<K, T\>

Erstellt einen Typ mit einer Menge von Eigenschaften K des Typs T.

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

Erstellt einen Typ, indem die angegebenen Eigenschaften K aus T ausgewählt werden.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

Erstellt einen Typ, indem die angegebenen Eigenschaften K aus T weggelassen werden.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

Erstellt einen Typ, indem alle Werte des Typs U aus T ausgeschlossen werden.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

Erstellt einen Typ, indem alle Werte des Typs U aus T extrahiert werden.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

Erstellt einen Typ, indem null und undefined aus T ausgeschlossen werden.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

Extrahiert die Parametertypen eines Funktionstyps T.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

Extrahiert die Parametertypen eines Konstruktorfunktionstyps T.

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

Extrahiert den Rückgabetyp eines Funktionstyps T.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

Extrahiert den Instanztyp eines Klassentyps T.

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

Extrahiert den Typ des 'this'-Parameters aus einem Funktionstyp T.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

Entfernt den 'this'-Parameter aus einem Funktionstyp T.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Dient als Marker für einen kontextbezogenen `this`-Typ.

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // Valid as "log" is a part of "this".
        this.update(); // Invalid
    },
};
```

#### Uppercase\<T\>

Wandelt den Namen des Eingabetyps T in Großbuchstaben um.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Wandelt den Namen des Eingabetyps T in Kleinbuchstaben um.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Schreibt den Namen des Eingabetyps T am Anfang groß.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Schreibt den Namen des Eingabetyps T am Anfang klein.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer ist ein Utility Type, der die automatische Typinferenz innerhalb des Gültigkeitsbereichs einer generischen Funktion verhindert.

Beispiel:

```typescript
// Automatic inference of types within the scope of a generic function.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

Mit NoInfer:

<!-- skip -->
```typescript
// Example function that uses NoInfer to prevent type inference
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

