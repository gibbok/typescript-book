# Class



### Sintaks Umum Class

Kata kunci `class` digunakan dalam TypeScript untuk mendefinisikan sebuah class. Berikut adalah contohnya:

```typescript
class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public sayHi(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
```

Kata kunci `class` digunakan untuk mendefinisikan class bernama `Person`.

Class tersebut memiliki dua properti private: `name` bertipe `string` dan `age` bertipe `number`.

Constructor didefinisikan menggunakan kata kunci `constructor`. Constructor menerima `name` dan `age` sebagai parameter lalu menetapkannya ke properti yang sesuai.

Class tersebut memiliki metode `public` bernama `sayHi` yang mencatat pesan sapaan.

Untuk membuat instance dari sebuah class dalam TypeScript, Anda dapat menggunakan kata kunci `new` diikuti nama class, lalu tanda kurung `()`. Misalnya:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Constructor

Constructor adalah metode khusus dalam sebuah class yang digunakan untuk menginisialisasi properti objek saat instance class dibuat.

```typescript
class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(
            `Hello, my name is ${this.name} and I'm ${this.age} years old.`
        );
    }
}

const john = new Person('Simon', 17);
john.sayHello();
```

Constructor dapat di-overload menggunakan sintaks berikut:

```typescript
type Sex = 'm' | 'f';

class Person {
    name: string;
    age: number;
    sex: Sex;

    constructor(name: string, age: number, sex?: Sex);
    constructor(name: string, age: number, sex: Sex) {
        this.name = name;
        this.age = age;
        this.sex = sex ?? 'm';
    }
}

const p1 = new Person('Simon', 17);
const p2 = new Person('Alice', 22, 'f');
```

Dalam TypeScript, beberapa overload constructor dapat didefinisikan, tetapi hanya boleh ada satu implementasi yang harus kompatibel dengan semua overload; hal ini dapat dilakukan dengan menggunakan parameter opsional.

```typescript
class Person {
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(name: string, age: number);
    constructor(name?: string, age?: number) {
        this.name = name ?? 'Unknown';
        this.age = age ?? 0;
    }

    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

const person1 = new Person();
person1.displayInfo(); // Name: Unknown, Age: 0

const person2 = new Person('John');
person2.displayInfo(); // Name: John, Age: 0

const person3 = new Person('Jane', 25);
person3.displayInfo(); // Name: Jane, Age: 25
```

### Constructor Private dan Protected

Dalam TypeScript, constructor dapat ditandai sebagai `private` atau `protected`, yang membatasi aksesibilitas dan penggunaannya.

Constructor private:
Hanya dapat dipanggil dari dalam class itu sendiri. Constructor private sering digunakan dalam skenario ketika Anda ingin menerapkan pola singleton atau membatasi pembuatan instance melalui metode factory di dalam class.

Constructor protected:
Constructor protected berguna ketika Anda ingin membuat base class yang tidak boleh dibuat instance-nya secara langsung, tetapi dapat diperluas oleh subclass.

```typescript
class BaseClass {
    protected constructor() {}
}

class DerivedClass extends BaseClass {
    private value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }
}

// Attempting to instantiate the base class directly will result in an error
// const baseObj = new BaseClass(); // Error: Constructor of class 'BaseClass' is protected.

// Create an instance of the derived class
const derivedObj = new DerivedClass(10);
```

### Modifier Akses

Modifier akses `private`, `protected`, dan `public` digunakan untuk mengontrol visibilitas dan aksesibilitas anggota class, seperti properti dan metode, dalam class TypeScript. Modifier ini penting untuk menerapkan enkapsulasi dan menetapkan batasan dalam mengakses serta mengubah state internal sebuah class.

Modifier `private` membatasi akses ke anggota class hanya dari dalam class yang memuatnya.

Modifier `protected` mengizinkan akses ke anggota class dari dalam class yang memuatnya dan class turunannya.

Modifier `public` memberikan akses tanpa batas ke anggota class, sehingga dapat diakses dari mana saja.

### Get dan Set

Getter dan setter adalah metode khusus yang memungkinkan Anda mendefinisikan perilaku akses dan perubahan khusus untuk properti class. Keduanya memungkinkan Anda mengenkapsulasi state internal sebuah objek dan menyediakan logika tambahan ketika mengambil atau menetapkan nilai properti.
Dalam TypeScript, getter dan setter masing-masing didefinisikan menggunakan kata kunci `get` dan `set`. Berikut contohnya:

```typescript
class MyClass {
    private _myProperty: string;

    constructor(value: string) {
        this._myProperty = value;
    }
    get myProperty(): string {
        return this._myProperty;
    }
    set myProperty(value: string) {
        this._myProperty = value;
    }
}
```

### Auto-Accessor dalam Class

TypeScript versi 4.9 menambahkan dukungan untuk auto-accessor, sebuah fitur ECMAScript yang akan datang. Fitur ini menyerupai properti class, tetapi dideklarasikan dengan kata kunci `accessor`.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Auto-accessor diubah ("de-sugared") menjadi accessor `get` dan `set` private yang beroperasi pada properti yang tidak dapat diakses.

<!-- skip -->
```typescript
class Animal {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = value;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

### this

Dalam TypeScript, kata kunci `this` mengacu pada instance class saat ini di dalam metode atau constructor-nya. Kata kunci ini memungkinkan Anda mengakses dan mengubah properti serta metode class dari dalam cakupannya sendiri.
Kata kunci ini menyediakan cara untuk mengakses dan memanipulasi state internal sebuah objek di dalam metode objek itu sendiri.

```typescript
class Person {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public introduce(): void {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const person1 = new Person('Alice');
person1.introduce(); // Hello, my name is Alice.
```

### Properti Parameter

Properti parameter memungkinkan Anda mendeklarasikan dan menginisialisasi properti class secara langsung di dalam parameter constructor, sehingga menghindari kode boilerplate. Contoh:

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // The "private" and "public" keywords in the constructor
        // automatically declare and initialize the corresponding class properties.
    }
    public introduce(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
const person = new Person('Alice', 25);
person.introduce();
```

### Class Abstrak

Class abstrak digunakan dalam TypeScript terutama untuk pewarisan. Class ini menyediakan cara untuk mendefinisikan properti dan metode umum yang dapat diwarisi oleh subclass.
Hal ini berguna ketika Anda ingin mendefinisikan perilaku umum dan memastikan bahwa subclass mengimplementasikan metode tertentu. Class abstrak menyediakan cara untuk membuat hierarki class, dengan base class abstrak menyediakan interface bersama dan fungsionalitas umum untuk subclass.

```typescript
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract makeSound(): void;
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} meows.`);
    }
}

const cat = new Cat('Whiskers');
cat.makeSound(); // Output: Whiskers meows.
```

### Dengan Generic

Class dengan generic memungkinkan Anda mendefinisikan class yang dapat digunakan kembali dan bekerja dengan berbagai tipe.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }

    setItem(item: T): void {
        this.item = item;
    }
}

const container1 = new Container<number>(42);
console.log(container1.getItem()); //  42

const container2 = new Container<string>('Hello');
container2.setItem('World');
console.log(container2.getItem()); // World
```

### Decorator

Decorator menyediakan mekanisme untuk menambahkan metadata, mengubah perilaku, memvalidasi, atau memperluas fungsionalitas elemen target. Decorator adalah fungsi yang dijalankan saat runtime. Beberapa decorator dapat diterapkan pada sebuah deklarasi.

Decorator merupakan fitur eksperimental, dan contoh berikut hanya kompatibel dengan TypeScript versi 5 atau lebih baru yang menggunakan ES6.

Untuk TypeScript versi sebelum 5, decorator harus diaktifkan menggunakan properti `experimentalDecorators` dalam `tsconfig.json` Anda atau menggunakan `--experimentalDecorators` pada baris perintah (tetapi contoh berikut tidak akan berfungsi).

Beberapa kasus penggunaan umum untuk decorator meliputi:

* Mengamati perubahan properti.
* Mengamati pemanggilan metode.
* Menambahkan properti atau metode tambahan.
* Validasi runtime.
* Serialisasi dan deserialisasi otomatis.
* Logging.
* Otorisasi dan autentikasi.
* Perlindungan terhadap error.

Catatan: Decorator untuk versi 5 tidak mengizinkan dekorasi parameter.

Jenis decorator:

#### Decorator Class

Decorator Class berguna untuk memperluas class yang sudah ada, misalnya dengan menambahkan properti atau metode, maupun mengumpulkan instance sebuah class. Dalam contoh berikut, kita menambahkan metode `toString` yang mengubah class menjadi representasi string.

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function toString<Class extends Constructor>(
    Value: Class,
    context: ClassDecoratorContext<Class>
) {
    return class extends Value {
        constructor(...args: any[]) {
            super(...args);
            console.log(JSON.stringify(this));
            console.log(JSON.stringify(context));
        }
    };
}

@toString
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        return 'Hello, ' + this.name;
    }
}
const person = new Person('Simon');
/* Logs:
{"name":"Simon"}
{"kind":"class","name":"Person"}
*/
```

#### Decorator Properti

Decorator properti berguna untuk mengubah perilaku suatu properti, seperti mengubah nilai inisialisasi. Dalam kode berikut, terdapat skrip yang memastikan nilai sebuah properti selalu menggunakan huruf besar:

```typescript
function upperCase<T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
) {
    return function (this: T, value: string) {
        return value.toUpperCase();
    };
}

class MyClass {
    @upperCase
    prop1 = 'hello!';
}

console.log(new MyClass().prop1); // Logs: HELLO!
```

#### Decorator Metode

Decorator metode memungkinkan Anda mengubah atau meningkatkan perilaku metode. Berikut adalah contoh logger sederhana:

```typescript
function log<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
    >
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`);
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`);
        return result;
    }

    return replacementMethod;
}

class MyClass {
    @log
    sayHello() {
        console.log('Hello!');
    }
}

new MyClass().sayHello();
```

Output log:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Decorator Getter dan Setter

Decorator getter dan setter memungkinkan Anda mengubah atau meningkatkan perilaku accessor class. Decorator ini berguna, misalnya, untuk memvalidasi penetapan properti. Berikut contoh sederhana decorator getter:

```typescript
function range<This, Return extends number>(min: number, max: number) {
    return function (
        target: (this: This) => Return,
        context: ClassGetterDecoratorContext<This, Return>
    ) {
        return function (this: This): Return {
            const value = target.call(this);
            if (value < min || value > max) {
                throw 'Invalid';
            }
            Object.defineProperty(this, context.name, {
                value,
                enumerable: true,
            });
            return value;
        };
    };
}

class MyClass {
    private _value = 0;

    constructor(value: number) {
        this._value = value;
    }
    @range(1, 100)
    get getValue(): number {
        return this._value;
    }
}

const obj = new MyClass(10);
console.log(obj.getValue); // Valid: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // Throw: Invalid!
```

#### Metadata Decorator

Metadata Decorator menyederhanakan proses penerapan dan penggunaan metadata oleh decorator dalam class apa pun. Decorator dapat mengakses properti metadata baru pada objek context, yang dapat berfungsi sebagai key untuk primitif maupun objek.
Informasi metadata dapat diakses pada class melalui `Symbol.metadata`.

Metadata dapat digunakan untuk berbagai tujuan, seperti debugging, serialisasi, atau dependency injection dengan decorator.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polyfill

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Context contains property metadata: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Set the metadata object with a primitive value
    context.metadata[context.name] = true;
}

class MyClass {
    @setMetadata
    a = 123;

    @setMetadata
    accessor b = 'b';

    @setMetadata
    fn() {}
}

const metadata = MyClass[Symbol.metadata]; // Get metadata information

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### Pewarisan

Pewarisan mengacu pada mekanisme yang memungkinkan sebuah class mewarisi properti dan metode dari class lain, yang dikenal sebagai base class atau superclass. Derived class, yang juga disebut child class atau subclass, dapat memperluas dan mengkhususkan fungsionalitas base class dengan menambahkan properti dan metode baru atau meng-override yang sudah ada.

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log('The animal makes a sound');
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }

    speak(): void {
        console.log('Woof! Woof!');
    }
}

// Create an instance of the base class
const animal = new Animal('Generic Animal');
animal.speak(); // The animal makes a sound

// Create an instance of the derived class
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Woof!"
```

TypeScript tidak mendukung pewarisan berganda dalam pengertian tradisional, tetapi memungkinkan pewarisan dari satu base class.
TypeScript mendukung beberapa interface. Sebuah interface dapat mendefinisikan kontrak untuk struktur objek, dan sebuah class dapat mengimplementasikan beberapa interface. Hal ini memungkinkan sebuah class mewarisi perilaku dan struktur dari beberapa sumber.

```typescript
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class FlyingFish implements Flyable, Swimmable {
    fly() {
        console.log('Flying...');
    }

    swim() {
        console.log('Swimming...');
    }
}

const flyingFish = new FlyingFish();
flyingFish.fly();
flyingFish.swim();
```

Kata kunci `class` dalam TypeScript, sama seperti dalam JavaScript, sering disebut sebagai syntactic sugar. Kata kunci ini diperkenalkan dalam ECMAScript 2015 (ES6) untuk menawarkan sintaks yang lebih familier dalam membuat dan bekerja dengan objek menggunakan pendekatan berbasis class. Namun, penting untuk dicatat bahwa TypeScript, sebagai superset dari JavaScript, pada akhirnya dikompilasi menjadi JavaScript, yang secara mendasar tetap berbasis prototype.

### Anggota Statis

TypeScript memiliki anggota statis. Untuk mengakses anggota statis sebuah class, Anda dapat menggunakan nama class yang diikuti titik tanpa perlu membuat objek.

```typescript
class OfficeWorker {
    static memberCount: number = 0;

    constructor(private name: string) {
        OfficeWorker.memberCount++;
    }
}

const w1 = new OfficeWorker('James');
const w2 = new OfficeWorker('Simon');
const total = OfficeWorker.memberCount;
console.log(total); // 2
```

### Inisialisasi properti

Ada beberapa cara untuk menginisialisasi properti sebuah class dalam TypeScript:

Inline:

Dalam contoh berikut, nilai awal ini akan digunakan saat instance class dibuat.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

Di dalam constructor:

```typescript
class MyClass {
    property1: string;
    property2: number;

    constructor() {
        this.property1 = 'default value';
        this.property2 = 42;
    }
}
```

Menggunakan parameter constructor:

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // There is no need to assign the values to the properties explicitly.
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### Overload metode

Overload metode memungkinkan sebuah class memiliki beberapa metode dengan nama yang sama, tetapi dengan tipe parameter atau jumlah parameter yang berbeda. Hal ini memungkinkan kita memanggil sebuah metode dengan berbagai cara berdasarkan argumen yang diteruskan.

```typescript
class MyClass {
    add(a: number, b: number): number; // Overload signature 1
    add(a: string, b: string): string; // Overload signature 2

    add(a: number | string, b: number | string): number | string {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error('Invalid arguments');
    }
}

const r = new MyClass();
console.log(r.add(10, 5)); // Logs 15
```

