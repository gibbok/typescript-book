---
title: Tür İşleme
sidebar:
  order: 61
  label: 61. Tür İşleme
---


### Türlerden Tür Oluşturma

Mevcut türleri birleştirerek, işleyerek veya dönüştürerek yeni türler oluşturmak mümkündür.

Kesişim Türleri (`&`):

Birden çok türü tek bir türde birleştirmenize olanak tanır:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersection of A and B
const obj: C = { foo: 42, bar: 'hello' };
```

Birleşim Türleri (`|`):

Birden fazla türden biri olabilen bir tür tanımlamanıza olanak tanır:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Eşlenmiş Türler:

Yeni bir tür oluşturmak için mevcut bir türün özelliklerini dönüştürmenize olanak tanır:

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

Koşullu Türler:

Belirli koşullara göre türler oluşturmanıza olanak tanır:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### İndeksli Erişim Türleri

TypeScript'te, `Type[Key]` indeksini kullanarak başka bir tür içindeki özelliklerin türlerine erişmek ve bunları işlemek mümkündür.

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

### Yardımcı Türler

Türleri işlemek için çeşitli yerleşik yardımcı türler kullanılabilir. En yaygın kullanılanların listesi aşağıdadır:

#### Awaited\<T\>

Promise türlerini özyinelemeli olarak açan bir tür oluşturur.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

T'nin tüm özellikleri isteğe bağlı olarak ayarlanmış bir tür oluşturur.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

T'nin tüm özellikleri zorunlu olarak ayarlanmış bir tür oluşturur.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

T'nin tüm özellikleri salt okunur olarak ayarlanmış bir tür oluşturur.

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

K özellik kümesindeki her özelliği T türünde olan bir tür oluşturur.

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

T'den belirtilen K özelliklerini seçerek bir tür oluşturur.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

T'den belirtilen K özelliklerini çıkararak bir tür oluşturur.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

U türündeki tüm değerleri T'den hariç tutarak bir tür oluşturur.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

T'den U türündeki tüm değerleri ayıklayarak bir tür oluşturur.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

T'den null ve undefined değerlerini hariç tutarak bir tür oluşturur.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

T işlev türünün parametre türlerini elde eder.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

T oluşturucu işlev türünün parametre türlerini elde eder.

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

T işlev türünün dönüş türünü elde eder.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

T sınıf türünün örnek türünü elde eder.

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

T işlev türündeki 'this' parametresinin türünü elde eder.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

T işlev türünden 'this' parametresini kaldırır.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Bağlamsal bir `this` türü için işaretleyici görevi görür.

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

T girdi türünün adını büyük harfe dönüştürür.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

T girdi türünün adını küçük harfe dönüştürür.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

T girdi türünün adının ilk harfini büyütür.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

T girdi türünün adının ilk harfini küçültür.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer, bir jenerik işlevin kapsamında otomatik tür çıkarımını engellemek için tasarlanmış bir yardımcı türdür.

Örnek:

```typescript
// Automatic inference of types within the scope of a generic function.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

NoInfer ile:

<!-- skip -->
```typescript
// Example function that uses NoInfer to prevent type inference
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

