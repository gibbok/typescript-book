# Manipulasi Tipe



### Membuat Tipe dari Tipe

Tipe baru dapat dibuat dengan menyusun, memanipulasi, atau mentransformasi tipe yang sudah ada.

Tipe Interseksi (`&`):

Memungkinkan Anda menggabungkan beberapa tipe menjadi satu tipe:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersection of A and B
const obj: C = { foo: 42, bar: 'hello' };
```

Tipe Union (`|`):

Memungkinkan Anda mendefinisikan sebuah tipe yang dapat berupa salah satu dari beberapa tipe:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Mapped Type:

Memungkinkan Anda mentransformasi properti dari tipe yang sudah ada untuk membuat tipe baru:

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

Tipe kondisional:

Memungkinkan Anda membuat tipe berdasarkan beberapa kondisi:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### Tipe Akses Terindeks

Dalam TypeScript, tipe properti di dalam tipe lain dapat diakses dan dimanipulasi menggunakan indeks, `Type[Key]`.

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

### Tipe Utilitas

Beberapa tipe utilitas bawaan dapat digunakan untuk memanipulasi tipe. Berikut adalah daftar tipe yang paling umum digunakan:

#### Awaited\<T\>

Membentuk tipe yang secara rekursif membuka pembungkus tipe `Promise`.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

Membentuk tipe dengan semua properti T ditetapkan sebagai opsional.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

Membentuk tipe dengan semua properti T ditetapkan sebagai wajib.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

Membentuk tipe dengan semua properti T ditetapkan sebagai hanya-baca.

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

Membentuk tipe dengan sekumpulan properti K bertipe T.

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

Membentuk tipe dengan memilih properti K yang ditentukan dari T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

Membentuk tipe dengan menghilangkan properti K yang ditentukan dari T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

Membentuk tipe dengan mengecualikan semua nilai bertipe U dari T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

Membentuk tipe dengan mengekstrak semua nilai bertipe U dari T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

Membentuk tipe dengan mengecualikan null dan undefined dari T.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

Mengekstrak tipe parameter dari tipe fungsi T.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

Mengekstrak tipe parameter dari tipe fungsi konstruktor T.

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

Mengekstrak tipe kembalian dari tipe fungsi T.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

Mengekstrak tipe instans dari tipe kelas T.

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

Mengekstrak tipe parameter `this` dari tipe fungsi T.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

Menghapus parameter `this` dari tipe fungsi T.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Berfungsi sebagai penanda untuk tipe `this` kontekstual.

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

Mengubah nama tipe masukan T menjadi huruf besar.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Mengubah nama tipe masukan T menjadi huruf kecil.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Mengubah huruf pertama nama tipe masukan T menjadi huruf besar.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Mengubah huruf pertama nama tipe masukan T menjadi huruf kecil.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer adalah tipe utilitas yang dirancang untuk memblokir inferensi tipe otomatis dalam cakupan fungsi generik.

Contoh:

```typescript
// Automatic inference of types within the scope of a generic function.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

Dengan NoInfer:

<!-- skip -->
```typescript
// Example function that uses NoInfer to prevent type inference
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

