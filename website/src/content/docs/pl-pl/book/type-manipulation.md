---
title: Manipulowanie typami
sidebar:
  order: 61
  label: 61. Manipulowanie typami
---


### Tworzenie typów na podstawie innych typów

Można tworzyć nowe typy przez komponowanie, modyfikowanie lub przekształcanie istniejących typów.

Typy przecięcia (`&`):

Umożliwiają połączenie wielu typów w jeden typ:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersection of A and B
const obj: C = { foo: 42, bar: 'hello' };
```

Typy sumy (`|`):

Umożliwiają zdefiniowanie typu, który może być jednym z kilku typów:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Typy mapowane:

Umożliwiają przekształcenie właściwości istniejącego typu w celu utworzenia nowego typu:

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

Typy warunkowe:

Umożliwiają tworzenie typów na podstawie określonych warunków:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### Typy dostępu indeksowanego

W TypeScripcie można uzyskiwać dostęp do typów właściwości w innym typie i modyfikować je za pomocą indeksu `Type[Key]`.

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

### Typy narzędziowe

Do manipulowania typami można używać kilku wbudowanych typów narzędziowych. Poniżej znajduje się lista najczęściej używanych:

#### Awaited\<T\>

Tworzy typ, który rekurencyjnie rozpakowuje typy `Promise`.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

Tworzy typ, w którym wszystkie właściwości typu T są opcjonalne.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

Tworzy typ, w którym wszystkie właściwości typu T są wymagane.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

Tworzy typ, w którym wszystkie właściwości typu T są tylko do odczytu.

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

Tworzy typ z zestawem właściwości K typu T.

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

Tworzy typ przez wybranie określonych właściwości K z typu T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

Tworzy typ przez pominięcie określonych właściwości K z typu T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

Tworzy typ przez wykluczenie z typu T wszystkich wartości typu U.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

Tworzy typ przez wyodrębnienie z typu T wszystkich wartości typu U.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

Tworzy typ przez wykluczenie wartości null i undefined z typu T.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

Wyodrębnia typy parametrów z typu funkcji T.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

Wyodrębnia typy parametrów z typu funkcji konstruktora T.

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

Wyodrębnia typ zwracany przez typ funkcji T.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

Wyodrębnia typ instancji z typu klasy T.

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

Wyodrębnia typ parametru „this” z typu funkcji T.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

Usuwa parametr „this” z typu funkcji T.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Służy jako znacznik kontekstowego typu `this`.

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

Zmienia nazwę wejściowego typu T na pisaną wielkimi literami.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Zmienia nazwę wejściowego typu T na pisaną małymi literami.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Zmienia pierwszą literę nazwy wejściowego typu T na wielką.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Zmienia pierwszą literę nazwy wejściowego typu T na małą.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

`NoInfer` to typ narzędziowy zaprojektowany w celu blokowania automatycznego wnioskowania typów w obrębie funkcji generycznej.

Przykład:

```typescript
// Automatic inference of types within the scope of a generic function.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

Z użyciem `NoInfer`:

<!-- skip -->
```typescript
// Example function that uses NoInfer to prevent type inference
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

